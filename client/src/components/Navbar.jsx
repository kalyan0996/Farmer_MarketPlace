import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#2e7d32', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>🚜 FreshMarket</Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ShoppingCart size={20} /> ({cart.reduce((acc, item) => acc + item.qty, 0)})
        </Link>
        {user ? (
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <User size={18}/> {user.name} ({user.role})
            </span>
            {user.role === 'farmer' && <Link to="/farmer-dashboard" style={{ color: '#fff' }}>Dashboard</Link>}
            {user.role === 'admin' && <Link to="/admin-dashboard" style={{ color: '#fff' }}>Admin Panel</Link>}
            <button onClick={logout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}