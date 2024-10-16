import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ZenaraLandingPage from './landing';
import Dash from './dash';
import Sec from './security';
import Login from './login';
import Quiz from  './quiz';
import Learning from  './learning';
import QuizBoard from './quizboard';
import Music from './music';

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<ZenaraLandingPage />} />
                <Route path="/dash" element={<Dash />} />
                <Route path="/sec" element={<Sec />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/quizboard" element={<QuizBoard/>}/>
                <Route path="/music" element={<Music/>}/>


            </Routes>
        </Router>
    );
}

export default App;
