// Alert service - handles location-based alerts
import supabase from './supabaseClient';

// Create location alert
export const createLocationAlert = async (userId, alertData) => {
  try {
    const { data, error } = await supabase
      .from('location_alerts')
      .insert([
        {
          user_id: userId,
          ...alertData,
          created_at: new Date(),
          active: true,
        },
      ])
      .select();

    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get user's alerts
export const getUserAlerts = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('location_alerts')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Deactivate alert
export const deactivateAlert = async (alertId) => {
  try {
    const { data, error } = await supabase
      .from('location_alerts')
      .update({ active: false })
      .eq('id', alertId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Check proximity (should be called periodically on client)
export const checkProximityAlert = (userLat, userLon, alertLat, alertLon, radiusKm) => {
  const R = 6371;
  const dLat = ((alertLat - userLat) * Math.PI) / 180;
  const dLon = ((alertLon - userLon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((alertLat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance <= radiusKm;
};
