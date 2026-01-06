import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Type, 
  Bot,
  FolderOpen,
  Settings,
  Plus,
  Save,
  Share2,
  Download,
  Sparkles,
  Send,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Copy,
  Loader2,
  Trash2,
  Clock,
  Coins,
  LogOut,
  Zap,
  Lock,
  ExternalLink,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCredits } from "@/hooks/useCredits";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SidebarItem {
  icon: typeof LayoutDashboard;
  label: string;
  id: string;
  credits?: number;
  paidOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Image, label: "Image AI", id: "image-ai", credits: 5 },
  { icon: FileText, label: "Content AI", id: "content-ai", credits: 1 },
  { icon: Type, label: "UI Copy AI", id: "ui-copy", credits: 1, paidOnly: true },
  { icon: Bot, label: "App Helper", id: "app-helper", credits: 2, paidOnly: true },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const toolDescriptions: Record<string, { title: string; desc: string; placeholder: string }> = {
  "image-ai": {
    title: "Generate Images",
    desc: "Create AI-powered images from text descriptions",
    placeholder: "Describe the image you want to create... e.g., 'A futuristic city at sunset with flying cars'"
  },
  "content-ai": {
    title: "Create Content",
    desc: "Generate blog posts, articles, marketing copy and more",
    placeholder: "What content would you like to create? e.g., 'Write a blog post about AI trends in 2025'"
  },
  "ui-copy": {
    title: "Write UI Copy",
    desc: "Generate button text, error messages, tooltips and more",
    placeholder: "Describe the UI element you need copy for... e.g., 'Error message for invalid email'"
  },
  "app-helper": {
    title: "App Helper",
    desc: "Get coding assistance and architecture advice",
    placeholder: "What do you need help with? e.g., 'How do I implement authentication in React?'"
  },
};

interface Project {
  id: string;
  name: string;
  type: string;
  content: { prompt?: string; output?: string; imageUrl?: string; model?: string } | null;
  created_at: string;
  updated_at: string;
}

const AIStudio = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { credits, usage, loading: creditsLoading, refreshCredits, isToolLocked, canAccessTool } = useCredits();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  usePageMeta({
    title: "AI Studio | Blue Forge",
    description: "Build with AI-powered tools. Generate images, content, UI copy, and more in one seamless platform.",
    canonical: "https://blueforge.dev/ai-studio",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Fetch user profile
  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchProjects();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .single();
    if (data?.display_name) {
      setDisplayName(data.display_name);
    }
  };

  const fetchProjects = async () => {
    if (!user) return;
    
    setLoadingProjects(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setProjects(data as Project[]);
    }
    setLoadingProjects(false);
  };

  // Keyboard shortcut: Cmd/Ctrl + Enter to submit
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && prompt.trim() && !isGenerating) {
      handleGenerate();
    }
  }, [prompt, isGenerating]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleTabChange = (tabId: string) => {
    // Check if tool is locked
    if (isToolLocked(tabId)) {
      toast({
        title: "Upgrade Required",
        description: "This tool is available on Starter plans and above.",
        variant: "destructive",
      });
      return;
    }
    
    setActiveTab(tabId);
    setOutput(null);
    setOutputImage(null);
    setCurrentProjectId(null);
    setMobileMenuOpen(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !user) return;
    
    if (!canAccessTool(activeTab)) {
      toast({
        title: "Upgrade Required",
        description: "This tool is available on Starter plans and above.",
        variant: "destructive",
      });
      return;
    }
    
    const toolCost = sidebarItems.find(i => i.id === activeTab)?.credits || 1;
    
    if (credits && credits.credits_balance < toolCost) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${toolCost} credits. Current balance: ${credits.credits_balance}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setOutput(null);
    setOutputImage(null);
    
    try {
      const response = await supabase.functions.invoke("ai-generate", {
        body: { 
          tool: activeTab,
          prompt: prompt,
          projectName: `${activeTab}-${Date.now()}`
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Generation failed");
      }

      const result = response.data;
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Set text output
      if (result.content) {
        setOutput(result.content);
      }
      
      // Set image output for image-ai
      if (result.imageUrl) {
        setOutputImage(result.imageUrl);
      }
      
      refreshCredits();
      fetchProjects();
      
      toast({
        title: "Generation Complete",
        description: `Used ${result.credits_used} credits. Remaining: ${result.credits_remaining}`,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate content";
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Output copied to clipboard." });
    }
  };

  const handleDownload = () => {
    if (activeTab === 'image-ai' && outputImage) {
      const link = document.createElement('a');
      link.download = `blueforge-image-${Date.now()}.png`;
      link.href = outputImage;
      link.click();
      toast({ title: "Downloaded!", description: "Image saved to your device." });
    } else if (output) {
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `blueforge-${activeTab}-${Date.now()}.txt`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded!", description: "Content saved to your device." });
    }
  };

  const handleShare = async () => {
    const content = output || '';
    
    if (navigator.share && (output || outputImage)) {
      try {
        await navigator.share({
          title: 'Blue Forge AI Generation',
          text: content,
        });
      } catch {
        // User cancelled or share failed
        navigator.clipboard.writeText(content);
        toast({ title: "Copied!", description: "Content copied to clipboard." });
      }
    } else if (output || outputImage) {
      navigator.clipboard.writeText(outputImage || output || '');
      toast({ title: "Copied!", description: "Content copied to clipboard for sharing." });
    } else {
      toast({ title: "Nothing to share", description: "Generate content first.", variant: "destructive" });
    }
  };

  const handleNewProject = () => {
    setPrompt('');
    setOutput(null);
    setOutputImage(null);
    setCurrentProjectId(null);
    toast({ title: "New Project", description: "Ready for a new generation." });
  };

  const handleSaveProject = async () => {
    if (!output && !outputImage) {
      toast({ title: "Nothing to save", description: "Generate content first.", variant: "destructive" });
      return;
    }
    
    toast({ title: "Project Saved", description: "Your work has been saved automatically." });
  };

  const handleOpenProject = (project: Project) => {
    setActiveTab(project.type);
    setCurrentProjectId(project.id);
    
    if (project.content) {
      setPrompt(project.content.prompt || '');
      setOutput(project.content.output || null);
      setOutputImage(project.content.imageUrl || null);
    }
    
    toast({ title: "Project Loaded", description: `Opened: ${project.name}` });
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
    } else {
      setProjects(prev => prev.filter(p => p.id !== id));
      if (currentProjectId === id) {
        handleNewProject();
      }
      toast({ title: "Deleted", description: "Project removed." });
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("user_id", user.id);
    
    setSavingProfile(false);
    
    if (error) {
      toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" });
    } else {
      toast({ title: "Profile Updated", description: "Your changes have been saved." });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'business': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'pro': return 'bg-primary/20 text-primary border-primary/30';
      case 'starter': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-secondary text-muted-foreground border-border';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return (
        <motion.div 
          className="p-6 md:p-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Welcome to AI Studio</h2>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
              <Coins className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">
                {creditsLoading ? "..." : credits?.credits_balance || 0}
              </span>
              <span className="text-sm text-muted-foreground">credits</span>
            </div>
          </motion.div>
          
          {/* Usage Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Generations", value: usage.length.toString(), color: "text-primary" },
              { label: "Credits Used", value: usage.reduce((sum, u) => sum + u.credits_used, 0).toString(), color: "text-pink-500" },
              { label: "Credits Balance", value: credits?.credits_balance?.toString() || "0", color: "text-green-500" },
              { label: "Projects", value: projects.length.toString(), color: "text-blue-500" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/50 border border-border">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Image AI", desc: "Generate stunning images", icon: Image, color: "from-pink-500 to-purple-500", tab: "image-ai", credits: 5, locked: false },
                { title: "Content AI", desc: "Write compelling content", icon: FileText, color: "from-blue-500 to-cyan-500", tab: "content-ai", credits: 1, locked: false },
                { title: "UI Copy AI", desc: "Perfect interface text", icon: Type, color: "from-green-500 to-emerald-500", tab: "ui-copy", credits: 1, locked: isToolLocked("ui-copy") },
                { title: "App Helper", desc: "Get coding assistance", icon: Bot, color: "from-orange-500 to-yellow-500", tab: "app-helper", credits: 2, locked: isToolLocked("app-helper") },
              ].map((tool, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleTabChange(tool.tab)}
                  className={`relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 text-left transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tool.locked ? 'opacity-75' : ''}`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tool.locked && (
                    <div className="absolute top-3 right-3">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{tool.title}</h4>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Zap className="w-3 h-3" />
                      {tool.credits}c
                    </span>
                    {tool.locked && (
                      <Badge variant="outline" className="text-xs">Starter+</Badge>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Projects</h3>
              {projects.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("projects")}>
                  View All <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
            {loadingProjects ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : projects.length > 0 ? (
              <div className="space-y-3">
                {projects.slice(0, 5).map((project) => (
                  <button 
                    key={project.id} 
                    onClick={() => handleOpenProject(project)}
                    className="w-full p-4 rounded-lg bg-secondary/50 flex items-center justify-between group hover:bg-secondary/80 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">{project.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({project.type})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(project.updated_at)}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 transition-all"
                        aria-label={`Delete ${project.name}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-lg bg-secondary/30 text-center">
                <FolderOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No projects yet. Start by generating some content!</p>
              </div>
            )}
          </motion.div>

          {/* Upgrade CTA */}
          {credits && credits.plan === 'free' && (
            <motion.div variants={fadeInUp} className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Unlock All Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Starter to access UI Copy AI and App Helper.
                  </p>
                </div>
                <Button asChild className="bg-accent-gradient text-accent-foreground">
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      );
    }

    if (activeTab === "settings") {
      return (
        <motion.div 
          className="p-6 md:p-8 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6">Settings</motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Profile Section */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">Profile</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                  <div className="flex gap-2">
                    <Input 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your name"
                      className="max-w-xs"
                    />
                    <Button onClick={handleUpdateProfile} disabled={savingProfile}>
                      {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Section */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Subscription</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge className={`capitalize ${getPlanBadgeColor(credits?.plan || 'free')}`}>
                    {credits?.plan || 'Free'} Plan
                  </Badge>
                </div>
                <Button asChild variant="outline">
                  <Link to="/pricing">
                    {credits?.plan === 'free' ? 'Upgrade' : 'Manage Plan'}
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-2xl font-bold text-primary">{credits?.credits_balance || 0}</p>
                  <p className="text-sm text-muted-foreground">Credits Available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{credits?.total_credits_purchased || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Purchased</p>
                </div>
              </div>
            </div>

            {/* Usage History */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Recent Usage</h3>
              {usage.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tool</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usage.slice(0, 10).map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium capitalize">{u.tool.replace('-', ' ')}</TableCell>
                          <TableCell>{u.credits_used}</TableCell>
                          <TableCell className="text-muted-foreground">{formatTimeAgo(u.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No usage history yet.</p>
              )}
            </div>

            {/* Sign Out */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Account</h3>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    if (activeTab === "projects") {
      return (
        <motion.div 
          className="p-6 md:p-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6">Your Projects</motion.h2>
          
          {loadingProjects ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length > 0 ? (
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <button 
                  key={project.id} 
                  onClick={() => handleOpenProject(project)}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group text-left"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      {project.type === 'image-ai' ? (
                        <Image className="w-5 h-5 text-primary" />
                      ) : (
                        <FolderOpen className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 transition-all"
                      aria-label={`Delete ${project.name}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                  <h3 className="font-semibold mb-1 truncate">{project.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 capitalize">{project.type.replace('-', ' ')}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(project.updated_at)}
                  </p>
                  {project.content?.imageUrl && (
                    <div className="mt-3 h-20 rounded-lg overflow-hidden bg-secondary">
                      <img 
                        src={project.content.imageUrl} 
                        alt="Project preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="p-12 rounded-xl bg-secondary/30 text-center">
              <FolderOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-6">Start creating to save your projects here.</p>
              <Button onClick={() => handleTabChange("content-ai")} className="bg-accent-gradient text-accent-foreground">
                Create Your First Project
              </Button>
            </motion.div>
          )}
        </motion.div>
      );
    }

    // Generator View
    const toolInfo = toolDescriptions[activeTab] || { title: "AI Tool", desc: "Generate content", placeholder: "Enter your prompt..." };
    const toolCost = sidebarItems.find(i => i.id === activeTab)?.credits || 1;

    return (
      <div className="flex flex-col h-full">
        {/* Canvas Area */}
        <div className="flex-1 p-6 md:p-8 flex items-center justify-center overflow-auto">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Generating...</h3>
                <p className="text-muted-foreground">This may take a few seconds</p>
              </motion.div>
            ) : (output || outputImage) ? (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-3xl"
              >
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Output</h3>
                    <div className="flex gap-2">
                      {output && (
                        <Button size="sm" variant="ghost" onClick={handleCopyOutput}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                  
                  {/* Image Output */}
                  {outputImage && (
                    <div className="mb-4">
                      <img 
                        src={outputImage} 
                        alt="Generated image" 
                        className="max-w-full rounded-lg shadow-lg mx-auto"
                      />
                    </div>
                  )}
                  
                  {/* Text Output */}
                  {output && (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{output}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{toolInfo.title}</h3>
                <p className="text-muted-foreground max-w-md mb-4">{toolInfo.desc}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-primary">
                    <Zap className="w-4 h-4" />
                    {toolCost} credit{toolCost > 1 ? "s" : ""} per generation
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  <kbd className="px-2 py-1 rounded bg-secondary text-xs">⌘</kbd>
                  {" + "}
                  <kbd className="px-2 py-1 rounded bg-secondary text-xs">Enter</kbd>
                  {" to generate"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Prompt Input */}
        <div className="p-4 md:p-6 border-t border-border">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <label htmlFor="prompt-input" className="sr-only">Enter your prompt</label>
              <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={toolInfo.placeholder}
                disabled={isGenerating}
                rows={2}
                className="w-full px-6 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors disabled:opacity-50 resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating || (credits?.credits_balance || 0) < toolCost}
              className="h-auto px-8 bg-accent-gradient text-accent-foreground hover:shadow-glow disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span className="sr-only">Generate</span>
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>
              Cost: <span className="text-primary font-medium">{toolCost} credit{toolCost > 1 ? "s" : ""}</span>
            </span>
            <span>
              Balance: <span className="text-primary font-medium">{credits?.credits_balance || 0} credits</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-6 left-6 z-50 p-4 rounded-full bg-accent-gradient text-accent-foreground shadow-glow"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          className={`
            fixed lg:relative inset-y-0 left-0 z-40 lg:z-0
            h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] mt-16 lg:mt-0
            bg-sidebar border-r border-sidebar-border flex flex-col
            transform lg:transform-none transition-transform duration-300
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          animate={{ width: sidebarCollapsed ? 72 : 240 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sidebar-foreground">AI Studio</span>
                <Badge variant="outline" className={`text-xs ${getPlanBadgeColor(credits?.plan || 'free')}`}>
                  {credits?.plan || 'free'}
                </Badge>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors hidden lg:block"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4 text-sidebar-foreground" /> : <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />}
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => {
              const locked = item.paidOnly && isToolLocked(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  } ${locked ? 'opacity-60' : ''}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-sm">{item.label}</span>
                      <div className="flex items-center gap-1">
                        {locked && <Lock className="w-3 h-3" />}
                        {item.credits && !locked && (
                          <span className="text-xs opacity-60">{item.credits}c</span>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Upgrade CTA */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-sidebar-border">
              <Button asChild size="sm" className="w-full bg-accent-gradient text-accent-foreground">
                <Link to="/pricing">
                  <Coins className="w-4 h-4 mr-2" />
                  {credits?.plan === 'free' ? 'Upgrade' : 'Get Credits'}
                </Link>
              </Button>
            </div>
          )}
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-4">
              <Button size="sm" variant="outline" onClick={handleNewProject}>
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">New</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                <Coins className="w-4 h-4" />
                <span className="font-medium">{credits?.credits_balance || 0}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={handleSaveProject}>
                <Save className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDownload} disabled={!output && !outputImage}>
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button size="sm" variant="ghost" onClick={handleShare} disabled={!output && !outputImage}>
                <Share2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-background overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudio;
