// Home page
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaHome, FaUser, FaCrown } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Home</h1>
          <p>Search, compare, and make offers on properties with ease</p>
          {!user ? (
            <>
              <Link to="/search" className="btn btn-primary">
                <FaSearch /> Start Searching
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Create Account
              </Link>
            </>
          ) : (
            <Link to="/search" className="btn btn-primary">
              <FaSearch /> Browse Properties
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container features-section">
        <h2>How It Works</h2>
        <div className="features-grid grid grid-cols-3">
          <div className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Search Properties</h3>
            <p>Browse thousands of rental and purchase listings in your area</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaHome />
            </div>
            <h3>Make Offers</h3>
            <p>Submit offers directly through the platform with ease</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaUser />
            </div>
            <h3>Legal Process</h3>
            <p>Get connected with legal professionals for secure transactions</p>
          </div>
        </div>
      </div>

      {/* User Types Section */}
      <div className="user-types-section">
        <div className="container">
          <h2>For Everyone</h2>
          <div className="user-types-grid grid grid-cols-2">
            <div className="user-type-card">
              <h3>For Tenants & Buyers</h3>
              <ul>
                <li>Browse rental and purchase listings</li>
                <li>Make offers directly on properties</li>
                <li>Track your offers and applications</li>
                <li>Get location-based alerts</li>
              </ul>
              {!user && <Link to="/signup" className="btn btn-primary">Get Started</Link>}
            </div>

            <div className="user-type-card">
              <h3>For Landlords & Agents</h3>
              <ul>
                <li>List rental and sale properties</li>
                <li>Manage tenant/buyer offers</li>
                <li>Track transactions</li>
                <li>Premium features with tokens</li>
              </ul>
              {!user && <Link to="/signup" className="btn btn-primary">List Property</Link>}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Find That Home. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
