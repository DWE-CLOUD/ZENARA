import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Heart, Star, Sun, Moon } from 'lucide-react';

const SecurityCheck = () => {
    const [progress, setProgress] = useState(0);
    const [currentCheck, setCurrentCheck] = useState('');

    const securityChecks = [
        'Building a super-safe cyber playground',
        'Putting on your invisibility cloak for privacy',
        'Bouncing away the baddies with our web shield',
        'Zapping out the yucky stuff from your chats',
        'Sending cyberbullies to time-out',
        'Helping you find the perfect screen time balance',
        'Becoming an online safety superhero',
        'Creating a secret SOS signal for trusted adults',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    setCurrentCheck(securityChecks[Math.floor((prevProgress / 100) * securityChecks.length)]);
                    return prevProgress + 1;
                }
                clearInterval(interval);
                return 100;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const getColor = () => {
        if (progress < 33) return 'from-blue-400 to-purple-400';
        if (progress < 66) return 'from-purple-400 to-pink-400';
        return 'from-pink-400 to-orange-400';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 20}s`
                        }}
                    >
                        {i % 4 === 0 && <Heart size={24} className="text-pink-300" />}
                        {i % 4 === 1 && <Star size={24} className="text-yellow-300" />}
                        {i % 4 === 2 && <Sun size={24} className="text-orange-300" />}
                        {i % 4 === 3 && <Moon size={24} className="text-blue-300" />}
                    </div>
                ))}
            </div>

            <div className="z-10 bg-white bg-opacity-90 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-sm max-w-lg w-full mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center">
                    Zenara Guardian Shield
                </h1>

                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6 mx-auto">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getColor()} opacity-30 transition-all duration-1000 ease-in-out`}></div>
                    <Shield
                        size={256}
                        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${getColor()} stroke-current`}
                        strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            {progress}%
                        </div>
                    </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                    <div
                        className={`h-4 rounded-full bg-gradient-to-r ${getColor()} transition-all duration-500 ease-in-out`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="text-xl font-semibold text-purple-700 mb-2 text-center">
                    {progress < 100 ? 'Zenara Protection Calibrating...' : 'Zenara Protection Activated!'}
                </div>

                <div className="flex items-center justify-center text-lg text-gray-700 mb-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2">
                    <CheckCircle size={24} className="mr-2 text-green-500" />
                    <span>{currentCheck}</span>
                </div>

                <p className="text-center text-gray-700 text-lg max-w-xl mx-auto leading-relaxed">
                    Welcome to the Zenara Circle! We believe every child deserves love, protection, and happiness. You're special and valued! Need help or someone to talk to? Reach out to a trusted adult.
                </p>
            </div>
        </div>
    );
};

export default SecurityCheck;