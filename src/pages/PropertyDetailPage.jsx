// Property detail page
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { getPropertyById } from '../services/propertyService';
import { createOffer } from '../services/offerService';
import { useAuth } from '../context/AuthContext';
import { FaMapMarkerAlt, FaStar, FaBed, FaBath, FaDownload } from 'react-icons/fa';
import '../styles/property-detail.css';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { user, userProfile } = useAuth();
  const qrCanvasRef = useRef(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await getPropertyById(id);
      if (!error) {
        setProperty(data);
        // Generate QR code
        if (qrCanvasRef.current) {
          QRCode.toCanvas(
            qrCanvasRef.current,
            `${window.location.origin}/property/${id}`,
            { width: 200 },
            (error) => {
              if (error) console.error('Error generating QR code:', error);
            }
          );
        }
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  const handleMakeOffer = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage('Please log in to make an offer');
      return;
    }

    if (userProfile?.user_type === property?.listing_type === 'rent' ? 'tenant' : 'buyer') {
      setSubmittingOffer(true);
      try {
        const { data, error } = await createOffer({
          property_id: id,
          made_by: user.id,
          offer_amount: parseFloat(offerAmount),
          message: offerMessage,
          offer_type: property.listing_type === 'rent' ? 'rental' : 'purchase',
        });

        if (error) throw new Error(error);

        setMessage('Offer submitted successfully!');
        setOfferAmount('');
        setOfferMessage('');
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setSubmittingOffer(false);
      }
    } else {
      setMessage('You must be a tenant or buyer to make an offer');
    }
  };

  const downloadQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(
        `${window.location.origin}/property/${id}`,
        { width: 300 }
      );
      const link = document.createElement('a');
      link.download = `property-${id}-qr.png`;
      link.href = qrDataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  if (loading) {
    return (
      <div className="container flex-center mt-4">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Property not found</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="property-detail-grid">
        {/* Main content */}
        <div className="property-detail-main">
          {/* Property image */}
          <div className="property-detail-image">
            {property.image_url ? (
              <img src={property.image_url} alt={property.title} />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
          </div>

          {/* Property info */}
          <div className="card">
            <div className="card-header">
              <h1>{property.title}</h1>
            </div>

            <p className="property-location-detail">
              <FaMapMarkerAlt /> {property.location}
            </p>

            {property.rating && (
              <div className="property-rating-detail">
                <FaStar /> {property.rating.toFixed(1)}/5.0
              </div>
            )}

            <div className="property-features-detail">
              {property.bedrooms && (
                <div>
                  <FaBed /> {property.bedrooms} Bedrooms
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <FaBath /> {property.bathrooms} Bathrooms
                </div>
              )}
              {property.size && <div>Size: {property.size} sq ft</div>}
            </div>

            <div className="property-price-detail">
              ${property.price?.toLocaleString()}
              {property.listing_type === 'rent' && <span>/month</span>}
            </div>

            {property.description && (
              <>
                <h3>Description</h3>
                <p>{property.description}</p>
              </>
            )}

            {property.amenities && (
              <>
                <h3>Amenities</h3>
                <div className="amenities-list">
                  {property.amenities
                    .split(',')
                    .map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity.trim()}
                      </span>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Make offer section */}
          {user && (userProfile?.user_type === 'tenant' || userProfile?.user_type === 'buyer') && (
            <div className="card mt-4">
              <div className="card-header">
                <h2>Make an Offer</h2>
              </div>

              {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleMakeOffer}>
                <div className="form-group">
                  <label htmlFor="offerAmount">Offer Amount ($)</label>
                  <input
                    id="offerAmount"
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    required
                    min="0"
                    step="100"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="offerMessage">Message (Optional)</label>
                  <textarea
                    id="offerMessage"
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    rows="4"
                    placeholder="Add a message with your offer..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={submittingOffer}>
                  {submittingOffer ? 'Submitting...' : 'Submit Offer'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="property-detail-sidebar">
          {/* QR Code */}
          <div className="card">
            <div className="card-header">
              <h3>QR Code</h3>
            </div>
            <div className="qr-code-container">
              <canvas ref={qrCanvasRef}></canvas>
            </div>
            <button onClick={downloadQRCode} className="btn btn-primary btn-block mt-2">
              <FaDownload /> Download QR
            </button>
          </div>

          {/* Agent info (if available) */}
          {property.agent_name && (
            <div className="card mt-4">
              <div className="card-header">
                <h3>Listed By</h3>
              </div>
              <p className="font-bold">{property.agent_name}</p>
              {property.agent_email && <p className="text-sm">{property.agent_email}</p>}
              {property.agent_phone && <p className="text-sm">{property.agent_phone}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
