import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHome, FaMapMarkerAlt, FaPoundSign, FaStar } from 'react-icons/fa';
import { getProperties } from '../services/propertyService';
import supabase from '../services/supabaseClient';
import './HomePage.css';

const ukCities = ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Edinburgh', 'Glasgow', 'Bristol'];

const formatPrice = (price, listingType) => {
  if (!price) return 'Price on enquiry';

  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price);

  return listingType === 'rent' ? `${formatted} pcm` : formatted;
};

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error: fetchError } = await getProperties();

      if (fetchError) {
        setError('Unable to load the latest properties right now. Please try again later.');
      } else {
        setError('');
        setProperties(
          (data || []).sort((a, b) => new Date(b?.created_at || 0) - new Date(a?.created_at || 0))
        );
      }
      setLoading(false);
    };

    fetchProperties();

    const channel = supabase
      .channel('properties-homepage')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'properties' }, (payload) => {
        setProperties((prev) => [payload.new, ...prev]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'properties' }, (payload) => {
        setProperties((prev) => prev.map((property) => (property.id === payload.new.id ? payload.new : property)));
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const visibleProperties = useMemo(() => properties.slice(0, 6), [properties]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">UK homes only • No mock listings • Real-time updates</p>
            <h1>
              Find a place to call home <span>across the UK</span>
            </h1>
            <p className="subtitle">
              Browse real properties from agents and landlords in London, Manchester, Edinburgh, and beyond. New
              listings appear instantly once an agent adds them.
            </p>
            <div className="hero-actions">
              <Link to="/search" className="btn btn-primary">
                Start your search
              </Link>
              <Link to="/list-property" className="btn btn-outline">
                List a property
              </Link>
            </div>
            <div className="city-pills" aria-label="Popular UK cities">
              {ukCities.map((city) => (
                <span key={city} className="pill">
                  <FaMapMarkerAlt /> {city}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-card" aria-hidden="true">
            <div className="hero-card__header">
              <FaHome />
              <span>Live UK Listings</span>
            </div>
            <div className="hero-card__body">
              <p>Properties sync directly from your Supabase table.</p>
              <p className="muted">See the latest additions the moment agents publish them.</p>
              <div className="hero-card__stat">
                <strong>{properties.length}</strong>
                <span>homes ready to view</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Latest UK listings</p>
            <h2>Real properties pulled straight from Supabase</h2>
            <p className="subtitle">Fresh additions from your agents and landlords—no filler, no mock data.</p>
          </div>
          <Link to="/search" className="inline-link">
            View all <FaArrowRight />
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="flex-center">
            <div className="spinner" aria-label="Loading properties" />
          </div>
        ) : visibleProperties.length === 0 ? (
          <div className="empty-state">
            <p>No properties are available yet. Check back soon or add the first one.</p>
            <Link to="/list-property" className="btn btn-secondary">
              List a property
            </Link>
          </div>
        ) : (
          <div className="property-grid">
            {visibleProperties.map((property) => (
              <article key={property.id} className="property-card">
                <div className="property-image">
                  {property.image_url ? (
                    <img src={property.image_url} alt={property.title || 'Property'} />
                  ) : (
                    <div className="placeholder">No image</div>
                  )}
                  <span className="badge">{property.listing_type === 'rent' ? 'To let' : 'For sale'}</span>
                </div>
                <div className="property-content">
                  <div className="property-header">
                    <h3>{property.title || 'Untitled listing'}</h3>
                    <p className="price">{formatPrice(property.price, property.listing_type)}</p>
                  </div>
                  <p className="location">
                    <FaMapMarkerAlt /> {property.location || 'Location coming soon'}
                  </p>
                  <div className="property-meta">
                    {property.bedrooms && <span>{property.bedrooms} bed</span>}
                    {property.bathrooms && <span>{property.bathrooms} bath</span>}
                    {property.size && <span>{property.size} sq ft</span>}
                  </div>
                  {property.rating && (
                    <div className="rating">
                      <FaStar /> {property.rating.toFixed(1)}
                    </div>
                  )}
                  <div className="card-actions">
                    <Link to={`/property/${property.id}`} className="inline-link">
                      View details <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="container section highlight">
        <div>
          <p className="eyebrow">Built for UK movers</p>
          <h2>Simple, responsive, and ready for every device</h2>
          <p className="subtitle">
            The homepage stays in sync with your Supabase <code>properties</code> table, so every new listing from your
            agents is visible instantly.
          </p>
        </div>
        <div className="highlight-grid">
          <div className="highlight-card">
            <FaHome />
            <div>
              <h3>Real data only</h3>
              <p>Every card on this page is powered by live entries from Supabase.</p>
            </div>
          </div>
          <div className="highlight-card">
            <FaMapMarkerAlt />
            <div>
              <h3>UK focus</h3>
              <p>London, Manchester, Edinburgh, and every region in between.</p>
            </div>
          </div>
          <div className="highlight-card">
            <FaPoundSign />
            <div>
              <h3>Clear pricing</h3>
              <p>Prices use pound sterling with monthly rent labels where relevant.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
