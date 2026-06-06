import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, Layers, ArrowUpDown, Filter } from 'lucide-react';

// 🖼️ Imagery Catalog Map
const productImageMap = {
  'Organic Tomatoes': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
  'Fresh Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80',
  'Local Potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
  'Cauliflower': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=500&q=80',
  'Green Chillies': 'https://images.unsplash.com/photo-1588252303782-cb80119cb665?auto=format&fit=crop&w=500&q=80',
  'Alfonso Mangoes': 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
  'Red Apples': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80',
  'Cavendish Bananas': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
  'Fresh Strawberries': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80',
  'Whole Wheat Atta': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
  'Basmati Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
  'Organic Moong Dal': 'https://images.unsplash.com/photo-1545114065-184e27f2f815?auto=format&fit=crop&w=500&q=80',
  'Fresh Paneer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Paneer_chilli_1.jpg/640px-Paneer_chilli_1.jpg',
  'Pure Cow Ghee': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Ghee_in_a_dish.jpg/640px-Ghee_in_a_dish.jpg',
  'Farm Fresh Eggs': 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=500&q=80',
  'default': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80'
};

const fallbackVectors = {
  'Vegetables': <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8f5e9', fontSize: '3.5rem' }}>🥦</div>,
  'Fruits': <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff3e0', fontSize: '3.5rem' }}>🍎</div>,
  'Grains': <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffde7', fontSize: '3.5rem' }}>🌾</div>,
  'Dairy': <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd', fontSize: '3.5rem' }}>🧀</div>,
  'default': <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', fontSize: '3.5rem' }}>🧺</div>
};

function SafeProductImage({ productName, category }) {
  const [hasError, setHasError] = useState(false);
  const targetSrc = productImageMap[productName] || productImageMap['default'];

  if (hasError) return fallbackVectors[category] || fallbackVectors['default'];

  return (
    <img 
      src={targetSrc} 
      alt={productName} 
      onError={() => setHasError(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // 🌐 DYNAMIC RESOLVER RULE: Detects if running on localhost or an external AWS EC2 public IP address
    const hostName = window.location.hostname;
    const API_BASE = hostName === 'localhost' || hostName === '127.0.0.1' 
      ? 'http://localhost:5000' 
      : `${window.location.protocol}//${hostName}:5000`;

    axios.get(`${API_BASE}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const getSortedData = () => {
    let baseList = [...products];
    if (sortBy === 'low-to-high') return baseList.sort((a, b) => a.price - b.price);
    if (sortBy === 'high-to-low') return baseList.sort((a, b) => b.price - a.price);
    return baseList;
  };

  const orderedList = getSortedData();
  const groupedProducts = orderedList.reduce((acc, product) => {
    const currentCategory = product.category || 'Other';
    if (!acc[currentCategory]) acc[currentCategory] = [];
    acc[currentCategory].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', fontFamily: 'sans-serif', color: '#2e7d32' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #2e7d32', borderRadius: '50%', width: '45px', height: '45px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <h2 style={{ fontWeight: '600' }}>Loading Marketplace Catalog...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, sans-serif', backgroundColor: '#f9fbf9', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div style={{ background: 'linear-gradient(rgba(46, 125, 50, 0.85), rgba(27, 94, 32, 0.95)), url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', padding: '4.5rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 0.75rem 0', fontWeight: '800', letterSpacing: '-0.5px' }}>Direct From Local Farms To Your Home</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto', opacity: 0.9, fontWeight: '300' }}>Support your local growers. Fresh harvests, completely transparent logs, and guaranteed fair pricing.</p>
      </div>

      <div style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '1rem 1.5rem', borderRadius: '14px', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', margin: '2.5rem 0', border: '1px solid #e9ebe9', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2c3e2e', fontWeight: '600' }}>
            <Filter size={18} color="#2e7d32" />
            <span>Market Inventory: {products.length} Items Listed</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ArrowUpDown size={18} color="#718272" />
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#556556' }}>Arrangement:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem 1.25rem', border: '1px solid #ccd5cc', borderRadius: '8px', backgroundColor: '#fff', fontSize: '0.9rem', outline: 'none', color: '#2c3e2e', cursor: 'pointer', fontWeight: '600' }}>
              <option value="default">Default Catalog View</option>
              <option value="low-to-high">Price: Low to High ↑</option>
              <option value="high-to-low">Price: High to Low ↓</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: '1.4rem', color: '#4c5e4d', fontWeight: '600' }}>The storefront collections parameters are currently unpopulated.</p>
          </div>
        ) : (
          Object.keys(groupedProducts).map((category) => (
            <div key={category} style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', borderBottom: '2px solid #e1eae2', paddingBottom: '0.6rem' }}>
                <Layers size={22} color="#2e7d32" />
                <h3 style={{ color: '#1b5e20', fontSize: '1.65rem', margin: 0, fontWeight: '700', textTransform: 'capitalize' }}>{category}</h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {groupedProducts[category].map((product) => (
                  <div key={product._id} style={{ backgroundColor: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.03)', border: '1px solid #e9ebe9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                    <div style={{ position: 'relative', width: '100%', height: '185px', overflow: 'hidden', backgroundColor: '#eaeaea' }}>
                      <SafeProductImage productName={product.name} category={category} />
                      <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '0.3rem 0.65rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700', color: '#1b5e20', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{category}</span>
                    </div>

                    <div style={{ padding: '1.35rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#2c3e2e' }}>{product.name}</h4>
                        <p style={{ color: '#617262', fontSize: '0.88rem', margin: '0 0 1.25rem 0', lineHeight: '1.45', minHeight: '38px' }}>{product.description}</p>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '1.45rem', fontWeight: '800', color: '#2e7d32' }}>₹{product.price} <span style={{ fontSize: '0.85rem', color: '#718272', fontWeight: '400' }}>/ kg</span></span>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#2e7d32', backgroundColor: '#e8f5e9', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>Stock: {product.quantity} kg</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#556556', borderTop: '1px solid #f0f2f0', paddingTop: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span>👨‍🌾</span> <span>Grower: <strong>{product.farmer?.name || 'Local Farm Vendor'}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '0 1.35rem 1.35rem 1.35rem' }}>
                      <button onClick={() => addToCart(product)} style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: '0.75rem 1rem', width: '100%', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.92rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 3px 8px rgba(46,125,50,0.15)' }}>
                        <ShoppingBag size={16} /> Add to Basket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}