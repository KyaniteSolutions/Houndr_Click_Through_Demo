import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Mail, 
  Eye, 
  MousePointer, 
  Users, 
  Calendar, 
  DollarSign, 
  Target, 
  Zap, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  Settings,
  Download,
  RefreshCw,
  Filter,
  Linkedin,
  Phone,
  MessageSquare
} from 'lucide-react';

interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  meetings: number;
  unsubscribed: number;
  bounced: number;
}

interface CampaignPerformance {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  channel: 'email' | 'linkedin' | 'phone' | 'multi-channel';
  startDate: Date;
  endDate?: Date;
  metrics: CampaignMetrics;
  targetAudience: number;
  budget: number;
  roi: number;
  conversionRate: number;
  avgResponseTime: number;
  bestPerformingTemplate: string;
  abTestResults?: {
    variantA: { name: string; performance: number };
    variantB: { name: string; performance: number };
    winner: 'A' | 'B';
  };
}

interface CampaignAnalyticsDashboardProps {
  campaigns?: CampaignPerformance[];
  isLive?: boolean;
}

export default function CampaignAnalyticsDashboard({ 
  campaigns = [], 
  isLive = true 
}: CampaignAnalyticsDashboardProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignPerformance | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock campaign data
  const mockCampaigns: CampaignPerformance[] = [
    {
      id: '1',
      name: 'Construction Software Q4 Outreach',
      status: 'active',
      channel: 'multi-channel',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      targetAudience: 250,
      budget: 5000,
      roi: 340,
      conversionRate: 12.4,
      avgResponseTime: 2.3,
      bestPerformingTemplate: 'Personalized Industry Insights',
      metrics: {
        sent: 187,
        delivered: 182,
        opened: 89,
        clicked: 34,
        replied: 23,
        meetings: 8,
        unsubscribed: 2,
        bounced: 5
      },
      abTestResults: {
        variantA: { name: 'Direct Approach', performance: 8.2 },
        variantB: { name: 'Value-First', performance: 14.7 },
        winner: 'B'
      }
    },
    {
      id: '2',
      name: 'CTO LinkedIn Outreach',
      status: 'active',
      channel: 'linkedin',
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      targetAudience: 150,
      budget: 2500,
      roi: 280,
      conversionRate: 18.7,
      avgResponseTime: 1.8,
      bestPerformingTemplate: 'Tech Leadership Connection',
      metrics: {
        sent: 94,
        delivered: 94,
        opened: 67,
        clicked: 28,
        replied: 18,
        meetings: 5,
        unsubscribed: 0,
        bounced: 0
      }
    },
    {
      id: '3',
      name: 'Follow-up Email Sequence',
      status: 'completed',
      channel: 'email',
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      targetAudience: 89,
      budget: 1200,
      roi: 450,
      conversionRate: 22.5,
      avgResponseTime: 3.1,
      bestPerformingTemplate: 'Value Proposition Follow-up',
      metrics: {
        sent: 89,
        delivered: 87,
        opened: 52,
        clicked: 24,
        replied: 20,
        meetings: 7,
        unsubscribed: 1,
        bounced: 2
      }
    }
  ];

  const displayCampaigns = campaigns.length > 0 ? campaigns : mockCampaigns;

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive || !autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate metric updates
      setSelectedCampaign(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          metrics: {
            ...prev.metrics,
            opened: prev.metrics.opened + Math.floor(Math.random() * 3),
            clicked: prev.metrics.clicked + Math.floor(Math.random() * 2),
            replied: prev.metrics.replied + (Math.random() > 0.8 ? 1 : 0)
          }
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive, autoRefresh]);

  const getStatusColor = (status: CampaignPerformance['status']) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'paused': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'completed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'draft': return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'multi-channel': return <Target className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const calculateRate = (numerator: number, denominator: number) => {
    return denominator > 0 ? ((numerator / denominator) * 100).toFixed(1) : '0.0';
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <Activity className="w-3 h-3 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Campaign Analytics Dashboard</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {isLive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500">LIVE</span>
                </div>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm text-muted-foreground">Time Range:</span>
            {(['24h', '7d', '30d', '90d'] as const).map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? "default" : "ghost"}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>

          {/* Campaign List */}
          <div className="space-y-3">
            {displayCampaigns.map((campaign) => (
              <Card 
                key={campaign.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCampaign?.id === campaign.id ? 'ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getChannelIcon(campaign.channel)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Started {campaign.startDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">{campaign.metrics.sent}</div>
                      <div className="text-xs text-muted-foreground">Sent</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-blue-500">
                        {calculateRate(campaign.metrics.opened, campaign.metrics.delivered)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Open Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-500">
                        {calculateRate(campaign.metrics.replied, campaign.metrics.delivered)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Reply Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-purple-500">{campaign.roi}%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Campaign Analytics */}
      {selectedCampaign && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-primary" />
                <span>{selectedCampaign.name} - Detailed Analytics</span>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedCampaign(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Delivery Rate</p>
                        <p className="text-2xl font-bold">
                          {calculateRate(selectedCampaign.metrics.delivered, selectedCampaign.metrics.sent)}%
                        </p>
                      </div>
                      <Mail className="w-8 h-8 text-blue-500 opacity-20" />
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Open Rate</p>
                        <p className="text-2xl font-bold text-green-500">
                          {calculateRate(selectedCampaign.metrics.opened, selectedCampaign.metrics.delivered)}%
                        </p>
                      </div>
                      <Eye className="w-8 h-8 text-green-500 opacity-20" />
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Click Rate</p>
                        <p className="text-2xl font-bold text-purple-500">
                          {calculateRate(selectedCampaign.metrics.clicked, selectedCampaign.metrics.opened)}%
                        </p>
                      </div>
                      <MousePointer className="w-8 h-8 text-purple-500 opacity-20" />
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Meetings</p>
                        <p className="text-2xl font-bold text-orange-500">
                          {selectedCampaign.metrics.meetings}
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-orange-500 opacity-20" />
                    </div>
                  </Card>
                </div>

                {/* Funnel Visualization */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Conversion Funnel</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Sent', value: selectedCampaign.metrics.sent, color: 'bg-gray-500' },
                      { label: 'Delivered', value: selectedCampaign.metrics.delivered, color: 'bg-blue-500' },
                      { label: 'Opened', value: selectedCampaign.metrics.opened, color: 'bg-green-500' },
                      { label: 'Clicked', value: selectedCampaign.metrics.clicked, color: 'bg-purple-500' },
                      { label: 'Replied', value: selectedCampaign.metrics.replied, color: 'bg-orange-500' },
                      { label: 'Meetings', value: selectedCampaign.metrics.meetings, color: 'bg-red-500' }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-20 text-sm text-muted-foreground">{step.label}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={(step.value / selectedCampaign.metrics.sent) * 100} 
                              className="h-6 flex-1"
                            />
                            <div className="w-16 text-sm font-medium">{step.value}</div>
                            <div className="w-16 text-sm text-muted-foreground">
                              {calculateRate(step.value, selectedCampaign.metrics.sent)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-6">
                {/* A/B Test Results */}
                {selectedCampaign.abTestResults && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">A/B Test Results</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className={`p-4 ${selectedCampaign.abTestResults.winner === 'A' ? 'ring-2 ring-green-500/20' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">Variant A</h5>
                          {selectedCampaign.abTestResults.winner === 'A' && (
                            <Badge className="text-green-500 bg-green-500/10">Winner</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {selectedCampaign.abTestResults.variantA.name}
                        </p>
                        <div className="text-2xl font-bold">
                          {selectedCampaign.abTestResults.variantA.performance}%
                        </div>
                        <div className="text-sm text-muted-foreground">Reply Rate</div>
                      </Card>
                      
                      <Card className={`p-4 ${selectedCampaign.abTestResults.winner === 'B' ? 'ring-2 ring-green-500/20' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">Variant B</h5>
                          {selectedCampaign.abTestResults.winner === 'B' && (
                            <Badge className="text-green-500 bg-green-500/10">Winner</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {selectedCampaign.abTestResults.variantB.name}
                        </p>
                        <div className="text-2xl font-bold">
                          {selectedCampaign.abTestResults.variantB.performance}%
                        </div>
                        <div className="text-sm text-muted-foreground">Reply Rate</div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Performance Insights */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">{selectedCampaign.roi}%</div>
                        <div className="text-sm text-muted-foreground">ROI</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{selectedCampaign.avgResponseTime}h</div>
                        <div className="text-sm text-muted-foreground">Avg Response Time</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-500">{selectedCampaign.conversionRate}%</div>
                        <div className="text-sm text-muted-foreground">Conversion Rate</div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="audience" className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Audience Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Target Size</div>
                      <div className="text-muted-foreground">{selectedCampaign.targetAudience} prospects</div>
                    </div>
                    <div>
                      <div className="font-medium">Reached</div>
                      <div className="text-muted-foreground">{selectedCampaign.metrics.delivered} prospects</div>
                    </div>
                    <div>
                      <div className="font-medium">Engaged</div>
                      <div className="text-muted-foreground">{selectedCampaign.metrics.opened} prospects</div>
                    </div>
                    <div>
                      <div className="font-medium">Converted</div>
                      <div className="text-muted-foreground">{selectedCampaign.metrics.meetings} meetings</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="optimization" className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-700 mb-1">Best Performing Template</h4>
                        <p className="text-sm text-green-600">
                          "{selectedCampaign.bestPerformingTemplate}" is generating the highest engagement. 
                          Consider using similar messaging for future campaigns.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-700 mb-1">Optimization Suggestions</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          <li>• Send follow-ups on Tuesday-Thursday for 23% higher response rates</li>
                          <li>• Personalize subject lines to increase open rates by 15%</li>
                          <li>• Add social proof to improve click-through rates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
