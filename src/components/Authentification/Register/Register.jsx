import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');  // État pour le mot de passe répété
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    return (
        <main className='mainLogin'>
            <div className="login">
                <h1 className='h1_Login'>Register</h1>
                <form onSubmit={null}>
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
