-- Set hakizimanaleogad@gmail.com as admin when they sign up
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'hakizimanaleogad@gmail.com';