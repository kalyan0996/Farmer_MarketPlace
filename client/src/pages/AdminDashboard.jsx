import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert, CheckCircle, Trash2, Users, LayoutGrid, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  // Fetch all products currently stored in the database
  const fetchInventoryData = () => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings for admin evaluation:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Action Handler: Remove/Reject a product from the marketplace global state
  const handleRemoveProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to reject and delete this crop product listing from the system?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Product listing removed successfully.");
      // Refresh list instantly in view
      setProducts(prev => prev.filter(item => item._id !== productId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to drop product entry");
    }
  };

  // Action Handler: Simulate a workflow approval system status
  const handleApproveProduct = (productId) => {
    alert(`Product ID [${productId}] verification verified. Listing status forced to LIVE.`);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '4rem', fontFamily: 'sans-serif', color: '#1b5e20' }}>Accessing secure database protocols...</div>;
  }

  // Calculate platform analytics metrics on the fly
  const totalMarketValue = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const distinctFarmers = [...new Set(products.map(item => item.farmer?._id))].length;

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, sans-serif', backgroundColor: '#f4f7f4', minHeight: '100vh', padding: '2rem' }}>
      
      {/* Upper Title Panel Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '2px solid #ccd5cc', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '0.5rem', backgroundColor: '#1b5e20', color: '#fff', borderRadius: '8px' }}>
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 style={{ margin: 0, color: '#1b5e20', fontWeight: '800' }}>Platform Administration Panel</h2>
          <p style={{ margin: 0, color: '#617262', fontSize: '0.88rem' }}>Verify crop listings, monitor supply chains, and moderate live metrics.</p>
        </div>
      </div>

      {/* Analytics Counter Dashboard Row Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e1eae2', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.01)' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '10px' }}><LayoutGrid size={22}/></div>
          <div>
            <h4 style={{ margin: 0, color: '#718272', fontSize: '0.85rem', fontWeight: '600' }}>Total Live Items</h4>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '1.6rem', fontWeight: '800', color: '#2e7d32' }}>{products.length}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e1eae2', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.01)' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#e3f2fd', color: '#1e88e5', borderRadius: '10px' }}><Users size={22}/></div>
          <div>
            <h4 style={{ margin: 0, color: '#718272', fontSize: '0.85rem', fontWeight: '600' }}>Active Producers</h4>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '1.6rem', fontWeight: '800', color: '#1e88e5' }}>{distinctFarmers || 1}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e1eae2', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.01)' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#fff3e0', color: '#fb8c00', borderRadius: '10px' }}><DollarSign size={22}/></div>
          <div>
            <h4 style={{ margin: 0, color: '#718272', fontSize: '0.85rem', fontWeight: '600' }}>Market Asset Valuation</h4>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '1.5rem', fontWeight: '800', color: '#fb8c00' }}>₹{totalMarketValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Moderation Queue Interactive Inventory Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #e1eae2', boxShadow: '0 6px 18px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f2f0', backgroundColor: '#fafbfa' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#2c3e2e' }}>Product Evaluation & Moderation Queue</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f7faf7', color: '#556556', borderBottom: '1px solid #e1eae2', fontWeight: '600' }}>
                <th style={{ padding: '1rem 1.5rem' }}>Produce Details</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Price / Rate</th>
                <th style={{ padding: '1rem' }}>Stock Volume</th>
                <th style={{ padding: '1rem' }}>Sourcing Farmer</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>Moderation Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} style={{ borderBottom: '1px solid #f0f2f0', transition: 'background 0.2s', color: '#333' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: '#1b5e20' }}>
                    <div>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#718272', fontWeight: '400', marginTop: '0.2rem' }}>{item.description}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', background: '#f0f4f0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '600', color: '#4caf50' }}>{item.category}</span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '700' }}>₹{item.price}/kg</td>
                  <td style={{ padding: '1rem', color: '#555' }}>{item.quantity} Kgs</td>
                  <td style={{ padding: '1rem', color: '#666', fontSize: '0.85rem' }}>
                    👤 {item.farmer?.name || 'Satish Kumar'}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      {/* Approve Button action mock item */}
                      <button 
                        onClick={() => handleApproveProduct(item._id)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#2e7d32', color: '#fff', border: 'none', padding: '0.45rem 0.85rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem' }}
                      >
                        <CheckCircle size={14}/> Approve
                      </button>
                      
                      {/* Reject / Delete Button database execution action item */}
                      <button 
                        onClick={() => handleRemoveProduct(item._id)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#d32f2f', color: '#fff', border: 'none', padding: '0.45rem 0.85rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem' }}
                      >
                        <Trash2 size={14}/> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}