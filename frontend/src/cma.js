import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Loader, Heart, Smile, Stars, Sun, Moon, CloudSun, Sparkles, Music } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent";

const FloatingIcon = ({ Icon, index }) => (
    <motion.div
        className="absolute text-purple-400/20"
        initial={{ y: 0, scale: 0.8 }}
        animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
            scale: [0.8, 1, 0.8]
        }}
        transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
        }}
    >
        <Icon size={24} />
    </motion.div>
);

const EmotionBubble = ({ emotion }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={`${emotion.color} p-4 rounded-full aspect-square flex items-center justify-center`}
        whileHover={{ scale: 1.1 }}
    >
        <span className="text-2xl">{emotion.emoji}</span>
    </motion.div>
);

const EmotionDetector = () => {
    const [stream, setStream] = useState(null);
    const [emotion, setEmotion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [emotionHistory, setEmotionHistory] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setError(null);
        } catch (err) {
            setError("Camera access denied. Please check your permissions.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setEmotion(null);
            setCapturedImage(null);
        }
    };


// Initialize the Gemini API
    const genAI = new GoogleGenerativeAI('AIzaSyD0qTRl8lihWQAWeF3u94K59Dn31sUgecc');

    const capturePhoto = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current) return;

        setIsLoading(true);
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
            const imageBase64 = canvas.toDataURL('image/jpeg').split(',')[1];

            // Create a file-like object from the base64 string
            const imageFile = new File(
                [Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0))],
                "image.jpg",
                { type: 'image/jpeg' }
            );

            // Initialize the model
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            // Prepare the image part
            const imagePart = {
                inlineData: {
                    data: imageBase64,
                    mimeType: "image/jpeg"
                }
            };

            // Generate content
            const result = await model.generateContent([
                "What emotion is shown in this image? Respond with just the emotion name and an appropriate emoji.",
                imagePart
            ]);

            const response = await result.response;
            const emotionText = response.text();

            const [text, emoji] = emotionText.split(' ');
            const newEmotion = {
                text: text.trim(),
                emoji: emoji || '😊',
                color: getEmotionColor(text),
                timestamp: new Date()
            };
            setEmotion(newEmotion);
            setEmotionHistory(prev => [...prev, newEmotion].slice(-5));
            setCapturedImage(canvas.toDataURL('image/jpeg'));

        } catch (err) {
            console.error("Error analyzing emotion:", err);
            setError("Failed to analyze emotion. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getEmotionColor = (emotion) => {
        const colorMap = {
            happy: 'bg-yellow-400',
            sad: 'bg-blue-400',
            angry: 'bg-red-400',
            surprised: 'bg-purple-400',
            neutral: 'bg-gray-400',
            default: 'bg-green-400'
        };
        return colorMap[emotion.toLowerCase()] || colorMap.default;
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="max-w-4xl mx-auto relative"
            >
                <motion.div
                    className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl"
                    layoutId="card"
                    transition={{ type: "spring", damping: 20 }}
                />

                <div className="relative p-8 overflow-hidden rounded-3xl">
                    {[Heart, Smile, Stars, Sun, Moon, CloudSun, Sparkles, Music].map((Icon, index) => (
                        <FloatingIcon key={index} Icon={Icon} index={index} />
                    ))}

                    <motion.h1
                        className="text-6xl font-bold text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-transparent bg-clip-text inline-block"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            Emotion Explorer
                        </motion.span>
                    </motion.h1>
                    <motion.div
                        className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-video mb-8 shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className={`w-full h-full object-cover transition-opacity duration-300 ${stream ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {!stream && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="text-center text-gray-400">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Camera size={48} className="mx-auto mb-4" />
                                    </motion.div>
                                    <p className="text-lg">Click Start Camera to begin!</p>
                                </div>
                            </motion.div>
                        )}
                        {capturedImage && (
                            <motion.div
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <img
                                    src={capturedImage}
                                    alt="Captured"
                                    className="max-h-full rounded-lg shadow-2xl"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                    <motion.div
                        className="flex justify-center gap-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <AnimatePresence mode="wait">
                            {!stream ? (
                                <motion.button
                                    onClick={startCamera}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(168,85,247,0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Camera size={24} />
                                    Start Camera
                                </motion.button>
                            ) : (
                                <>
                                    <motion.button
                                        onClick={capturePhoto}
                                        disabled={isLoading}
                                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 10px 25px rgba(168,85,247,0.4)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isLoading ? (
                                            <Loader className="animate-spin" size={24} />
                                        ) : (
                                            <Camera size={24} />
                                        )}
                                        Detect Emotion
                                    </motion.button>
                                    <motion.button
                                        onClick={stopCamera}
                                        className="px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-full font-semibold flex items-center gap-2"
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "rgba(168,85,247,0.1)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <RefreshCw size={24} />
                                        Reset
                                    </motion.button>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Error Messages */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-8"
                            >
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {emotion && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", damping: 12 }}
                                className="text-center mb-8"
                            >
                                <motion.div
                                    className={`inline-block ${emotion.color} bg-opacity-20 rounded-3xl p-8 shadow-xl`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        className="text-8xl mb-4"
                                        animate={{
                                            rotate: [0, 10, -10, 0],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {emotion.emoji}
                                    </motion.div>
                                    <motion.h3
                                        className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        {emotion.text}
                                    </motion.h3>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {emotionHistory.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center gap-4 mb-8"
                        >
                            {emotionHistory.map((hist, index) => (
                                <EmotionBubble key={hist.timestamp.getTime()} emotion={hist} />
                            ))}
                        </motion.div>
                    )}

                    <motion.p
                        className="text-center text-gray-600 mt-8 italic text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        "Every expression tells a story, let's discover yours! ✨"
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default EmotionDetector;