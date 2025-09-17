-- Update the handle_new_user function to only give admin access to hakizimanaleogad@gmail.com
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, is_admin)
  VALUES (
    new.id, 
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    CASE WHEN new.email = 'hakizimanaleogad@gmail.com' THEN true ELSE false END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Remove admin privileges from any other users (just in case)
UPDATE public.profiles 
SET is_admin = false 
WHERE email != 'hakizimanaleogad@gmail.com';

-- Ensure hakizimanaleogad@gmail.com is admin if profile exists
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'hakizimanaleogad@gmail.com';

-- Create a security definer function to check if user is the specific admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND email = 'hakizimanaleogad@gmail.com' 
    AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update RLS policies to use the new function
DROP POLICY IF EXISTS "Only admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Only admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Only admins can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Only admins can view messages" ON public.messages;
DROP POLICY IF EXISTS "Only admins can update messages" ON public.messages;

-- Recreate policies with the secure function
CREATE POLICY "Only specific admin can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Only specific admin can update projects" 
ON public.projects 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Only specific admin can delete projects" 
ON public.projects 
FOR DELETE 
USING (public.is_admin_user());

CREATE POLICY "Only specific admin can view messages" 
ON public.messages 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Only specific admin can update messages" 
ON public.messages 
FOR UPDATE 
USING (public.is_admin_user());