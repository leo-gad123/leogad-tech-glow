import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Clock } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Smart Alarm System",
      description: "An intelligent alarm system with mobile app integration, customizable alerts, and IoT connectivity for enhanced security monitoring.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop",
      technologies: ["Arduino", "ESP32", "C++", "Mobile App"],
      githubUrl: "#",
      liveUrl: "#",
      status: "completed"
    },
    {
      title: "Smart Home Automation",
      description: "Complete home automation solution with voice control, scheduling, and remote monitoring capabilities for lights, security, and climate.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&h=300&fit=crop",
      technologies: ["IoT", "Python", "ESP32", "Home Assistant"],
      githubUrl: "#",
      liveUrl: "#",
      status: "completed"
    },
    {
      title: "Environmental Monitoring System",
      description: "Real-time environmental data collection system monitoring air quality, temperature, humidity, and pollution levels with cloud analytics.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
      technologies: ["Sensors", "Cloud Platform", "Data Analytics", "ESP32"],
      githubUrl: "#",
      liveUrl: "#",
      status: "completed"
    },
    {
      title: "IoT Smart Light Control",
      description: "Advanced lighting control system with adaptive brightness, color temperature adjustment, and energy efficiency optimization.",
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&h=300&fit=crop",
      technologies: ["LED Control", "IoT", "Energy Monitoring", "Mobile App"],
      githubUrl: "#",
      liveUrl: "#",
      status: "completed"
    },
    {
      title: "Smart Lighting System",
      description: "Next-generation intelligent lighting platform with AI-powered automation, mood detection, and seamless integration capabilities.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
      technologies: ["AI/ML", "IoT", "React Native", "Cloud Services"],
      githubUrl: "#",
      liveUrl: "#",
      status: "in-progress"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore my portfolio of innovative IoT and embedded systems projects, 
              from smart home solutions to environmental monitoring systems.
            </p>
            <div className="w-24 h-1 bg-gradient-neon mx-auto rounded-full"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-card border border-card-border rounded-lg overflow-hidden shadow-card hover:shadow-neon transition-all duration-smooth hover:border-primary/50 hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-slow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-smooth"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {project.status === "in-progress" ? (
                      <div className="flex items-center space-x-1 bg-warning/20 text-warning px-3 py-1 rounded-full text-xs font-medium">
                        <Clock size={12} />
                        <span>In Progress</span>
                      </div>
                    ) : (
                      <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                        Completed
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-smooth">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        Code
                      </a>
                    </Button>
                    
                    {project.status === "completed" && (
                      <Button
                        variant="neon"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button
              variant="tech"
              size="lg"
              className="px-8 py-3"
            >
              View All Projects on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;