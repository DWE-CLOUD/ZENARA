import React, { useState, useEffect } from 'react';
import { Sun, Moon, ClipboardPenLine, BadgeHelp, Flower } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Define the Button component
const Button = ({ children, onClick, variant = 'default', size = 'md', disabled = false }) => {
  const baseStyles = 'px-6 py-3 rounded-full font-bold transition-transform transform hover:scale-105';
  const variants = {
    default: 'bg-blue-400 text-white shadow-lg hover:bg-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-200',
  };
  const sizes = {
    md: 'text-base',
    icon: 'text-xl',
  };
  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button onClick={onClick} className={styles} disabled={disabled}>
      {children}
    </button>
  );
};

// Define the Card and its parts
const Card = ({ children, className }) => (
  <div className={`border shadow-2xl rounded-lg p-6 transition-transform transform hover:scale-105 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="border-b pb-4 mb-4">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h1 className="text-2xl font-bold text-center text-pink-600">
    {children}
  </h1>
);

const CardContent = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const CardFooter = ({ children }) => (
  <div className="border-t pt-4 mt-4">
    {children}
  </div>
);

// Define the RadioGroup and RadioGroupItem
const RadioGroup = ({ value, onValueChange, children }) => (
  <div className="space-y-2">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        onChange: (e) => onValueChange(e.target.value),
        checked: value === child.props.value,
      })
    )}
  </div>
);

const RadioGroupItem = ({ value, id, checked, onChange }) => (
  <input
    type="radio"
    id={id}
    name="quiz-option"
    value={value}
    checked={checked}
    onChange={onChange}
    className="mr-2"
  />
);

// Define the Label component
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`cursor-pointer text-lg ${className}`}>
    {children}
  </label>
);

// Quiz data
const quizData = [
  {
    question: "What color is the sky on a clear day?",
    options: ["Blue", "Green", "Red", "Yellow"],
    correctAnswer: "Blue"
  },
  {
    question: "Which animal says 'moo'?",
    options: ["Dog", "Cat", "Cow", "Sheep"],
    correctAnswer: "Cow"
  },
  {
    question: "How many legs does a spider have?",
    options: ["4", "6", "8", "10"],
    correctAnswer: "8"
  }
];

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
      <Sun size={90} className="text-yellow-400" />
    </motion.div>
  );
};

const FloatingMoon = ({ darkMode }) => {
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
      <Moon size={90} className="text-gray-400" />
    </motion.div>
  );
};

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    if (showResult) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const frames = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0a6c', '#ff7300', '#fffb00', '#47ff00'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0a6c', '#ff7300', '#fffb00', '#47ff00'],
        });
        if (Date.now() < animationEnd) requestAnimationFrame(frames);
      };
      frames();
    }
  }, [showResult]);

  useEffect(() => {
    if (!darkMode) {
      const newFlowers = [];
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const brightness = 0.8 + Math.random() * 0.2; // Increase the minimum brightness
        const style = {
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}rem`,
          height: `${size}rem`,
          color: `rgba(173, 216, 230, ${brightness})`, // Very light blue color
          animation: `blink ${Math.random() * 2 + 2}s ease-in-out infinite`,
        };
        newFlowers.push(<Flower key={i} className="flower" style={style} />);
      }
      setFlowers(newFlowers);
    } else {
      setFlowers([]);
    }
  }, [darkMode]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Clear selected answer and move to the next question
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(""); // Reset selected answer for the new question
    } else {
      setShowResult(true); // Show results if it's the last question
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const bgClass = darkMode

    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-200 shadow-lg'
    : 'bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 text-gray-900 shadow-2xl';

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const delay = Math.random() * 2;
      const style = {
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#fff',
        borderRadius: '50%',
        animation: `blink ${delay}s ease-in-out infinite`,
      };
      stars.push(<div key={i} className="star" style={style} />);
    }
    return stars;
  };

  const keyframes = `
    @keyframes blink {
      0%, 100% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }
    @keyframes floating {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes bounceIn {
      0% {
        transform: scale(0.5);
        opacity: 0;
      }
      50% {
        transform: scale(1.05);
        opacity: 1;
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${bgClass} relative`}>
      <style jsx>{`
        ${keyframes}
        .stars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .flowers-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .card-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .card-bounce-in {
          animation: bounceIn 0.5s ease-in-out;
        }
      `}</style>

      {darkMode && (
        <div className="stars-container">
          {renderStars()}
        </div>
      )}
      {!darkMode && (
        <div className="flowers-container">
          {flowers}
        </div>
      )}

      <FloatingSun darkMode={darkMode} />
      <FloatingMoon darkMode={darkMode} />

      <div className="absolute top-4 right-4">
        <BadgeHelp size={48} className={`text-white bg-blue-500 rounded-full p-2 shadow-lg ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`} />
      </div>
      <div className="absolute bottom-4 right-4 animate-pulse">
        <ClipboardPenLine className={`h-24 w-24 ${darkMode ? 'text-white' : 'text-black'}`} strokeWidth={1} />
      </div>

      <Card className={`w-full max-w-md bg-white ${showResult ? 'card-bounce-in' : 'card-fade-in'}`}>

        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-gray-900">Fun Quiz for Kids!</span>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-blue-500" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-black">{quizData[currentQuestion].question}</h2>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {quizData[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">

                    <RadioGroupItem
                      value={option}
                      id={`option-${index}`}
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}

                    />
                    <Label htmlFor={`option-${index}`} className="text-black">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>Quiz Completed!</h2>
              <p className={`text-xl ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>Your score: {score} out of {quizData.length}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">

          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>

            {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
          {showResult && (
            <Button onClick={resetQuiz}>Try Again</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizApp;
