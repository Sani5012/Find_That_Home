// Landlord Dashboard
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPropertiesByUser, deleteProperty } from '../services/propertyService';
import { getPropertyOffers, acceptOffer, rejectOffer } from '../services/offerService';
import { FaHome, FaClipboard, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/dashboard.css';

const LandlordDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data: propsData } = await getPropertiesByUser(user.id);
        setProperties(propsData || []);

        // Fetch offers for each property
        if (propsData && propsData.length > 0) {
          const allOffers = [];
          for (const property of propsData) {
            const { data: offersData } = await getPropertyOffers(property.id);
            allOffers.push(...(offersData || []));
          }
          setOffers(allOffers);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Delete this property?')) {
      await deleteProperty(propertyId);
      setProperties(properties.filter((p) => p.id !== propertyId));
    }
  };

  const handleAcceptOffer = async (offerId) => {
    await acceptOffer(offerId);
    setOffers(offers.map((o) => (o.id === offerId ? { ...o, status: 'accepted' } : o)));
  };

  const handleRejectOffer = async (offerId) => {
    await rejectOffer(offerId);
    setOffers(offers.map((o) => (o.id === offerId ? { ...o, status: 'rejected' } : o)));
  };

  return (
    <div className="container dashboard-container mt-4">
      <h1>Landlord Dashboard</h1>

      <div className="dashboard-grid">
        {/* My Properties */}
        <div className="dashboard-section card">
          <div className="card-header">
            <h2>My Rental Properties ({properties.length})</h2>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : properties.length > 0 ? (
            <div className="properties-list">
              {properties.map((property) => (
                <div key={property.id} className="property-item">
                  <div className="property-item-header flex-between">
                    <div>
                      <h3>{property.title}</h3>
                      <p className="text-secondary">{property.location}</p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                  <div className="property-item-details">
                    <span>${property.price?.toLocaleString()}/month</span>
                    <span>{property.bedrooms || 0} Bed</span>
                    <span>{property.bathrooms || 0} Bath</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">No properties listed. Create your first listing!</p>
          )}
        </div>

        {/* Rental Offers */}
        <div className="dashboard-section card">
          <div className="card-header">
            <h2>Tenant Offers ({offers.length})</h2>
          </div>

          {offers.length > 0 ? (
            <div className="offers-list">
              {offers.map((offer) => (
                <div key={offer.id} className="offer-item">
                  <div className="offer-header">
                    <h3>Rental Offer</h3>
                    <span className={`badge badge-${offer.status}`}>{offer.status}</span>
                  </div>
                  <p className="text-secondary text-sm">Offered Amount: ${offer.offer_amount?.toLocaleString()}</p>
                  {offer.message && <p className="text-sm">{offer.message}</p>}
                  {offer.status === 'pending' && (
                    <div className="flex gap-2 mt-2">
                      <button className="btn btn-secondary" onClick={() => handleAcceptOffer(offer.id)}>
                        <FaCheck /> Accept
                      </button>
                      <button className="btn btn-danger" onClick={() => handleRejectOffer(offer.id)}>
                        <FaTimes /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">No offers yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
