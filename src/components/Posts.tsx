import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Send } from "lucide-react";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface LikeCount {
  post_id: string;
  count: number;
  liked: boolean;
}

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [likes, setLikes] = useState<Record<string, LikeCount>>({});
  const [newComment, setNewComment] = useState<Record<string, { name: string; content: string }>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [visitorIp, setVisitorIp] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
    fetchVisitorIp();
  }, []);

  const fetchVisitorIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setVisitorIp(data.ip);
    } catch (error) {
      setVisitorIp(`anonymous_${Date.now()}`);
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    setPosts(data || []);
    
    // Fetch comments and likes for each post
    data?.forEach((post) => {
      fetchComments(post.id);
      fetchLikes(post.id);
    });
  };

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('post_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setComments((prev) => ({ ...prev, [postId]: data }));
    }
  };

  const fetchLikes = async (postId: string) => {
    const { data, error } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId);

    if (!error && data) {
      const userLiked = data.some((like) => like.visitor_ip === visitorIp);
      setLikes((prev) => ({
        ...prev,
        [postId]: { post_id: postId, count: data.length, liked: userLiked },
      }));
    }
  };

  const handleLike = async (postId: string) => {
    const currentLike = likes[postId];
    
    if (currentLike?.liked) {
      // Unlike
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('visitor_ip', visitorIp);

      if (!error) {
        setLikes((prev) => ({
          ...prev,
          [postId]: { ...prev[postId], count: prev[postId].count - 1, liked: false },
        }));
      }
    } else {
      // Like
      const { error } = await supabase
        .from('post_likes')
        .insert({ post_id: postId, visitor_ip: visitorIp });

      if (!error) {
        setLikes((prev) => ({
          ...prev,
          [postId]: { 
            post_id: postId, 
            count: (prev[postId]?.count || 0) + 1, 
            liked: true 
          },
        }));
      } else if (error.code === '23505') {
        toast({
          title: "Already liked",
          description: "You have already liked this post",
        });
      }
    }
  };

  const handleAddComment = async (postId: string) => {
    const commentData = newComment[postId];
    if (!commentData?.name?.trim() || !commentData?.content?.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name and comment",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        author_name: commentData.name.trim(),
        content: commentData.content.trim(),
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
      return;
    }

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), data],
    }));
    setNewComment((prev) => ({ ...prev, [postId]: { name: "", content: "" } }));
    toast({
      title: "Success",
      description: "Comment added successfully",
    });
  };

  if (posts.length === 0) return null;

  return (
    <section id="posts" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">
          <span className="bg-gradient-cyber bg-clip-text text-transparent">Latest Posts</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-card/50 backdrop-blur-sm border-card-border overflow-hidden hover:shadow-neon transition-all duration-300">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                {post.description && (
                  <p className="text-muted-foreground text-sm mb-3">{post.description}</p>
                )}
                <p className="text-xs text-muted-foreground mb-4">
                  {format(new Date(post.created_at), 'MMM d, yyyy')}
                </p>

                {/* Like and Comment buttons */}
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={likes[post.id]?.liked ? "text-red-500" : ""}
                  >
                    <Heart
                      size={18}
                      className={likes[post.id]?.liked ? "fill-red-500" : ""}
                    />
                    <span className="ml-1">{likes[post.id]?.count || 0}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                  >
                    <MessageCircle size={18} />
                    <span className="ml-1">{comments[post.id]?.length || 0}</span>
                  </Button>
                </div>

                {/* Comments section */}
                {showComments[post.id] && (
                  <div className="space-y-3 border-t border-border pt-3">
                    {/* Existing comments */}
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {comments[post.id]?.map((comment) => (
                        <div key={comment.id} className="bg-background/50 p-2 rounded text-sm">
                          <p className="font-medium text-primary">{comment.author_name}</p>
                          <p className="text-foreground">{comment.content}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(comment.created_at), 'MMM d, h:mm a')}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Add new comment */}
                    <div className="space-y-2">
                      <Input
                        placeholder="Your name"
                        value={newComment[post.id]?.name || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [post.id]: { ...prev[post.id], name: e.target.value },
                          }))
                        }
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a comment..."
                          value={newComment[post.id]?.content || ""}
                          onChange={(e) =>
                            setNewComment((prev) => ({
                              ...prev,
                              [post.id]: { ...prev[post.id], content: e.target.value },
                            }))
                          }
                          className="text-sm"
                        />
                        <Button
                          size="icon"
                          onClick={() => handleAddComment(post.id)}
                        >
                          <Send size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
