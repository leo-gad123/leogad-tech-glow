-- Create projects table for admin-managed portfolio projects
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  technologies text[] DEFAULT '{}',
  github_url text,
  live_url text,
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress')),
  featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on projects table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create profiles table for admin authentication
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email text NOT NULL,
  full_name text,
  is_admin boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create messages table for contact form submissions
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('read', 'unread')),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on messages table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects (public can read, admin can manage)
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

CREATE POLICY "Only admins can update projects" 
ON public.projects 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

CREATE POLICY "Only admins can delete projects" 
ON public.projects 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for messages (only admins can read)
CREATE POLICY "Only admins can view messages" 
ON public.messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

CREATE POLICY "Anyone can insert messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can update messages" 
ON public.messages 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    new.id, 
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample projects
INSERT INTO public.projects (title, description, image_url, technologies, github_url, live_url, status, featured) VALUES
('Smart Alarm System', 'An intelligent alarm system with mobile app integration, customizable alerts, and IoT connectivity for enhanced security monitoring.', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop', ARRAY['Arduino', 'ESP32', 'C++', 'Mobile App'], 'https://github.com/leo-gad123/Wifi_Controlled_Alarm', '#', 'completed', true),
('Home Guardian Control Hub', 'Complete smart home automation solution with voice control, scheduling, and remote monitoring capabilities for lights, security, and climate control.', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&h=300&fit=crop', ARRAY['IoT', 'Python', 'ESP32', 'Home Assistant', 'Security'], 'https://github.com/leo-gad/home-guardian-control-hub', '#', 'completed', true),
('DHT Environmental Monitor', 'Real-time environmental data collection system using DHT sensors to monitor temperature, humidity, and air quality with cloud analytics and alerts.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop', ARRAY['DHT Sensors', 'ESP32', 'Data Analytics', 'Cloud Platform'], 'https://github.com/leo-gad123/DHT_project', '#', 'completed', false),
('IoT Smart Light Control', 'Advanced IoT lighting control system with adaptive brightness, color temperature adjustment, and energy efficiency optimization using custom firmware.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop', ARRAY['LED Control', 'IoT', 'Firmware', 'Energy Monitoring'], 'https://github.com/leo-gad123/Iot_System_Firmware', '#', 'completed', false),
('Smart Lighting System', 'Next-generation intelligent lighting platform with AI-powered automation, mood detection, and seamless integration capabilities.', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop', ARRAY['AI/ML', 'IoT', 'React Native', 'Cloud Services'], '#', '#', 'in-progress', true);