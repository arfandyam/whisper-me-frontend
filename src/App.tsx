import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../src/pages/HomePage';
import SignIn from '../src/pages/SignInPage';
import Questions from './pages/QuestionsPage';
import DetailQuestion from './pages/DetailQuestionPage';
import AddResponse from './pages/AddResponsePage';
import Navbar from '../src/layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Questions" element={<Questions />} />
          <Route path="/DetailQuestion" element={<DetailQuestion />} />
          <Route path="/AddResponse" element={<AddResponse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
