-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  credential_id TEXT,
  credential_url TEXT,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Certifications are viewable by everyone" 
ON public.certifications 
FOR SELECT 
USING (true);

CREATE POLICY "Only admin can insert certifications" 
ON public.certifications 
FOR INSERT 
WITH CHECK (is_admin_user());

CREATE POLICY "Only admin can update certifications" 
ON public.certifications 
FOR UPDATE 
USING (is_admin_user());

CREATE POLICY "Only admin can delete certifications" 
ON public.certifications 
FOR DELETE 
USING (is_admin_user());

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_certifications_updated_at
BEFORE UPDATE ON public.certifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add bio column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT;