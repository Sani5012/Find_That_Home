// Navigation component
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services/authService';
import { FaHome, FaSignOutAlt, FaUser, FaGem } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FaHome /> Find That Home
        </Link>

        <div className="navbar-menu">
          {!user ? (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/search" className="nav-link">
                Search Properties
              </Link>

              {userProfile?.user_type === 'agent' && (
                <>
                  <Link to="/list-property" className="nav-link">
                    List Property
                  </Link>
                  <Link to="/tokens" className="nav-link flex gap-1">
                    <FaGem /> Tokens
                  </Link>
                </>
              )}

              {userProfile?.user_type === 'landlord' && (
                <Link to="/my-properties" className="nav-link">
                  My Properties
                </Link>
              )}

              {userProfile?.user_type === 'admin' && (
                <Link to="/admin-panel" className="nav-link">
                  Admin Panel
                </Link>
              )}

              <Link to={`/${userProfile?.user_type || 'tenant'}-dashboard`} className="nav-link flex gap-1">
                <FaUser /> Profile
              </Link>

              <button onClick={handleLogout} className="nav-link btn-logout">
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
