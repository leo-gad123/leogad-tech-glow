import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";

interface Advertisement {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  link_url?: string;
  button_text?: string;
  placement: string;
  is_active: boolean;
  display_order: number;
}

export const Advertisements = ({ placement = "banner" }: { placement?: string }) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [closedAds, setClosedAds] = useState<string[]>([]);

  useEffect(() => {
    fetchAdvertisements();
  }, [placement]);

  useEffect(() => {
    // Load closed ads from localStorage
    const closed = localStorage.getItem("closedAds");
    if (closed) {
      setClosedAds(JSON.parse(closed));
    }
  }, []);

  const fetchAdvertisements = async () => {
    const { data } = await supabase
      .from("advertisements")
      .select("*")
      .eq("is_active", true)
      .eq("placement", placement)
      .order("display_order", { ascending: true });

    if (data) setAdvertisements(data);
  };

  const handleClose = (adId: string) => {
    const updated = [...closedAds, adId];
    setClosedAds(updated);
    localStorage.setItem("closedAds", JSON.stringify(updated));
  };

  const visibleAds = advertisements.filter((ad) => !closedAds.includes(ad.id));

  if (visibleAds.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className={`grid gap-4 ${placement === "sidebar" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
        {visibleAds.map((ad) => (
          <Card key={ad.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <button
              onClick={() => handleClose(ad.id)}
              className="absolute top-2 right-2 z-10 p-1 bg-background/80 hover:bg-background rounded-full transition-colors"
              aria-label="Close advertisement"
            >
              <X className="h-4 w-4" />
            </button>
            
            <CardContent className="p-6">
              {ad.image_url && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <h3 className="text-xl font-bold text-foreground mb-2">{ad.title}</h3>
              <p className="text-muted-foreground mb-4">{ad.description}</p>
              
              {ad.link_url && (
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => window.open(ad.link_url, "_blank")}
                >
                  {ad.button_text || "Learn More"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
