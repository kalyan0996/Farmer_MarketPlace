import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ShoppingBasket, ArrowLeft, CreditCard } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate billing parameters on the fly
  const totalItemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalBillAmount = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckoutMock = () => {
    alert(`Order intent registered! Total order of ₹${totalBillAmount} has been sent directly to the local producers for fulfillment processing.`);
    clearCart();
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, sans-serif', backgroundColor: '#f4f7f4', minHeight: '90vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Back navigation text trigger link */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2e7d32', textDecoration: 'none', fontWeight: '600', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h2 style={{ color: '#1b5e20', fontWeight: '800', fontSize: '1.8rem', margin: '0 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBasket size={26} /> Your Shopping Basket
        </h2>

        {cart.length === 0 ? (
          /* Empty Basket Fallback Presentation Interface */
          <div style={{ backgroundColor: '#fff', padding: '4rem 2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #e1eae2', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🛒</div>
            <h3 style={{ color: '#2c3e2e', margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>Your cart is empty</h3>
            <p style={{ color: '#718272', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>Looks like you haven't added any fresh farm produce to your basket yet.</p>
            <Link to="/" style={{ backgroundColor: '#2e7d32', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '700', inlineBlock: 'true', boxShadow: '0 4px 10px rgba(46,125,50,0.2)' }}>
              Browse Fresh Produce
            </Link>
          </div>
        ) : (
          /* Split Grid Layout: Cart List vs Order Summary billing card */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
            
            {/* Left side items container row tracking stack mapper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div key={item._id} style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e1eae2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', color: '#2c3e2e', fontWeight: '700' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#718272', fontSize: '0.85rem' }}>Category: {item.category} | Sold By: {item.farmer?.name || 'Local Farm'}</p>
                    <div style={{ color: '#2e7d32', fontWeight: '700', fontSize: '1.05rem', marginTop: '0.5rem' }}>
                      ₹{item.price} <span style={{ fontSize: '0.8rem', fontWeight: '400', color: '#718272' }}>x {item.qty} kg</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#2c3e2e', minWidth: '70px', textAlign: 'right' }}>
                      ₹{item.price * item.qty}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      style={{ background: '#ffebee', border: 'none', color: '#c62828', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Remove product item entry stack"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <button 
                onClick={clearCart}
                style={{ background: 'none', border: '1px style dashed #ccd5cc', color: '#c62828', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.88rem', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}
              >
                Clear All Basket Items
              </button>
            </div>

            {/* Right side contextual calculation payment summary box block */}
            <div style={{ backgroundColor: '#fff', padding: '1.75rem', borderRadius: '14px', border: '1px solid #e1eae2', boxShadow: '0 4px 14px rgba(0,0,0,0.02)', position: 'sticky', top: '20px' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.2rem', fontWeight: '700', color: '#2c3e2e', borderBottom: '1px solid #f0f2f0', paddingBottom: '0.75rem' }}>
                Order Invoice Summary
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#617262', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                <span>Total Sourced Volume:</span>
                <span style={{ fontWeight: '600', color: '#2c3e2e' }}>{totalItemCount} Kgs</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#617262', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                <span>Logistics Delivery Fee:</span>
                <span style={{ fontWeight: '600', color: '#2e7d32' }}>FREE Delivery</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f2f0', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2c3e2e' }}>Total Bill Amount:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2e7d32' }}>₹{totalBillAmount}</span>
              </div>

              <button 
                onClick={handleCheckoutMock}
                style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: '0.85rem 1rem', width: '100%', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(46,125,50,0.2)' }}
              >
                <CreditCard size={18} /> Place Order (COD)
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}