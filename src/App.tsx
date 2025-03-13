import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/HomePage';
import Questions from './pages/QuestionsPage';
import DetailQuestion from './pages/DetailQuestionPage';
import AddResponse from './pages/AddResponsePage';
import Navbar from '../src/layout/Navbar';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import RedirectShortenUrl from './pages/RedirectShortenUrl';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/questions" element={
            <PrivateRoute>
              <Questions />
            </PrivateRoute>
          } />
          <Route path="/question/:questionId" element={
            <PrivateRoute>
              <DetailQuestion />
            </PrivateRoute>
          } />
          <Route path="/q/:urlKey" element={
            <RedirectShortenUrl />
          } />
          <Route path="/question/:slug/response" element={
            <AddResponse />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
