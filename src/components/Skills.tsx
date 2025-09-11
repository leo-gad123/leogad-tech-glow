import { Code, Cpu, Database, Wifi, Smartphone, Zap, Cloud, Settings } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "Embedded C/C++", level: 95 },
        { name: "Python for IoT", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Assembly", level: 80 }
      ]
    },
    {
      title: "Hardware Platforms",
      icon: <Cpu className="w-6 h-6" />,
      skills: [
        { name: "Arduino", level: 98 },
        { name: "ESP32/ESP8266", level: 95 },
        { name: "Raspberry Pi", level: 90 },
        { name: "STM32", level: 85 }
      ]
    },
    {
      title: "IoT & Connectivity",
      icon: <Wifi className="w-6 h-6" />,
      skills: [
        { name: "WiFi/Bluetooth", level: 95 },
        { name: "LoRa/LoRaWAN", level: 88 },
        { name: "MQTT Protocol", level: 92 },
        { name: "Zigbee/Z-Wave", level: 80 }
      ]
    },
    {
      title: "Cloud Platforms",
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        { name: "AWS IoT Core", level: 85 },
        { name: "Google Cloud IoT", level: 82 },
        { name: "ThingSpeak", level: 90 },
        { name: "Blynk", level: 88 }
      ]
    },
    {
      title: "Development Tools",
      icon: <Settings className="w-6 h-6" />,
      skills: [
        { name: "PCB Design", level: 85 },
        { name: "3D Modeling", level: 75 },
        { name: "Git/GitHub", level: 90 },
        { name: "VS Code/PlatformIO", level: 95 }
      ]
    },
    {
      title: "Mobile & Web",
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        { name: "React Native", level: 80 },
        { name: "Flutter", level: 75 },
        { name: "React.js", level: 85 },
        { name: "Node.js", level: 80 }
      ]
    }
  ];

  const certifications = [
    "Arduino Certified Professional",
    "IoT Fundamentals Certificate",
    "Embedded Systems Design",
    "PCB Design Certification"
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Comprehensive expertise across the entire IoT development stack, 
              from low-level embedded programming to cloud integration and mobile applications.
            </p>
            <div className="w-24 h-1 bg-gradient-neon mx-auto rounded-full"></div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-card border border-card-border rounded-lg p-6 shadow-card hover:shadow-neon transition-all duration-smooth hover:border-primary/50 group"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-smooth">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-card-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-card-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-primary font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-neon rounded-full transition-all duration-slow delay-200"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Icons */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-heading font-semibold mb-8 text-primary">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6 max-w-4xl mx-auto">
              {[
                "Arduino", "ESP32", "Python", "C++", "React", "Node.js", "AWS", "Git"
              ].map((tech, index) => (
                <div
                  key={index}
                  className="p-4 bg-card border border-card-border rounded-lg shadow-card hover:shadow-neon transition-all duration-smooth hover:border-primary/50 hover:scale-110 group"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-neon rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {tech.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-smooth">
                      {tech}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-card border border-card-border rounded-lg p-8 shadow-card">
            <h3 className="text-2xl font-heading font-semibold mb-6 text-center text-primary">
              Certifications & Training
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg border border-primary/20"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-card-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;