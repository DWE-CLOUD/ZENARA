import React, { useState } from 'react';
import {useNavigate,Link} from "react-router-dom";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('badges');
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "Varsha Gupta",
        age: "19",
        status: "Stay safe, stay happy! 🌟",
        interests: ["Reading 📚", "Art 🎨", "Music 🎵", "Games 🎮", "Science 🔬"],
        favoriteColor: "Purple",
        safetyBadges: [
            { name: "Internet Safety Pro", icon: "🛡️", level: 5 },
            { name: "Kind Friend", icon: "🤝", level: 4 },
            { name: "Digital Explorer", icon: "🚀", level: 3 },
            { name: "Helper", icon: "💝", level: 5 }
        ],
        achievements: [
            { name: "30 Days Safe Browsing", icon: "🏆", date: "2024" },
            { name: "Safety Quiz Master", icon: "📝", date: "2024" },
            { name: "Friendship Champion", icon: "🌟", date: "2024" }
        ]
    });

    const [isHovering, setIsHovering] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 transition-all duration-500">
            {}
            <div className="fixed top-6 right-6 flex gap-3">
                <button
                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    onClick={() => {}}
                >
                    <span className="text-xl">🌙</span>
                </button>
                <button
                    onClick={()=>navigate('/sos')}
                    className="w-12 h-12 rounded-full bg-red-400/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <span className="text-xl">🆘</span>
                </button>
            </div>

            {/* Main Profile Section */}
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                                <div
                                    className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <span className="text-5xl group-hover:scale-110 transition-transform">👤</span>
                                </div>
                            </div>
                            {isEditing && (
                                <button
                                    className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors">
                                    📷
                                </button>
                            )}
                        </div>

                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    className="text-3xl font-bold bg-transparent border-b-2 border-purple-300 focus:border-purple-500 focus:outline-none w-full mb-2"
                                />
                            ) : (
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
                            )}
                            <div className="flex items-center gap-4 text-gray-600">
                                <span className="bg-purple-100 px-3 py-1 rounded-full text-sm">Age: {profile.age}</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profile.status}
                                        onChange={(e) => setProfile({...profile, status: e.target.value})}
                                        className="flex-1 bg-transparent border-b border-purple-300 focus:border-purple-500 focus:outline-none"
                                    />
                                ) : (
                                    <p className="italic">{profile.status}</p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-md"
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-6">
                    {['badges', 'stats', 'interests'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                                activeTab === tab
                                    ? 'bg-white shadow-md text-purple-600'
                                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="grid gap-6">
                    {/* Badges Section */}
                    {activeTab === 'badges' && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-purple-600 mb-6">Safety Badges</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {profile.safetyBadges.map((badge, index) => (
                                    <div
                                        key={index}
                                        className="relative group"
                                        onMouseEnter={() => setIsHovering(index)}
                                        onMouseLeave={() => setIsHovering(null)}
                                    >
                                        <div
                                            className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 text-center transform group-hover:scale-105 transition-all">
                                            <div
                                                className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                                <span className="text-3xl">{badge.icon}</span>
                                            </div>
                                            <h3 className="font-medium text-purple-600">{badge.name}</h3>
                                            <div className="mt-2 flex justify-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}
                                                          className={`text-sm ${i < badge.level ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                        {isHovering === index && (
                                            <div
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-xl shadow-lg z-10 w-48">
                                                <p className="text-sm text-gray-600">Level {badge.level}/5</p>
                                                <div className="h-2 bg-gray-200 rounded-full mt-2">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                                        style={{width: `${(badge.level / 5) * 100}%`}}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stats Section */}
                    {activeTab === 'stats' && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-purple-600 mb-6">Safety Statistics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl">🎯</span>
                                        <span className="text-2xl font-bold text-purple-600">98%</span>
                                    </div>
                                    <h3 className="font-medium text-gray-700">Safety Score</h3>
                                    <div className="mt-2 h-2 bg-white rounded-full">
                                        <div
                                            className="h-full w-[98%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"/>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl">📚</span>
                                        <span className="text-2xl font-bold text-purple-600">24</span>
                                    </div>
                                    <h3 className="font-medium text-gray-700">Lessons Completed</h3>
                                    <div className="mt-2 h-2 bg-white rounded-full">
                                        <div
                                            className="h-full w-[80%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"/>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl">🤝</span>
                                        <span className="text-2xl font-bold text-purple-600">15</span>
                                    </div>
                                    <h3 className="font-medium text-gray-700">Safe Friends</h3>
                                    <div className="mt-2 h-2 bg-white rounded-full">
                                        <div
                                            className="h-full w-[75%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"/>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-purple-600 mb-4">Recent Achievements</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {profile.achievements.map((achievement, index) => (
                                        <div key={index}
                                             className="bg-white rounded-xl p-4 flex items-center gap-4 transform hover:scale-105 transition-all">
                                            <span className="text-2xl">{achievement.icon}</span>
                                            <div>
                                                <h4 className="font-medium text-gray-800">{achievement.name}</h4>
                                                <p className="text-sm text-gray-600">{achievement.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Interests Section */}
                    {activeTab === 'interests' && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-purple-600 mb-6">My Interests</h2>
                            <div className="flex flex-wrap gap-3">
                                {profile.interests.map((interest, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full text-purple-600 font-medium transform hover:scale-105 transition-all cursor-pointer hover:shadow-md"
                                    >
                                        {interest}
                                    </div>
                                ))}
                                {isEditing && (
                                    <button
                                        className="px-6 py-3 rounded-full border-2 border-dashed border-purple-300 text-purple-400 hover:border-purple-500 hover:text-purple-600 transition-colors">
                                        + Add Interest
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                    {[
                        {icon: "🎵", label: "Safety Songs", color: "from-purple-400 to-pink-400", link: "/music"},
                        {icon: "🎮", label: "Learning Video", color: "from-blue-400 to-purple-400", link: "/learning"},
                        {icon: "😊", label: "Emotion Explorer", color: "from-pink-400 to-orange-400", link: "/cam"}
                    ].map((action, index) => (
                        <Link to={action.link} key={index}
                              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all group">
                            <div
                                className={`w-16 h-16 mx-auto bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center mb-4`}>
                                <span
                                    className="text-3xl group-hover:scale-110 transition-transform">{action.icon}</span>
                            </div>
                            <span className="block text-center text-purple-600 font-medium">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;