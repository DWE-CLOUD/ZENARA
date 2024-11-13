import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Search, CloudMoon, Squirrel, Tent } from 'lucide-react';

const quizzes = [
    {
        id: 1,
        title: "Personal Safety Quiz",
        questions: [
            {
                question: "What should you do if someone makes you feel uncomfortable?",
                options: ["Ignore them", "Tell a trusted adult", "Keep it a secret", "Confront them alone"],
                correctAnswer: "Tell a trusted adult"
            },
            {
                question: "Is it okay to say 'No' to an adult if they ask you to do something unsafe?",
                options: ["Yes", "No", "Only if you know them well", "Depends on the situation"],
                correctAnswer: "Yes"
            },
            {
                question: "Who should you tell if you feel unsafe or uncomfortable with someone?",
                options: ["A trusted adult", "A stranger", "No one", "Only friends"],
                correctAnswer: "A trusted adult"
            }
        ],
        score: 0
    },
    {
        id: 2,
        title: "Safe Touches Quiz",
        questions: [
            {
                question: "What is a safe touch?",
                options: ["Any touch", "A touch that feels comfortable", "A touch from a stranger", "None of the above"],
                correctAnswer: "A touch that feels comfortable"
            },
            {
                question: "Can you tell someone 'No' if you don’t want to be hugged or touched?",
                options: ["Yes", "No", "Depends on who they are", "Only if you're uncomfortable"],
                correctAnswer: "Yes"
            },
            {
                question: "Who are some people you trust to tell if you feel uncomfortable with a touch?",
                options: ["A friend", "A stranger", "A trusted adult", "No one"],
                correctAnswer: "A trusted adult"
            }
        ],
        score: 0
    },
    {
        id: 3,
        title: "Saying No Quiz",
        questions: [
            {
                question: "When is it important to say 'No'?",
                options: ["When you feel uncomfortable", "Only if it’s an emergency", "When it’s a stranger", "When it’s a close friend"],
                correctAnswer: "When you feel uncomfortable"
            },
            {
                question: "Is it okay to say 'No' even to a friend or family member?",
                options: ["Yes", "No", "Only if they ask something uncomfortable", "Depends on the situation"],
                correctAnswer: "Yes"
            },
            {
                question: "Who can help you if someone doesn’t respect your 'No'?",
                options: ["A trusted adult", "A stranger", "A sibling", "A close friend"],
                correctAnswer: "A trusted adult"
            }
        ],
        score: 0
    },
    {
        id: 4,
        title: "Trusted Adults Quiz",
        questions: [
            {
                question: "Who are some examples of trusted adults?",
                options: ["A teacher", "A police officer", "A parent", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "Why is it important to talk to a trusted adult when you feel uncomfortable?",
                options: ["They can guide you", "It’s important to share", "They can protect you", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "How can you tell a trusted adult about your feelings safely?",
                options: ["Write a note", "Call them", "Speak to them directly", "All of the above"],
                correctAnswer: "All of the above"
            }
        ],
        score: 0
    },
    {
        id: 5,
        title: "Online Safety Quiz",
        questions: [
            {
                question: "Why should you avoid sharing personal information online?",
                options: ["To protect privacy", "It’s fun to share", "It’s not dangerous", "Everyone does it"],
                correctAnswer: "To protect privacy"
            },
            {
                question: "What should you do if a stranger contacts you online?",
                options: ["Respond to them", "Ignore and block them", "Tell a friend", "Share your details"],
                correctAnswer: "Ignore and block them"
            },
            {
                question: "Is it okay to meet someone in person that you've only talked to online?",
                options: ["Yes", "No", "Only if they seem nice", "Depends on their age"],
                correctAnswer: "No"
            }
        ],
        score: 0
    },
    {
        id: 6,
        title: "What to Do in Unsafe Situations Quiz",
        questions: [
            {
                question: "What are some steps you can take if you feel unsafe?",
                options: ["Find a trusted adult", "Call for help", "Leave the area", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "Who should you reach out to in an unsafe situation?",
                options: ["A friend", "A trusted adult", "A stranger", "No one"],
                correctAnswer: "A trusted adult"
            },
            {
                question: "Is it okay to run away if someone makes you feel threatened?",
                options: ["Yes", "No", "Only if you're sure", "Depends on the person"],
                correctAnswer: "Yes"
            }
        ],
        score: 0
    },
    {
        id: 7,
        title: "Understanding Boundaries Quiz",
        questions: [
            {
                question: "What does it mean to have personal boundaries?",
                options: ["Respecting others", "Knowing your limits", "Letting others know what’s okay", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "Why is it important to respect other people's boundaries?",
                options: ["It shows respect", "It builds trust", "It avoids discomfort", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "What should you do if someone crosses your boundaries?",
                options: ["Ignore it", "Tell them to stop", "Report to a trusted adult", "Both B and C"],
                correctAnswer: "Both B and C"
            }
        ],
        score: 0
    },
    {
        id: 8,
        title: "Reporting Abuse Quiz",
        questions: [
            {
                question: "Who should you report to if someone harms or threatens you?",
                options: ["A trusted adult", "A friend", "No one", "A stranger"],
                correctAnswer: "A trusted adult"
            },
            {
                question: "Is it your fault if someone abuses or mistreats you?",
                options: ["Yes", "No", "Depends on the situation", "Only if it happens multiple times"],
                correctAnswer: "No"
            },
            {
                question: "Why is it important to report abuse to a trusted adult?",
                options: ["For protection", "To stop the abuse", "To get support", "All of the above"],
                correctAnswer: "All of the above"
            }
        ],
        score: 0
    },
    {
        id: 9,
        title: "Recognizing Danger Quiz",
        questions: [
            {
                question: "What are some signs that a situation might be dangerous?",
                options: ["Uncomfortable feelings", "Suspicious behavior", "Threats", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "Who can you go to if you feel something is not safe?",
                options: ["A friend", "A trusted adult", "A stranger", "No one"],
                correctAnswer: "A trusted adult"
            },
            {
                question: "Why is it okay to leave a situation if you feel unsafe?",
                options: ["To protect yourself", "It's respectful", "It builds confidence", "It’s not important"],
                correctAnswer: "To protect yourself"
            }
        ],
        score: 0
    },
    {
        id: 10,
        title: "Identifying Safe Spaces Quiz",
        questions: [
            {
                question: "Where is a safe place to go if you’re lost?",
                options: ["A police station", "A crowded area", "A friend’s home", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "Who can you ask for help if you’re feeling unsafe in public?",
                options: ["A trusted adult", "A police officer", "A shopkeeper", "All of the above"],
                correctAnswer: "All of the above"
            },
            {
                question: "What should you do if you're in an unfamiliar place?",
                options: ["Stay alert", "Find exits", "Avoid strangers", "All of the above"],
                correctAnswer: "All of the above"
            }
        ],
        score: 0
    }
];



const Modal = ({ quiz, onClose, darkMode }) => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    const handleOptionChange = (questionIndex, selectedOption) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: selectedOption
        }));
    };

    const calculateScore = () => {
        let newScore = 0;
        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                newScore += 1;
            }
        });
        setScore(newScore);
    };

    return (
        <AnimatePresence>
            {quiz && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`p-6 rounded-lg shadow-lg w-80 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">{quiz.title}</h2>
                        <div className="space-y-4">
                            {quiz.questions.map((q, i) => (
                                <div key={i} className="mb-4">
                                    <p className="font-medium">{q.question}</p>
                                    {q.options.map((option, index) => (
                                        <label key={index} className="block mt-1">
                                            <input
                                                type="radio"
                                                name={`question-${i}`}
                                                value={option}
                                                checked={answers[i] === option}
                                                onChange={() => handleOptionChange(i, option)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={calculateScore}
                            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
                        >
                            Submit Quiz
                        </button>
                        <p className="mt-4">Score: {score} / {quiz.questions.length}</p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

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
    const [selectedQuiz, setSelectedQuiz] = useState(null); // For lightbox modal

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleCompleteQuiz = (id) => {
        if (!completedQuizzes.includes(id)) {
            setCompletedQuizzes([...completedQuizzes, id]);
        }
        const quiz = quizzes.find(q => q.id === id);
        setSelectedQuiz(quiz); // Open lightbox
    };

    const handleCloseModal = () => setSelectedQuiz(null); // Close lightbox

    const handleSearch = (searchTerm) => {
        const filtered = quizzes.filter(quiz =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuizzes(filtered);
    };

    const progress = completedQuizzes.length;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-indigo-900 text-white' : 'bg-gradient-to-br from-blue-100 to-pink-100 text-gray-900'} p-8 transition-colors duration-300 relative overflow-hidden`}>
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                <SearchBar darkMode={darkMode} onSearch={handleSearch} />
                <button onClick={toggleDarkMode} className="p-3 rounded-full bg-purple-500 text-white">
                    {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                </button>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <motion.h1 className="text-5xl font-extrabold tracking-wider text-center" animate={{ opacity: 1 }}>
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

                <div className="mt-8">
                    <ProgressBar progress={progress} darkMode={darkMode} />
                </div>
            </div>

            <Modal quiz={selectedQuiz} onClose={handleCloseModal} darkMode={darkMode} />
        </div>
    );
};

export default QuizBoard;