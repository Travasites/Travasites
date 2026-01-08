import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Smartphone,
  Code,
  Gauge,
  FolderOpen,
  Settings,
  Plus,
  Save,
  Share2,
  Download,
  Hammer,
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
  User,
  FileText,
  Check
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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Smartphone, label: "Mobile-First Architect", id: "architect", credits: 3 },
  { icon: Code, label: "Code Refiner", id: "refiner", credits: 2 },
  { icon: Gauge, label: "Performance Predictor", id: "predictor", credits: 2 },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const toolDescriptions: Record<string, { title: string; desc: string; placeholder: string }> = {
  "architect": {
    title: "Mobile-First Architect",
    desc: "Transform your business idea into a complete mobile UI strategy with screen flows, component recommendations, and UX tips",
    placeholder: "Describe your business idea... e.g., 'A fitness tracking app for busy professionals with workout scheduling and progress analytics'"
  },
  "refiner": {
    title: "Code Refiner",
    desc: "Analyze and optimize your code for performance, security, and deployment readiness on Kubernetes/Coolify/Hetzner",
    placeholder: "Paste your React, PHP/Laravel, or API code here for analysis..."
  },
  "predictor": {
    title: "Performance Predictor",
    desc: "Predict Core Web Vitals impact and get caching strategy recommendations for your features",
    placeholder: "Describe the feature you want to implement... e.g., 'Adding infinite scroll with lazy-loaded images and real-time filtering'"
  },
};

interface Project {
  id: string;
  name: string;
  type: string;
  content: { prompt?: string; output?: string; model?: string } | null;
  created_at: string;
  updated_at: string;
}

// Code block component with syntax highlighting
const CodeBlock = ({ code, language = "typescript" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-border">
      <div className="absolute top-2 right-2 z-10">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={handleCopy}
          className="h-8 px-2 bg-forge-steel/80 hover:bg-forge-steel"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <div className="absolute top-2 left-3 text-xs text-muted-foreground uppercase">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          paddingTop: '2.5rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// Parse output to detect and render code blocks
const RenderOutput = ({ content, isRefiner = false }: { content: string; isRefiner?: boolean }) => {
  if (!isRefiner) {
    return <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{content}</div>;
  }

  // Parse markdown-style code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);
  
  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
          if (match) {
            const language = match[1] || 'typescript';
            const code = match[2].trim();
            return <CodeBlock key={index} code={code} language={language} />;
          }
        }
        return part.trim() ? (
          <div key={index} className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {part}
          </div>
        ) : null;
      })}
    </div>
  );
};

const AIStudio = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { credits, usage, loading: creditsLoading, refreshCredits } = useCredits();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  usePageMeta({
    title: "The Forge | Blue Forge",
    description: "Build production-ready digital products with AI-powered mobile-first architecture, code refinement, and performance prediction.",
    canonical: "https://blueforge.dev/ai-studio",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, authLoading, navigate]);

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
    setActiveTab(tabId);
    setOutput(null);
    setCurrentProjectId(null);
    setMobileMenuOpen(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !user) return;
    
    const toolCost = sidebarItems.find(i => i.id === activeTab)?.credits || 2;
    
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
      
      if (result.content) {
        setOutput(result.content);
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

  const handleDownloadMarkdown = () => {
    if (output) {
      const toolTitle = toolDescriptions[activeTab]?.title || "Blueprint";
      const header = `# ${toolTitle}\nGenerated by The Forge | Blue Forge\nDate: ${new Date().toLocaleDateString()}\n\n---\n\n`;
      const content = header + output;
      
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `forge-${activeTab}-${Date.now()}.md`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded!", description: "Blueprint saved as Markdown." });
    }
  };

  const handleDownloadPDF = () => {
    if (output) {
      // Use browser print for PDF generation
      const toolTitle = toolDescriptions[activeTab]?.title || "Blueprint";
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${toolTitle} - The Forge</title>
            <style>
              body { font-family: system-ui, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
              h1 { color: #ea5007; border-bottom: 2px solid #ea5007; padding-bottom: 10px; }
              pre { background: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
              code { font-family: monospace; }
              .header { color: #666; font-size: 12px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h1>${toolTitle}</h1>
            <div class="header">Generated by The Forge | Blue Forge<br>Date: ${new Date().toLocaleDateString()}</div>
            <pre>${output.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
      toast({ title: "Print Dialog Opened", description: "Save as PDF from the print dialog." });
    }
  };

  const handleShare = async () => {
    const content = output || '';
    
    if (navigator.share && output) {
      try {
        await navigator.share({
          title: 'The Forge Blueprint',
          text: content,
        });
      } catch {
        navigator.clipboard.writeText(content);
        toast({ title: "Copied!", description: "Blueprint copied to clipboard." });
      }
    } else if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: "Copied!", description: "Blueprint copied to clipboard for sharing." });
    }
  };

  const handleNewProject = () => {
    setPrompt('');
    setOutput(null);
    setCurrentProjectId(null);
    toast({ title: "New Project", description: "Ready for a new blueprint." });
  };

  const handleOpenProject = (project: Project) => {
    setActiveTab(project.type);
    setCurrentProjectId(project.id);
    
    if (project.content) {
      setPrompt(project.content.prompt || '');
      setOutput(project.content.output || null);
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

  const getToolIcon = (toolId: string) => {
    switch (toolId) {
      case 'architect': return Smartphone;
      case 'refiner': return Code;
      case 'predictor': return Gauge;
      default: return FolderOpen;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-forge-iron flex items-center justify-center">
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
        <motion.div className="p-6 md:p-8" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Welcome to The Forge</h2>
              <p className="text-muted-foreground">Your mobile-first development command center</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
              <Coins className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{creditsLoading ? "..." : credits?.credits_balance || 0}</span>
              <span className="text-sm text-muted-foreground">credits</span>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Generations", value: usage.length.toString(), color: "text-primary" },
              { label: "Credits Used", value: usage.reduce((sum, u) => sum + u.credits_used, 0).toString(), color: "text-forge-orange" },
              { label: "Credits Balance", value: credits?.credits_balance?.toString() || "0", color: "text-green-500" },
              { label: "Projects", value: projects.length.toString(), color: "text-blue-500" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-forge-steel border border-border">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8">
            <h3 className="font-semibold mb-4">Forge Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Mobile-First Architect", desc: "Transform ideas into mobile UI strategies", icon: Smartphone, color: "from-orange-500 to-amber-500", tab: "architect", credits: 3 },
                { title: "Code Refiner", desc: "Optimize code for production", icon: Code, color: "from-blue-500 to-cyan-500", tab: "refiner", credits: 2 },
                { title: "Performance Predictor", desc: "Predict Core Web Vitals impact", icon: Gauge, color: "from-green-500 to-emerald-500", tab: "predictor", credits: 2 },
              ].map((tool, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleTabChange(tool.tab)}
                  className="relative p-6 rounded-xl bg-forge-steel border border-border hover:border-primary/30 text-left transition-all group"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{tool.title}</h4>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Zap className="w-3 h-3" />{tool.credits}c
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Blueprints</h3>
              {projects.length > 0 && <Button variant="ghost" size="sm" onClick={() => setActiveTab("projects")}>View All</Button>}
            </div>
            {loadingProjects ? (
              <div className="flex items-center justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            ) : projects.length > 0 ? (
              <div className="space-y-3">
                {projects.slice(0, 5).map((project) => {
                  const ToolIcon = getToolIcon(project.type);
                  return (
                    <button key={project.id} onClick={() => handleOpenProject(project)} className="w-full p-4 rounded-lg bg-forge-steel flex items-center justify-between group hover:bg-secondary/80 transition-colors text-left">
                      <div className="flex items-center gap-3">
                        <ToolIcon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">{project.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground capitalize">({project.type})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{formatTimeAgo(project.updated_at)}</span>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 transition-all"><Trash2 className="w-4 h-4 text-destructive" /></button>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-lg bg-forge-steel text-center">
                <FolderOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No blueprints yet. Start forging!</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      );
    }

    if (activeTab === "settings") {
      return (
        <motion.div className="p-6 md:p-8 max-w-4xl" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6">Settings</motion.h2>
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="p-6 rounded-xl bg-forge-steel border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"><User className="w-5 h-5 text-primary" /></div>
                <h3 className="font-semibold">Profile</h3>
              </div>
              <div className="space-y-4">
                <div><label className="text-sm text-muted-foreground">Email</label><p className="font-medium">{user.email}</p></div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                  <div className="flex gap-2">
                    <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter your name" className="max-w-xs" />
                    <Button onClick={handleUpdateProfile} disabled={savingProfile}>{savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-forge-steel border border-border">
              <h3 className="font-semibold mb-4">Subscription</h3>
              <div className="flex items-center justify-between mb-4">
                <Badge className={`capitalize ${getPlanBadgeColor(credits?.plan || 'free')}`}>{credits?.plan || 'Free'} Plan</Badge>
                <Button asChild variant="outline"><Link to="/pricing">{credits?.plan === 'free' ? 'Upgrade' : 'Manage Plan'}</Link></Button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div><p className="text-2xl font-bold text-primary">{credits?.credits_balance || 0}</p><p className="text-sm text-muted-foreground">Credits Available</p></div>
                <div><p className="text-2xl font-bold">{credits?.total_credits_purchased || 0}</p><p className="text-sm text-muted-foreground">Total Purchased</p></div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-forge-steel border border-border">
              <h3 className="font-semibold mb-4">Recent Usage</h3>
              {usage.length > 0 ? (
                <Table>
                  <TableHeader><TableRow><TableHead>Tool</TableHead><TableHead>Credits</TableHead><TableHead>Time</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {usage.slice(0, 10).map((u) => (
                      <TableRow key={u.id}><TableCell className="font-medium capitalize">{u.tool.replace('-', ' ')}</TableCell><TableCell>{u.credits_used}</TableCell><TableCell className="text-muted-foreground">{formatTimeAgo(u.created_at)}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : <p className="text-muted-foreground text-center py-4">No usage history yet.</p>}
            </div>
            <div className="p-6 rounded-xl bg-forge-steel border border-border">
              <h3 className="font-semibold mb-4">Account</h3>
              <Button variant="outline" onClick={handleSignOut}><LogOut className="w-4 h-4 mr-2" />Sign Out</Button>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    if (activeTab === "projects") {
      return (
        <motion.div className="p-6 md:p-8" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6">Your Blueprints</motion.h2>
          {loadingProjects ? (
            <div className="flex items-center justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : projects.length > 0 ? (
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => {
                const ToolIcon = getToolIcon(project.type);
                return (
                  <button key={project.id} onClick={() => handleOpenProject(project)} className="p-6 rounded-xl bg-forge-steel border border-border hover:border-primary/30 transition-all group text-left">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center"><ToolIcon className="w-5 h-5 text-primary" /></div>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }} className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 transition-all"><Trash2 className="w-4 h-4 text-destructive" /></button>
                    </div>
                    <h3 className="font-semibold mb-1 truncate">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 capitalize">{project.type}</p>
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(project.updated_at)}</p>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="p-12 rounded-xl bg-forge-steel text-center">
              <FolderOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Blueprints Yet</h3>
              <p className="text-muted-foreground mb-6">Start forging to create your first blueprint.</p>
              <Button onClick={() => handleTabChange("architect")} className="bg-accent-gradient text-accent-foreground">Start Forging</Button>
            </motion.div>
          )}
        </motion.div>
      );
    }

    // Generator View
    const toolInfo = toolDescriptions[activeTab] || { title: "Forge Tool", desc: "Generate blueprints", placeholder: "Enter your prompt..." };
    const toolCost = sidebarItems.find(i => i.id === activeTab)?.credits || 2;

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 p-6 md:p-8 flex items-center justify-center overflow-auto">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-forge-steel flex items-center justify-center mx-auto mb-6"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>
                <h3 className="text-xl font-semibold mb-2">Forging...</h3>
                <p className="text-muted-foreground">Crafting your blueprint</p>
              </motion.div>
            ) : output ? (
              <motion.div key="output" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-4xl">
                <div className="p-6 rounded-xl bg-forge-steel border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Blueprint</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={handleCopyOutput}><Copy className="w-4 h-4 mr-2" />Copy</Button>
                      <Button size="sm" variant="ghost" onClick={handleDownloadMarkdown}><FileText className="w-4 h-4 mr-2" />Markdown</Button>
                      <Button size="sm" variant="ghost" onClick={handleDownloadPDF}><Download className="w-4 h-4 mr-2" />PDF</Button>
                      <Button size="sm" variant="ghost" onClick={handleShare}><Share2 className="w-4 h-4 mr-2" />Share</Button>
                    </div>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
                    <RenderOutput content={output} isRefiner={activeTab === 'refiner'} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-forge-steel flex items-center justify-center mx-auto mb-6 shadow-forge"><Hammer className="w-10 h-10 text-primary" /></div>
                <h3 className="text-xl font-semibold mb-2">{toolInfo.title}</h3>
                <p className="text-muted-foreground max-w-md mb-4">{toolInfo.desc}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-primary"><Zap className="w-4 h-4" />{toolCost} credit{toolCost > 1 ? "s" : ""} per generation</span>
                </div>
                <p className="text-xs text-muted-foreground mt-4"><kbd className="px-2 py-1 rounded bg-secondary text-xs">⌘</kbd> + <kbd className="px-2 py-1 rounded bg-secondary text-xs">Enter</kbd> to forge</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                rows={3}
                className="w-full px-6 py-4 rounded-xl bg-forge-steel border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors disabled:opacity-50 resize-none font-mono text-sm"
                onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleGenerate(); }}}
              />
            </div>
            <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating || (credits?.credits_balance || 0) < toolCost} className="h-auto px-8 bg-accent-gradient text-accent-foreground hover:shadow-forge disabled:opacity-50">
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Cost: <span className="text-primary font-medium">{toolCost} credit{toolCost > 1 ? "s" : ""}</span></span>
            <span>Balance: <span className="text-primary font-medium">{credits?.credits_balance || 0} credits</span></span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-forge-iron flex flex-col">
      <Navbar />
      <div className="flex-1 flex pt-16">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden fixed bottom-6 left-6 z-50 p-4 rounded-full bg-accent-gradient text-accent-foreground shadow-forge">{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        <AnimatePresence>{mobileMenuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)} />}</AnimatePresence>
        <motion.aside className={`fixed lg:relative inset-y-0 left-0 z-40 lg:z-0 h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] mt-16 lg:mt-0 bg-forge-iron border-r border-border flex flex-col transform lg:transform-none transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`} animate={{ width: sidebarCollapsed ? 72 : 260 }} transition={{ duration: 0.2 }}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            {!sidebarCollapsed && <div className="flex items-center gap-2"><Hammer className="w-5 h-5 text-primary" /><span className="font-semibold text-foreground">The Forge</span></div>}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:flex p-2 rounded-lg hover:bg-secondary transition-colors">{sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}</button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => handleTabChange(item.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
                {!sidebarCollapsed && item.credits && <Badge variant="outline" className="ml-auto text-xs">{item.credits}c</Badge>}
              </button>
            ))}
          </nav>
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-border">
              <Button onClick={handleNewProject} className="w-full bg-accent-gradient text-accent-foreground hover:shadow-forge"><Plus className="w-4 h-4 mr-2" />New Blueprint</Button>
            </div>
          )}
        </motion.aside>
        <main className="flex-1 flex flex-col overflow-hidden">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AIStudio;
