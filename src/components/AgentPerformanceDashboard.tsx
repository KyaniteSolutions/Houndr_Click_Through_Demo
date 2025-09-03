import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Target, 
  Zap, 
  Brain, 
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Mail,
  Database,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface PerformanceMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit?: string;
}

interface AgentPerformance {
  id: string;
  name: string;
  type: string;
  status: 'optimal' | 'good' | 'warning' | 'critical';
  uptime: number;
  tasksCompleted: number;
  successRate: number;
  avgResponseTime: number;
  throughput: number;
  metrics: PerformanceMetric[];
}

export default function AgentPerformanceDashboard() {
  const [agents, setAgents] = useState<AgentPerformance[]>([
    {
      id: 'prospect-001',
      name: 'Prospect Discovery Agent',
      type: 'prospect',
      status: 'optimal',
      uptime: 99.8,
      tasksCompleted: 1247,
      successRate: 94.2,
      avgResponseTime: 1.2,
      throughput: 156,
      metrics: [
        { label: 'Prospects Found', value: 47, change: 12, trend: 'up' },
        { label: 'Data Quality', value: 94, change: 2, trend: 'up', unit: '%' },
        { label: 'API Calls', value: 2847, change: -5, trend: 'down' },
        { label: 'Match Accuracy', value: 89, change: 3, trend: 'up', unit: '%' }
      ]
    },
    {
      id: 'enrichment-001',
      name: 'Data Enrichment Agent',
      type: 'enrichment',
      status: 'good',
      uptime: 98.5,
      tasksCompleted: 892,
      successRate: 97.1,
      avgResponseTime: 2.1,
      throughput: 134,
      metrics: [
        { label: 'Records Enriched', value: 892, change: 8, trend: 'up' },
        { label: 'Data Completeness', value: 97, change: 1, trend: 'up', unit: '%' },
        { label: 'Source Coverage', value: 15, change: 2, trend: 'up' },
        { label: 'Validation Rate', value: 91, change: -1, trend: 'down', unit: '%' }
      ]
    },
    {
      id: 'campaign-001',
      name: 'Campaign Generation Agent',
      type: 'campaign',
      status: 'optimal',
      uptime: 99.2,
      tasksCompleted: 567,
      successRate: 89.4,
      avgResponseTime: 3.4,
      throughput: 89,
      metrics: [
        { label: 'Campaigns Created', value: 23, change: 5, trend: 'up' },
        { label: 'Open Rate', value: 28, change: 4, trend: 'up', unit: '%' },
        { label: 'Reply Rate', value: 12, change: 2, trend: 'up', unit: '%' },
        { label: 'Personalization Score', value: 87, change: 1, trend: 'up', unit: '%' }
      ]
    },
    {
      id: 'research-001',
      name: 'Market Research Agent',
      type: 'research',
      status: 'warning',
      uptime: 96.8,
      tasksCompleted: 234,
      successRate: 92.1,
      avgResponseTime: 5.2,
      throughput: 45,
      metrics: [
        { label: 'Reports Generated', value: 12, change: -2, trend: 'down' },
        { label: 'Data Sources', value: 47, change: 3, trend: 'up' },
        { label: 'Insight Quality', value: 92, change: -3, trend: 'down', unit: '%' },
        { label: 'Processing Time', value: 5.2, change: 0.8, trend: 'down', unit: 's' }
      ]
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalTasks: 2940,
    avgSuccessRate: 93.2,
    systemUptime: 99.1,
    activeAgents: 4,
    totalThroughput: 424
  });

  const getStatusColor = (status: AgentPerformance['status']) => {
    switch (status) {
      case 'optimal':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'good':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'critical':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
    }
  };

  const getStatusIcon = (status: AgentPerformance['status']) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="w-4 h-4" />;
      case 'good':
        return <Activity className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      case 'stable':
        return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'prospect':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'enrichment':
        return <Database className="w-5 h-5 text-orange-500" />;
      case 'campaign':
        return <Mail className="w-5 h-5 text-green-500" />;
      case 'research':
        return <BarChart3 className="w-5 h-5 text-purple-500" />;
      default:
        return <Brain className="w-5 h-5 text-gray-500" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 3),
        metrics: agent.metrics.map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 2
        }))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold">{systemMetrics.totalTasks.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{systemMetrics.avgSuccessRate}%</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
              <p className="text-2xl font-bold">{systemMetrics.systemUptime}%</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Agents</p>
              <p className="text-2xl font-bold">{systemMetrics.activeAgents}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Throughput</p>
              <p className="text-2xl font-bold">{systemMetrics.totalThroughput}/h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Agent Performance Details */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getAgentIcon(agent.type)}
                    <div>
                      <h3 className="font-medium">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.type} agent</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(agent.status)}>
                    {getStatusIcon(agent.status)}
                    <span className="ml-1">{agent.status}</span>
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    <p className="text-lg font-semibold">{agent.tasksCompleted.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-semibold">{agent.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                    <p className="text-lg font-semibold">{agent.avgResponseTime}s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Throughput</p>
                    <p className="text-lg font-semibold">{agent.throughput}/h</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uptime</span>
                    <span>{agent.uptime}%</span>
                  </div>
                  <Progress value={agent.uptime} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-4">
          {agents.map((agent) => (
            <Card key={agent.id} className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                {getAgentIcon(agent.type)}
                <h3 className="font-medium">{agent.name}</h3>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {agent.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-xs ${
                          metric.trend === 'up' ? 'text-green-500' : 
                          metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                        }`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">
                      {metric.value.toLocaleString()}{metric.unit || ''}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="w-5 h-5" />
                  <span>Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Performance chart visualization</p>
                    <p className="text-sm">Real-time metrics and trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Resource Utilization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Resource allocation chart</p>
                    <p className="text-sm">CPU, Memory, and API usage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
