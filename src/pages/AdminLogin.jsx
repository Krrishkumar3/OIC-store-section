import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // We'll create simple styles for this

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('https://oic-store-backend.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token securely (using localStorage for simplicity here)
                localStorage.setItem('adminToken', data.token);
                setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' });
                
                // Redirect to the FileUpload page upon successful login
                setTimeout(() => {
                    navigate('/admin/dashboard'); 
                }, 1000);
            } else {
                setMessage({ type: 'error', text: data.error || 'Invalid credentials. Please try again.' });
            }
        } catch (error) {
            console.error('Login Error:', error);
            setMessage({ type: 'error', text: 'Network error. Please check the server connection.' });
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Panel Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Log In</button>
            </form>
            {message.text && (
                <div className={`login-message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default AdminLogin;