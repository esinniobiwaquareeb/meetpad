-- =====================================================
-- MeetPad Database Schema
-- Complete SQL schema for Supabase
-- Created: 2024
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "user" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  "firstName" TEXT,
  "lastName" TEXT,
  profession TEXT,
  country TEXT,
  language TEXT,
  city TEXT,
  about TEXT,
  website_url TEXT,
  linkedIn_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  image_url TEXT,
  stripe_verified BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  plan TEXT DEFAULT 'free',
  min_amount DECIMAL(10,2) DEFAULT 0
);

-- =====================================================
-- 2. AVAILABILITY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "availability" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sun TEXT[] DEFAULT '{}',
  mon TEXT[] DEFAULT '{}',
  tue TEXT[] DEFAULT '{}',
  wed TEXT[] DEFAULT '{}',
  thu TEXT[] DEFAULT '{}',
  fri TEXT[] DEFAULT '{}',
  sat TEXT[] DEFAULT '{}'
);

-- =====================================================
-- 3. SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "service" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  "startDate" DATE NOT NULL,
  "endDate" DATE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  "userId" UUID REFERENCES "user"(id) ON DELETE CASCADE,
  duration INTEGER NOT NULL,
  meeting_types TEXT[] DEFAULT '{}',
  "availabilityId" UUID REFERENCES "availability"(id) ON DELETE CASCADE,
  image_url TEXT
);

-- =====================================================
-- 4. GUESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "guest" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  note TEXT,
  "userId" UUID REFERENCES "user"(id) ON DELETE CASCADE,
  country_code TEXT,
  phoneNumber TEXT
);

-- =====================================================
-- 5. MEETINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "meeting" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  time TIME NOT NULL,
  duration INTEGER NOT NULL,
  date DATE NOT NULL,
  "userId" UUID REFERENCES "user"(id) ON DELETE CASCADE,
  guest UUID REFERENCES "guest"(id) ON DELETE CASCADE,
  service UUID REFERENCES "service"(id) ON DELETE CASCADE,
  link TEXT,
  type TEXT
);

-- =====================================================
-- 6. SUBSCRIPTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "subscription" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "userId" UUID REFERENCES "user"(id) ON DELETE CASCADE,
  "startDate" DATE NOT NULL,
  "endDate" DATE NOT NULL,
  plan TEXT NOT NULL,
  period TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active'
);

-- =====================================================
-- 7. WALLET HISTORY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "wallet_history" (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT CHECK (type IN ('WITHDRAWAL', 'CREDIT')) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  "userId" UUID REFERENCES "user"(id) ON DELETE CASCADE
);

-- =====================================================
-- 8. EARNINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "earning" (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  "userId" UUID REFERENCES "user"(id) ON DELETE CASCADE,
  "meetingId" UUID REFERENCES "meeting"(id) ON DELETE CASCADE
);

-- =====================================================
-- 9. NEWSLETTER SUBSCRIBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  subscribed BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- User indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);
CREATE INDEX IF NOT EXISTS idx_user_username ON "user"(username);
CREATE INDEX IF NOT EXISTS idx_user_stripe_customer_id ON "user"(stripe_customer_id);

-- Service indexes
CREATE INDEX IF NOT EXISTS idx_service_userid ON "service"("userId");
CREATE INDEX IF NOT EXISTS idx_service_availabilityid ON "service"("availabilityId");
CREATE INDEX IF NOT EXISTS idx_service_dates ON "service"("startDate", "endDate");

-- Meeting indexes
CREATE INDEX IF NOT EXISTS idx_meeting_userid ON "meeting"("userId");
CREATE INDEX IF NOT EXISTS idx_meeting_guest ON "meeting"(guest);
CREATE INDEX IF NOT EXISTS idx_meeting_service ON "meeting"(service);
CREATE INDEX IF NOT EXISTS idx_meeting_date ON "meeting"(date);
CREATE INDEX IF NOT EXISTS idx_meeting_status ON "meeting"(status);

-- Guest indexes
CREATE INDEX IF NOT EXISTS idx_guest_userid ON "guest"("userId");
CREATE INDEX IF NOT EXISTS idx_guest_email ON "guest"(email);

-- Subscription indexes
CREATE INDEX IF NOT EXISTS idx_subscription_userid ON "subscription"("userId");
CREATE INDEX IF NOT EXISTS idx_subscription_status ON "subscription"(status);

-- Financial indexes
CREATE INDEX IF NOT EXISTS idx_wallet_history_userid ON "wallet_history"("userId");
CREATE INDEX IF NOT EXISTS idx_wallet_history_date ON "wallet_history"(date);
CREATE INDEX IF NOT EXISTS idx_wallet_history_type ON "wallet_history"(type);

CREATE INDEX IF NOT EXISTS idx_earning_userid ON "earning"("userId");
CREATE INDEX IF NOT EXISTS idx_earning_meetingid ON "earning"("meetingId");
CREATE INDEX IF NOT EXISTS idx_earning_date ON "earning"(date);

-- Newsletter indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON "newsletter_subscribers"(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON "newsletter_subscribers"(subscribed);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "availability" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "service" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "guest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "meeting" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "wallet_history" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "earning" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "newsletter_subscribers" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- User policies
CREATE POLICY "Enable read access for users based on user_id" ON "user" FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Enable update for users based on user_id" ON "user" FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Enable insert for authenticated users only" ON "user" FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Service policies
CREATE POLICY "Users can view own services" ON "service" FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can insert own services" ON "service" FOR INSERT WITH CHECK (auth.uid() = "userId");
CREATE POLICY "Users can update own services" ON "service" FOR UPDATE USING (auth.uid() = "userId");
CREATE POLICY "Users can delete own services" ON "service" FOR DELETE USING (auth.uid() = "userId");
-- Public read access for services (for booking)
CREATE POLICY "Public can view services" ON "service" FOR SELECT USING (true);

-- Meeting policies
CREATE POLICY "Users can view own meetings" ON "meeting" FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can insert own meetings" ON "meeting" FOR INSERT WITH CHECK (auth.uid() = "userId");
CREATE POLICY "Users can update own meetings" ON "meeting" FOR UPDATE USING (auth.uid() = "userId");
CREATE POLICY "Users can delete own meetings" ON "meeting" FOR DELETE USING (auth.uid() = "userId");

-- Guest policies
CREATE POLICY "Users can view own guests" ON "guest" FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can insert guests" ON "guest" FOR INSERT WITH CHECK (auth.uid() = "userId");
CREATE POLICY "Users can update own guests" ON "guest" FOR UPDATE USING (auth.uid() = "userId");

-- Availability policies
CREATE POLICY "Users can manage availability" ON "availability" FOR ALL USING (true);

-- Subscription policies
CREATE POLICY "Users can view own subscription" ON "subscription" FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can manage own subscription" ON "subscription" FOR ALL USING (auth.uid() = "userId");

-- Wallet and earnings policies
CREATE POLICY "Users can view own wallet history" ON "wallet_history" FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can insert own wallet history" ON "wallet_history" FOR INSERT WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can view own earnings" ON "earning" FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can insert own earnings" ON "earning" FOR INSERT WITH CHECK (auth.uid() = "userId");

-- Newsletter policies
CREATE POLICY "Public can subscribe to newsletter" ON "newsletter_subscribers" FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view newsletter subscribers" ON "newsletter_subscribers" FOR SELECT USING (true);
CREATE POLICY "Admin can update newsletter subscribers" ON "newsletter_subscribers" FOR UPDATE USING (true);

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample availability
INSERT INTO "availability" (sun, mon, tue, wed, thu, fri, sat) VALUES 
('{"09:00-17:00"}', '{"09:00-17:00"}', '{"09:00-17:00"}', '{"09:00-17:00"}', '{"09:00-17:00"}', '{"09:00-17:00"}', '{}')
ON CONFLICT DO NOTHING;

-- =====================================================
-- COMMENTS AND DOCUMENTATION
-- =====================================================

COMMENT ON TABLE "user" IS 'Stores user profiles and authentication data';
COMMENT ON TABLE "availability" IS 'Weekly availability schedules for services';
COMMENT ON TABLE "service" IS 'Services offered by users';
COMMENT ON TABLE "guest" IS 'Guest/client information for meetings';
COMMENT ON TABLE "meeting" IS 'Scheduled meetings/appointments';
COMMENT ON TABLE "subscription" IS 'User subscription plans and billing';
COMMENT ON TABLE "wallet_history" IS 'Transaction history for user wallets';
COMMENT ON TABLE "earning" IS 'User earnings from completed meetings';
COMMENT ON TABLE "newsletter_subscribers" IS 'Newsletter subscription management';

-- =====================================================
-- TRIGGER FUNCTION FOR AUTO-CREATING USER RECORDS
-- =====================================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."user" (id, email, "firstName", "lastName", plan, min_amount)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'firstName', ''),
    COALESCE(NEW.raw_user_meta_data->>'lastName', ''),
    'free',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user record when auth user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- ALTERNATIVE: SIMPLIFIED USER POLICIES
-- =====================================================

-- Drop existing user policies and create simpler ones
DROP POLICY IF EXISTS "Users can view own profile" ON "user";
DROP POLICY IF EXISTS "Users can update own profile" ON "user";
DROP POLICY IF EXISTS "Users can insert own profile" ON "user";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "user";

-- Create simplified user policies
CREATE POLICY "Enable read access for users based on user_id" ON "user" FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Enable update for users based on user_id" ON "user" FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Enable insert for authenticated users only" ON "user" FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- END OF SCHEMA
-- =====================================================
