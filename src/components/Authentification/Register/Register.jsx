import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useUser } from "../../../context/UserContext";
import loadingIcon from "../../../assets/imgs/loadingIcon.gif";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const { user, loading } = useUser();
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoadingRegister(true);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoadingRegister(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true);
        setIsLoadingRegister(false);
        navigate("/profileSetup");
      })
      .catch((error) => {
        setError({ code: error.code, message: error.message });
        setIsLoadingRegister(false);
      });
  };
  const errorMessages = {
    "auth/email-already-in-use": "Email already in use!",
    "auth/invalid-email": "Invalid email format.",
    "auth/weak-password":
      "Password is too weak. Password should be at least 6 characters!",
  };
  const getErrorMessage = (errorCode) =>
    errorMessages[errorCode] || "An unknown error occurred";

  return (
    <main className="mainLogin">
      <div className={error ? "registerError" : "register"}>
        <h1 className="h1_Login">Register</h1>
        <form onSubmit={handleRegister}>
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

          <input
            className="passwordInput"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
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
          <button
            className="btnLogin"
            type="submit"
            disabled={isLoadingRegister}
          >
            {isLoadingRegister ? (
              <img
                src={loadingIcon}
                alt="loading..."
                className="loadingSpinner"
              />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {error && error.code && (
          <p className="loginError">
            {error.code ? getErrorMessage(error.code) : error.message}
          </p>
        )}

        {success && <p className="successMessage">Registration successful!</p>}

        <div className="noAccount">
          <p className="sign">
            Already have an account?{" "}
            <span className="signSpan">
              <Link to="/login" className="registerLink">
                Log In
              </Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
