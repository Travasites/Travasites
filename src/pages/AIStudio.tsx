import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Image, label: "Image AI", id: "image" },
  { icon: FileText, label: "Content AI", id: "content" },
  { icon: Type, label: "UI Copy AI", id: "uicopy" },
  { icon: Bot, label: "App Helper", id: "helper" },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const sampleOutputs = {
  image: "🎨 Generated a stunning hero image with futuristic blue gradient...",
  content: "📝 Created a compelling blog post about AI in web development...",
  uicopy: "✨ Generated 5 variations of CTA button text...",
  helper: "🤖 Here's a React component for a responsive navbar..."
};

const AIStudio = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState([
    { id: 1, name: "Marketing Landing Page", time: "2 hours ago" },
    { id: 2, name: "Product Descriptions", time: "1 day ago" },
    { id: 3, name: "App UI Copy", time: "3 days ago" },
  ]);

  usePageMeta({
    title: "AI Studio | Blue Forge",
    description: "Build with AI-powered tools. Generate images, content, UI copy, and more in one seamless platform.",
    canonical: "https://blueforge.dev/ai-studio",
  });

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

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setOutput(null);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const sampleOutput = sampleOutputs[activeTab as keyof typeof sampleOutputs] || "✅ Generation complete!";
    setOutput(sampleOutput);
    setIsGenerating(false);
    
    toast({
      title: "Generation Complete",
      description: "Your content has been generated successfully.",
    });
  };

  const handleCopyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Output copied to clipboard.",
      });
    }
  };

  const handleDeleteProject = (id: number) => {
    setRecentProjects(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Project Deleted",
      description: "The project has been removed.",
    });
  };

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return (
        <motion.div 
          className="p-6 md:p-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6">
            Welcome to AI Studio
          </motion.h2>
          
          {/* Usage Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Generations", value: "127", color: "text-primary" },
              { label: "Images", value: "45", color: "text-pink-500" },
              { label: "Content", value: "62", color: "text-blue-500" },
              { label: "Code", value: "20", color: "text-green-500" },
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
                { title: "Image AI", desc: "Generate stunning images", icon: Image, color: "from-pink-500 to-purple-500", tab: "image" },
                { title: "Content AI", desc: "Write compelling content", icon: FileText, color: "from-blue-500 to-cyan-500", tab: "content" },
                { title: "UI Copy AI", desc: "Perfect interface text", icon: Type, color: "from-green-500 to-emerald-500", tab: "uicopy" },
                { title: "App Helper", desc: "Get coding assistance", icon: Bot, color: "from-orange-500 to-yellow-500", tab: "helper" },
              ].map((tool, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTab(tool.tab)}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 text-left transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{tool.title}</h4>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold mb-4">Recent Projects</h3>
            {recentProjects.length > 0 ? (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="p-4 rounded-lg bg-secondary/50 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <span>{project.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {project.time}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Delete ${project.name}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-lg bg-secondary/30 text-center">
                <FolderOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" aria-hidden="true" />
                <p className="text-muted-foreground">No projects yet. Start by generating some content!</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      );
    }

    // Generator View
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
                  <Loader2 className="w-10 h-10 text-primary animate-spin" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Generating...</h3>
                <p className="text-muted-foreground">This may take a few seconds</p>
              </motion.div>
            ) : output ? (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-2xl"
              >
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Output</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={handleCopyOutput}>
                        <Copy className="w-4 h-4 mr-2" aria-hidden="true" />
                        Copy
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                        Export
                      </Button>
                    </div>
                  </div>
                  <p className="text-lg">{output}</p>
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
                  <Sparkles className="w-10 h-10 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === "image" && "Generate Images"}
                  {activeTab === "content" && "Create Content"}
                  {activeTab === "uicopy" && "Write UI Copy"}
                  {activeTab === "helper" && "App Helper"}
                  {activeTab === "projects" && "Your Projects"}
                  {activeTab === "settings" && "Settings"}
                </h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  Enter a prompt below to get started with AI-powered generation
                </p>
                <p className="text-xs text-muted-foreground">
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
              <label htmlFor="prompt-input" className="sr-only">
                Enter your prompt
              </label>
              <input
                id="prompt-input"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                disabled={isGenerating}
                className="w-full h-14 px-6 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="h-14 px-8 bg-accent-gradient text-accent-foreground hover:shadow-glow disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="w-5 h-5" aria-hidden="true" />
              )}
              <span className="sr-only">Generate</span>
            </Button>
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
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
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
          role="navigation"
          aria-label="AI Studio navigation"
        >
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            {!sidebarCollapsed && (
              <span className="font-semibold text-sidebar-foreground">AI Studio</span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring hidden lg:block"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-sidebar-foreground" aria-hidden="true" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-sidebar-foreground" aria-hidden="true" />
              )}
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1" role="menu">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setOutput(null);
                  setMobileMenuOpen(false);
                }}
                role="menuitem"
                aria-current={activeTab === item.id ? "page" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeTab === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-4">
              <Button size="sm" variant="outline" className="hidden sm:flex">
                <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                New Project
              </Button>
              <Button size="sm" variant="outline" className="sm:hidden">
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">New Project</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="hidden sm:flex">
                <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                Save
              </Button>
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4 sm:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button size="sm" variant="ghost">
                <Share2 className="w-4 h-4 sm:mr-2" aria-hidden="true" />
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
