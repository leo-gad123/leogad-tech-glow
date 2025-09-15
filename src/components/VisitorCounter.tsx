import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Users } from 'lucide-react';

export const VisitorCounter = () => {
  const { visitorStats, loading } = useVisitorTracking();

  if (loading) {
    return (
      <Card className="w-fit">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-fit">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Visitors:</span>
            <span className="font-semibold">{visitorStats.totalVisitors}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Unique:</span>
            <span className="font-semibold">{visitorStats.uniqueVisitors}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};