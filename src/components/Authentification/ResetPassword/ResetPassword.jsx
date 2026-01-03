import React, { useState } from "react";
import "./ResetPassword.css";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import loadingIcon from "../../../assets/imgs/loadingIcon.gif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setLoadingReset(true);
    setError(null);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
        setLoadingReset(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <main className="mainLogin">
      <div className="reset">
        <h1 className="h1_Login">Reset Your Password</h1>
        <form onSubmit={handleReset}>
          <input
            className={success ? "successResetMailInput" : "resetMailInput"}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={success}
          />

          {error && (
            <p className="loginError">
              We couldn't log you in. Please check your email and password and
              try again.
              <span className="loginErrorSubtitle">{error}</span>
            </p>
          )}
          {success && (
            <p className="ResetSuccessMessage">
              If you have an account with us, a password reset email has been
              sent. Please check your inbox (and spam folder) for the link.
            </p>
          )}

          <button
            className={success ? "resetSuccessBtnLogin" : "resetBtnLogin"}
            type="submit"
            disabled={!email || loadingReset}
          >
            {loadingReset ? (
              <img
                src={loadingIcon}
                alt="loading..."
                className="loadingSpinner"
              />
            ) : (
              "Reset your password"
            )}
          </button>
          <div className="noAccount">
            <p className="signFromReset">
              Go back to Login ?{" "}
              <span className="signSpan">
                <Link to="/login" className="registerLink">
                  Log In
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
