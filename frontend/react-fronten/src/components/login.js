import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // State variable for error message
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
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password
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
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);  // Set error message from response
      } else {
        setErrorMessage("Invalid username or password");  // Set generic error message
      }
      console.error('Login error', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Conditionally render the error message */}

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
