import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Users, Zap, TrendingUp, Target, Award } from "lucide-react";
import { useState } from "react";

export default function BattalionCommandCenter() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: overview } = trpc.battalion.getDashboardOverview.useQuery(undefined, { enabled: isAuthenticated });
  const { data: squads } = trpc.battalion.getAllSquads.useQuery(undefined, { enabled: isAuthenticated });
  const { data: agents } = trpc.battalion.getAllAgents.useQuery(undefined, { enabled: isAuthenticated });
  const { data: leaderboard } = trpc.battalion.getAgentLeaderboard.useQuery({ limit: 10 }, { enabled: isAuthenticated });

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Battalion leadership only.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🎖️ Serpent Strike Battalion Command Center</h1>
          <p className="text-lg opacity-90">Real-time squad performance, agent tracking, and commission management</p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Squads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overview?.totalSquads || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                Total Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overview?.totalAgents || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Commissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${overview?.totalCommissions || "0"}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${overview?.totalRevenue || "0"}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="squads">Squads</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overview?.topAgents?.map((agent: any, index: number) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <div>
                          <p className="font-semibold">{agent.firstName} {agent.lastName}</p>
                        </div>
                      </div>
                      <p className="font-bold">${agent.totalCommissions}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="squads" className="space-y-4">
            {squads?.map((squad: any) => (
              <Card key={squad.id}>
                <CardHeader>
                  <CardTitle>{squad.squadName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Agents</p>
                      <p className="text-2xl font-bold">{squad.agentCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">${squad.totalRevenue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Commissions</p>
                      <p className="text-2xl font-bold">${squad.totalCommissions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents?.map((agent: any) => (
                <Card key={agent.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{agent.firstName} {agent.lastName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Bookings</p>
                        <p className="text-lg font-bold">{agent.totalBookings}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Projects</p>
                        <p className="text-lg font-bold">{agent.totalProjects}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">Total Commissions</p>
                      <p className="text-xl font-bold text-primary">${agent.totalCommissions}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Agent Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard?.map((agent: any) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <Badge className="text-lg font-bold">#{agent.rank}</Badge>
                        <p className="font-semibold">{agent.firstName} {agent.lastName}</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">${agent.totalCommissions}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
