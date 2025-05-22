import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AdminMenu from './pages/menu-admin';
import BaristaMenu from './pages/menu-barista';
import ClientMenu from './pages/menu-client';
import CreateEmployeePage from './pages/manage employees/create-employee';
import CreateLocationPage from './pages/manage locations/create-location';
import EmployeeListPage from './pages/manage employees/employee-list-page';
import LocationListPage from './pages/manage locations/location-list-page';
import CreateTaxPage from './pages/manage taxes/create-tax';
import CreateDiscountPage from './pages/manage discounts/create-discount';
import TaxListPage from './pages/manage taxes/tax-list';
import DiscountsPage from './pages/manage discounts/discount-list-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/menu-admin" element={<AdminMenu />} />
        <Route path="/menu-barista" element={<BaristaMenu />} />
        <Route path="/menu-client" element={<ClientMenu />} />
        <Route path="/locations/create" element={<CreateLocationPage />} />
        <Route path="/employees/create" element={<CreateEmployeePage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/locations" element={<LocationListPage />} />
        <Route path="/taxes/create" element={<CreateTaxPage />} />
        <Route path="/discounts/create" element={<CreateDiscountPage />} />
        <Route path="/taxes" element={<TaxListPage/>}/>
        <Route path="/discounts" element={<DiscountsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
