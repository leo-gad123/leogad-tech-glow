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
                className="glass-morph rounded-lg p-6 hover:shadow-neon hover:shadow-purple transition-all duration-500 hover:border-neon-blue hover:-translate-y-2 hover:scale-[1.02] transform group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 pulse-icon">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-card-foreground group-hover:text-gradient-cyber transition-all duration-300">
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
                      <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-cyber rounded-full transition-all duration-slow delay-200 shadow-neon relative overflow-hidden"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" style={{ transform: 'translateX(-100%)' }}></div>
                        </div>
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
                  className="p-4 glass-morph rounded-lg hover:shadow-neon hover:shadow-purple transition-all duration-300 hover:border-neon-cyan hover:scale-125 hover:-translate-y-2 transform group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-cyber rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-neon">
                      <span className="text-xs font-bold text-white">
                        {tech.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-gradient-cyber transition-all duration-300">
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