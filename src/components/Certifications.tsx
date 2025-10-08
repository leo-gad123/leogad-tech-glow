import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  description?: string;
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('issue_date', { ascending: false });

      if (error) throw error;
      setCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="certifications" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading certifications...</p>
          </div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gradient">Certifications</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and achievements demonstrating expertise and commitment to continuous learning
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="group hover:shadow-neon transition-all duration-smooth hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-smooth">
                      <Award className="w-10 h-10" />
                    </div>
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{cert.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {cert.issuer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cert.image_url && (
                    <img 
                      src={cert.image_url} 
                      alt={cert.title}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  )}
                  {cert.description && (
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(cert.issue_date), 'MMMM yyyy')}</span>
                  </div>
                  {cert.credential_id && (
                    <Badge variant="secondary" className="text-xs">
                      ID: {cert.credential_id}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
