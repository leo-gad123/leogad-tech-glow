-- Drop the overly permissive SELECT policy that exposes sensitive data
DROP POLICY IF EXISTS "Anyone can view visitor statistics" ON public.visitors;

-- Create a secure function to get only aggregated visitor statistics
CREATE OR REPLACE FUNCTION public.get_visitor_stats()
RETURNS TABLE (
  total_visitors bigint,
  unique_visitors bigint
) 
LANGUAGE sql 
SECURITY DEFINER 
SET search_path = public
AS $$
  SELECT 
    COALESCE(SUM(visit_count), 0) as total_visitors,
    COUNT(DISTINCT CASE WHEN email IS NOT NULL THEN email ELSE ip_address END) as unique_visitors
  FROM visitors;
$$;

-- Create a restrictive SELECT policy that only allows reading through the secure function
-- This prevents direct access to sensitive data like IP addresses and user agents
CREATE POLICY "Visitor statistics via secure function only"
ON public.visitors
FOR SELECT
USING (false); -- No direct SELECT access

-- Grant execute permission on the function to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.get_visitor_stats() TO anon, authenticated;