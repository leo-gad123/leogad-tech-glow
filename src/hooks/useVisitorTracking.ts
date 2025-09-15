import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitorStats {
  totalVisitors: number;
  uniqueVisitors: number;
  isNewVisitor: boolean;
}

export const useVisitorTracking = () => {
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    totalVisitors: 0,
    uniqueVisitors: 0,
    isNewVisitor: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get user agent
        const userAgent = navigator.userAgent;

        // Try to get email from contact form or other sources
        // For now, we'll track anonymous visitors
        const { data, error } = await supabase.functions.invoke('track-visitor', {
          body: {
            userAgent,
          },
        });

        if (error) {
          console.error('Error tracking visitor:', error);
        } else {
          setVisitorStats(data);
        }
      } catch (error) {
        console.error('Error in visitor tracking:', error);
      } finally {
        setLoading(false);
      }
    };

    trackVisitor();
  }, []);

  const trackEmailVisitor = async (email: string) => {
    try {
      const userAgent = navigator.userAgent;
      
      const { data, error } = await supabase.functions.invoke('track-visitor', {
        body: {
          email,
          userAgent,
        },
      });

      if (error) {
        console.error('Error tracking email visitor:', error);
      } else {
        setVisitorStats(data);
        return data.isNewVisitor;
      }
    } catch (error) {
      console.error('Error in email visitor tracking:', error);
    }
    return false;
  };

  return {
    visitorStats,
    loading,
    trackEmailVisitor,
  };
};