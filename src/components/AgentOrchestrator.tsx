import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Brain, 
  Users, 
  Mail, 
  BarChart3, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Settings,
  Network,
  Activity
} from 'lucide-react';

interface Agent {
  id: string;
  type: 'prospect' | 'campaign' | 'research' | 'conversation' | 'workflow' | 'enrichment' | 'analytics';
  name: string;
  status: 'idle' | 'initializing' | 'searching' | 'processing' | 'analyzing' | 'complete' | 'error' | 'paused';
  progress: number;
  currentTask?: string;
  data?: any;
  dependencies?: string[];
  outputs?: any[];
  metrics?: {
    tasksCompleted: number;
    accuracy: number;
    speed: number;
    efficiency: number;
  };
}

interface AgentOrchestratorProps {
  activeWorkflow?: string;
  onAgentSelect?: (agent: Agent) => void;
  onWorkflowComplete?: (results: any) => void;
}

const agentConfigs = {
  prospect: {
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  campaign: {
    icon: Mail,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  research: {
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  enrichment: {
    icon: Brain,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  analytics: {
    icon: Activity,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20'
  },
  workflow: {
    icon: Network,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  },
  conversation: {
    icon: Brain,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20'
  }
};

export default function AgentOrchestrator({ activeWorkflow, onAgentSelect, onWorkflowComplete }: AgentOrchestratorProps) {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'prospect-001',
      type: 'prospect',
      name: 'Prospect Discovery Agent',
      status: 'idle',
      progress: 0,
      currentTask: 'Standby for prospect search requests',
      metrics: { tasksCompleted: 247, accuracy: 94, speed: 87, efficiency: 91 }
    },
    {
      id: 'enrichment-001',
      type: 'enrichment',
      name: 'Data Enrichment Agent',
      status: 'idle',
      progress: 0,
      currentTask: 'Ready to enrich prospect data',
      dependencies: ['prospect-001'],
      metrics: { tasksCompleted: 189, accuracy: 97, speed: 82, efficiency: 89 }
    },
    {
      id: 'research-001',
      type: 'research',
      name: 'Market Research Agent',
      status: 'idle',
      progress: 0,
      currentTask: 'Monitoring market trends',
      metrics: { tasksCompleted: 156, accuracy: 92, speed: 78, efficiency: 85 }
    },
    {
      id: 'campaign-001',
      type: 'campaign',
      name: 'Campaign Generation Agent',
      status: 'idle',
      progress: 0,
      currentTask: 'Ready to create campaigns',
      dependencies: ['prospect-001', 'enrichment-001'],
      metrics: { tasksCompleted: 203, accuracy: 89, speed: 91, efficiency: 93 }
    },
    {
      id: 'analytics-001',
      type: 'analytics',
      name: 'Performance Analytics Agent',
      status: 'idle',
      progress: 0,
      currentTask: 'Analyzing campaign performance',
      dependencies: ['campaign-001'],
      metrics: { tasksCompleted: 134, accuracy: 96, speed: 85, efficiency: 88 }
    }
  ]);

  const [workflowActive, setWorkflowActive] = useState(false);
  const [workflowProgress, setWorkflowProgress] = useState(0);
  const [connections, setConnections] = useState<Array<{from: string, to: string, active: boolean}>>([]);

  useEffect(() => {
    if (activeWorkflow && !workflowActive) {
      startWorkflow();
    }
  }, [activeWorkflow]);

  const startWorkflow = async () => {
    setWorkflowActive(true);
    setWorkflowProgress(0);

    // Simulate complex multi-agent workflow
    const workflowSteps = [
      { agentId: 'prospect-001', task: 'Searching Apollo.io database', duration: 2000, progress: 20 },
      { agentId: 'enrichment-001', task: 'Enriching prospect data', duration: 1500, progress: 40 },
      { agentId: 'research-001', task: 'Analyzing market context', duration: 2500, progress: 60 },
      { agentId: 'campaign-001', task: 'Generating personalized campaigns', duration: 2000, progress: 80 },
      { agentId: 'analytics-001', task: 'Optimizing campaign performance', duration: 1000, progress: 100 }
    ];

    for (const step of workflowSteps) {
      // Update agent status
      setAgents(prev => prev.map(agent => 
        agent.id === step.agentId 
          ? { ...agent, status: 'processing', currentTask: step.task, progress: 0 }
          : agent
      ));

      // Animate progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, step.duration / 10));
        setAgents(prev => prev.map(agent => 
          agent.id === step.agentId 
            ? { ...agent, progress: i }
            : agent
        ));
      }

      // Mark as complete
      setAgents(prev => prev.map(agent => 
        agent.id === step.agentId 
          ? { ...agent, status: 'complete', progress: 100 }
          : agent
      ));

      setWorkflowProgress(step.progress);
      
      // Add connection animation
      if (step.agentId !== 'prospect-001') {
        const dependencies = agents.find(a => a.id === step.agentId)?.dependencies || [];
        dependencies.forEach(depId => {
          setConnections(prev => [...prev, { from: depId, to: step.agentId, active: true }]);
        });
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setWorkflowActive(false);
    onWorkflowComplete?.({
      prospects: 47,
      campaigns: 3,
      insights: 12,
      estimatedROI: '340%'
    });
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'processing':
      case 'searching':
      case 'analyzing':
        return <Clock className="w-4 h-4 animate-spin" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'processing':
      case 'searching':
      case 'analyzing':
        return 'text-blue-500';
      case 'complete':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-primary" />
            <CardTitle>AI Agent Orchestrator</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={workflowActive ? "default" : "secondary"}>
              {workflowActive ? 'Active' : 'Standby'}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={startWorkflow}
              disabled={workflowActive}
            >
              {workflowActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        {workflowActive && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Workflow Progress</span>
              <span>{workflowProgress}%</span>
            </div>
            <Progress value={workflowProgress} className="h-2" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {agents.map((agent) => {
          const config = agentConfigs[agent.type];
          const Icon = config.icon;
          
          return (
            <Card 
              key={agent.id} 
              className={`p-4 border transition-all duration-300 cursor-pointer hover:shadow-md ${config.borderColor} ${
                agent.status === 'processing' ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => onAgentSelect?.(agent)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">{agent.currentTask}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`${getStatusColor(agent.status)}`}>
                    {getStatusIcon(agent.status)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {agent.status}
                  </Badge>
                </div>
              </div>
              
              {agent.progress > 0 && (
                <div className="mt-3">
                  <Progress value={agent.progress} className="h-1" />
                </div>
              )}
              
              {agent.metrics && (
                <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium">{agent.metrics.tasksCompleted}</div>
                    <div className="text-muted-foreground">Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{agent.metrics.accuracy}%</div>
                    <div className="text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{agent.metrics.speed}%</div>
                    <div className="text-muted-foreground">Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{agent.metrics.efficiency}%</div>
                    <div className="text-muted-foreground">Efficiency</div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
