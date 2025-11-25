import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  is_active: boolean;
}

export const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (data) setAnnouncements(data);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "error":
        return <XCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  if (announcements.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
      {announcements.map((announcement) => (
        <Alert key={announcement.id} variant={announcement.type === "error" ? "destructive" : "default"}>
          <div className="flex items-start gap-3">
            {getIcon(announcement.type)}
            <div className="flex-1">
              <AlertTitle className="font-semibold">{announcement.title}</AlertTitle>
              <AlertDescription className="mt-1">{announcement.message}</AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};
