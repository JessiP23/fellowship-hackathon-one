import './App.css';
import Signup from "./signup";
import Login from "./login";
import Home from "./home"; // Import the Home component
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('signup-tab-content');
  const location = useLocation(); // Ensure useLocation is imported

  const openTab = (evt, tabName) => {
    evt.preventDefault();  // Prevent default anchor behavior

    // Update the active tab state
    setActiveTab(tabName);
  };

  const getBackgroundClass = () => {
    if (location.pathname === '/home') {
      return 'home-background';
    } else {
      return 'form-background';
    }
  };

  return (
    <div className={getBackgroundClass()}>
      <Routes>
        <Route path="/" element={
          <div className="form-wrap">
            <h1>Welcome </h1>
            <div className="tabs">
              <h3 className="signup-tab">
                <a href="#signup" className={`tablink ${activeTab === 'signup-tab-content' ? 'active' : ''}`} onClick={(e) => openTab(e, "signup-tab-content")}>
                  Sign Up
                </a>
              </h3>
              <h3 className="login-tab">
                <a href="#login" className={`tablink ${activeTab === 'login-tab-content' ? 'active' : ''}`} onClick={(e) => openTab(e, "login-tab-content")}>
                  Login
                </a>
              </h3>
            </div>

            <div className="tabs-content">
              <div id="signup-tab-content" className="tabcontent" style={{ display: activeTab === 'signup-tab-content' ? 'block' : 'none' }}>
                <Signup />
              </div>
              <div id="login-tab-content" className="tabcontent" style={{ display: activeTab === 'login-tab-content' ? 'block' : 'none' }}>
                <Login />
              </div>
            </div>
          </div>
        } />
        <Route path="/home" element={<Home />} /> {/* Add the route for Home component */}
      </Routes>
    </div>
  );
}

export default App;
