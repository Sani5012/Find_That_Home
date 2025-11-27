// Property card component
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaBed, FaBath } from 'react-icons/fa';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="property-card-link">
      <div className="property-card">
        {/* Property image */}
        <div className="property-image">
          {property.image_url ? (
            <img src={property.image_url} alt={property.title} />
          ) : (
            <div className="no-image">No Image</div>
          )}
          {property.listing_type === 'rent' && (
            <span className="property-badge rental">For Rent</span>
          )}
          {property.listing_type === 'buy' && (
            <span className="property-badge purchase">For Sale</span>
          )}
        </div>

        {/* Property details */}
        <div className="property-details">
          <h3>{property.title}</h3>

          {/* Location */}
          <p className="property-location">
            <FaMapMarkerAlt /> {property.location}
          </p>

          {/* Rating */}
          {property.rating && (
            <div className="property-rating">
              <FaStar /> {property.rating.toFixed(1)}/5
            </div>
          )}

          {/* Features */}
          <div className="property-features">
            {property.bedrooms && (
              <span>
                <FaBed /> {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span>
                <FaBath /> {property.bathrooms} Baths
              </span>
            )}
          </div>

          {/* Price */}
          <div className="property-price">
            ${property.price?.toLocaleString() || 'N/A'}
            {property.listing_type === 'rent' && <span>/month</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
