// Buyer Dashboard (similar to Tenant)
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOffers } from '../services/offerService';
import { updateUserProfile } from '../services/authService';
import { FaHome, FaEdit } from 'react-icons/fa';
import '../styles/dashboard.css';

const BuyerDashboard = () => {
  const { user, userProfile } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    phone: userProfile?.phone || '',
    budgetMin: userProfile?.budget_min || '',
    budgetMax: userProfile?.budget_max || '',
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
        budget_min: parseFloat(formData.budgetMin),
        budget_max: parseFloat(formData.budgetMax),
      });
      setEditMode(false);
    }
  };

  return (
    <div className="container dashboard-container mt-4">
      <h1>Buyer Dashboard</h1>

      <div className="dashboard-grid">
        {/* Profile */}
        <div className="dashboard-section card">
          <div className="card-header flex-between">
            <h2>My Profile</h2>
            <button className="btn btn-outline" onClick={() => setEditMode(!editMode)}>
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
                <label>Budget Range</label>
                <div className="grid grid-cols-2">
                  <input
                    type="number"
                    name="budgetMin"
                    placeholder="Min"
                    value={formData.budgetMin}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="budgetMax"
                    placeholder="Max"
                    value={formData.budgetMax}
                    onChange={handleInputChange}
                  />
                </div>
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
              <p><strong>Budget:</strong> ${formData.budgetMin} - ${formData.budgetMax}</p>
            </div>
          )}
        </div>

        {/* Purchase Offers */}
        <div className="dashboard-section card">
          <div className="card-header">
            <h2>My Purchase Offers ({offers.length})</h2>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : offers.length > 0 ? (
            <div className="offers-list">
              {offers.map((offer) => (
                <div key={offer.id} className="offer-item">
                  <div className="offer-header">
                    <h3>{offer.properties?.title}</h3>
                    <span className={`badge badge-${offer.status}`}>{offer.status}</span>
                  </div>
                  <div className="offer-details">
                    <div>
                      <strong>Offer:</strong> ${offer.offer_amount?.toLocaleString()}
                    </div>
                    <div>
                      <strong>Property Price:</strong> ${offer.properties?.price?.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">No offers yet. Browse properties to make an offer!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
