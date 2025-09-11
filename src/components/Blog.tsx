import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Getting Started with IoT Projects: A Beginner's Guide",
      excerpt: "Learn the fundamentals of IoT development, from choosing the right hardware to setting up your first connected device. Perfect for newcomers to embedded systems.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=250&fit=crop",
      author: "Hakizimana Leogad",
      date: "March 15, 2025",
      readTime: "8 min read",
      category: "Tutorial",
      featured: true
    },
    {
      title: "How to Build a Smart Alarm with ESP32",
      excerpt: "Step-by-step tutorial on creating an intelligent alarm system using ESP32, sensors, and mobile app integration for enhanced home security.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop",
      author: "Hakizimana Leogad",
      date: "March 10, 2025",
      readTime: "12 min read",
      category: "Project Guide"
    },
    {
      title: "Why Embedded Systems Are the Future of Smart Devices",
      excerpt: "Exploring the role of embedded systems in modern technology and how they're shaping the future of connected devices and IoT applications.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      author: "Hakizimana Leogad",
      date: "March 5, 2025",
      readTime: "6 min read",
      category: "Insights"
    },
    {
      title: "Optimizing Power Consumption in IoT Devices",
      excerpt: "Essential techniques for reducing power consumption in battery-powered IoT devices, including sleep modes, efficient coding, and hardware selection.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      author: "Hakizimana Leogad",
      date: "February 28, 2025",
      readTime: "10 min read",
      category: "Technical"
    },
    {
      title: "MQTT vs HTTP: Choosing the Right Protocol for IoT",
      excerpt: "Comprehensive comparison of communication protocols for IoT applications, helping you make informed decisions for your next project.",
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=250&fit=crop",
      author: "Hakizimana Leogad",
      date: "February 20, 2025",
      readTime: "7 min read",
      category: "Comparison"
    },
    {
      title: "Building Scalable IoT Solutions with Cloud Platforms",
      excerpt: "Learn how to leverage cloud platforms like AWS IoT and Google Cloud to build scalable, reliable IoT solutions that can grow with your business.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      author: "Hakizimana Leogad",
      date: "February 15, 2025",
      readTime: "11 min read",
      category: "Cloud"
    }
  ];

  const categories = ["All", "Tutorial", "Project Guide", "Insights", "Technical", "Comparison", "Cloud"];

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Latest <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Stay updated with the latest trends, tutorials, and insights in IoT development, 
              embedded systems, and smart device innovations.
            </p>
            <div className="w-24 h-1 bg-gradient-neon mx-auto rounded-full"></div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "neon" : "outline"}
                size="sm"
                className={index === 0 ? "" : "border-primary/30 hover:border-primary hover:bg-primary/10"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          {blogPosts[0] && (
            <div className="mb-16">
              <div className="bg-card border border-card-border rounded-lg overflow-hidden shadow-card hover:shadow-neon transition-all duration-smooth hover:border-primary/50 group">
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                    />
                  </div>
                  <div className="lg:w-1/2 p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                        Featured
                      </span>
                      <span className="px-3 py-1 bg-secondary/50 text-muted-foreground text-xs rounded-full">
                        {blogPosts[0].category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors duration-smooth">
                      {blogPosts[0].title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {blogPosts[0].excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{blogPosts[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{blogPosts[0].date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{blogPosts[0].readTime}</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="neon" className="group">
                      <span>Read More</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-smooth" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={index}
                className="bg-card border border-card-border rounded-lg overflow-hidden shadow-card hover:shadow-neon transition-all duration-smooth hover:border-primary/50 hover:-translate-y-2 group"
              >
                {/* Post Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-slow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-smooth line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button variant="outline" size="sm" className="w-full border-primary/30 hover:border-primary hover:bg-primary/10 group">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-smooth" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-card border border-card-border rounded-lg p-8 shadow-card text-center">
            <h3 className="text-2xl font-heading font-semibold mb-4 text-primary">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to my newsletter for the latest IoT tutorials, project updates, 
              and industry insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-secondary border border-primary/30 rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
              <Button variant="neon">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;