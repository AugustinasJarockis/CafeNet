// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
