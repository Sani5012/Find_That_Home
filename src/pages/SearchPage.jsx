// Property search page
import { useState, useEffect } from 'react';
import { getProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import '../styles/search.css';

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    listingType: '',
  });

  // Fetch properties on component mount and when filters change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await getProperties(filters);
      if (!error) {
        setProperties(data || []);
      }
      setLoading(false);
    };

    // Debounce search
    const timer = setTimeout(fetchProperties, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h1>Search Properties</h1>

      {/* Filters */}
      <div className="filters-card card">
        <div className="grid grid-cols-2">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="City or area..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="propertyType">Property Type</label>
            <select
              id="propertyType"
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="minPrice">Min Price</label>
            <input
              id="minPrice"
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              id="maxPrice"
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="999999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingType">Listing Type</label>
            <select
              id="listingType"
              name="listingType"
              value={filters.listingType}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="flex-center mt-4">
          <div className="spinner"></div>
        </div>
      ) : properties.length > 0 ? (
        <div className="properties-grid grid grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info mt-4">
          No properties found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
};

export default SearchPage;
