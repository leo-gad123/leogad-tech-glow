import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Pencil, Trash2, Mail, User as UserIcon, Award } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import { Badge } from "@/components/ui/badge";
import { Session, User } from '@supabase/supabase-js';
import ProjectForm from "@/components/admin/ProjectForm";
import ProfilePictureUpload from "@/components/admin/ProfilePictureUpload";
import CertificationForm from "@/components/admin/CertificationForm";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  technologies: string[];
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

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  description?: string;
  created_at: string;
}

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  is_admin: boolean;
}

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [profileFormData, setProfileFormData] = useState({
    full_name: "",
    bio: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile?.is_admin) {
      fetchProjects();
      fetchMessages();
      fetchCertifications();
      setProfileFormData({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      
      if (!data.is_admin) {
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('issue_date', { ascending: false });

      if (error) throw error;
      setCertifications(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.filter(m => m.id !== messageId));
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteCertification = async (certificationId: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;

    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', certificationId);

      if (error) throw error;

      setCertifications(certifications.filter(c => c.id !== certificationId));
      toast({
        title: "Success",
        description: "Certification deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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
        description: "Project deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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
    handleProjectFormClose();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAvatarUpdate = (url: string) => {
    setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
  };

  const handleEditCertification = (certification: Certification) => {
    setEditingCertification(certification);
    setShowCertificationForm(true);
  };

  const handleAddCertification = () => {
    setEditingCertification(null);
    setShowCertificationForm(true);
  };

  const handleCertificationFormClose = () => {
    setShowCertificationForm(false);
    setEditingCertification(null);
  };

  const handleCertificationSave = () => {
    fetchCertifications();
    handleCertificationFormClose();
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileFormData.full_name,
          bio: profileFormData.bio,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { 
        ...prev, 
        full_name: profileFormData.full_name,
        bio: profileFormData.bio,
      } : null);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have admin privileges.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-primary">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserIcon size={20} className="text-muted-foreground" />
              <span className="text-sm text-card-foreground">{profile.email}</span>
            </div>
            <ThemeCustomizer isAdmin={true} />
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">Manage Projects</h2>
              <Button onClick={handleAddProject}>
                <Plus size={16} className="mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-6">Contact Messages</h2>
            <div className="grid gap-4">
              {messages.map((message) => (
                <Card key={message.id} className={message.status === 'unread' ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {message.name}
                          {message.status === 'unread' && <Badge>New</Badge>}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Mail size={14} />
                          {message.email}
                        </CardDescription>
                      </div>
                       <div className="flex gap-2">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => deleteMessage(message.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">Manage Certifications</h2>
              <Button onClick={handleAddCertification}>
                <Plus size={16} className="mr-2" />
                Add Certification
              </Button>
            </div>

            <div className="grid gap-4">
              {certifications.map((certification) => (
                <Card key={certification.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Award size={20} className="text-primary" />
                          {certification.title}
                        </CardTitle>
                        <CardDescription>{certification.issuer}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditCertification(certification)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCertification(certification.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {certification.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{certification.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-6">Profile Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profileFormData.full_name}
                    onChange={(e) => setProfileFormData({ ...profileFormData, full_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileFormData.bio}
                    onChange={(e) => setProfileFormData({ ...profileFormData, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Profile Picture</Label>
                  <ProfilePictureUpload 
                    userId={user?.id || ''} 
                    currentAvatarUrl={profile.avatar_url}
                    onUploadComplete={handleAvatarUpdate}
                  />
                </div>
                <Button onClick={handleProfileUpdate}>
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleProjectFormClose}
          onSave={handleProjectSave}
        />
      )}

      {showCertificationForm && (
        <CertificationForm
          certification={editingCertification}
          onClose={handleCertificationFormClose}
          onSave={handleCertificationSave}
        />
      )}
    </div>
  );
};

export default Admin;
