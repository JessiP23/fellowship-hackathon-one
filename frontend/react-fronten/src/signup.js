import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
        email
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true  // Ensure credentials are included in the request
      });
      console.log('Signup successful', response.data);
    } catch (error) {
      console.error('Signup error', error);
    }
  };


  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input type="email" className="input" id="user_email" autoComplete="off" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="text" className="input" id="user_name" autoComplete="off" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <input type="password" className="input" id="user_pass" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <input type="submit" className="button" value="Sign Up" />
      <div className="help-text">
        <p>By signing up, you agree to our</p>
        <p><a href="#">Terms of service</a></p>
      </div>
    </form>
  );
}

export default Signup;
