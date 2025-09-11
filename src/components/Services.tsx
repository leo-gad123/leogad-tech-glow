import { Button } from "@/components/ui/button";
import { Lightbulb, Cpu, Wrench, Cog, ArrowRight, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "IoT Consulting",
      description: "Strategic guidance for your IoT projects, from concept to deployment. I help businesses identify opportunities and create roadmaps for successful IoT implementations.",
      features: [
        "Technology assessment and selection",
        "Architecture design and planning",
        "Cost analysis and ROI projections",
        "Risk assessment and mitigation"
      ],
      pricing: "Starting at $50/hour"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Embedded Development",
      description: "Custom firmware development for microcontrollers and embedded systems. From simple sensors to complex automation systems.",
      features: [
        "Microcontroller programming (Arduino, ESP32, STM32)",
        "Real-time systems development",
        "Driver development and integration",
        "Performance optimization"
      ],
      pricing: "Starting at $75/hour"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Rapid Prototyping",
      description: "Fast-track your ideas from concept to working prototype. Perfect for startups and entrepreneurs who need quick validation.",
      features: [
        "3D printing and enclosure design",
        "PCB design and fabrication",
        "Component sourcing and assembly",
        "Testing and validation"
      ],
      pricing: "Project-based pricing"
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Automation Solutions",
      description: "Complete automation systems for homes and businesses. Increase efficiency and reduce operational costs with smart automation.",
      features: [
        "Smart home automation",
        "Industrial process automation",
        "Energy monitoring and optimization",
        "Remote monitoring and control"
      ],
      pricing: "Custom quotes available"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your needs, requirements, and goals for the project."
    },
    {
      step: "02",
      title: "Planning",
      description: "Detailed project planning, timeline creation, and technology selection."
    },
    {
      step: "03",
      title: "Development",
      description: "Iterative development with regular updates and milestone reviews."
    },
    {
      step: "04",
      title: "Testing",
      description: "Comprehensive testing, validation, and quality assurance."
    },
    {
      step: "05",
      title: "Deployment",
      description: "Final deployment, documentation, and knowledge transfer."
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              My <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              From initial consultation to final deployment, I provide comprehensive 
              IoT and embedded systems development services tailored to your needs.
            </p>
            <div className="w-24 h-1 bg-gradient-neon mx-auto rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-card-border rounded-lg p-8 shadow-card hover:shadow-neon transition-all duration-smooth hover:border-primary/50 group"
              >
                {/* Service Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-smooth">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-card-foreground">
                      {service.title}
                    </h3>
                    <p className="text-primary font-semibold text-sm">
                      {service.pricing}
                    </p>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                      <span className="text-card-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full border-primary/50 hover:border-primary hover:bg-primary/10 group"
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-smooth" />
                </Button>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="bg-card border border-card-border rounded-lg p-8 shadow-card">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-heading font-semibold mb-4 text-primary">
                My Development Process
              </h3>
              <p className="text-muted-foreground">
                A proven methodology that ensures project success and client satisfaction
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-neon rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-neon group-hover:shadow-neon-strong transition-all duration-smooth">
                      {item.step}
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/30 -translate-x-8"></div>
                    )}
                  </div>
                  <h4 className="font-heading font-semibold mb-2 text-card-foreground">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-heading font-semibold mb-4 text-primary">
              Ready to Start Your IoT Project?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and bring them to life. Get a free consultation 
              and project estimate tailored to your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="neon" size="lg" className="px-8">
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="px-8 border-primary/50 hover:border-primary">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;