import { Code, Cpu, Lightbulb, Zap } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Embedded Systems",
      description: "Expert in microcontroller programming and hardware integration"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "IoT Solutions",
      description: "Building connected devices that transform everyday experiences"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack IoT",
      description: "From hardware design to cloud platforms and mobile apps"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "Turning creative ideas into practical, scalable solutions"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio Content */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary mb-4">
                Embedded & IoT Systems Developer
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am an Embedded and IoT Systems Developer based in <span className="text-primary font-semibold">Kigali, Rwanda</span>. 
                I specialize in designing smart, efficient, and scalable IoT solutions that integrate hardware and software seamlessly.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                My passion lies in creating innovative solutions that bridge the physical and digital worlds. 
                From smart home automation to environmental monitoring systems, I focus on building technology 
                that makes a real difference in people's lives.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                My goal is to contribute to the future of connected systems through practical innovation, 
                hands-on development, and a commitment to excellence in every project I undertake.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-card-border rounded-lg shadow-card hover:shadow-neon transition-all duration-smooth hover:border-primary/50 group"
                >
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-smooth">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-heading font-semibold mb-2 text-card-foreground">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5+", label: "Projects Completed" },
              { number: "3+", label: "Years Experience" },
              { number: "10+", label: "Technologies Mastered" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;