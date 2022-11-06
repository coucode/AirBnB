import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUp.css'

function SignupForm({ setShowModal }) {
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
  const [buttonChange, setButtonChange] = useState('signup-submit-button-disabled')

  useEffect(() => {
    if (email.length > 0 && username.length > 0
      && firstName.length > 0 && lastName.length > 0
      && password.length > 0 && confirmPassword.length > 0) {
      setButtonChange('signup_button')
    }
    if (username.length === 0 || password.length === 0 ||
      email.length === 0 || confirmPassword.length === 0 ||
      firstName.length === 0 || lastName.length === 0) {
      setButtonChange('signup-submit-button-disabled')
    }
  }, [email, username, firstName, lastName, confirmPassword, password])

  useEffect(() => {
    const errors = []
    if (!firstName.length > 0) {
      errors.push("Please enter your first name")
    }
    if (firstName.length < 2 || firstName.length > 40) {
      errors.push("First name must be between 2 and 40 characters")
    }
    if (!lastName.length > 0) {
      errors.push("Please enter your last name")
    }
    if (lastName.length < 1 || lastName.length > 40) {
      errors.push("Last name must be between 1 and 40 characters")
    }
    if (!username.length > 0) {
      errors.push("Please enter a username")
    }
    if (username.length < 4 || username.length > 30) {
      errors.push("Your username must be between 4 and 30 characters")
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
          if (data) {
            let errors = Object.values(data.errors)
            setErrors(errors);
          }
        });
    }
    return setValidationErrors([...validationErrors, 'Confirm Password field must be the same as the Password field']);
  };

  return (
    <section className="signin_container">
      <div className='cr_title_container'>
        <h2 className="modal_title">Welcome to Aircnc!</h2>

        <div>
          <i
            className="fa-solid fa-xmark fa-lg"
            onClick={() => setShowModal(false)}
          ></i>
        </div>
      </div>

      {hasSubmitted && (validationErrors.length >= 1 || errors.length >= 1) && (
        <div className='form_errors_container'>
          The following errors were found:
          <ul className="form_errors">
            {errors?.map((error, idx) => <li key={idx} className="form_errors">{error}</li>)}
            {validationErrors?.map((error, idx) => <li key={idx} className="form_errors">{error}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="signin_form">

        <input
          className="signup_inputs_top"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />

        <input
          className="signup_inputs_middle"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />

        <input
          className="signup_inputs_middle"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="signup_inputs_middle"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className="signup_inputs_middle"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <input
          className="signup_inputs_bottom"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <div className="signup_button_container">
          <button type="submit" className={`${buttonChange}`} disabled={buttonChange === 'signup-submit-button-disabled' ? true : false}>Sign Up</button>
        </div>
      </form>
    </section>
  );
}

export default SignupForm;