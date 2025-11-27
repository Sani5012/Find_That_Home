// Tenant Dashboard
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOffers } from '../services/offerService';
import { getAgentTokens } from '../services/tokenService';
import { updateUserProfile } from '../services/authService';
import { FaMapMarkerAlt, FaClipboard, FaEdit, FaBell } from 'react-icons/fa';
import '../styles/dashboard.css';

const TenantDashboard = () => {
  const { user, userProfile } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || '',
  });

  useEffect(() => {
    const fetchOffers = async () => {
      if (user) {
        const { data } = await getUserOffers(user.id);
        setOffers(data || []);
      }
      setLoading(false);
    };

    fetchOffers();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (user) {
      await updateUserProfile(user.id, {
        full_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      });
      setEditMode(false);
    }
  };

  return (
    <div className="container dashboard-container mt-4">
      <h1>Tenant Dashboard</h1>

      <div className="dashboard-grid">
        {/* Profile Section */}
        <div className="dashboard-section card">
          <div className="card-header flex-between">
            <h2>My Profile</h2>
            <button
              className="btn btn-outline"
              onClick={() => setEditMode(!editMode)}
            >
              <FaEdit /> {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editMode ? (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {userProfile?.full_name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {userProfile?.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {userProfile?.address || 'Not provided'}</p>
            </div>
          )}
        </div>

        {/* My Offers */}
        <div className="dashboard-section card">
          <div className="card-header">
            <h2>My Offers</h2>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : offers.length > 0 ? (
            <div className="offers-list">
              {offers.map((offer) => (
                <div key={offer.id} className="offer-item">
                  <div className="offer-header">
                    <h3>{offer.properties?.title}</h3>
                    <span className={`badge badge-${offer.status}`}>
                      {offer.status}
                    </span>
                  </div>
                  <p className="text-secondary">
                    <FaMapMarkerAlt /> {offer.properties?.location}
                  </p>
                  <div className="offer-details flex-between">
                    <div>
                      <strong>Offer Amount:</strong> ${offer.offer_amount?.toLocaleString()}
                    </div>
                    <div>
                      <strong>Property Price:</strong> ${offer.properties?.price?.toLocaleString()}
                    </div>
                  </div>
                  {offer.message && (
                    <p className="offer-message"><strong>Message:</strong> {offer.message}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">No offers yet. Start by searching for properties!</p>
          )}
        </div>

        {/* Location Alerts */}
        <div className="dashboard-section card">
          <div className="card-header">
            <h2>Location Alerts</h2>
          </div>
          <p className="text-secondary">
            <FaBell /> Set up alerts to be notified when properties matching your preferences appear near you.
          </p>
          <button className="btn btn-primary mt-2">Create Alert</button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
