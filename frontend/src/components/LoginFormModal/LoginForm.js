import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div>
      <h2>Welcome to Aircnc</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors?.map((error, idx) => (
            <li key={idx}>{error.message}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
        <button type="submit">Log In</button>
        <button type="button" onClick={handleClick}>Sign in with Demo User</button>
      </form>
    </div>
  );
}

export default LoginForm;