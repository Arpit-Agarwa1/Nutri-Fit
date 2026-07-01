import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import './Layout.css';

/** Main layout wrapper with navbar and footer */
const Layout = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
