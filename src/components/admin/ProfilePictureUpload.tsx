import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, User } from "lucide-react";

interface ProfilePictureUploadProps {
  userId: string;
  currentAvatarUrl?: string | null;
  onUploadSuccess: (url: string) => void;
}

export function ProfilePictureUpload({ userId, currentAvatarUrl, onUploadSuccess }: ProfilePictureUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadProfilePicture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      onUploadSuccess(publicUrl);
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        {currentAvatarUrl ? (
          <img
            src={currentAvatarUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center border-2 border-primary">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={uploadProfilePicture}
          disabled={uploading}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Photo
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG or GIF (max 5MB)
        </p>
      </div>
    </div>
  );
}
