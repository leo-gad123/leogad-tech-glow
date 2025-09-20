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