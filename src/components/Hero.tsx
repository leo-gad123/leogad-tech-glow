import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Mail, Phone, MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profileImage from "@/assets/profile.jpeg";

const Hero = () => {
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
          <div className="mt-8 mb-8 fade-in">
            <Avatar className="w-32 h-32 mx-auto mb-6 neon-glow">
              <AvatarImage src={profileImage} alt="Hakizimana Leogad" />
              <AvatarFallback>HL</AvatarFallback>
            </Avatar>
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
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-fast neon-glow p-3 rounded-full bg-card/50"
            >
              <Github size={24} />
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