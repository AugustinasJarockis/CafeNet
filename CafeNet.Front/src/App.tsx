import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AdminMenu from './pages/menu-admin';
import CreateEmployeePage from './pages/manage employees/create-employee'
import CreateLocationPage from './pages/manage locations/create-location';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/menu-admin" element={<AdminMenu />} />
        <Route path="/locations/create" element={<CreateLocationPage />} />
        <Route path="/employees/create" element={<CreateEmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
