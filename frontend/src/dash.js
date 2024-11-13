import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Heart, Shield, Book, Star, Play, Brain, Music, Camera, Smile, Zap } from 'lucide-react';

const FeatureIcon = ({ icon, color, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
      <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={handleClick}
          className={`flex items-center justify-center rounded-full w-16 h-16 shadow-md cursor-pointer ${color}`}
      >
        {icon}
      </motion.div>
  );
};

const ActivityCard = ({ icon, title, description, isDarkMode, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link); // Redirects to the specified link
    }
  };

  return (
      <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`rounded-lg shadow-lg p-6 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} cursor-pointer`}
          onClick={handleClick} // Add the onClick handler
      >
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>{title}</h3>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
      </motion.div>
  );
};

const KidFriendlySafetyHomepage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
      <div className={`min-h-screen transition-colors duration-500 ${
          isDarkMode
              ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white'
              : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900'
      }`}>
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <motion.h1
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}
            >
              Zenara
            </motion.h1>
            <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={toggleDarkMode}
                className={`p-3 rounded-full ${isDarkMode ? 'bg-purple-500 text-yellow-300' : 'bg-yellow-400 text-purple-900'} transition-colors duration-300`}
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>Welcome to Your Safe Space!</h2>
              <p className="text-xl mb-6">Learn, play, and stay safe with us!</p>
              <button className={`${isDarkMode ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-600 hover:bg-purple-700'} text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300`}>
                Start Your Adventure!
              </button>
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-3 gap-4"
            >
              <FeatureIcon icon={<Heart />} color={isDarkMode ? "text-red-400" : "text-red-500"} />
              <FeatureIcon icon={<Shield />} color={isDarkMode ? "text-green-400" : "text-green-500"} link="/sec" />
              <FeatureIcon icon={<Book />} color={isDarkMode ? "text-blue-400" : "text-blue-500"} link="/books"/>
              <FeatureIcon icon={<Star />} color={isDarkMode ? "text-yellow-400" : "text-yellow-500"} />
              <FeatureIcon icon={<Play />} color={isDarkMode ? "text-indigo-400" : "text-indigo-500"} link="/learning" />
              <FeatureIcon icon={<Brain />} color={isDarkMode ? "text-pink-400" : "text-pink-500"} link="/QuizBoard" />
            </motion.div>
          </div>

          <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`mt-12 rounded-lg shadow-lg p-6 ${
                  isDarkMode
                      ? 'bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900'
                      : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
              } text-white`}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Zap className="mr-2" /> Daily Safety Tip
            </h3>
            <p className="text-lg">Remember to always tell a trusted adult if something makes you feel uncomfortable or scared.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActivityCard
                icon={<Music className={`w-12 h-12 ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`} />}
                title="Safety Songs"
                description="Learn safety rules through fun and catchy tunes!"
                isDarkMode={isDarkMode}
                link="/music" // Pass the link prop here
            />
            <ActivityCard
                icon={<Shield className={`w-12 h-12 ${isDarkMode ? 'text-green-300' : 'text-green-500'}`} />}
                title="Send SOS"
                description="Feeling Unsafe ! Send the SOS to Parent"
                isDarkMode={isDarkMode}
                link='/sos'
            />
            <ActivityCard
                icon={<Smile className={`w-12 h-12 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />}
                title="Emotion Explorer"
                description="Understand and express your feelings in a healthy way!"
                isDarkMode={isDarkMode}
                link="/cam"
            />
          </div>

          <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`mt-12 rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h3 className={`text-2xl font-semibold mb-4 text-center ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>Parents' Corner</h3>
            <p className="mb-4 text-center">Access resources and tips to help keep your children safe in the digital world.</p>
            <div className="flex justify-center">
              <button
                  onClick={() => navigate('/pc')}
                  className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded-full text-lg transition duration-300`}
              >
                Parent Resources
              </button>
            </div>
          </motion.div>

          <footer className="mt-12 text-center text-sm">
            <p>© 2024 Zenara. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className={`${isDarkMode ? 'text-purple-300' : 'text-purple-500'} hover:underline`}>Privacy Policy</a> |
              <a href="#" className={`${isDarkMode ? 'text-purple-300' : 'text-purple-500'} hover:underline ml-2`}>Terms of Service</a>
            </p>
          </footer>
        </div>
      </div>
  );
};

export default KidFriendlySafetyHomepage;
