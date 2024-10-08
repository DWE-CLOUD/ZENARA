import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Search, CloudMoon, Squirrel, Tent } from 'lucide-react';

// Define the quizzes array with nine quizzes
const quizzes = [
    { id: 1, title: "Personal Safety Quiz" },
    { id: 2, title: "Safe Touches Quiz" },
    { id: 3, title: "Saying No Quiz" },
    { id: 4, title: "Trusted Adults Quiz" },
    { id: 5, title: "Online Safety Quiz" },
    { id: 6, title: "What to Do in Unsafe Situations Quiz" },
    { id: 7, title: "Understanding Boundaries Quiz" },
    { id: 8, title: "Reporting Abuse Quiz" },
    { id: 9, title: "Recognizing Danger Quiz" },
];

const QuizThumbnail = ({ quiz, onComplete, completed, darkMode }) => {
    return (
        <motion.div
            className={`relative transition-all duration-300 p-4 cursor-pointer
                ${completed ? 'bg-green-300' : 'bg-white'}
                rounded-xl shadow-md hover:shadow-lg z-10 w-full text-left`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete(quiz.id)}
        >
            <div className="flex justify-between items-center">
                <h3 className={`font-semibold text-md ${darkMode ? 'text-gray-900' : 'text-purple-800'}`}>
                    {quiz.title}
                </h3>
            </div>
        </motion.div>
    );
};

const SearchBar = ({ darkMode, onSearch }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchClick = () => {
        if (isExpanded && searchTerm) {
            onSearch(searchTerm);
        } else {
            setIsExpanded(!isExpanded);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            onSearch(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-row items-center">
            <AnimatePresence>
                {isExpanded && (
                    <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "200px", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        type="text"
                        placeholder="Search quizzes..."
                        className={`py-2 px-4 rounded-full outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                )}
            </AnimatePresence>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`ml-2 flex items-center justify-center w-10 h-10 rounded-full ${darkMode ? 'bg-purple-600' : 'bg-purple-500'}`}
                onClick={handleSearchClick}
                type="button"
            >
                <Search size={20} className="text-white" />
            </motion.button>
        </form>
    );
};

const FloatingSquirrels = ({ darkMode }) => {
    if (darkMode) return null;

    const positions = [
        { bottom: '5vh', right: '5vw' },
        { bottom: '15vh', right: '10vw' },
        { bottom: '5vh', right: '15vw' },
    ];

    return (
        <>
            {positions.map((pos, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        bottom: pos.bottom,
                        right: pos.right,
                        zIndex: 0,
                    }}
                    animate={{
                        y: ["0%", "-20%", "0%"],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3 + Math.random() * 2,
                        ease: "easeInOut",
                    }}
                >
                    <Squirrel size={60} className="text-brown-500" />
                </motion.div>
            ))}
        </>
    );
};

const FloatingSun = ({ darkMode }) => {
    if (darkMode) return null;

    return (
        <motion.div
            className="absolute"
            style={{
                top: "2vh",
                left: "2vw",
                zIndex: 0,
            }}
            animate={{
                y: ["0%", "-10%", "0%"],
            }}
            transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
            }}
        >
            <Sun size={120} className="text-yellow-400" />
        </motion.div>
    );
};

const FloatingMoonCloud = ({ darkMode }) => {
    if (!darkMode) return null;

    return (
        <motion.div
            className="absolute"
            style={{
                top: "2vh",
                left: "2vw",
                zIndex: 0,
            }}
            animate={{
                y: ["0%", "-10%", "0%"],
            }}
            transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
            }}
        >
            <CloudMoon size={120} className="text-gray-400" />
        </motion.div>
    );
};

const FloatingTent = ({ darkMode }) => {
    if (!darkMode) return null;

    return (
        <motion.div
            className="absolute"
            style={{
                bottom: "2vh",
                right: "2vw",
                zIndex: 0,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <Tent size={120} className="text-gray-300" />
        </motion.div>
    );
};

const ProgressBar = ({ progress, darkMode }) => {
    const progressPercentage = (progress / quizzes.length) * 100;

    return (
        <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
            <div
                className={`h-full rounded-full transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-purple-500'}`}
                style={{ width: `${progressPercentage}%` }}
            />
        </div>
    );
};

const QuizBoard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleCompleteQuiz = (id) => {
        if (!completedQuizzes.includes(id)) {
            setCompletedQuizzes([...completedQuizzes, id]);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = quizzes.filter(quiz =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuizzes(filtered);
    };

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white'
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900';
    const textClass = darkMode ? 'text-white' : 'text-purple-800';

    const progress = completedQuizzes.length;

    return (
        <div className={`min-h-screen ${bgClass} p-8 transition-colors duration-300 relative overflow-hidden`}>
            <FloatingSquirrels darkMode={darkMode} />
            <FloatingSun darkMode={darkMode} />
            <FloatingMoonCloud darkMode={darkMode} />
            <FloatingTent darkMode={darkMode} />

            {/* Top-right corner icons */}
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                <SearchBar
                    darkMode={darkMode}
                    onSearch={handleSearch}
                />
                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600"
                >
                    {darkMode ? <Moon size={24} strokeWidth={2.5} /> : <Sun size={24} strokeWidth={2.5} />}
                </button>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <motion.h1
                        className={`text-5xl font-extrabold tracking-wider ${textClass} text-center`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        QUIZ DASHBOARD
                    </motion.h1>
                </div>

                <div className="space-y-4">
                    {filteredQuizzes.map((quiz) => (
                        <QuizThumbnail
                            key={quiz.id}
                            quiz={quiz}
                            onComplete={handleCompleteQuiz}
                            completed={completedQuizzes.includes(quiz.id)}
                            darkMode={darkMode}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                    <ProgressBar progress={progress} darkMode={darkMode} />
                </div>
            </div>
        </div>
    );
};

export default QuizBoard;