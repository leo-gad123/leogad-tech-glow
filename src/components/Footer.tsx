import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/leo-gad",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/hakizimana-leogad",
      label: "LinkedIn"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/1eogad",
      label: "Instagram"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:hakizimanaleogad@gmail.com",
      label: "Email"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: "tel:0795165474",
      label: "Phone"
    }
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" }
  ];

  const services = [
    "IoT Consulting",
    "Embedded Development",
    "Rapid Prototyping",
    "Automation Solutions"
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-card-border bg-card/50 backdrop-blur-sm">
      {/* Background Effects */}
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src={logo}
                alt="HL Logo"
                className="w-10 h-10 neon-glow"
              />
              <span className="text-xl font-heading font-bold text-gradient">
                Hakizimana Leogad
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Embedded & IoT Systems Developer passionate about creating innovative 
              solutions that connect devices and improve everyday life.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground mb-4">
              <MapPin size={16} className="text-primary" />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("#") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary border border-primary/30 rounded-lg text-muted-foreground hover:text-primary hover:border-primary hover:shadow-neon transition-all duration-smooth group"
                  aria-label={social.label}
                >
                  <div className="group-hover:scale-110 transition-transform duration-smooth">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-smooth animated-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-primary">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-muted-foreground">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-primary">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <a
                  href="mailto:hakizimanaleogad@gmail.com"
                  className="text-card-foreground hover:text-primary transition-colors duration-smooth"
                >
                  hakizimanaleogad@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <a
                  href="tel:0795165474"
                  className="text-card-foreground hover:text-primary transition-colors duration-smooth"
                >
                  0795165474
                </a>
              </div>
              <div className="pt-4">
                <Button
                  variant="neon"
                  onClick={() => scrollToSection("#contact")}
                  className="w-full"
                >
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-card-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 Hakizimana Leogad. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("#about")}
              className="text-muted-foreground hover:text-primary transition-colors duration-smooth text-sm"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="text-muted-foreground hover:text-primary transition-colors duration-smooth text-sm"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 bg-secondary border border-primary/30 rounded-lg text-muted-foreground hover:text-primary hover:border-primary hover:shadow-neon transition-all duration-smooth group"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="group-hover:scale-110 transition-transform duration-smooth" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;