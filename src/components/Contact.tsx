import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { trackEmailVisitor } = useVisitorTracking();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send contact email
      const response = await fetch('https://kteajlsbkadckviiflqt.supabase.co/functions/v1/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Track email visitor
        if (formData.email) {
          const isNewVisitor = await trackEmailVisitor(formData.email);
          if (isNewVisitor) {
            toast({
              title: "Message Sent Successfully!",
              description: "Welcome! I've received your message and will get back to you soon.",
            });
          } else {
            toast({
              title: "Message Sent Successfully!",
              description: "Thanks for reaching out again! I'll respond as soon as possible.",
            });
          }
        }
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "hakizimanaleogad@gmail.com",
      link: "mailto:hakizimanaleogad@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "0795165474",
      link: "tel:0795165474"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Kigali, Rwanda",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      link: "https://github.com/leo-gad",
      username: "@leo-gad"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      link: "https://linkedin.com/in/hakizimana-leogad",
      username: "hakizimana leogad"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      link: "https://instagram.com/1eogad",
      username: "@1eogad"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Discord",
      link: "#",
      username: "leogad HAKIZIMANA"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      link: "mailto:hakizimanaleogad@gmail.com",
      username: "hakizimanaleogad@gmail.com"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Ready to bring your IoT ideas to life? Let's discuss your project and 
              explore how we can create innovative solutions together.
            </p>
            <div className="w-24 h-1 bg-gradient-neon mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-semibold mb-6 text-primary">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always excited to discuss new projects, innovative ideas, or opportunities 
                  to be part of your visions. Whether you need consulting, development services, 
                  or just want to chat about IoT technology, feel free to reach out.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-smooth">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <a
                        href={item.link}
                        className="text-card-foreground hover:text-primary transition-colors duration-smooth font-medium"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-heading font-semibold mb-4 text-card-foreground">
                  Connect on Social
                </h4>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-card border border-card-border rounded-lg hover:border-primary/50 hover:shadow-neon transition-all duration-smooth group"
                    >
                      <div className="text-primary group-hover:scale-110 transition-transform duration-smooth">
                        {social.icon}
                      </div>
                      <div>
                        <p className="text-card-foreground group-hover:text-primary transition-colors duration-smooth">
                          {social.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Resume Download */}
              <div className="pt-6 border-t border-card-border">
                <Button variant="tech" size="lg" className="w-full group">
                  <Download size={18} />
                  <span>Download My Resume</span>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-card-border rounded-lg p-8 shadow-card">
              <h3 className="text-2xl font-heading font-semibold mb-6 text-primary">
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-primary/30 rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-smooth"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-primary/30 rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-smooth"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-secondary border border-primary/30 rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-smooth resize-none"
                    placeholder="Tell me about your project, requirements, timeline, and any specific questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="neon"
                  size="lg"
                  className="w-full group"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-card-border">
                <p className="text-xs text-muted-foreground text-center">
                  I typically respond within 24 hours. For urgent projects, 
                  please call directly at{" "}
                  <a href="tel:0795165474" className="text-primary hover:underline">
                    0795165474
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;