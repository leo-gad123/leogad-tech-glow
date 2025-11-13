import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface ProfilePictureUploadProps {
  userId: string;
  currentAvatarUrl?: string | null;
  onUploadComplete: (url: string) => void;
}

const ProfilePictureUpload = ({ userId, currentAvatarUrl, onUploadComplete }: ProfilePictureUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      onUploadComplete(publicUrl);
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
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

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={currentAvatarUrl || undefined} />
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
      <div>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
        <label htmlFor="avatar-upload">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            onClick={() => document.getElementById('avatar-upload')?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={16} />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2" size={16} />
                Upload Picture
              </>
            )}
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
