-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE (for admin users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- PROPERTIES TABLE
-- =============================================
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_fr TEXT,
  description TEXT,
  description_fr TEXT,
  property_type TEXT NOT NULL, -- 'studio', 'one_bedroom', 'two_bedroom', 'penthouse', etc.
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  size_sqft INTEGER,
  floor INTEGER,
  amenities TEXT[] DEFAULT '{}',
  
  -- Listing types (flexible - can be multiple)
  is_for_sale BOOLEAN DEFAULT FALSE,
  is_short_term_rental BOOLEAN DEFAULT FALSE,
  is_long_term_rental BOOLEAN DEFAULT FALSE,
  
  -- Pricing
  sale_price DECIMAL(12, 2),
  nightly_rate DECIMAL(10, 2),
  weekly_rate DECIMAL(10, 2),
  monthly_rate DECIMAL(10, 2),
  
  -- Seasonal pricing
  high_season_nightly_rate DECIMAL(10, 2),
  high_season_start DATE,
  high_season_end DATE,
  
  -- Availability
  is_available BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'available', -- 'available', 'reserved', 'sold', 'rented'
  
  -- Images
  featured_image TEXT,
  images TEXT[] DEFAULT '{}',
  floor_plan_image TEXT,
  
  -- Minimum stay for short-term
  min_stay_nights INTEGER DEFAULT 1,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Public can view available properties
CREATE POLICY "Anyone can view properties"
  ON public.properties FOR SELECT
  USING (true);

-- Only authenticated admins can modify
CREATE POLICY "Admins can insert properties"
  ON public.properties FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update properties"
  ON public.properties FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete properties"
  ON public.properties FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- BOOKINGS TABLE (Short-term rentals)
-- =============================================
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  
  -- Guest info
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  guest_country TEXT,
  
  -- Booking details
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  num_guests INTEGER DEFAULT 1,
  
  -- Pricing
  nightly_rate DECIMAL(10, 2) NOT NULL,
  total_nights INTEGER NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  cleaning_fee DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  
  -- Status workflow
  status TEXT NOT NULL DEFAULT 'pending_payment', 
  -- 'pending_payment', 'payment_received', 'confirmed', 'cancelled', 'completed'
  
  -- Notes
  special_requests TEXT,
  admin_notes TEXT,
  
  -- Returning customer
  is_returning_customer BOOLEAN DEFAULT FALSE,
  discount_applied DECIMAL(10, 2) DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public can create bookings (reservation requests)
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Public can view their own booking by email (for confirmation)
CREATE POLICY "Anyone can view bookings"
  ON public.bookings FOR SELECT
  USING (true);

-- Only admins can update/delete
CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete bookings"
  ON public.bookings FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- LONG TERM RENTALS TABLE
-- =============================================
CREATE TABLE public.rental_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  
  -- Applicant info
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  
  -- Application details
  desired_move_in DATE,
  lease_duration INTEGER, -- months
  occupation TEXT,
  monthly_income DECIMAL(10, 2),
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewing', 'approved', 'rejected'
  admin_notes TEXT,
  
  message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.rental_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create rental applications"
  ON public.rental_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view rental applications"
  ON public.rental_applications FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update rental applications"
  ON public.rental_applications FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- SALES INQUIRIES TABLE
-- =============================================
CREATE TABLE public.sales_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  
  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Inquiry details
  message TEXT,
  preferred_contact_method TEXT DEFAULT 'email',
  
  -- Sales pipeline status
  status TEXT DEFAULT 'new_inquiry',
  -- 'new_inquiry', 'qualified', 'viewing_scheduled', 'offer_made', 'negotiation', 'closing', 'sold', 'lost'
  
  -- Pipeline data
  viewing_date TIMESTAMP WITH TIME ZONE,
  offer_amount DECIMAL(12, 2),
  admin_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.sales_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create sales inquiries"
  ON public.sales_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view sales inquiries"
  ON public.sales_inquiries FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update sales inquiries"
  ON public.sales_inquiries FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- TOUR REQUESTS TABLE
-- =============================================
CREATE TABLE public.tour_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  
  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Tour details
  preferred_date DATE,
  preferred_time TEXT,
  tour_type TEXT DEFAULT 'in_person', -- 'in_person', 'virtual'
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  admin_notes TEXT,
  
  message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.tour_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create tour requests"
  ON public.tour_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view tour requests"
  ON public.tour_requests FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update tour requests"
  ON public.tour_requests FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- REVIEWS TABLE
-- =============================================
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  
  -- Reviewer info
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  
  -- Verification
  booking_reference TEXT, -- For verified reviews
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Moderation
  is_approved BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews FOR SELECT
  USING (is_approved = true AND is_hidden = false);

-- Anyone can create reviews
CREATE POLICY "Anyone can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- Admins can view all reviews
CREATE POLICY "Admins can view all reviews"
  ON public.reviews FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Admins can update reviews
CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- CLIENTS TABLE (CRM)
-- =============================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  
  -- Client type
  client_type TEXT DEFAULT 'guest', -- 'guest', 'tenant', 'buyer', 'prospect'
  
  -- Stats
  total_bookings INTEGER DEFAULT 0,
  total_spent DECIMAL(12, 2) DEFAULT 0,
  is_returning_customer BOOLEAN DEFAULT FALSE,
  
  -- Notes
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view clients"
  ON public.clients FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert clients"
  ON public.clients FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update clients"
  ON public.clients FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- BLOCKED DATES TABLE (for manual blocking)
-- =============================================
CREATE TABLE public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blocked dates"
  ON public.blocked_dates FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage blocked dates"
  ON public.blocked_dates FOR ALL
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- SITE SETTINGS TABLE
-- =============================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- CONTACT INQUIRIES TABLE (general contact form)
-- =============================================
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'responded'
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact inquiries"
  ON public.contact_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact inquiries"
  ON public.contact_inquiries FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update contact inquiries"
  ON public.contact_inquiries FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rental_applications_updated_at BEFORE UPDATE ON public.rental_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sales_inquiries_updated_at BEFORE UPDATE ON public.sales_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tour_requests_updated_at BEFORE UPDATE ON public.tour_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- CREATE STORAGE BUCKET FOR IMAGES
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Storage policies
CREATE POLICY "Anyone can view property images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Admins can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update property images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete property images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);