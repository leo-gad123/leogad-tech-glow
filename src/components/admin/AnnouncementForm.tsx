import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnnouncementFormProps {
  announcement?: {
    id: string;
    title: string;
    message: string;
    type: string;
    is_active: boolean;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export const AnnouncementForm = ({ announcement, onSuccess, onCancel }: AnnouncementFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: announcement?.title || "",
    message: announcement?.message || "",
    type: announcement?.type || "info",
    is_active: announcement?.is_active ?? true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (announcement) {
        const { error } = await supabase
          .from("announcements")
          .update(formData)
          .eq("id", announcement.id);

        if (error) throw error;
        toast({ title: "Announcement updated successfully" });
      } else {
        const { error } = await supabase
          .from("announcements")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Announcement created successfully" });
      }

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
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground">
        {announcement ? "Edit Announcement" : "Create Announcement"}
      </h3>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter announcement title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Enter announcement message"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 rounded border-input"
        />
        <Label htmlFor="is_active" className="cursor-pointer">
          Active (visible to public)
        </Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : announcement ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
