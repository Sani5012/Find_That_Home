// Property service - handles all property operations
import supabase from './supabaseClient';

// Create new property listing
export const createProperty = async (propertyData) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select();

    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get all properties with optional filters
export const getProperties = async (filters = {}) => {
  try {
    let query = supabase.from('properties').select('*');

    // Apply filters
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      query = query
        .gte('price', filters.minPrice)
        .lte('price', filters.maxPrice);
    }
    if (filters.propertyType) {
      query = query.eq('type', filters.propertyType);
    }
    if (filters.listingType) {
      query = query.eq('listing_type', filters.listingType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get property by ID
export const getPropertyById = async (propertyId) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get properties by agent/landlord
export const getPropertiesByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('listed_by', userId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Update property
export const updateProperty = async (propertyId, updates) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', propertyId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Delete property
export const deleteProperty = async (propertyId) => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Search properties by location (for proximity alerts)
export const searchPropertiesByLocation = async (latitude, longitude, radiusKm = 5) => {
  try {
    // Get all properties first
    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (error) throw error;

    // Filter by distance manually (Supabase doesn't have built-in geospatial queries on free tier)
    const filtered = data.filter((property) => {
      if (!property.latitude || !property.longitude) return false;
      const distance = calculateDistance(
        latitude,
        longitude,
        property.latitude,
        property.longitude
      );
      return distance <= radiusKm;
    });

    return { data: filtered, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
