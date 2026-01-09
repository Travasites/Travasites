import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  Activity,
  BarChart3,
  TrendingUp,
  Coins,
  Shield,
  RefreshCw,
  Loader2,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  display_name: string | null;
  plan: string | null;
  created_at: string;
}

interface UserCredit {
  user_id: string;
  credits_balance: number;
  total_credits_purchased: number;
}

interface UsageRecord {
  id: string;
  user_id: string;
  tool: string;
  credits_used: number;
  model: string | null;
  created_at: string;
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalCreditsUsed: number;
  totalRevenue: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { toast } = useToast();

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalCreditsUsed: 0,
    totalRevenue: 0,
  });
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [userCredits, setUserCredits] = useState<Map<string, UserCredit>>(new Map());
  const [usageHistory, setUsageHistory] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "usage">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  usePageMeta({
    title: "Admin Dashboard | Blue Forge",
    description: "Admin dashboard for managing users, subscriptions, and AI usage.",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
      return;
    }

    if (!adminLoading && !isAdmin && user) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all users
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      setUsers(profilesData || []);

      // Fetch user credits
      const { data: creditsData, error: creditsError } = await supabase
        .from("user_credits")
        .select("*");

      if (creditsError) throw creditsError;

      const creditsMap = new Map<string, UserCredit>();
      (creditsData || []).forEach((credit) => {
        creditsMap.set(credit.user_id, credit);
      });
      setUserCredits(creditsMap);

      // Fetch usage history (last 100 records)
      const { data: usageData, error: usageError } = await supabase
        .from("usage_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (usageError) throw usageError;

      setUsageHistory(usageData || []);

      // Calculate stats
      const totalUsers = profilesData?.length || 0;
      const activeUsers = creditsData?.filter((c) => c.credits_balance > 0).length || 0;
      const totalCreditsUsed = usageData?.reduce((sum, u) => sum + u.credits_used, 0) || 0;
      const totalRevenue = creditsData?.reduce((sum, c) => sum + c.total_credits_purchased, 0) || 0;

      setStats({
        totalUsers,
        activeUsers,
        totalCreditsUsed,
        totalRevenue,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (userId: string, newPlan: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ plan: newPlan as "free" | "starter" | "pro" | "business" })
        .eq("user_id", userId);

      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) => (u.user_id === userId ? { ...u, plan: newPlan } : u))
      );

      toast({
        title: "Plan Updated",
        description: `User plan changed to ${newPlan}.`,
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      toast({
        title: "Error",
        description: "Failed to update user plan.",
        variant: "destructive",
      });
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredUsers = users
    .filter((u) => {
      const matchesSearch =
        searchQuery === "" ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.display_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlan = planFilter === "all" || u.plan === planFilter;
      return matchesSearch && matchesPlan;
    })
    .sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      if (sortField === "created_at") {
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
      } else if (sortField === "email") {
        aVal = a.email || "";
        bVal = b.email || "";
      } else if (sortField === "credits") {
        aVal = userCredits.get(a.user_id)?.credits_balance || 0;
        bVal = userCredits.get(b.user_id)?.credits_balance || 0;
      }

      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

  const getPlanBadge = (plan: string | null) => {
    const colors: Record<string, string> = {
      business: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      pro: "bg-primary/20 text-primary border-primary/30",
      starter: "bg-green-500/20 text-green-400 border-green-500/30",
      free: "bg-secondary text-muted-foreground border-border",
    };
    return colors[plan || "free"] || colors.free;
  };

  const getToolBadge = (tool: string) => {
    const colors: Record<string, string> = {
      architect: "bg-blue-500/20 text-blue-400",
      refiner: "bg-green-500/20 text-green-400",
      predictor: "bg-purple-500/20 text-purple-400",
    };
    return colors[tool] || "bg-secondary text-muted-foreground";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading || adminLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <section className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage users, subscriptions, and monitor AI usage
                </p>
              </div>
              <Button onClick={fetchDashboardData} disabled={loading} variant="outline">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={fadeInUp} className="flex gap-2 border-b border-border pb-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "users", label: "Users", icon: Users },
                { id: "usage", label: "AI Usage", icon: Activity },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className="gap-2"
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              ))}
            </motion.div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500">{stats.activeUsers}</div>
                    <p className="text-xs text-muted-foreground mt-1">With credit balance</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Credits Used</CardTitle>
                    <Coins className="w-5 h-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{stats.totalCreditsUsed}</div>
                    <p className="text-xs text-muted-foreground mt-1">Total AI credits consumed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Credits Purchased</CardTitle>
                    <CreditCard className="w-5 h-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-500">{stats.totalRevenue}</div>
                    <p className="text-xs text-muted-foreground mt-1">Total credits bought</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <motion.div variants={fadeInUp} className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by email or name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead
                            className="cursor-pointer hover:text-foreground"
                            onClick={() => handleSort("email")}
                          >
                            <div className="flex items-center gap-1">
                              User
                              {sortField === "email" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                ))}
                            </div>
                          </TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead
                            className="cursor-pointer hover:text-foreground"
                            onClick={() => handleSort("credits")}
                          >
                            <div className="flex items-center gap-1">
                              Credits
                              {sortField === "credits" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                ))}
                            </div>
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:text-foreground"
                            onClick={() => handleSort("created_at")}
                          >
                            <div className="flex items-center gap-1">
                              Joined
                              {sortField === "created_at" &&
                                (sortDirection === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                ))}
                            </div>
                          </TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No users found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredUsers.map((userProfile) => {
                            const credits = userCredits.get(userProfile.user_id);
                            return (
                              <TableRow key={userProfile.id}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">
                                      {userProfile.display_name || "No name"}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {userProfile.email}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getPlanBadge(userProfile.plan)}>
                                    {userProfile.plan || "free"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Coins className="w-4 h-4 text-primary" />
                                    {credits?.credits_balance || 0}
                                  </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {formatDate(userProfile.created_at)}
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={userProfile.plan || "free"}
                                    onValueChange={(value) =>
                                      handleUpdatePlan(userProfile.user_id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-[120px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="free">Free</SelectItem>
                                      <SelectItem value="starter">Starter</SelectItem>
                                      <SelectItem value="pro">Pro</SelectItem>
                                      <SelectItem value="business">Business</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Usage Tab */}
            {activeTab === "usage" && (
              <motion.div variants={fadeInUp} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent AI Usage</CardTitle>
                    <CardDescription>Last 100 AI generation requests</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Tool</TableHead>
                          <TableHead>Model</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usageHistory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No usage records found
                            </TableCell>
                          </TableRow>
                        ) : (
                          usageHistory.map((record) => {
                            const userProfile = users.find((u) => u.user_id === record.user_id);
                            return (
                              <TableRow key={record.id}>
                                <TableCell>
                                  <div className="text-sm">
                                    {userProfile?.email || record.user_id.slice(0, 8)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getToolBadge(record.tool)}>
                                    {record.tool}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                  {record.model || "—"}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Coins className="w-4 h-4 text-primary" />
                                    {record.credits_used}
                                  </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                  {formatDateTime(record.created_at)}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
