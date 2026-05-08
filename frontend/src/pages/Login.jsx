import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', {email, password});

            localStorage.setItem('token', response.data.token);

            localStorage.setItem('user', JSON.stringify(response.data.user));

            alert('Logged in successfully!');

            navigate('/');
        }catch(err){
            setError(err.response?.data?.message || 'Failed to Login');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px'}}>
            <h2>Login to your Account</h2>

            {error && <p style={{ color: 'red'}}>{error}</p>}

            <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div>
                    <label>Email:</label><br />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px'}}
                        />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{width: '100%', padding: '8px'}}
                        />
                </div>

                <button type="submit" style={{padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Login</button>
            </form>
        </div>
    );
};

export default Login;