-- Supabase Database Schema for Find That Home Platform
-- This file contains all the SQL needed to set up the database
-- Run these queries in your Supabase SQL Editor

-- ===========================================================================
-- 1. USERS TABLE
-- ===========================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_type VARCHAR(50) NOT NULL, -- tenant, buyer, landlord, agent, admin
  full_name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  profile_picture_url TEXT,
  tokens INTEGER DEFAULT 0, -- For agents only
  budget_min DECIMAL(15, 2), -- For buyers
  budget_max DECIMAL(15, 2), -- For buyers
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================================
-- 2. PROPERTIES TABLE
-- ===========================================================================
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  price DECIMAL(15, 2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  size VARCHAR(50), -- in sq ft
  type VARCHAR(50), -- apartment, house, studio, commercial
  listing_type VARCHAR(50) NOT NULL, -- rent or buy
  amenities TEXT, -- comma-separated
  image_url TEXT,
  rating DECIMAL(3, 2),
  listed_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_name VARCHAR(255),
  agent_email VARCHAR(255),
  agent_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================================
-- 3. OFFERS TABLE
-- ===========================================================================
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  made_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  offer_amount DECIMAL(15, 2) NOT NULL,
  message TEXT,
  offer_type VARCHAR(50), -- rental or purchase
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================================
-- 4. TOKENS TABLE (System Settings)
-- ===========================================================================
CREATE TABLE token_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  price_per_token DECIMAL(8, 2) DEFAULT 5.00,
  listing_duration_days INTEGER DEFAULT 30,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================================
-- 5. TRANSACTIONS TABLE
-- ===========================================================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50), -- token_purchase, token_usage, offer_accepted
  amount DECIMAL(15, 2),
  tokens INTEGER,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'completed', -- pending, completed, failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================================
-- 6. LOCATION ALERTS TABLE
-- ===========================================================================
CREATE TABLE location_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  radius_km DECIMAL(5, 2) DEFAULT 5,
  min_price DECIMAL(15, 2),
  max_price DECIMAL(15, 2),
  property_type VARCHAR(50),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================================
-- 7. LEGAL DOCUMENTS TABLE
-- ===========================================================================
CREATE TABLE legal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id UUID NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  document_type VARCHAR(100), -- rental_agreement, purchase_contract, etc
  document_url TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, signed, completed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================================
-- 8. CREATE INDEXES FOR BETTER PERFORMANCE
-- ===========================================================================
CREATE INDEX idx_properties_listing_type ON properties(listing_type);
CREATE INDEX idx_properties_location ON properties USING GIN(to_tsvector('english', location));
CREATE INDEX idx_properties_listed_by ON properties(listed_by);
CREATE INDEX idx_offers_property_id ON offers(property_id);
CREATE INDEX idx_offers_made_by ON offers(made_by);
CREATE INDEX idx_offers_status ON offers(status);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_location_alerts_user_id ON location_alerts(user_id);

-- ===========================================================================
-- 9. ENABLE ROW LEVEL SECURITY (RLS)
-- ===========================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_alerts ENABLE ROW LEVEL SECURITY;

-- ===========================================================================
-- 10. RLS POLICIES
-- ===========================================================================

-- Users can insert their own profile during signup
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Anyone can view published properties
CREATE POLICY "Anyone can view properties" ON properties
  FOR SELECT USING (true);

-- Properties can be updated/deleted by owner
CREATE POLICY "Users can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = listed_by);

CREATE POLICY "Users can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = listed_by);

-- Users can create offers
CREATE POLICY "Users can create offers" ON offers
  FOR INSERT WITH CHECK (auth.uid() = made_by);

-- Users can view offers on their properties and their own offers
CREATE POLICY "Users can view offers" ON offers
  FOR SELECT USING (
    auth.uid() = made_by OR
    auth.uid() = (SELECT listed_by FROM properties WHERE id = property_id)
  );

-- ===========================================================================
-- 11. INSERT INITIAL TOKEN SETTINGS
-- ===========================================================================
INSERT INTO token_settings (price_per_token, listing_duration_days) 
VALUES (5.00, 30) 
ON CONFLICT DO NOTHING;

-- ===========================================================================
-- NOTES FOR SETUP
-- ===========================================================================
/*
1. Create a Supabase project at https://app.supabase.com
2. Go to SQL Editor and run this entire script
3. Go to Authentication > Users to create test users or use signup form
4. Update .env file with your VITE_SUPABASE_URL and VITE_SUPABASE_KEY
5. These values are found in Project Settings > API

Test User Credentials (create via Signup or directly in Auth):
- Tenant: tenant@test.com / Test@123
- Agent: agent@test.com / Test@123
- Landlord: landlord@test.com / Test@123
- Admin: admin@test.com / Test@123

The RLS policies ensure users can only see/modify their own data.
Adjust policies as needed for your specific use case.
*/
