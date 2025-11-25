import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdvertisementFormProps {
  advertisement?: {
    id: string;
    title: string;
    description: string;
    image_url?: string;
    link_url?: string;
    button_text?: string;
    placement: string;
    is_active: boolean;
    display_order: number;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdvertisementForm = ({ advertisement, onSuccess, onCancel }: AdvertisementFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: advertisement?.title || "",
    description: advertisement?.description || "",
    image_url: advertisement?.image_url || "",
    link_url: advertisement?.link_url || "",
    button_text: advertisement?.button_text || "Learn More",
    placement: advertisement?.placement || "banner",
    is_active: advertisement?.is_active ?? true,
    display_order: advertisement?.display_order || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (advertisement) {
        const { error } = await supabase
          .from("advertisements")
          .update(formData)
          .eq("id", advertisement.id);

        if (error) throw error;
        toast({ title: "Advertisement updated successfully" });
      } else {
        const { error } = await supabase
          .from("advertisements")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Advertisement created successfully" });
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
        {advertisement ? "Edit Advertisement" : "Create Advertisement"}
      </h3>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter advertisement title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter advertisement description"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">Image URL (optional)</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="https://example.com/image.jpg"
          type="url"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="link_url">Link URL (optional)</Label>
        <Input
          id="link_url"
          value={formData.link_url}
          onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
          placeholder="https://example.com"
          type="url"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="button_text">Button Text</Label>
        <Input
          id="button_text"
          value={formData.button_text}
          onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
          placeholder="Learn More"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="placement">Placement</Label>
        <Select
          value={formData.placement}
          onValueChange={(value) => setFormData({ ...formData, placement: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="banner">Banner (Full Width)</SelectItem>
            <SelectItem value="sidebar">Sidebar</SelectItem>
            <SelectItem value="popup">Popup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
          placeholder="0"
        />
        <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
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
          {loading ? "Saving..." : advertisement ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
