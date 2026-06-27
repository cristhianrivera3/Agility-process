import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Footer from './components/Footer';

import Home from './pages/Home';
import Landing from './pages/Landing';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Contact from './pages/Contact';
import About from './pages/About';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

import './index.css';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Logo />
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/servicios/:slug" element={<ServiceDetail />} />
              <Route path="/portafolio" element={<Portfolio />} />
              <Route path="/portafolio/:slug" element={<PortfolioDetail />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
