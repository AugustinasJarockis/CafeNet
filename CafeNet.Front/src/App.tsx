// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AdminMenu from './pages/menu-admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/menu-admin" element={<AdminMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
