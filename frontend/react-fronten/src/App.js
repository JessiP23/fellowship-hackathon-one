import './App.css';
import './App.css';
import Signup from "./signup";
import Login from "./login";
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HomeManager from '../components/HomeManager';

function App() {
  const [activeTab, setActiveTab] = useState('signup-tab-content');
  // add navigate for logged users to go to home page
  const navigate = useNavigate();

  const openTab = (evt, tabName) => {
    evt.preventDefault();  // Prevent default anchor behavior

    // Update the active tab state
    setActiveTab(tabName);
  };

  return (
    <Router>
      <div>
        <h1>Welcome to the Mountaineering Club</h1>
        <div className="form-wrap">
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
      </div>
    </Router>
  );
}

export default App;
