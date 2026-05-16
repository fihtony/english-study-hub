import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LessonsPage } from './pages/LessonsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lessons" element={<LessonsPage />} />
      </Routes>
    </BrowserRouter>
  );
}