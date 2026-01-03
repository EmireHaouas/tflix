import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useUser } from "../../../context/UserContext";
import loadingIcon from "../../../assets/imgs/loadingIcon.gif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, profile, loadingUser, loadingProfile } = useUser();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setError(null);

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setError(error.message);
      setLoadingLogin(false);
    });
  };

  useEffect(() => {
    if (user && profile && !loadingUser && !loadingProfile && loadingLogin) {
      setLoadingLogin(false);
      navigate("/");
    }
  }, [user, profile, loadingUser, loadingProfile, loadingLogin]);

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
          <label className="showPasswordLoginLabel">
            <input
              type="checkbox"
              className="checkbox"
              onClick={handlePasswordVisibility}
            />
            {isPasswordVisible ? "Hide Password" : "Show Password"}
          </label>
          <div className="noAccount">
            <p className="signLogin">
              Forgot password?{" "}
              <span className="signSpan">
                <Link to="/resetpassword" className="resetLink">
                  Reset password
                </Link>
              </span>
            </p>
          </div>

          {error && (
            <p className="loginError">
              We couldn't log you in. Please check your email and password and
              try again.
              <span className="loginErrorSubtitle">{error}</span>
            </p>
          )}

          <button
            className="btnLogin"
            type="submit"
            disabled={!email || !password || loadingLogin}
          >
            {loadingLogin ? (
              <img
                src={loadingIcon}
                alt="loading..."
                className="loadingSpinner"
              />
            ) : (
              "Login to your account"
            )}
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
