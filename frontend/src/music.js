import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Sun, Moon, Search, Music, Speaker, Repeat, Volume2, Star, Bluetooth, Headphones, Volume1, VolumeX, Lamp } from 'lucide-react';

const musicTracks = [
    { id: 1, title: 'Peaceful Piano', artist: 'John Doe', url: '/api/placeholder/audio1', duration: 180 },
    { id: 2, title: 'Gentle Guitar', artist: 'Jane Smith', url: '/api/placeholder/audio2', duration: 240 },
    { id: 3, title: 'Soothing Strings', artist: 'Bob Johnson', url: '/api/placeholder/audio3', duration: 200 },
    { id: 4, title: 'Calming Flute', artist: 'Alice Brown', url: '/api/placeholder/audio4', duration: 210 },
    { id: 5, title: 'Tranquil Harp', artist: 'Charlie Green', url: '/api/placeholder/audio5', duration: 190 }
];

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const AnimatedLeaf = () => {
    const leafCount = 50;

    const randomPosition = () => ({
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDuration: `${Math.random() * 15 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.7})`
    });

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {[...Array(leafCount)].map((_, i) => (
                <div key={i} className="absolute animate-float" style={randomPosition()}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 opacity-30">
                        <path d="M21 3V5C21 14 14 21 5 21H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 3H19C10 3 3 10 3 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            ))}
        </div>
    );
};

const CalmMusicPlayer = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(musicTracks[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [repeatMode, setRepeatMode] = useState(false);
    const [volume, setVolume] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [outputDevice, setOutputDevice] = useState('speaker');
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(new Audio(currentTrack.url));
    const [isLampHovered, setIsLampHovered] = useState(false);
    const lampColor = isLampHovered ? 'text-yellow-400' : 'text-white';

    useEffect(() => {
        audioRef.current.src = currentTrack.url;
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentTrack, isPlaying]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleLampHover = () => {
        if (darkMode) {
            setIsLampHovered(true);
        }
    };

    const handleLampLeave = () => {

    };

    const playNext = () => {
        const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % musicTracks.length;
        setCurrentTrack(musicTracks[nextIndex]);
    };

    const playPrevious = () => {
        const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id);
        const previousIndex = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
        setCurrentTrack(musicTracks[previousIndex]);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredTracks = useMemo(() => {
        return musicTracks.filter(track =>
            track.title.toLowerCase().includes(searchTerm) || track.artist.toLowerCase().includes(searchTerm)
        );
    }, [searchTerm]);

    const selectTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
        updateRecentlyPlayed(track);
    };

    const updateRecentlyPlayed = (track) => {
        setRecentlyPlayed(prev => {
            const newRecentlyPlayed = [track, ...prev.filter(t => t.id !== track.id)].slice(0, 5);
            return newRecentlyPlayed;
        });
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * currentTrack.duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const toggleRepeat = () => {
        setRepeatMode(!repeatMode);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(false);
    };

    const toggleFavorite = (track) => {
        setFavorites(prev => {
            if (prev.some(t => t.id === track.id)) {
                return prev.filter(t => t.id !== track.id);
            } else {
                return [...prev, track];
            }
        });
    };

    const isFavorite = (track) => favorites.some(t => t.id === track.id);

    const changeOutputDevice = (device) => {
        setOutputDevice(device);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        audioRef.current.muted = !isMuted;
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            setIsLampHovered(false);
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkMode
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white'
            : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900'}`}>

            {darkMode ? (
                <Lamp
                    className={`absolute top-4 left-4 z-10 ${lampColor}`}
                    size={40}
                    onMouseEnter={handleLampHover}
                    onMouseLeave={handleLampLeave}
                />
            ) : (
                <AnimatedLeaf />
            )}

            <div className="container mx-auto p-4 relative z-50">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-3xl font-bold ${darkMode ? lampColor : 'text-black'}`}>
                        Safety Songs
                    </h1>
                    <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'bg-purple-500 text-yellow-300' : 'bg-yellow-400 text-purple-900'} transition-colors duration-300`}>
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for music..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className={`w-full p-2 pl-10 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all duration-300 focus:ring-2 focus:ring-purple-500`}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
                        <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                                <Music size={32} className="text-gray-600"/>
                            </div>
                            <div>
                                <p className="font-semibold">{currentTrack.title}</p>
                                <p className="text-sm text-gray-500">{currentTrack.artist}</p>
                            </div>
                            <button onClick={() => toggleFavorite(currentTrack)} className="ml-auto">
                                <Star size={24} className={isFavorite(currentTrack) ? 'text-yellow-400 fill-current' : 'text-gray-400'}/>
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={(currentTime / currentTrack.duration) * 100 || 0}
                                onChange={handleSeek}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(currentTrack.duration)}</span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={playPrevious} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                                <SkipBack size={24}/>
                            </button>
                            <button onClick={togglePlayPause} className="p-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300">
                                {isPlaying ? <Pause size={24}/> : <Play size={24}/>}
                            </button>
                            <button onClick={playNext} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                                <SkipForward size={24}/>
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button onClick={toggleRepeat} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                                <Repeat size={24} className={repeatMode ? 'text-purple-600' : 'text-gray-600'}/>
                            </button>
                            <button onClick={toggleMute} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                                {isMuted ? <VolumeX size={24}/> : volume > 0.5 ? <Volume2 size={24}/> : <Volume1 size={24}/>}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume * 100}
                                onChange={handleVolumeChange}
                                className="w-32"
                            />
                            <div className="flex space-x-2">
                                <button onClick={() => changeOutputDevice('speaker')} className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ${outputDevice === 'speaker' ? 'text-purple-600' : ''}`}>
                                    <Speaker size={24}/>
                                </button>
                                <button onClick={() => changeOutputDevice('bluetooth')} className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ${outputDevice === 'bluetooth' ? 'text-purple-600' : ''}`}>
                                    <Bluetooth size={24}/>
                                </button>
                                <button onClick={() => changeOutputDevice('headphones')} className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ${outputDevice === 'headphones' ? 'text-purple-600' : ''}`}>
                                    <Headphones size={24}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
                        <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
                        <ul className="space-y-2 mb-6">
                            {recentlyPlayed.map(track => (
                                <li key={track.id} onClick={() => selectTrack(track)} className={`p-2 rounded cursor-pointer flex items-center justify-between ${currentTrack.id === track.id ? 'bg-purple-200 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors duration-300`}>
                                    <div>
                                        <p className="font-semibold">{track.title}</p>
                                        <p className="text-sm text-gray-500">{track.artist}</p>
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(track);
                                    }}>
                                        <Star size={20} className={isFavorite(track) ? 'text-yellow-400 fill-current' : 'text-gray-400'}/>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-xl font-semibold mb-4">Favorites</h2>
                        <ul className="space-y-2">
                            {favorites.map(track => (
                                <li key={track.id} onClick={() => selectTrack(track)} className={`p-2 rounded cursor-pointer flex items-center justify-between ${currentTrack.id === track.id ? 'bg-purple-200 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors duration-300`}>
                                    <div>
                                        <p className="font-semibold">{track.title}</p>
                                        <p className="text-sm text-gray-500">{track.artist}</p>
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(track);
                                    }}>
                                        <Star size={20} className={isFavorite(track) ? 'text-yellow-400 fill-current' : 'text-gray-400'}/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
                    <h2 className="text-xl font-semibold mb-4">All Tracks</h2>
                    <ul className="space-y-2">
                        {filteredTracks.map(track => (
                            <li key={track.id} onClick={() => selectTrack(track)} className={`p-2 rounded cursor-pointer flex items-center justify-between ${currentTrack.id === track.id ? 'bg-purple-200 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors duration-300`}>
                                <div>
                                    <p className="font-semibold">{track.title}</p>
                                    <p className="text-sm text-gray-500">{track.artist}</p>
                                </div>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(track);
                                }}>
                                    <Star size={20} className={isFavorite(track) ? 'text-yellow-400 fill-current' : 'text-gray-400'}/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CalmMusicPlayer;
