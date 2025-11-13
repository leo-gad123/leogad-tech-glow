-- Allow anyone to view admin profile for public display
CREATE POLICY "Anyone can view admin profile"
ON public.profiles
FOR SELECT
USING (email = 'hakizimanaleogad@gmail.com');