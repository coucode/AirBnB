import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm({setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data) setErrors([data]);
      }
    );
  };

  const handleClick = (e) => {
    e.preventDefault()

    return dispatch(sessionActions.login({ credential: "demo9", password: "pass9" })).catch(
      async (res) => {
        const data = await res.json();
        if (data) setErrors([data]);
      }
    )
  }

  return (
    <div className="login_container">
      <div className='cr_title_container'>
        <h2 className="modal_title">Welcome to Aircnc</h2>
        <div>
          <i
            className="fa-solid fa-xmark fa-lg"
            onClick={() => setShowModal(false)}
          ></i>
        </div>
      </div>

      {hasSubmitted && errors.length >= 1 && (
        <div className='form_errors_container'>
          The following errors were found:
          <ul className="form_errors">
            {errors?.map((error, idx) => (
              <li key={idx} className="form_errors">{error.message}</li>
            ))}
          </ul>
        </div>

      )}
      <form onSubmit={handleSubmit} className="login_form">
        <input
          className="login_inputs_top"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
        />
        <input
          className="login_inputs_bottom"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <div className="login_button_container">
          <button type="submit" className="login_buttons">Log In</button>
          <button type="button" onClick={handleClick} className="login_buttons">Sign in with Demo User</button>

        </div>
      </form>
    </div>
  );
}

export default LoginForm;