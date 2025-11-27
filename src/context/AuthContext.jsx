// Auth context for managing user authentication state
import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, getUserProfile } from '../services/authService';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getCurrentUser();
      if (user) {
        setUser(user);
        // Get user profile
        const { data: profile } = await getUserProfile(user.id);
        setUserProfile(profile);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    setUser,
    setUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
