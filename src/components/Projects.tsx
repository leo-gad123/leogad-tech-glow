import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  status: string;
  featured: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

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
                className="group glass-morph rounded-lg overflow-hidden hover:shadow-neon hover:shadow-purple transition-all duration-500 hover:border-neon-blue hover:-translate-y-3 hover:scale-[1.02] transform animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop'}
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
                  <h3 className="text-xl font-heading font-semibold mb-3 text-card-foreground group-hover:text-gradient-cyber transition-all duration-300">
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
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/30 hover:border-neon-cyan hover:shadow-neon hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                      {project.github_url && (
                        <Button
                          variant="glass"
                          size="sm"
                          asChild
                          className="flex-1 hover:scale-105 transform transition-all"
                        >
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github size={16} />
                            Code
                          </a>
                        </Button>
                      )}
                      
                      {project.status === "completed" && project.live_url && project.live_url !== '#' && (
                        <Button
                          variant="cyber"
                          size="sm"
                          asChild
                          className="flex-1 hover:scale-105 transform transition-all"
                        >
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
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