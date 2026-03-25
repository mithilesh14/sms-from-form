
-- Consent logs: tracks cookie consent, form consent, etc.
CREATE TABLE public.consent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_type TEXT NOT NULL, -- 'cookie', 'form_contact', 'form_tour', 'form_rental', 'form_sales', 'marketing'
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_details JSONB, -- stores granular choices like {analytics: true, marketing: false}
  ip_address TEXT,
  user_agent TEXT,
  visitor_email TEXT, -- optional, for form consents
  visitor_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  withdrawn_at TIMESTAMPTZ
);

-- Audit logs: tracks admin actions
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL, -- 'view_record', 'update_status', 'export_data', 'delete_data', 'login'
  entity_type TEXT, -- 'contact_inquiry', 'booking', 'client', etc.
  entity_id TEXT,
  details JSONB,
  performed_by TEXT, -- admin identifier
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Data rights requests: users can request access/deletion/export
CREATE TABLE public.data_rights_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type TEXT NOT NULL, -- 'access', 'correction', 'deletion', 'export', 'objection'
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'denied'
  admin_notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for consent_logs: anyone can insert, admins can view
ALTER TABLE public.consent_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create consent logs" ON public.consent_logs FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view consent logs" ON public.consent_logs FOR SELECT TO public USING (auth.uid() IS NOT NULL);

-- RLS for audit_logs: only admins
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can insert audit logs" ON public.audit_logs FOR INSERT TO public WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT TO public USING (auth.uid() IS NOT NULL);

-- RLS for data_rights_requests: anyone can insert, admins manage
ALTER TABLE public.data_rights_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create data rights requests" ON public.data_rights_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view data rights requests" ON public.data_rights_requests FOR SELECT TO public USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update data rights requests" ON public.data_rights_requests FOR UPDATE TO public USING (auth.uid() IS NOT NULL);
