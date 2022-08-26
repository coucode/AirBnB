import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUp.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    const errors = []
    if (!firstName.length > 0) {
      errors.push("Please enter your first name")
    }
    if (firstName.length < 2 || firstName.length > 40) {
      errors.push("First name must be between 2 and 4 characters")
    }
    if (!lastName.length > 0) {
      errors.push("Please enter your last name")
    }
    if (lastName.length < 2 || lastName.length > 40) {
      errors.push("First name must be between 2 and 4 characters")
    }
    if (!username.length > 0) {
      errors.push("Please enter a username")
    }
    if (username.length < 4 || username.length > 30) {
      errors.push("Your username must be between 4 and 30 characters")
    }
    if (validateEmail(username)) {
      errors.push("Email address cannot be used for a username. Please provide a username")
    }
    if (!validateEmail(email)) {
      errors.push("Email is invalid")
    }
    if (email < 3 || email > 256) {
      errors.push("Email address must be between 3 and 256 characters")
    }
    if (password >= 60) {
      errors.push("Please select a new password. Passwords cannot be longer than 60 characters")
    }
    setValidationErrors(errors)
  }, [firstName, lastName, username, email, password])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (password === confirmPassword) {
      setErrors([]);
      let user = { firstName, lastName, username, email, password }
      return dispatch(sessionActions.signup(user))
        .catch(async (res) => {
          const data = await res.json();
          if (data) setErrors([data]);
        });
    }
    return setValidationErrors([...validationErrors, 'Confirm Password field must be the same as the Password field']);
  };

  return (
    <section>
      <h2>Welcome to Aircnc!</h2>
      <form onSubmit={handleSubmit}>
        {hasSubmitted && (
        <ul>
          {errors?.map((error, idx) => <li key={idx}>{error.message}</li>)}
          {validationErrors?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        )}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}

export default SignupForm;