import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, User, ShieldCheck } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful! Please login to your new portal.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", sans-serif', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7f4', padding: '1rem' }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: '420px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e1eae2' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.75rem', background: '#e8f5e9', borderRadius: '12px', color: '#2e7d32', marginBottom: '0.5rem' }}>
            <UserPlus size={28} />
          </div>
          <h2 style={{ margin: 0, color: '#1b5e20', fontSize: '1.75rem', fontWeight: '700' }}>Create Account</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#617262', fontSize: '0.9rem' }}>Join our local farmers marketplace community</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Full Name Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c3e2e' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#718272" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
              <input 
                type="text" 
                placeholder="John Doe" 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                required 
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ccd5cc', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontSize: '0.95rem', backgroundColor: '#fff', color: '#333' }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c3e2e' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#718272" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                required 
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ccd5cc', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontSize: '0.95rem', backgroundColor: '#fff', color: '#333' }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c3e2e' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#718272" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={form.password} 
                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                required 
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ccd5cc', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontSize: '0.95rem', backgroundColor: '#fff', color: '#333' }}
              />
            </div>
          </div>

          {/* Multi-Role Dropdown - COLOR FIX APPLIED */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c3e2e' }}>Register As</label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={16} color="#718272" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
              <select 
                value={form.role} 
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ccd5cc', borderRadius: '8px', backgroundColor: '#fff', color: '#2c3e2e', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                <option value="customer" style={{ color: '#333', backgroundColor: '#fff' }}>Consumer / Buyer Login</option>
                <option value="farmer" style={{ color: '#333', backgroundColor: '#fff' }}>Local Crop Grower / Farmer</option>
                <option value="admin" style={{ color: '#333', backgroundColor: '#fff' }}>Platform Admin Management</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', marginTop: '0.5rem', boxShadow: '0 4px 10px rgba(46,125,50,0.15)' }}
          >
            {loading ? 'Registering...' : 'Complete Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#617262' }}>
          Already have an account? <Link to="/login" style={{ color: '#2e7d32', fontWeight: '600', textDecoration: 'none' }}>Login Portal</Link>
        </div>

      </div>
    </div>
  );
}