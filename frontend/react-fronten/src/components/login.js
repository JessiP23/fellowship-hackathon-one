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
      // format of data from backend
      const requestDataFromBackend = {
        username: username,
        password: password
      };

      // url to request data from backend
      const response = await axios.post('http://127.0.0.1:5000/login', requestDataFromBackend, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,  //credentials with data
      });

      localStorage.setItem('username', username);

      window.location.href = '/home';

      // if response given exists
      if (response.status == 200){
        navigate('/home', {
          replace: true
        });
      } else {
        console.error('login failed');
      }
      // const { access_token } = response.data;
      // localStorage.setItem('token', access_token);
      // navigate('/');  // Navigate to the homepage after successful login
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
      <button type="submit">Login </button>
    </form>
  );
}

export default Login;
