-- Create advertisements table
CREATE TABLE public.advertisements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  link_url TEXT,
  button_text TEXT DEFAULT 'Learn More',
  placement TEXT NOT NULL DEFAULT 'banner' CHECK (placement IN ('banner', 'sidebar', 'popup')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active advertisements"
ON public.advertisements
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admin can insert advertisements"
ON public.advertisements
FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "Admin can update advertisements"
ON public.advertisements
FOR UPDATE
USING (is_admin_user());

CREATE POLICY "Admin can delete advertisements"
ON public.advertisements
FOR DELETE
USING (is_admin_user());

-- Add trigger for updated_at
CREATE TRIGGER update_advertisements_updated_at
BEFORE UPDATE ON public.advertisements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();