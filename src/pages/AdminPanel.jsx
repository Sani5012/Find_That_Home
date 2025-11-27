// Admin Panel
import { useState, useEffect } from 'react';
import { getProperties } from '../services/propertyService';
import { getTransactionHistory } from '../services/tokenService';
import { FaUsers, FaHome, FaDollarSign } from 'react-icons/fa';
import '../styles/dashboard.css';

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalTransactions: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [tokenPrice, setTokenPrice] = useState('5');
  const [listingDuration, setListingDuration] = useState('30');

  useEffect(() => {
    const fetchAdminData = async () => {
      const { data: propsData } = await getProperties();
      setProperties(propsData || []);

      // Calculate stats
      const totalRevenue = (propsData || []).reduce((sum, p) => sum + (p.price || 0), 0);
      
      setStats({
        totalProperties: propsData?.length || 0,
        totalRevenue: totalRevenue,
      });

      setLoading(false);
    };

    fetchAdminData();
  }, []);

  const handleUpdateTokenSettings = () => {
    // This would call an admin API to update token pricing
    console.log('Update token settings:', { tokenPrice, listingDuration });
  };

  return (
    <div className="container dashboard-container mt-4">
      <h1>Admin Panel</h1>

      {/* Statistics */}
      <div className="dashboard-grid">
        <div className="dashboard-section card stat-card">
          <div className="stat-content">
            <div className="stat-icon"><FaHome /></div>
            <div>
              <p className="text-secondary">Total Properties</p>
              <h3>{stats.totalProperties}</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-section card stat-card">
          <div className="stat-content">
            <div className="stat-icon"><FaDollarSign /></div>
            <div>
              <p className="text-secondary">Total Listing Value</p>
              <h3>${(stats.totalRevenue / 1000).toFixed(1)}K</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-section card stat-card">
          <div className="stat-content">
            <div className="stat-icon"><FaUsers /></div>
            <div>
              <p className="text-secondary">Platform Users</p>
              <h3>Loading...</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Token Settings */}
      <div className="card mt-4">
        <div className="card-header">
          <h2>Token Settings</h2>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label>Price Per Token ($)</label>
            <input
              type="number"
              value={tokenPrice}
              onChange={(e) => setTokenPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Default Listing Duration (days)</label>
            <input
              type="number"
              value={listingDuration}
              onChange={(e) => setListingDuration(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleUpdateTokenSettings}>
          Update Settings
        </button>
      </div>

      {/* Properties List */}
      <div className="card mt-4">
        <div className="card-header">
          <h2>All Properties</h2>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : properties.length > 0 ? (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Listed By</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {properties.slice(0, 10).map((property) => (
                  <tr key={property.id}>
                    <td>{property.title}</td>
                    <td>{property.location}</td>
                    <td>{property.listing_type}</td>
                    <td>${property.price?.toLocaleString()}</td>
                    <td>{property.agent_name || 'N/A'}</td>
                    <td>{new Date(property.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-secondary">No properties found</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
