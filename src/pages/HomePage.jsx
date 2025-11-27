import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaHeart,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import './HomePage.css';

const cities = ['Hyderabad', 'Pune', 'Delhi', 'Ghaziabad', 'Noida', 'Meerut', 'Bengaluru', 'Chennai'];

const propertyTypes = [
  { label: 'Flat', count: '900+' },
  { label: 'Builder Floor', count: '500+' },
  { label: 'Plot', count: '350+' },
  { label: 'Apartment', count: '780+' },
  { label: 'Independent House', count: '610+' },
];

const featuredProperties = [
  {
    id: 1,
    title: 'Spacious 4BHK in Noida',
    location: 'Sector 143, Noida',
    price: '₹90,00,000',
    area: '2,150 sq.ft',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Luxury Villa with Pool',
    location: 'Hitech City, Hyderabad',
    price: '₹1,85,00,000',
    area: '3,450 sq.ft',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Modern 3BHK Apartment',
    location: 'Kharadi, Pune',
    price: '₹72,00,000',
    area: '1,450 sq.ft',
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Greenview Penthouse',
    location: 'BTM Layout, Bengaluru',
    price: '₹1,10,00,000',
    area: '1,980 sq.ft',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=900&q=80',
  },
];

const platformFeatures = [
  {
    icon: <FaShieldAlt />,
    title: '0 Brokerage Fees',
    description: 'Connect directly with sellers and landlords for transparent deals.',
  },
  {
    icon: <FaCheckCircle />,
    title: 'Genuine Listings',
    description: 'Every property is verified and updated for accuracy and safety.',
  },
  {
    icon: <FaUsers />,
    title: 'Expert Support',
    description: 'Dedicated assistance throughout your buying, selling, or renting journey.',
  },
];

const priceInsights = [
  { city: 'Gurgaon', price: '₹22,936', change: '+3.8%', trend: 'up' },
  { city: 'Delhi', price: '₹13,988', change: '+11.3%', trend: 'up' },
  { city: 'Noida', price: '₹7,925', change: '-1.1%', trend: 'down' },
  { city: 'Ghaziabad', price: '₹5,306', change: '+12.7%', trend: 'up' },
];

const HomePage = () => {
  const [purpose, setPurpose] = useState('buy');

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-text">
            <div className="hero-pill">Premium homes • Trusted owners • Verified brokers</div>
            <h1>
              Ready to <span>Find That Home?</span>
            </h1>
            <p className="hero-subtitle">
              Discover thousands of homes, get expert guidance, and move into a space that feels just right.
            </p>

            <div className="search-card">
              <div className="search-toggle">
                <button
                  className={purpose === 'buy' ? 'active' : ''}
                  onClick={() => setPurpose('buy')}
                  type="button"
                >
                  Buy
                </button>
                <button
                  className={purpose === 'rent' ? 'active' : ''}
                  onClick={() => setPurpose('rent')}
                  type="button"
                >
                  Rent
                </button>
              </div>

              <div className="search-fields">
                <div className="field">
                  <FaSearch />
                  <input type="text" placeholder="Search by locality or project" aria-label="Search homes" />
                </div>
                <div className="field">
                  <FaMapMarkerAlt />
                  <input type="text" placeholder="City" aria-label="City" />
                </div>
                <div className="field">
                  <FaBuilding />
                  <select aria-label="Property type">
                    <option>Property Type</option>
                    <option>Apartment</option>
                    <option>Independent House</option>
                    <option>Villa</option>
                    <option>Plot</option>
                  </select>
                </div>
                <Link to="/search" className="btn btn-primary search-btn">
                  <FaSearch /> Search
                </Link>
              </div>

              <div className="hero-suggestions">
                Popular searches:
                <div className="suggestion-tags">
                  {cities.slice(0, 5).map((city) => (
                    <span key={city}>{city}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-ctas">
              <Link to="/search" className="btn btn-secondary">
                Search Properties
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Post Property Free
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <p>10M+</p>
                <span>Monthly visitors</span>
              </div>
              <div>
                <p>500+</p>
                <span>New properties daily</span>
              </div>
              <div>
                <p>50K+</p>
                <span>Trusted owners</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80"
                alt="Modern living room"
              />
              <div className="visual-overlay">
                <h3>City Views & Smart Living</h3>
                <p>Move into premium spaces with curated amenities.</p>
                <div className="overlay-badges">
                  <span>
                    <FaHeart /> Top choice
                  </span>
                  <span>
                    <FaShieldAlt /> Verified
                  </span>
                </div>
              </div>
            </div>
            <div className="floating-card">
              <div className="avatar" aria-hidden="true" />
              <div>
                <p>“Found my dream home in two weeks. The process was effortless!”</p>
                <small>
                  <FaStar /> 4.9 rating from buyers
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="highlight-bar">
        <div className="container highlight-grid">
          <div className="highlight-card">
            <FaUsers />
            <div>
              <p className="label">Trusted by lakhs</p>
              <p className="value">For home buy & rent</p>
            </div>
          </div>
          <div className="highlight-card">
            <FaCheckCircle />
            <div>
              <p className="label">100% genuine</p>
              <p className="value">Verified listings only</p>
            </div>
          </div>
          <div className="highlight-card">
            <FaHeart />
            <div>
              <p className="label">Zero stress</p>
              <p className="value">Virtual tours & guides</p>
            </div>
          </div>
          <div className="highlight-card">
            <FaShieldAlt />
            <div>
              <p className="label">Secure</p>
              <p className="value">Legal & rental support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property preview cards */}
      <section className="preview-section container">
        <div className="preview-header">
          <h2>Fresh picks near you</h2>
          <Link to="/search" className="inline-link">
            View all <FaArrowRight />
          </Link>
        </div>
        <div className="preview-grid">
          <div className="preview-card">
            <div className="preview-info">
              <h3>Open the doors to your dream home</h3>
              <p>Explore premium homes you can move into right away.</p>
              <div className="preview-meta">
                <span>
                  <FaBuilding /> Apartment
                </span>
                <span>
                  <FaMapMarkerAlt /> 6+ cities
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80"
              alt="Open doors home"
            />
          </div>

          <div className="preview-card">
            <div className="preview-info">
              <h3>Modern stays for every budget</h3>
              <p>Choose from verified rentals with flexible agreements.</p>
              <div className="preview-meta">
                <span>
                  <FaBuilding /> Studio & 2BHK
                </span>
                <span>
                  <FaMapMarkerAlt /> Metro cities
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80"
              alt="Modern rental"
            />
          </div>
        </div>
      </section>

      {/* Property types */}
      <section className="types-section container">
        <h2>Find properties by type</h2>
        <div className="type-tags">
          {propertyTypes.map((type) => (
            <div key={type.label} className="type-tag">
              <span className="type-name">{type.label}</span>
              <span className="type-count">{type.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section className="cities-section container">
        <h2>Explore homes across top cities</h2>
        <div className="city-tags">
          {cities.map((city) => (
            <button key={city} type="button" className="city-tag">
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="steps-section container">
        <div className="section-header">
          <h2>Move in with three easy steps</h2>
          <p>Everything you need to discover, inspect, and finalize your next home.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div>
              <h3>Browse curated properties</h3>
              <p>Filter by location, price, and amenities with instant recommendations.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div>
              <h3>Schedule virtual or in-person visits</h3>
              <p>Book slots that work for you and tour homes with our experts.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div>
              <h3>Seal the deal seamlessly</h3>
              <p>Get paperwork support, rental agreements, and move-in assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="featured-section container">
        <div className="section-header">
          <h2>Handpicked homes for you</h2>
          <p>Verified listings with transparent pricing and detailed amenities.</p>
        </div>
        <div className="featured-grid">
          {featuredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <img src={property.image} alt={property.title} />
                <span className="property-badge">Ready to move</span>
              </div>
              <div className="property-content">
                <div className="property-title">
                  <div>
                    <h3>{property.title}</h3>
                    <p className="property-location">
                      <FaMapMarkerAlt /> {property.location}
                    </p>
                  </div>
                  <span className="property-price">{property.price}</span>
                </div>
                <div className="property-meta">
                  <span>
                    <FaBuilding /> {property.area}
                  </span>
                  <span>
                    <FaStar /> {property.rating}
                  </span>
                </div>
                <Link to={`/property/${property.id}`} className="inline-link">
                  View details <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Price insights */}
      <section className="insights-section container">
        <div className="section-header">
          <h2>Market snapshots</h2>
          <p>Real-time price per sq.ft across major cities.</p>
        </div>
        <div className="insights-grid">
          {priceInsights.map((item) => (
            <div key={item.city} className="insight-card">
              <div className="insight-top">
                <h3>{item.city}</h3>
                <span className={`trend ${item.trend === 'up' ? 'up' : 'down'}`}>{item.change}</span>
              </div>
              <p className="insight-price">{item.price} / sq.ft</p>
              <p className="insight-sub">Feb 2025</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform features */}
      <section className="platform-section container">
        <div className="section-header">
          <h2>Built to make home search effortless</h2>
          <p>From discovery to move-in, we combine technology and human support.</p>
        </div>
        <div className="platform-grid">
          {platformFeatures.map((feature) => (
            <div key={feature.title} className="platform-card">
              <div className="platform-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-card">
          <div>
            <p className="cta-tag">Ready in a few clicks</p>
            <h2>Move into a new home without the usual hassle</h2>
            <p className="cta-text">Talk to our property advisors and get guided options tailored to you.</p>
            <div className="cta-actions">
              <Link to="/search" className="btn btn-primary">
                Find Properties
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Talk to an expert
              </Link>
            </div>
          </div>
          <div className="cta-badge">
            <p>New</p>
            <strong>Concierge Support</strong>
            <span>From ₹1999/month</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h3>Find That Home</h3>
            <p>India&apos;s most trusted home discovery platform.</p>
          </div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Help</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Sitemap</a>
            <a href="#">Support</a>
          </div>
        </div>
        <p className="footer-bottom">© 2025 Find That Home. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
