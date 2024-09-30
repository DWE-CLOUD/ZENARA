import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ZenaraLandingPage = () => {
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: [0, 1],
            transition: { duration: 2 }
        });
    }, [controls]);

    const backgroundVariants = {
        light: {
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
        },
        dark: {
            background: "linear-gradient(135deg, #243B55 0%, #141E30 100%)"
        }
    };

    const titleVariants = {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 1.2, type: "spring", damping: 10 } },
    };

    const subtitleVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 1.2, delay: 0.3, type: "spring", damping: 10 } }
    };

    const buttonVariants = {
        initial: { scale: 0 },
        animate: { scale: 1, transition: { type: "spring", stiffness: 200, delay: 0.6 } },
        hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.5)" },
        tap: { scale: 0.98 }
    };

    const particleVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 0.7 },
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleJourneyClick = () => {
        navigate('/login');
    };

    return (
        <motion.div
            className={`min-h-screen flex flex-col items-center justify-center p-5 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} overflow-hidden`}
            variants={backgroundVariants}
            initial={theme}
            animate={theme}
            transition={{ duration: 1.5 }}
        >
            {[...Array(20)].map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    variants={particleVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <Sparkles size={Math.random() * 10 + 5} className={theme === 'light' ? 'text-blue-300' : 'text-yellow-200'} />
                </motion.div>
            ))}

            {/* Theme toggle */}
            <motion.button
                className={`absolute top-5 right-5 p-3 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-gray-800 dark:text-white`}
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </motion.button>

            {/* Main content */}
            <motion.div className="z-10 text-center" animate={controls}>
                <motion.h1
                    className={`text-7xl font-thin mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Welcome to Zenara
                </motion.h1>
                <motion.p
                    className={`text-2xl mb-10 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
                    variants={subtitleVariants}
                    initial="initial"
                    animate="animate"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                >
                    Discover the magic of elegant simplicity
                </motion.p>
                <motion.button
                    className={`px-10 py-3 bg-transparent border-2 ${theme === 'light' ? 'border-gray-800 text-gray-800' : 'border-white text-white'} rounded-full text-lg`}
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleJourneyClick}
                    style={{ fontFamily: "'Lato', sans-serif" }}
                >
                    Begin your Journey !
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default ZenaraLandingPage;