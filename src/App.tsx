import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PracticeQuizPage } from './pages/PracticeQuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <div data-testid="app-root">
        <Routes>
          <Route path="/" element={<Navigate to="/quiz" replace />} />
          <Route path="/quiz" element={<PracticeQuizPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
