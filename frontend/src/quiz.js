import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// Define the Button component inline
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
    <button onClick={onClick} className={styles} disabled={disabled} style={{ zIndex: 100 }}>
      {children}
    </button>
  );
};

// Define the Card and its parts inline
const Card = ({ children, className }) => (
  <div className={`border shadow-2xl rounded-lg p-6 transition-transform transform hover:scale-105 ${className}`} style={{ zIndex: 10 }}>
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

// Define the RadioGroup and RadioGroupItem inline
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

// Define the Label inline
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`cursor-pointer text-lg ${className}`}>
    {children}
  </label>
);

// Quiz data with questions and options
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

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
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
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-900'
    : 'bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 text-gray-900';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass}`} style={{ zIndex: 1 }}>
      <Card className={`w-full max-w-md bg-white ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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
              <h2 className="text-xl font-bold mb-4 text-black">{quizData[currentQuestion].question}</h2> {/* Question text in black */}
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {quizData[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-black">{option}</Label> {/* Option text in black */}
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
          {!showResult ? (
            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
              {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          ) : (
            <Button onClick={resetQuiz}>Try Again</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizApp;