-- Create visitors table to track website visitors
CREATE TABLE public.visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  ip_address TEXT,
  user_agent TEXT,
  first_visit_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_visit_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  visit_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for visitor counting
CREATE POLICY "Anyone can view visitor statistics" 
ON public.visitors 
FOR SELECT 
USING (true);

-- Create policy to allow inserting visitor data
CREATE POLICY "Anyone can track visits" 
ON public.visitors 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow updating visitor data
CREATE POLICY "Anyone can update visit counts" 
ON public.visitors 
FOR UPDATE 
USING (true);

-- Create index for better performance on email lookups
CREATE INDEX idx_visitors_email ON public.visitors(email);
CREATE INDEX idx_visitors_ip ON public.visitors(ip_address);