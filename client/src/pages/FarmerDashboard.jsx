// client/src/pages/FarmerDashboard.jsx
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function FarmerDashboard() {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', description: '', price: '', quantity: '', category: 'Vegetables' });

  const handlePostProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product listed for sale successfully!');
      setForm({ name: '', description: '', price: '', quantity: '', category: 'Vegetables' });
    } catch (err) {
      alert('Error publishing crop product listing');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Farmer Dashboard: List New Harvest</h2>
      <form onSubmit={handlePostProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <input type="text" placeholder="Crop/Product Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required style={{ padding: '0.5rem' }} />
        <textarea placeholder="Product details/freshness standard" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required style={{ padding: '0.5rem' }} />
        <input type="number" placeholder="Price per Kg (₹)" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required style={{ padding: '0.5rem' }} />
        <input type="number" placeholder="Available Quantity (Kgs)" value={form.quantity} onChange={(e) => setForm({...form, quantity: e.target.value})} required style={{ padding: '0.5rem' }} />
        <button type="submit" style={{ background: '#2e7d32', color: '#fff', padding: '0.7rem', border: 'none', cursor: 'pointer' }}>Publish Listing</button>
      </form>
    </div>
  );
}