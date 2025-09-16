-- Create secure functions for visitor tracking operations
-- These allow the edge function to operate without direct SELECT access

-- Function to check if email visitor exists and get their visit count
CREATE OR REPLACE FUNCTION public.get_email_visitor_info(visitor_email text)
RETURNS TABLE (
  visitor_id uuid,
  visit_count integer
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id as visitor_id, visit_count 
  FROM visitors 
  WHERE email = visitor_email
  LIMIT 1;
$$;

-- Function to check if anonymous visitor exists by IP and get their info
CREATE OR REPLACE FUNCTION public.get_anonymous_visitor_info(visitor_ip text)
RETURNS TABLE (
  visitor_id uuid,
  visit_count integer
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id as visitor_id, visit_count 
  FROM visitors 
  WHERE ip_address = visitor_ip AND email IS NULL
  LIMIT 1;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_email_visitor_info(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_anonymous_visitor_info(text) TO service_role;