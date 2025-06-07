import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useUser } from "../../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <main className="mainLogin">
      <div className="login">
        <h1 className="h1_Login">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            className="mailInput"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="passwordInput"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="showPasswordLabel">
            <input
              type="checkbox"
              className="checkbox"
              onClick={handlePasswordVisibility}
            />
            {isPasswordVisible ? "Hide Password" : "Show Password"}
          </label>

          {error && <p className="loginError">{error}</p>}
          <button className="btnLogin" disabled={!email || !password}>
            Login to your account
          </button>
        </form>
        <div className="noAccount">
          <p className="sign">
            Don't have an account?{" "}
            <span className="signSpan">
              <Link to="/register" className="registerLink">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
