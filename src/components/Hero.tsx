import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Mail, Phone, MapPin, Instagram, MessageCircle, Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import profileImage from "@/assets/profile.jpeg";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProfilePictureUpload from "@/components/admin/ProfilePictureUpload";

const Hero = () => {
  const [adminAvatarUrl, setAdminAvatarUrl] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        setIsAdmin(profile?.is_admin || false);
        setUserId(session.user.id);
      }
    };

    const fetchAdminProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('email', 'hakizimanaleogad@gmail.com')
        .maybeSingle();
      
      if (data?.avatar_url) {
        setAdminAvatarUrl(data.avatar_url);
      }
    };

    checkAuth();
    fetchAdminProfile();
  }, []);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 circuit-pattern opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-glow rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture */}
          <div className="mt-16 mb-8 fade-in">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 mx-auto mb-6 neon-glow">
                <AvatarImage src={adminAvatarUrl || profileImage} alt="Hakizimana Leogad" />
                <AvatarFallback>HL</AvatarFallback>
              </Avatar>
              {isAdmin && (
                <button
                  onClick={() => setShowUploadDialog(true)}
                  className="absolute bottom-6 right-0 p-2 bg-primary rounded-full hover:bg-primary/80 transition-colors neon-glow"
                  title="Change profile picture"
                >
                  <Camera size={16} />
                </button>
              )}
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 fade-in">
            <span className="text-gradient">Hakizimana Leogad</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold mb-4 fade-in-delay-1">
            Embedded & IoT System Developer
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed fade-in-delay-2">
            Passionate about creating innovative embedded and IoT solutions that connect devices 
            and improve everyday life. Transforming ideas into smart, efficient systems.
          </p>

          {/* Location */}
          <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-8 fade-in-delay-2">
            <MapPin size={18} className="text-primary" />
            <span>Kigali, Rwanda</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-delay-2">
            <Button
              variant="neon"
              size="lg"
              onClick={() => scrollToSection("#projects")}
              className="neon-glow text-lg px-8 py-4"
            >
              View My Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="text-lg px-8 py-4 border-primary/50 hover:border-primary hover:bg-primary/10"
            >
              Contact Me
            </Button>
          </div>

          {/* Quick Contact Links */}
          <div className="flex justify-center space-x-6 mb-12 fade-in-delay-2">
            <a
              href="mailto:hakizimanaleogad@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-fast neon-glow p-3 rounded-full bg-card/50"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:0795165474"
              className="text-muted-foreground hover:text-primary transition-colors duration-fast neon-glow p-3 rounded-full bg-card/50"
            >
              <Phone size={24} />
            </a>
            <a
              href="https://github.com/leo-gad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-fast neon-glow p-3 rounded-full bg-card/50"
            >
              <Github size={24} />
            </a>
            <a
              href="https://instagram.com/1eogad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-fast neon-glow p-3 rounded-full bg-card/50"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-fast neon-glow p-3 rounded-full bg-card/50"
              title="Discord: leogad HAKIZIMANA"
            >
              <MessageCircle size={24} />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce fade-in-delay-2">
            <button
              onClick={() => scrollToSection("#about")}
              className="text-primary hover:text-primary-glow transition-colors duration-fast"
            >
              <ArrowDown size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Picture Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          {userId && (
            <ProfilePictureUpload
              userId={userId}
              currentAvatarUrl={adminAvatarUrl}
              onUploadComplete={(url) => {
                setAdminAvatarUrl(url);
                setShowUploadDialog(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;