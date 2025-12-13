-- Create posts table for admin image posts
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create likes table
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  visitor_ip TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, visitor_ip)
);

-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Anyone can view active posts" ON public.posts FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can insert posts" ON public.posts FOR INSERT WITH CHECK (is_admin_user());
CREATE POLICY "Admin can update posts" ON public.posts FOR UPDATE USING (is_admin_user());
CREATE POLICY "Admin can delete posts" ON public.posts FOR DELETE USING (is_admin_user());

-- Comments policies (anyone can comment and view)
CREATE POLICY "Anyone can view comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Anyone can add comments" ON public.post_comments FOR INSERT WITH CHECK (true);

-- Likes policies (anyone can like, one per IP per post)
CREATE POLICY "Anyone can view likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Anyone can add likes" ON public.post_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can remove their like" ON public.post_likes FOR DELETE USING (true);

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);

-- Storage policies for post images
CREATE POLICY "Anyone can view post images" ON storage.objects FOR SELECT USING (bucket_id = 'post-images');
CREATE POLICY "Admin can upload post images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'post-images' AND is_admin_user());
CREATE POLICY "Admin can delete post images" ON storage.objects FOR DELETE USING (bucket_id = 'post-images' AND is_admin_user());

-- Add trigger for updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();