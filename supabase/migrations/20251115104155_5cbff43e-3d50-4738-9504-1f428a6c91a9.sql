-- Add theme_colors column to profiles table
ALTER TABLE public.profiles
ADD COLUMN theme_colors jsonb DEFAULT NULL;

-- Add comment to describe the column
COMMENT ON COLUMN public.profiles.theme_colors IS 'Stores custom theme color configuration in JSON format';