import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Mail, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Github,
  User
} from "lucide-react";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import ProjectForm from "@/components/admin/ProjectForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfilePictureUpload } from "@/components/admin/ProfilePictureUpload";

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
  created_at: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface Profile {
  is_admin: boolean;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
}

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'profile'>('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile?.is_admin) {
      fetchProjects();
      fetchMessages();
    }
  }, [profile]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, full_name, email, avatar_url')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      
      if (!data.is_admin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to verify admin access.",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects.",
        variant: "destructive"
      });
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch messages.",
        variant: "destructive"
      });
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('id', messageId);

      if (error) throw error;
      
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ));
      
      toast({
        title: "Success",
        description: "Message marked as read.",
      });
    } catch (error: any) {
      console.error('Error updating message:', error);
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive"
      });
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      
      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive"
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleProjectFormClose = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleProjectSave = () => {
    fetchProjects();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAvatarUpdate = (url: string) => {
    setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              You don't have permission to access this page.
            </p>
            <Button onClick={() => navigate('/')}>
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-card-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
              <div>
                <h1 className="text-xl font-heading font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome, {profile.full_name || profile.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                View Site
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Messages ({messages.filter(m => m.status === 'unread').length} unread)
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Profile
            </button>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold">Projects</h2>
              <Button onClick={handleAddProject} className="flex items-center gap-2">
                <Plus size={16} />
                Add Project
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {project.featured && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          Featured
                        </Badge>
                      )}
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {project.github_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github size={14} />
                            </a>
                          </Button>
                        )}
                        {project.live_url && project.live_url !== '#' && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={14} />
                            </a>
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-semibold">Contact Messages</h2>
              <p className="text-muted-foreground">
                {messages.filter(m => m.status === 'unread').length} unread messages
              </p>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className={`${message.status === 'unread' ? 'border-primary/50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{message.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {new Date(message.created_at).toLocaleDateString()}
                        </div>
                        {message.status === 'unread' ? (
                          <Badge variant="default">Unread</Badge>
                        ) : (
                          <Badge variant="secondary">
                            <CheckCircle size={12} className="mr-1" />
                            Read
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                      {message.message}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${message.email}`}>
                          Reply via Email
                        </a>
                      </Button>
                      
                      {message.status === 'unread' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markMessageAsRead(message.id)}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {messages.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                    <p className="text-muted-foreground">
                      Contact form messages will appear here when received.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-semibold">Profile Settings</h2>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <div className="grid gap-6 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfilePictureUpload 
                    userId={user?.id || ''}
                    currentAvatarUrl={profile?.avatar_url}
                    onUploadSuccess={handleAvatarUpdate}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <p className="text-base mt-1">{profile?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-base mt-1">{profile?.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Role</Label>
                    <Badge variant="default" className="mt-1">Admin</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject || undefined}
          onClose={handleProjectFormClose}
          onSave={handleProjectSave}
        />
      )}
    </div>
  );
};

export default Admin;