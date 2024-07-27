import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");  // State variable for the message
  const [messageColor, setMessageColor] = useState("");  // State variable for the message color

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
      const response = await axios.post('http://127.0.0.1:5000/register', {
        username,
        password,
        email
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true  // Ensure credentials are included in the request
      });
      setMessage("Signup successful!");  // Set success message
      setMessageColor("green");  // Set message color to green for success
      console.log('Signup successful', response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);  // Set error message from response
      } else {
        setMessage("Signup error");  // Set generic error message
      }
      setMessageColor("red");  // Set message color to red for error
      console.error('Signup error', error);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>

      <div className="choose-position d-flex row">
        <h3>I am a ...</h3>
        <div>
          <input type="radio" name="position" value="student" />
          <label>Student</label>
        </div>
        <div>
          <input type="radio" name="position" value="teacher" />
          <label>Teacher</label>
        </div>
      </div>
      <input type="email" className="input" id="user_email" autoComplete="off" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="text" className="input" id="user_name" autoComplete="off" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <input type="password" className="input" id="user_pass" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <input type="submit" className="button" value="Sign Up" />
      {message && <p style={{ color: messageColor }}>{message}</p>}  {/* Conditionally render the message with color */}
      <div className="help-text">
        <p>By signing up, you agree to our</p>
        <p><a href="#">Terms of service</a></p>
      </div>
    </form>
  );
}

export default Signup;
