import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; // Importez auth depuis firebase.js

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Connexion réussie
                navigate("/"); // Rediriger vers la page d'accueil ou une autre page
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
                        placeholder="Email adress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        className="passwordInput"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
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