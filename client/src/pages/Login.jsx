import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      
      // Multi-Role selective redirection paths logic
      if (res.data.user.role === 'farmer') navigate('/farmer-dashboard');
      else if (res.data.user.role === 'admin') navigate('/admin-dashboard');
      else navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login Credentials Rejected');
    }
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", sans-serif', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7f4', padding: '1rem' }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e1eae2' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.75rem', background: '#e8f5e9', borderRadius: '12px', color: '#2e7d32', marginBottom: '0.5rem' }}>
            <LogIn size={28} />
          </div>
          <h2 style={{ margin: 0, color: '#1b5e20', fontSize: '1.75rem', fontWeight: '700' }}>Login Portal</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#617262', fontSize: '0.9rem' }}>Welcome back! Access your account dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c3e2e' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#718272" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="farmer@market.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ccd5cc', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c3e2e' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#718272" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ccd5cc', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', marginTop: '0.5rem', boxShadow: '0 4px 10px rgba(46,125,50,0.15)' }}
          >
            Access Portal
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#617262' }}>
          New to the market? <Link to="/register" style={{ color: '#2e7d32', fontWeight: '600', textDecoration: 'none' }}>Register Here</Link>
        </div>

      </div>
    </div>
  );
}