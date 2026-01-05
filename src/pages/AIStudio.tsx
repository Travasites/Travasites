import { useState } from "react";
import { motion } from "framer-motion";
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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Image, label: "Image AI", id: "image" },
  { icon: FileText, label: "Content AI", id: "content" },
  { icon: Type, label: "UI Copy AI", id: "uicopy" },
  { icon: Bot, label: "App Helper", id: "helper" },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [prompt, setPrompt] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Welcome to AI Studio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Image AI", desc: "Generate stunning images", icon: Image, color: "from-pink-500 to-purple-500" },
                { title: "Content AI", desc: "Write compelling content", icon: FileText, color: "from-blue-500 to-cyan-500" },
                { title: "UI Copy AI", desc: "Perfect interface text", icon: Type, color: "from-green-500 to-emerald-500" },
                { title: "App Helper", desc: "Get coding assistance", icon: Bot, color: "from-orange-500 to-yellow-500" },
              ].map((tool, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTab(tool.title.toLowerCase().split(" ")[0])}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 text-left transition-all group"
                  whileHover={{ y: -4 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </motion.button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Recent Projects</h3>
              <div className="space-y-3">
                {["Marketing Landing Page", "Product Descriptions", "App UI Copy"].map((project, i) => (
                  <div key={i} className="p-4 rounded-lg bg-secondary/50 flex items-center justify-between">
                    <span>{project}</span>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col h-full">
            {/* Canvas Area */}
            <div className="flex-1 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === "image" && "Generate Images"}
                  {activeTab === "content" && "Create Content"}
                  {activeTab === "uicopy" && "Write UI Copy"}
                  {activeTab === "helper" && "App Helper"}
                  {activeTab === "projects" && "Your Projects"}
                  {activeTab === "settings" && "Settings"}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Enter a prompt below to get started with AI-powered generation
                </p>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt..."
                    className="w-full h-14 px-6 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <Button className="h-14 px-8 bg-accent-gradient text-accent-foreground hover:shadow-glow">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <motion.aside
          className="h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border flex flex-col"
          animate={{ width: sidebarCollapsed ? 72 : 240 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            {!sidebarCollapsed && (
              <span className="font-semibold text-sidebar-foreground">AI Studio</span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
              )}
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="h-14 border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" variant="ghost">
                <Share2 className="w-4 h-4 mr-2" />
                Share
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
