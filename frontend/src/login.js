import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Heart, Star, Cloud, Bird } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ZenaraLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNightMode, setIsNightMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            });

            if (response.ok) {
                const data = await response.text();
                setSuccess(data);
                window.location.href = '/dash';
            } else {
                const errorData = await response.text();
                setError(errorData || 'Invalid username or password.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };

    const backgroundVariants = {
        day: {
            background: 'linear-gradient(120deg, #e0f7fa 0%, #4fc3f7 50%, #29b6f6 100%)',
        },
        night: {
            background: 'linear-gradient(120deg, #303f9f 0%, #5c2c8d 50%, #4a148c 100%)',
        },
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const floatingAnimation = {
        y: ['-10%', '10%'],
        transition: {
            y: {
                duration: 2,
                yoyo: Infinity,
                ease: "easeInOut",
            }
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center overflow-hidden font-sans"
            variants={backgroundVariants}
            animate={isNightMode ? 'night' : 'day'}
        >
            <AnimatePresence>
                {!isNightMode ? (
                    <>
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: 360 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 1, rotate: { duration: 20, loop: Infinity, ease: "linear" } }}
                            className="absolute top-10 right-10"
                        >
                            <Sun size={80} color="#FFD700" />
                        </motion.div>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`cloud-${i}`}
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 20 + i * 5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                                className="absolute"
                                style={{ top: `${20 + i * 20}%` }}
                            >
                                <Cloud size={48 + i * 16} color="#FFFFFF" />
                            </motion.div>
                        ))}
                        <motion.div
                            animate={floatingAnimation}
                            className="absolute bottom-20 left-20"
                        >
                            <Bird size={48} color="#1565C0" />
                        </motion.div>
                    </>
                ) : (
                    <>
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-10 left-10"
                        >
                            <Moon size={60} color="#F0F0F0" />
                        </motion.div>
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={`star-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1, 0.5],
                                    transition: { repeat: Infinity, duration: 2 + Math.random() * 3, delay: i * 0.2 }
                                }}
                                className="absolute"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                            >
                                <Star size={8 + Math.random() * 8} color="#F0F0F0" fill="#F0F0F0" />
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Login Form */}
            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className={`p-10 rounded-3xl shadow-2xl ${isNightMode ? 'bg-purple-800 bg-opacity-30' : 'bg-white bg-opacity-30'} backdrop-blur-md`}
                style={{ width: '450px' }}
            >
                <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
                    <motion.h1
                        className={`text-5xl font-extrabold ${isNightMode ? 'text-yellow-300' : 'text-blue-800'}`}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        Zenara
                    </motion.h1>
                    <motion.button
                        onClick={toggleNightMode}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-full bg-opacity-50 backdrop-blur-md"
                    >
                        {isNightMode ? <Sun className="text-yellow-300" size={32} /> : <Moon className="text-blue-800" size={32} />}
                    </motion.button>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={itemVariants}>
                        <label htmlFor="username" className={`block mb-2 text-lg font-semibold ${isNightMode ? 'text-yellow-200' : 'text-blue-800'}`}>Username</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full p-4 rounded-lg text-lg ${isNightMode ? 'bg-purple-700 text-yellow-100' : 'bg-blue-100 text-blue-900'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <label htmlFor="password" className={`block mb-2 text-lg font-semibold ${isNightMode ? 'text-yellow-200' : 'text-blue-800'}`}>Password</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-4 rounded-lg text-lg ${isNightMode ? 'bg-purple-700 text-yellow-100' : 'bg-blue-100 text-blue-900'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </motion.div>
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59,130,246)" }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className={`w-full p-4 rounded-lg text-xl font-bold transition-colors duration-300 ${isNightMode ? 'bg-yellow-400 text-purple-900 hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Login
                    </motion.button>
                </form>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 text-center"
                >
                    <p className={`text-xl font-medium ${isNightMode ? 'text-yellow-200' : 'text-blue-800'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Protecting children with love and care</p>
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            times: [0, 0.2, 0.5, 0.8, 1]
                        }}
                        className="mt-4"
                    >
                        <Heart className={`inline-block ${isNightMode ? 'text-red-400' : 'text-red-500'}`} size={48} fill="currentColor" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ZenaraLogin;