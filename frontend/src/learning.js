import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sun, Moon, Cloud, Star, Search } from 'lucide-react';

const videos = [
    { id: 1, title: "Understanding Personal Space", thumbnail: "/api/placeholder/640/360", level: "Beginner" },
    { id: 2, title: "Safe and Unsafe Touches", thumbnail: "/api/placeholder/640/360", level: "Beginner" },
    { id: 7, title: "Recognizing Safe and Unsafe Situations", thumbnail: "/api/placeholder/640/360", level: "Beginner" },
    { id: 3, title: "How to Say No", thumbnail: "/api/placeholder/640/360", level: "Intermediate" },
    { id: 4, title: "Trusted Adults", thumbnail: "/api/placeholder/640/360", level: "Intermediate" },
    { id: 8, title: "Handling Peer Pressure", thumbnail: "/api/placeholder/640/360", level: "Intermediate" },
    { id: 5, title: "Staying Safe Online", thumbnail: "/api/placeholder/640/360", level: "Advanced" },
    { id: 6, title: "What to Do If You Feel Unsafe", thumbnail: "/api/placeholder/640/360", level: "Advanced" },
    { id: 9, title: "Understanding Privacy Settings", thumbnail: "/api/placeholder/640/360", level: "Advanced" },
];

const VideoThumbnail = ({ video, onWatch, watched, darkMode }) => {
    return (
        <motion.div
            className={`relative transition-all duration-300 ${watched ? 'bg-green-300 rounded-xl' : ''}`} // Changed to light green
            style={{ zIndex: 30 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className={`relative group cursor-pointer rounded-xl overflow-hidden transform transition-all duration-300 
                    ${darkMode
                    ? 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
                    : 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]'} 
                    hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)]`}
                onClick={() => onWatch(video.id)}
                style={{ width: '100%', height: '280px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-xl" />
                <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                    <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 rounded-b-xl">
                    <h3 className={`text-purple-800 font-semibold text-sm video-title-${video.id}`}>
                        {video.title}
                    </h3>
                    <p className="text-purple-600 text-xs mt-1">{video.level}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const FriendlyCircularProgress = ({ completed, total, darkMode }) => {
    const radius = 15;
    const circumference = 2 * Math.PI * radius;
    const fillPercentage = (completed / total) * 100;
    const dashOffset = circumference - (fillPercentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center" style={{ zIndex: 60 }}>
            <div className="relative">
                <svg className="w-24 h-24" viewBox="0 0 40 40">
                    <circle
                        className="transition-all duration-500 ease-in-out"
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke={completed === total ? "#10B981" : "#3B82F6"}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                    />
                    <text x="20" y="20" textAnchor="middle" dy=".3em" fontSize="8" fill={darkMode ? "#FFFFFF" : "#333333"} fontWeight="bold">
                        {`${completed}/${total}`}
                    </text>
                </svg>
            </div>
        </div>
    );
};

const AnimatedCloud = ({ darkMode, size, top, left, right, animationDuration }) => {
    return !darkMode ? (
        <motion.div
            className="absolute"
            style={{ top, left, right, zIndex: 10 }}
            animate={{
                y: [0, 20, 0],
                opacity: [0.6, 1, 0.6],
            }}
            transition={{
                repeat: Infinity,
                duration: animationDuration,
                ease: "easeInOut",
            }}
        >
            <Cloud size={size} className="text-blue-200" />
        </motion.div>
    ) : null;
};

const BackgroundElements = ({ darkMode }) => {
    return (
        <>
            <AnimatedCloud darkMode={darkMode} size={60} top="20px" left="10%" animationDuration={5} />
            <AnimatedCloud darkMode={darkMode} size={80} top="60%" right="5%" animationDuration={7} />
            <AnimatedCloud darkMode={darkMode} size={50} top="40%" left="20%" animationDuration={6} />
            <AnimatedCloud darkMode={darkMode} size={70} top="10%" right="15%" animationDuration={8} />
            {darkMode && Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{ zIndex: 10, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3 + Math.random() * 2,
                        ease: "easeInOut",
                    }}
                >
                    <Star size={30} className="text-yellow-400" />
                </motion.div>
            ))}
        </>
    );
};

const SearchBar = ({ darkMode, onSearch, filteredCount, totalCount }) => {
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
        <form onSubmit={handleSubmit} className="relative flex flex-col items-center" style={{ zIndex: 70 }}>
            <AnimatePresence>
                {isExpanded && (
                    <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "200px", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        type="text"
                        placeholder="Search videos..."
                        className={`py-2 px-4 rounded-full outline-none ${
                            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                        }`}
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                )}
            </AnimatePresence>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`mt-2 flex items-center justify-center w-10 h-10 rounded-full ${
                    darkMode ? 'bg-purple-600' : 'bg-purple-500'
                }`}
                onClick={handleSearchClick}
                type="button"
            >
                <Search size={20} className="text-white" />
            </motion.button>
            {isExpanded && (
                <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-purple-600'}`}>
                    Showing {filteredCount} of {totalCount} videos
                </p>
            )}
        </form>
    );
};

const ChildSafetyLearningPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [watchedVideos, setWatchedVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState(videos);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleWatchVideo = (id) => {
        if (!watchedVideos.includes(id)) {
            setWatchedVideos([...watchedVideos, id]);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = videos.filter(video =>
            video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.level.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVideos(filtered);
    };

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white'
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900';
    const textClass = darkMode ? 'text-white' : 'text-purple-800';

    return (
        <div className={`min-h-screen ${bgClass} p-8 transition-colors duration-300 relative overflow-hidden`} style={{ zIndex: 0 }}>
            <BackgroundElements darkMode={darkMode} />

            <div className="flex justify-between items-center mb-8" style={{ zIndex: 70 }}>
                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600"
                >
                    {darkMode ? <Sun size={24} strokeWidth={2.5} /> : <Moon size={24} strokeWidth={2.5} />}
                </button>
                <FriendlyCircularProgress completed={watchedVideos.length} total={videos.length} darkMode={darkMode} />
            </div>

            <div className="max-w-6xl mx-auto relative" style={{ zIndex: 20 }}>
                <motion.h1
                    className={`text-4xl font-bold ${textClass} mb-8 text-center`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Stay Safe, Stay Strong!
                </motion.h1>

                <div className="mb-8 text-center relative" style={{ zIndex: 30 }}>
                    <motion.h2
                        className={`text-lg ${darkMode ? 'text-white' : 'text-purple-800'} mb-2`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome to your safety learning adventure!
                    </motion.h2>
                    <motion.p
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-purple-600'} mb-4`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Choose a level and click on a video to learn important skills.
                    </motion.p>
                    <SearchBar
                        darkMode={darkMode}
                        onSearch={handleSearch}
                        filteredCount={filteredVideos.length}
                        totalCount={videos.length}
                    />
                </div>

                {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
                    const levelVideos = filteredVideos.filter(video => video.level === level);
                    if (levelVideos.length === 0) return null;

                    return (
                        <div key={level} className="mb-8">
                            <h2 className={`text-lg ${textClass} mb-4 text-center`}>{level} Videos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {levelVideos.map(video => (
                                    <VideoThumbnail
                                        key={video.id}
                                        video={video}
                                        onWatch={handleWatchVideo}
                                        watched={watchedVideos.includes(video.id)}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChildSafetyLearningPage;
