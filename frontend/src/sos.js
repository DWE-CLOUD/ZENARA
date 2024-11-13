import React, { useState, useRef, useEffect } from 'react';
import { Camera, Send, AlertTriangle, Heart, Map, CheckCircle, Loader, X } from 'lucide-react';

const EmergencyStep = ({ icon: Icon, title, description, status, animated }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'pending':
                return 'bg-gray-100 text-gray-400';
            case 'processing':
                return 'bg-blue-100 text-blue-600 animate-pulse';
            case 'success':
                return 'bg-green-100 text-green-600';
            case 'error':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-400';
        }
    };

    return (
        <div className={`transform transition-all duration-500 ${animated ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <div className={`border-l-4 mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg
                ${status === 'processing' ? 'border-l-blue-500' :
                status === 'success' ? 'border-l-green-500' :
                    status === 'error' ? 'border-l-red-500' : 'border-l-gray-300'}`}>
                <div className="p-4">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full ${getStatusStyles()}`}>
                            {status === 'processing' ? (
                                <Loader className="animate-spin" size={24} />
                            ) : (
                                <Icon size={24} />
                            )}
                        </div>
                        <div className="ml-4 flex-grow">
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <p className="text-sm text-gray-500">{description}</p>
                        </div>
                        {status === 'success' && <CheckCircle className="text-green-500" size={24} />}
                        {status === 'error' && <X className="text-red-500" size={24} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SOSButton = ({ onClick, isActive, isDisabled }) => {
    const [pulseIntensity, setPulseIntensity] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulseIntensity(prev => prev === 1 ? 1.1 : 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-64 h-64 mx-auto">
            {!isDisabled && (
                <>
                    <div className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20"></div>
                    <div className="absolute inset-0 rounded-full animate-pulse bg-red-300 opacity-15"></div>
                    <div className="absolute inset-0 rounded-full animate-pulse delay-75 bg-red-200 opacity-10"></div>
                </>
            )}

            <button
                onClick={onClick}
                disabled={isDisabled}
                style={{ transform: `scale(${isDisabled ? 1 : pulseIntensity})` }}
                className={`absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full shadow-2xl transition-all duration-300
          flex flex-col items-center justify-center ${isDisabled ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-red-500/50 hover:scale-105'}
          ${isActive ? 'animate-pulse' : ''}`}
            >
                <AlertTriangle size={48} className="text-white mb-2" />
                <span className="text-white text-2xl font-bold mb-1">SOS</span>
                <span className="text-white/90 text-sm">
                    {isDisabled ? 'Processing...' : 'Press for Emergency'}
                </span>
            </button>
        </div>
    );
};

const SOSPage = () => {
    const [emergencyState, setEmergencyState] = useState('idle');
    const [steps, setSteps] = useState({
        photo: { status: 'pending', animated: false },
        location: { status: 'pending', animated: false },
        alert: { status: 'pending', animated: false }
    });
    const videoRef = useRef(null);
    const [photos, setPhotos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [showMapAnimation, setShowMapAnimation] = useState(false);

    const capturePhoto = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoSources = devices.filter(device => device.kind === 'videoinput');
            const isMobile = videoSources.length > 1;

            const captureCamera = async (facingMode) => {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode }
                });
                videoRef.current.srcObject = stream;
                await new Promise(resolve => setTimeout(resolve, 1000));

                const canvas = document.createElement('canvas');
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

                const photo = canvas.toDataURL('image/jpeg');
                stream.getTracks().forEach(track => track.stop());
                return photo;
            };

            const capturedPhotos = isMobile
                ? await Promise.all([captureCamera('user'), captureCamera('environment')])
                : [await captureCamera('user')];

            setPhotos(capturedPhotos);
            return capturedPhotos;
        } catch (error) {
            throw new Error('Failed to capture photo');
        }
    };

    const getLocation = () => {
        setShowMapAnimation(true);
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
            }

            navigator.geolocation.getCurrentPosition(
                position => {
                    const coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    setCoordinates(coords);
                    resolve(coords);
                    setShowMapAnimation(false);
                },
                error => {
                    setShowMapAnimation(false);
                    reject(new Error('Failed to get location'))
                }
            );
        });
    };

    const sendAlert = async (photos, location) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log({
            to: 'parents@example.com',
            subject: 'EMERGENCY ALERT',
            body: `Emergency Alert Triggered
            Location: ${location.latitude}, ${location.longitude}
            Time: ${new Date().toLocaleString()}
            Photos Attached`
        });
    };

    const handleEmergency = async () => {
        setEmergencyState('active');

        setSteps(prev => ({
            ...prev,
            photo: { status: 'processing', animated: true }
        }));

        try {
            const capturedPhotos = await capturePhoto();
            setSteps(prev => ({
                ...prev,
                photo: { status: 'success', animated: true }
            }));

            setTimeout(() => {
                setPhotos([]);
            }, 1000);

            setSteps(prev => ({
                ...prev,
                location: { status: 'processing', animated: true }
            }));

            const location = await getLocation();
            setSteps(prev => ({
                ...prev,
                location: { status: 'success', animated: true }
            }));

            setSteps(prev => ({
                ...prev,
                alert: { status: 'processing', animated: true }
            }));

            await sendAlert(capturedPhotos, location);
            setSteps(prev => ({
                ...prev,
                alert: { status: 'success', animated: true }
            }));

            setEmergencyState('completed');
        } catch (error) {
            setErrorMessage(error.message);
            setEmergencyState('error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Emergency Response Center
                    </h1>
                    <p className="text-gray-600 text-xl">Stay Safe. Get Help Instantly.</p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="mb-12">
                        <SOSButton
                            onClick={handleEmergency}
                            isActive={emergencyState === 'active'}
                            isDisabled={emergencyState !== 'idle'}
                        />
                    </div>

                    {steps.photo.status === 'processing' && (
                        <div className="flex justify-center mb-4">
                            <video ref={videoRef} autoPlay className="rounded-lg shadow-lg" />
                        </div>
                    )}

                    {photos.length > 0 && (
                        <div className="flex justify-center space-x-4 mb-4 transition-all transform scale-90">
                            {photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`Captured ${index + 1}`} className="rounded-lg shadow-lg" />
                            ))}
                        </div>
                    )}

                    {showMapAnimation && (
                        <div className="flex justify-center items-center mb-4">
                            <Map size={48} className="text-blue-600 animate-ping" />
                            <p className="text-blue-600 text-lg ml-2">Searching for location via GPS...</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <EmergencyStep icon={Camera} title="Capturing Safety Photo" description="Securing visual information of your surroundings..." status={steps.photo.status} animated={steps.photo.animated} />
                        <EmergencyStep icon={Map} title="Locating Position" description="Getting your exact coordinates..." status={steps.location.status} animated={steps.location.animated} />
                        <EmergencyStep icon={Send} title="Alerting Emergency Contacts" description="Notifying your parents and emergency contacts..." status={steps.alert.status} animated={steps.alert.animated} />
                    </div>

                    {errorMessage && (
                        <div className="mt-6 bg-red-50 border-red-200 p-4 rounded-lg">
                            <div className="text-red-800 font-semibold">Error</div>
                            <div className="text-red-700">{errorMessage}</div>
                        </div>
                    )}

                    {emergencyState === 'completed' && (
                        <div className="mt-6 bg-green-50 border-green-200 p-4 rounded-lg">
                            <div className="text-green-800 font-semibold flex items-center">
                                <Heart className="mr-2" /> Help is on the way
                            </div>
                            <div className="text-green-700">
                                Your emergency contacts have been notified with your location
                                {coordinates && ` (${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)})`}.
                                Stay where you are if it's safe to do so. We're actively Capturing your Pics for safety. Don't Close this
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SOSPage;
