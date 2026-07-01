import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';
import './CheckoutPage.css';

/** Checkout page with order form */
const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  if (cartItems.length === 0) {
    return (
      <div className="container checkout-empty">
        <h2>Nothing to checkout</h2>
        <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        paymentMethod: form.paymentMethod,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await orderService.create(orderData);
      clearCart();
      navigate(`/order-success/${res.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Shipping Details</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                required
                rows="3"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address, apartment, etc."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={form.state}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="302001"
                />
              </div>
            </div>

            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={form.paymentMethod === 'online'}
                  onChange={handleChange}
                />
                Online Payment (UPI/Card)
              </label>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary place-order-btn"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : `Place Order — ₹${cartTotal}`}
            </button>
          </form>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="checkout-total">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
