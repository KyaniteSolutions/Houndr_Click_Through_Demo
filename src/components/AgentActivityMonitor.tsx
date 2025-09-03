import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  Activity, 
  Brain, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  Database, 
  Network, 
  TrendingUp,
  Eye,
  Filter,
  Download
} from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: Date;
  agentId: string;
  agentName: string;
  action: string;
  status: 'success' | 'processing' | 'error' | 'warning';
  details?: string;
  metrics?: {
    duration?: number;
    dataPoints?: number;
    accuracy?: number;
  };
}

interface AgentActivityMonitorProps {
  isActive?: boolean;
  onActivitySelect?: (activity: ActivityLog) => void;
}

export default function AgentActivityMonitor({ isActive = false, onActivitySelect }: AgentActivityMonitorProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'processing' | 'error'>('all');
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time activity logs
  useEffect(() => {
    if (!isLive) return;

    const generateActivity = (): ActivityLog => {
      const agents = [
        { id: 'prospect-001', name: 'Prospect Discovery Agent' },
        { id: 'enrichment-001', name: 'Data Enrichment Agent' },
        { id: 'research-001', name: 'Market Research Agent' },
        { id: 'campaign-001', name: 'Campaign Generation Agent' },
        { id: 'analytics-001', name: 'Performance Analytics Agent' }
      ];

      const actions = [
        'Searched Apollo.io database',
        'Enriched prospect data from LinkedIn',
        'Analyzed company financial data',
        'Generated personalized email sequence',
        'Optimized campaign targeting',
        'Validated email deliverability',
        'Extracted social media insights',
        'Calculated lead scoring',
        'Performed competitive analysis',
        'Updated CRM records',
        'Triggered workflow automation',
        'Generated market intelligence report'
      ];

      const statuses: Array<'success' | 'processing' | 'error' | 'warning'> = ['success', 'success', 'success', 'processing', 'warning'];
      const agent = agents[Math.floor(Math.random() * agents.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: `activity-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        agentId: agent.id,
        agentName: agent.name,
        action,
        status,
        details: status === 'error' ? 'Rate limit exceeded, retrying...' : 
                status === 'warning' ? 'Low confidence score detected' : 
                `Processed ${Math.floor(Math.random() * 100) + 1} records`,
        metrics: {
          duration: Math.floor(Math.random() * 5000) + 500,
          dataPoints: Math.floor(Math.random() * 1000) + 10,
          accuracy: Math.floor(Math.random() * 20) + 80
        }
      };
    };

    const interval = setInterval(() => {
      if (isActive || Math.random() > 0.7) {
        const newActivity = generateActivity();
        setActivities(prev => [newActivity, ...prev.slice(0, 49)]); // Keep last 50 activities
      }
    }, isActive ? 1000 : 3000);

    return () => clearInterval(interval);
  }, [isActive, isLive]);

  const getStatusIcon = (status: ActivityLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: ActivityLog['status']) => {
    const variants = {
      success: 'bg-green-500/10 text-green-500 border-green-500/20',
      processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      error: 'bg-red-500/10 text-red-500 border-red-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    };

    return (
      <Badge variant="outline" className={`text-xs ${variants[status]}`}>
        {status}
      </Badge>
    );
  };

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.status === filter
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getAgentColor = (agentId: string) => {
    const colors = {
      'prospect-001': 'text-blue-500',
      'enrichment-001': 'text-orange-500',
      'research-001': 'text-purple-500',
      'campaign-001': 'text-green-500',
      'analytics-001': 'text-pink-500'
    };
    return colors[agentId as keyof typeof colors] || 'text-gray-500';
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle>Real-time Agent Activity</CardTitle>
            {isLive && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-500">LIVE</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'Pause' : 'Resume'}
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex space-x-1">
            {(['all', 'success', 'processing', 'error'] as const).map((filterType) => (
              <Button
                key={filterType}
                size="sm"
                variant={filter === filterType ? "default" : "ghost"}
                onClick={() => setFilter(filterType)}
                className="text-xs"
              >
                {filterType}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-2 p-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No activities to display</p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <Card 
                  key={activity.id}
                  className="p-3 border-l-4 border-l-primary/20 hover:border-l-primary/40 cursor-pointer transition-all duration-200 hover:shadow-sm"
                  onClick={() => onActivitySelect?.(activity)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-sm font-medium ${getAgentColor(activity.agentId)}`}>
                            {activity.agentName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(activity.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground mb-1">{activity.action}</p>
                        {activity.details && (
                          <p className="text-xs text-muted-foreground">{activity.details}</p>
                        )}
                        {activity.metrics && (
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            {activity.metrics.duration && (
                              <span>⏱️ {activity.metrics.duration}ms</span>
                            )}
                            {activity.metrics.dataPoints && (
                              <span>📊 {activity.metrics.dataPoints} records</span>
                            )}
                            {activity.metrics.accuracy && (
                              <span>🎯 {activity.metrics.accuracy}% accuracy</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
