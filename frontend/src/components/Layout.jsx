import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

/** Main layout wrapper with navbar and footer */
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
