import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [adminAvatarUrl, setAdminAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
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

    fetchAdminProfile();
  }, []);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden particle-bg">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>
      <div className="absolute inset-0 gradient-animate opacity-10"></div>
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float opacity-40"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '1s', animationDuration: '8s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-3xl animate-glow-pulse"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--neon-cyan)) 2px, hsl(var(--neon-cyan)) 4px)',
        animation: 'scanline 8s linear infinite'
      }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture with Enhanced Glow */}
          <div className="mt-16 mb-8 fade-in relative">
            <div className="absolute inset-0 bg-gradient-cyber rounded-full blur-2xl opacity-30 animate-glow-pulse" style={{ width: '160px', height: '160px', margin: 'auto' }}></div>
            <Avatar className="w-32 h-32 mx-auto mb-6 neon-glow relative z-10 border-2 border-neon-blue/50 animate-border-flow">
              {adminAvatarUrl && <AvatarImage src={adminAvatarUrl} alt="Hakizimana Leogad" />}
              <AvatarFallback>HL</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Main Heading with Gradient Animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 fade-in">
            <span className="text-gradient-cyber animate-scale-in">Hakizimana Leogad</span>
          </h1>
          
          {/* Subtitle with Glow */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold mb-4 fade-in-delay-1 drop-shadow-[0_0_10px_rgba(0,198,255,0.5)]">
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

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-delay-2">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection("#projects")}
              className="text-lg px-8 py-4 hover:scale-110 transform transition-all duration-300"
            >
              View My Projects
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="text-lg px-8 py-4 hover:scale-105 transform transition-all duration-300"
            >
              Contact Me
            </Button>
          </div>

          {/* Enhanced Quick Contact Links */}
          <div className="flex justify-center space-x-6 mb-12 fade-in-delay-2">
            <a
              href="mailto:hakizimanaleogad@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all duration-300 glass-morph p-3 rounded-full hover:shadow-neon hover:scale-110 transform hover:-translate-y-1 pulse-icon"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:0795165474"
              className="text-muted-foreground hover:text-primary transition-all duration-300 glass-morph p-3 rounded-full hover:shadow-neon hover:scale-110 transform hover:-translate-y-1 pulse-icon"
              style={{ animationDelay: '0.2s' }}
            >
              <Phone size={24} />
            </a>
            <a
              href="https://github.com/leo-gad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 glass-morph p-3 rounded-full hover:shadow-neon hover:scale-110 transform hover:-translate-y-1 pulse-icon"
              style={{ animationDelay: '0.4s' }}
            >
              <Github size={24} />
            </a>
            <a
              href="https://instagram.com/1eogad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-purple transition-all duration-300 glass-morph p-3 rounded-full hover:shadow-purple hover:scale-110 transform hover:-translate-y-1 pulse-icon"
              style={{ animationDelay: '0.6s' }}
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-neon-cyan transition-all duration-300 glass-morph p-3 rounded-full hover:shadow-neon hover:scale-110 transform hover:-translate-y-1 pulse-icon"
              title="Discord: leogad HAKIZIMANA"
              style={{ animationDelay: '0.8s' }}
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
    </section>
  );
};

export default Hero;