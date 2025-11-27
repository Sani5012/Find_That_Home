// Offer service - handles rental and purchase offers
import supabase from './supabaseClient';

// Create new offer (rental or purchase)
export const createOffer = async (offerData) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .insert([
        {
          ...offerData,
          created_at: new Date(),
          status: 'pending',
        },
      ])
      .select();

    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get offers for a property
export const getPropertyOffers = async (propertyId) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('property_id', propertyId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get offers made by user
export const getUserOffers = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*, properties(id, title, location, price)')
      .eq('made_by', userId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Accept offer
export const acceptOffer = async (offerId) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ status: 'accepted' })
      .eq('id', offerId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Reject offer
export const rejectOffer = async (offerId) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ status: 'rejected' })
      .eq('id', offerId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get offer by ID
export const getOfferById = async (offerId) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*, properties(id, title, location, price)')
      .eq('id', offerId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
