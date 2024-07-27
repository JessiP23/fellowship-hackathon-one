import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      navigate('/');  // Navigate to the homepage after successful login
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="text" className="input" autoComplete="off" placeholder="Username" value={username} onChange={handleUsernameChange}/>
      <input type="password" className="input" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <input 
        type="checkbox" 
        className="checkbox" 
        id="remember_me" 
        checked={rememberMe}
        onChange={(event) => setRememberMe(event.target.checked)}
      />
      <label htmlFor="remember_me">Remember me</label>
      <input type="submit" className="button" value="Login" />
    </form>
  );
}

export default Login;
