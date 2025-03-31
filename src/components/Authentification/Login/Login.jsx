import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    return (
        <main className="mainLogin">
            <div className="login">
                <h1 className="h1_Login">Login</h1>
                <form onSubmit={null}>
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

                    <button className="btnLogin">Login to your account</button>
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