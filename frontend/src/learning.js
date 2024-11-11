import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Sun, Moon, Search } from 'lucide-react';

const VideoThumbnail = ({ video, onWatch, darkMode }) => {
    return (
        <motion.div
            className="relative transition-all duration-300 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl"
            onClick={() => onWatch(video.video_url)}
            style={{ zIndex: 30 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-purple-600 bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                <Play className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300" size={48} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 rounded-b-xl">
                <h3 className={`text-purple-800 font-semibold text-sm`}>
                    {video.title}
                </h3>
            </div>
        </motion.div>
    );
};

const ChildSafetyLearningPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:8080/vid')
            .then((response) => response.json())
            .then((data) => {
                setVideos(data);
                setFilteredVideos(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleWatchVideo = (url) => {
        window.open(url, '_blank');
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = videos.filter(video =>
            video.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredVideos(filtered);
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white'
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900';
    const textClass = darkMode ? 'text-white' : 'text-purple-800';

    return (
        <div className={`min-h-screen ${bgClass} p-8 transition-colors duration-300 relative overflow-hidden`} style={{ zIndex: 0 }}>
            <div className="flex justify-between items-center mb-8" style={{ zIndex: 70 }}>
                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600"
                >
                    {darkMode ? <Sun size={24} strokeWidth={2.5} /> : <Moon size={24} strokeWidth={2.5} />}
                </button>
            </div>

            <motion.h1
                className={`text-3xl md:text-4xl font-bold ${textClass} mb-8 text-center`}
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
                <div className="relative flex flex-col items-center mb-4" style={{ zIndex: 70 }}>
                    <input
                        type="text"
                        placeholder="Search videos..."
                        className={`py-2 px-4 rounded-full outline-none w-full max-w-md ${
                            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                        }`}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-purple-600'}`}>
                        Showing {filteredVideos.length} of {videos.length} videos
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVideos.map((video) => (
                    <VideoThumbnail
                        key={video.video_url}
                        video={video}
                        onWatch={handleWatchVideo}
                        darkMode={darkMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChildSafetyLearningPage;
