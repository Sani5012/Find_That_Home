// Agent Dashboard
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPropertiesByUser, updateProperty, deleteProperty } from '../services/propertyService';
import { getPropertyOffers } from '../services/offerService';
import { getAgentTokens, purchaseTokens, getTransactionHistory } from '../services/tokenService';
import { FaGem, FaHome, FaClipboard, FaTrash, FaDollarSign } from 'react-icons/fa';
import '../styles/dashboard.css';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [tokens, setTokens] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenPurchaseAmount, setTokenPurchaseAmount] = useState('10');
  const [showTokenModal, setShowTokenModal] = useState(false);

  useEffect(() => {
    const fetchAgentData = async () => {
      if (user) {
        // Fetch properties
        const { data: propsData } = await getPropertiesByUser(user.id);
        setProperties(propsData || []);

        // Fetch tokens
        const { data: tokensData } = await getAgentTokens(user.id);
        setTokens(tokensData);

        // Fetch transaction history
        const { data: transData } = await getTransactionHistory(user.id);
        setTransactions(transData || []);
      }
      setLoading(false);
    };

    fetchAgentData();
  }, [user]);

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(propertyId);
      setProperties(properties.filter((p) => p.id !== propertyId));
    }
  };

  const handlePurchaseTokens = async () => {
    if (user) {
      const { data, error } = await purchaseTokens(user.id, parseInt(tokenPurchaseAmount), 5);
      if (!error) {
        setTokens(data.tokens);
        setShowTokenModal(false);
        setTokenPurchaseAmount('10');
      }
    }
  };

  return (
    <div className="container dashboard-container mt-4">
      <h1>Agent Dashboard</h1>

      {/* Token Status */}
      <div className="dashboard-grid">
        <div className="dashboard-section card token-card">
          <div className="card-header flex-between">
            <div className="flex gap-2">
              <FaGem /> <h2>Your Tokens</h2>
            </div>
            <div className="token-balance">{tokens}</div>
          </div>
          <p className="text-secondary">Tokens are used to list properties and access premium features</p>
          <button className="btn btn-primary mt-2" onClick={() => setShowTokenModal(true)}>
            <FaDollarSign /> Purchase Tokens
          </button>
        </div>

        {/* My Properties */}
        <div className="dashboard-section card">
          <div className="card-header">
            <h2>My Properties ({properties.length})</h2>
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
                    <div className="property-item-actions">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                  <div className="property-item-details">
                    <span>${property.price?.toLocaleString()}</span>
                    <span>{property.type}</span>
                    <span>{property.listing_type === 'rent' ? 'Rental' : 'Sale'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">No properties listed yet. Start listing!</p>
          )}
        </div>

        {/* Transaction History */}
        <div className="dashboard-section card">
          <div className="card-header">
            <h2>Token Transactions</h2>
          </div>

          {transactions.length > 0 ? (
            <div className="transactions-list">
              {transactions.slice(0, 5).map((trans) => (
                <div key={trans.id} className="transaction-item flex-between">
                  <div>
                    <strong>{trans.type === 'token_purchase' ? 'Purchase' : 'Usage'}</strong>
                    <p className="text-secondary text-sm">
                      {new Date(trans.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <strong>{trans.tokens || 0} tokens</strong>
                    <p className="text-secondary text-sm">${trans.amount || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">No transactions yet</p>
          )}
        </div>
      </div>

      {/* Token Purchase Modal */}
      {showTokenModal && (
        <div className="modal-overlay" onClick={() => setShowTokenModal(false)}>
          <div className="modal card" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h2>Purchase Tokens</h2>
            </div>
            <p>Price per token: $5</p>
            <div className="form-group">
              <label>Number of Tokens</label>
              <input
                type="number"
                value={tokenPurchaseAmount}
                onChange={(e) => setTokenPurchaseAmount(e.target.value)}
                min="1"
              />
            </div>
            <p className="text-secondary">
              Total: ${parseInt(tokenPurchaseAmount) * 5}
            </p>
            <div className="flex gap-2">
              <button className="btn btn-primary flex-1" onClick={handlePurchaseTokens}>
                Purchase
              </button>
              <button className="btn btn-outline flex-1" onClick={() => setShowTokenModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
