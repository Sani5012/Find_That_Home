// Token service - handles agent token purchases and usage
import supabase from './supabaseClient';

// Get agent's current tokens
export const getAgentTokens = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('tokens')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { data: data.tokens || 0, error: null };
  } catch (error) {
    return { data: 0, error: error.message };
  }
};

// Purchase tokens
export const purchaseTokens = async (userId, quantity, pricePerToken) => {
  try {
    const totalCost = quantity * pricePerToken;

    // Create transaction record
    const { data: transaction, error: transError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'token_purchase',
          amount: totalCost,
          tokens: quantity,
          status: 'completed',
          created_at: new Date(),
        },
      ])
      .select();

    if (transError) throw transError;

    // Update user tokens
    const currentTokens = await getAgentTokens(userId);
    const newTokens = (currentTokens.data || 0) + quantity;

    const { data, error } = await supabase
      .from('users')
      .update({ tokens: newTokens })
      .eq('id', userId);

    if (error) throw error;
    return { data: { tokens: newTokens, transaction: transaction[0] }, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Use tokens for property listing
export const useTokensForListing = async (userId, tokensUsed, propertyId) => {
  try {
    const currentTokens = await getAgentTokens(userId);
    if (currentTokens.data < tokensUsed) {
      throw new Error('Insufficient tokens');
    }

    const newTokens = currentTokens.data - tokensUsed;

    // Update user tokens
    const { error } = await supabase
      .from('users')
      .update({ tokens: newTokens })
      .eq('id', userId);

    if (error) throw error;

    // Create transaction record
    await supabase.from('transactions').insert([
      {
        user_id: userId,
        type: 'token_usage',
        tokens: tokensUsed,
        property_id: propertyId,
        status: 'completed',
        created_at: new Date(),
      },
    ]);

    return { data: newTokens, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get transaction history
export const getTransactionHistory = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get token pricing (admin)
export const getTokenPricing = async () => {
  try {
    const { data, error } = await supabase
      .from('token_settings')
      .select('*')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Update token pricing (admin only)
export const updateTokenPricing = async (pricePerToken, listingDuration) => {
  try {
    const { data, error } = await supabase
      .from('token_settings')
      .update({
        price_per_token: pricePerToken,
        listing_duration_days: listingDuration,
        updated_at: new Date(),
      });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
