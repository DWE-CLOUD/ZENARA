import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ZenaraLandingPage from './landing';
import Dash from './dash';
import Sec from './security';
import Login from './login';
import Quiz from  './quiz';
import Learning from  './learning';
import QuizBoard from './quizboard';
import Cam from './cma';
import Music from './music';
import Sos from './sos';
import ChildSafetyLearningBook from './books';
import Cma from "./cma";
import PC from './pc';
import Prof from './prof';

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<ZenaraLandingPage />} />
                <Route path="/dash" element={<Dash />} />
                <Route path="/sos" element={<Sos />} />
                <Route path="/sec" element={<Sec />} />
                <Route path="/login" element={<Login />} />
                <Route path="/prof" element={<Prof />} />
                <Route path="/pc" element={<PC />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/cam" element={<Cma />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/quizboard" element={<QuizBoard/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/books" element={<ChildSafetyLearningBook/>}/>



            </Routes>
        </Router>
    );
}

export default App;
