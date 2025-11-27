// List property page for agents and landlords
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../services/propertyService';
import { useAuth } from '../context/AuthContext';

const ListPropertyPage = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    propertyType: 'apartment',
    listingType: 'rent',
    amenities: '',
    imageUrl: '',
    rating: '4.5',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) throw new Error('You must be logged in to list a property');
      if (userProfile?.user_type !== 'agent' && userProfile?.user_type !== 'landlord') {
        throw new Error('Only agents and landlords can list properties');
      }

      const { data, error } = await createProperty({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        latitude: parseFloat(formData.latitude) || null,
        longitude: parseFloat(formData.longitude) || null,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms) || null,
        bathrooms: parseInt(formData.bathrooms) || null,
        size: formData.size || null,
        type: formData.propertyType,
        listing_type: formData.listingType,
        amenities: formData.amenities,
        image_url: formData.imageUrl,
        rating: parseFloat(formData.rating) || null,
        listed_by: user.id,
        agent_name: userProfile?.full_name,
        agent_email: user.email,
        created_at: new Date(),
      });

      if (error) throw new Error(error);

      navigate('/search');
    } catch (err) {
      setError(err.message || 'Failed to list property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="form-card card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card-header">
          <h1>List a Property</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Property Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Beautiful 2BR Apartment in Downtown"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your property..."
              required
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label htmlFor="location">Location (Address) *</label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Street address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyType">Property Type *</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* Latitude & Longitude for GPS */}
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label htmlFor="latitude">Latitude (GPS)</label>
              <input
                id="latitude"
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="e.g., 40.7128"
                step="0.0001"
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude (GPS)</label>
              <input
                id="longitude"
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="e.g., -74.0060"
                step="0.0001"
              />
            </div>
          </div>

          {/* Price & Listing Type */}
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="listingType">Listing Type *</label>
              <select
                id="listingType"
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
              >
                <option value="rent">For Rent</option>
                <option value="buy">For Sale</option>
              </select>
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                id="bedrooms"
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                id="bathrooms"
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Size */}
          <div className="form-group">
            <label htmlFor="size">Size (sq ft)</label>
            <input
              id="size"
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="1500"
            />
          </div>

          {/* Amenities */}
          <div className="form-group">
            <label htmlFor="amenities">Amenities (comma-separated)</label>
            <textarea
              id="amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              rows="3"
              placeholder="e.g., WiFi, Parking, Air Conditioning, Swimming Pool"
            />
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Rating */}
          <div className="form-group">
            <label htmlFor="rating">Initial Rating (0-5)</label>
            <input
              id="rating"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Listing...' : 'List Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListPropertyPage;
