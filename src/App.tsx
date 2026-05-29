import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PracticeQuizPage from './pages/PracticeQuizPage';

const Placeholder = ({ label }: { label: string }) => (
  <div className="p-8 text-center text-on-surface-variant">{label}</div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" replace />} />
        <Route path="/quiz" element={<PracticeQuizPage />} />
        <Route path="/lessons" element={<Placeholder label="Lessons" />} />
        <Route path="/flashcards" element={<Placeholder label="Flashcards" />} />
        <Route path="/progress" element={<Placeholder label="Progress" />} />
        <Route path="/library" element={<Placeholder label="Library" />} />
        <Route path="/terms" element={<Placeholder label="Terms of Service" />} />
        <Route path="/privacy" element={<Placeholder label="Privacy Policy" />} />
        <Route path="/contact" element={<Placeholder label="Contact Support" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;