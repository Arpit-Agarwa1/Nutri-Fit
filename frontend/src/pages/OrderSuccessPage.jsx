import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/api';
import './OrderSuccessPage.css';

/** Order confirmation page */
const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderService.getById(orderId);
        setOrder(res.data);
      } catch {
        // Order may still exist even if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="order-success-page">
      <div className="container success-content">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for choosing NutriFit Bharat.</p>

        {order && (
          <div className="order-details">
            <p><strong>Order ID:</strong> {order.id.slice(0, 8).toUpperCase()}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</p>
          </div>
        )}

        {loading && <div className="spinner" />}

        <p className="success-note">
          We&apos;ll send you a confirmation email shortly. Your order will be
          delivered within 3-5 business days.
        </p>

        <div className="success-actions">
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
