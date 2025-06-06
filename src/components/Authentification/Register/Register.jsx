import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inscription réussie
                setSuccess(true);
                navigate("/profilesetup"); // Rediriger vers la page de connexion
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <main className='mainLogin'>
            <div className="login">
                <h1 className='h1_Login'>Register</h1>
                <form onSubmit={handleRegister}>
                    <input
                        className='mailInput'
                        type='email'
                        placeholder='Email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>

                    <input
                        className='passwordInput'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>

                    <input
                        className='passwordInput'
                        type='password'
                        placeholder='Repeat Password'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required/>

                    <button className='btnLogin' type="submit">Create Account</button>
                </form>

                {error && <p className="errorMessage">{error}</p>}
                {success && <p className="successMessage">Registration successful! Please log in.</p>}

                <div className="noAccount">
                    <p className='sign'>Already have an account? <span className='signSpan'><Link to='/login' className='registerLink'>Log In </Link></span></p>
                </div>
            </div>
        </main>
    );
};

export default Register;