import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Cloud, Search, Library, Snowflake } from 'lucide-react';

const books = [
    { id: 1, title: "Your Body Belongs to You", author: "Cornelia Spelman", thumbnail: require('./images/book1.jpg'), level: "Beginner" },
    { id: 2, title: "No Means No!", author: "Janine Amos", thumbnail: require('./images/book2.jpg'), level: "Beginner" },
    { id: 3, title: "I Can Play It Safe", author: "Alison Feigh", thumbnail: require('./images/book3.jpg'), level: "Beginner" },
    { id: 4, title: "The Safe Side: Stranger Safety", author: "Julie Aigner-Clark", thumbnail: require('./images/book4.jpg'), level: "Intermediate" },
    { id: 5, title: "What If...?", author: "Anne Marie Pace", thumbnail: require('./images/book5.jpg'), level: "Intermediate" },
    { id: 6, title: "Staying Safe: A Handbook for Kids", author: "Tessa Smith", thumbnail: require('./images/book6.jpg'), level: "Intermediate" },
    { id: 7, title: "Cyber Safe: A Guide for Kids", author: "Marcia Menter", thumbnail: require('./images/book7.jpg'), level: "Advanced" },
    { id: 8, title: "What to Do When You Feel Scared", author: "Jacqueline B. Toner and Claire A. B. Freeland", thumbnail: require('./images/book8.jpg'), level: "Advanced" },
    { id: 9, title: "The Kid's Guide to Staying Safe Online", author: "Justine Fontes and Ron Fontes", thumbnail: require('./images/book9.jpg'), level: "Advanced" }
];

const FallingSnowflake = ({ darkMode, dimensions }) => {
    const startX = Math.random() * dimensions.width; // Start from a random x position
    const duration = 5 + Math.random() * 3; // Slower duration for falling snowflakes

    return (
        <motion.div
            className="absolute"
            style={{ x: startX, top: -50 }} // Start above the viewport
            animate={{
                x: [startX, -700], // Move to the left
                y: [0, dimensions.height + 50], // Fall to the bottom
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <Snowflake size={24} className={darkMode ? "text-white" : "text-gray-400"} />
        </motion.div>
    );
};

const FloatingCloud = ({ darkMode, index }) => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startX = -200 - (index * 200);
    const startY = Math.random() * dimensions.height;

    const endX = dimensions.width + 200 + (index * 200);
    const amplitude = 200;
    const duration = 120;

    return (
        <motion.div
            className="absolute"
            initial={{ x: startX, y: startY }}
            animate={{
                x: [startX, startX + amplitude, endX],
                y: [startY, startY + amplitude, startY]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            <Cloud
                size={48 + index * 16}
                className={darkMode ? "text-white opacity-30" : "text-gray-400 opacity-70"}
            />
        </motion.div>
    );
};

const BookThumbnail = ({ book, onRead, read, darkMode }) => (
    <motion.div
        className={`relative transition-all duration-300 ${read ? 'bg-green-300 rounded-xl' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
            y: ['0%', '5%', '0%'],
        }}
        transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    >
        <motion.div
            className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 
                ${darkMode ? 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]' : 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]'} 
                hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)]`}
            onClick={() => onRead(book.id)}
            style={{ width: '300px', height: '400px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 rounded-b-xl">
                <h3 className="text-purple-800 font-semibold text-sm text-center">{book.title}</h3>
                <p className="text-purple-600 text-xs mt-1 text-center">{book.author}</p>
                <p className="text-purple-600 text-xs mt-1 text-center">{book.level}</p>
            </div>
        </motion.div>
    </motion.div>
);

const Logo = ({ darkMode }) => (
    <div className="flex items-center">
        <Library size={64} className={darkMode ? "text-white" : "text-purple-800"} />
        <span className={`ml-4 text-2xl font-bold ${darkMode ? "text-white" : "text-purple-800"}`}>
            SafeReads
        </span>
    </div>
);

const ProgressBar = ({ progress, total, darkMode }) => {
    const percentage = (progress / total) * 100;

    return (
        <div className="w-full max-w-md mx-auto mt-6 relative">
            <div className={`h-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} overflow-hidden`}>
                <motion.div
                    className={`h-full rounded-lg ${darkMode ? 'bg-white' : 'bg-purple-600'}`}
                    style={{ width: `${percentage}%` }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    className="absolute"
                    style={{
                        left: `calc(${percentage}% - 12px)`,
                        transition: 'left 0.5s'
                    }}
                >
                    <Library size={24} className={`transform -translate-x-1/2 ${darkMode ? 'text-white' : 'text-purple-800'}`} />
                </motion.div>
            </div>
        </div>
    );
};

const ChildSafetyLearningBook = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [readBooks, setReadBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [searchTerm, setSearchTerm] = useState('');
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleReadBook = (id) => {
        if (!readBooks.includes(id)) setReadBooks([...readBooks, id]);
    };

    useEffect(() => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchTerm]);

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white'
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900';

    return (
        <div className={`min-h-screen ${bgClass} p-4 md:p-8 transition-colors duration-300 flex flex-col items-center justify-start relative overflow-hidden`}>
            {/* Snowflakes in dark mode */}
            {darkMode && (
                [...Array(20)].map((_, index) => (
                    <FallingSnowflake key={index} darkMode={darkMode} dimensions={dimensions} />
                ))
            )}

            {/* Floating clouds in light mode only */}
            {!darkMode && (
                [...Array(5)].map((_, index) => (
                    <FloatingCloud key={index} darkMode={darkMode} index={index} />
                ))
            )}

            <div className="flex justify-between items-center mb-8 w-full max-w-7xl">
                <Logo darkMode={darkMode} />
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search books..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-3 rounded-full bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600"
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {filteredBooks.map(book => (
                        <BookThumbnail
                            key={book.id}
                            book={book}
                            onRead={handleReadBook}
                            read={readBooks.includes(book.id)}
                            darkMode={darkMode}
                        />
                    ))}
                </div>

                <ProgressBar progress={readBooks.length} total={books.length} darkMode={darkMode} />
            </div>
        </div>
    );
};

export default ChildSafetyLearningBook;
