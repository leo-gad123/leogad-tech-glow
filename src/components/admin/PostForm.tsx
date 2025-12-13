import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { X, Upload } from "lucide-react";

interface Post {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

interface PostFormProps {
  post?: Post;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PostForm = ({ post, onSuccess, onCancel }: PostFormProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [imageUrl, setImageUrl] = useState(post?.image_url || "");
  const [isActive, setIsActive] = useState(post?.is_active ?? true);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Please upload an image",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (post) {
        const { error } = await supabase
          .from('posts')
          .update({ title, description, image_url: imageUrl, is_active: isActive })
          .eq('id', post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('posts')
          .insert({ title, description, image_url: imageUrl, is_active: isActive });
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Post ${post ? 'updated' : 'created'} successfully`,
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{post ? "Edit Post" : "Create New Post"}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X size={20} />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label>Image</Label>
            <div className="mt-2 space-y-2">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Post preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => document.getElementById('post-image-upload')?.click()}
                >
                  <Upload size={16} className="mr-2" />
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
                <input
                  id="post-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="is_active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
