import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Sun, Moon, Search, Music, Speaker, Repeat, Volume2, Star, Bluetooth, Headphones, Volume1, VolumeX } from 'lucide-react';

const getMusicFiles = () => {
    try {
        const context = require.context('./music', false, /\.(mp3|wav)$/);
        return context.keys().map((key, index) => {
            const fileName = key.replace(/^\.\//, '');
            const title = fileName.replace(/\.(mp3|wav)$/, '');
            return {
                id: index + 1,
                title: title.replace(/-/g, ' '),
                artist: 'Local Track',
                url: `/music/${fileName}`,
                duration: 0
            };
        });
    } catch (error) {
        console.error("Error loading music files:", error);
        return [];
    }
};

const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
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
    const [currentTrack, setCurrentTrack] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [repeatMode, setRepeatMode] = useState(false);
    const [volume, setVolume] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [outputDevice, setOutputDevice] = useState('speaker');
    const [isMuted, setIsMuted] = useState(false);
    const [musicTracks, setMusicTracks] = useState([]);

    const audioRef = useRef(new Audio());

    useEffect(() => {
        const tracks = getMusicFiles();
        setMusicTracks(tracks);
        if (tracks.length > 0) {
            setCurrentTrack(tracks[0]);
        }
    }, []);

    useEffect(() => {
        if (!currentTrack) return;

        const audio = audioRef.current;
        audio.src = currentTrack.url;
        audio.volume = volume;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleEnded = () => {
            if (repeatMode) {
                audio.currentTime = 0;
                audio.play();
            } else {
                handleNext();
            }
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        if (isPlaying) {
            audio.play().catch(error => {
                console.error("Playback failed:", error);
                setIsPlaying(false);
            });
        }

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack, isPlaying, volume, repeatMode]);

    const handlePlayPause = () => {
        if (!currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % musicTracks.length;
        setCurrentTrack(musicTracks[nextIndex]);
        setIsPlaying(true);
        updateRecentlyPlayed(musicTracks[nextIndex]);
    };

    const handlePrevious = () => {
        const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
        setCurrentTrack(musicTracks[prevIndex]);
        setIsPlaying(true);
        updateRecentlyPlayed(musicTracks[prevIndex]);
    };

    const handleTimeSeek = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(false);
    };

    const toggleFavorite = (track) => {
        setFavorites(prev =>
            prev.some(t => t.id === track.id)
                ? prev.filter(t => t.id !== track.id)
                : [...prev, track]
        );
    };

    const updateRecentlyPlayed = (track) => {
        setRecentlyPlayed(prev => {
            const filtered = prev.filter(t => t.id !== track.id);
            return [track, ...filtered].slice(0, 5);
        });
    };

    const filteredTracks = useMemo(() => {
        return musicTracks.filter(track =>
            track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            track.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [musicTracks, searchTerm]);

    const isFavorite = (track) => favorites.some(t => t.id === track.id);

    return (
        <div className={`min-h-screen ${darkMode ?
            'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white' :
            'bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100'}`}>
            <AnimatedLeaf />
            <div className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Music Player</h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <Sun /> : <Moon />}
                    </button>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tracks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 rounded-full bg-white dark:bg-gray-800"
                        />
                        <Search className="absolute right-4 top-4 text-gray-400" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Music size={40} className="text-gray-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{currentTrack?.title || 'No track selected'}</h2>
                            <p className="text-gray-500">{currentTrack?.artist}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleTimeSeek}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center space-x-6">
                        <button
                            onClick={handlePrevious}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <SkipBack />
                        </button>
                        <button
                            onClick={handlePlayPause}
                            className="p-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <SkipForward />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4 mt-6">
                        <Volume2 size={20} />
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Library</h2>
                    <div className="space-y-2">
                        {filteredTracks.map((track) => (
                            <div
                                key={track.id}
                                onClick={() => {
                                    setCurrentTrack(track);
                                    setIsPlaying(true);
                                    updateRecentlyPlayed(track);
                                }}
                                className={`p-4 rounded-lg cursor-pointer flex items-center space-x-4
                  ${currentTrack?.id === track.id ?
                                    'bg-purple-100 dark:bg-purple-900' :
                                    'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                    <Music size={24} className="text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{track.title}</p>
                                    <p className="text-sm text-gray-500">{track.artist}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(track);
                                    }}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                                >
                                    <Star
                                        className={isFavorite(track) ?
                                            'fill-yellow-400 text-yellow-400' :
                                            'text-gray-400'}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalmMusicPlayer;