import { useEffect, useRef, useState } from 'react';
import './AnimateOnScroll.css';

/**
 * Wraps children with scroll-triggered entrance animation
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.animation - fade-up | fade-left | fade-right | scale | zoom
 * @param {number} props.delay - animation delay in ms
 * @param {string} props.className - extra CSS classes
 */
const AnimateOnScroll = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`aos ${animation} ${visible ? 'aos-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
