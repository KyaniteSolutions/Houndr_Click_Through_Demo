import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  Zap, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Eye,
  Download,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Users,
  Mail,
  ArrowRight,
  GitBranch,
  Timer,
  Activity,
  Target,
  Database,
  Workflow,
  Layers
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  agent: 'research' | 'prospect' | 'campaign' | 'analysis';
  status: 'pending' | 'running' | 'complete' | 'error' | 'skipped';
  duration?: number;
  startTime?: string;
  endTime?: string;
  input?: any;
  output?: any;
  dependencies?: string[];
  conditions?: any;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  estimatedDuration: number;
  successRate: number;
}

interface WorkflowOrchestratorProps {
  currentWorkflow?: {
    id: string;
    name: string;
    steps: WorkflowStep[];
    status: 'running' | 'complete' | 'error';
    progress: number;
  };
  onStartWorkflow?: (template: WorkflowTemplate) => void;
  onStopWorkflow?: () => void;
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'market-to-campaign',
    name: 'Market Research → Campaign',
    description: 'Complete pipeline from market analysis to campaign creation',
    estimatedDuration: 45,
    successRate: 94,
    steps: [
      {
        id: 'research',
        name: 'Market Research',
        agent: 'research',
        status: 'pending',
        dependencies: []
      },
      {
        id: 'prospects',
        name: 'Prospect Discovery',
        agent: 'prospect',
        status: 'pending',
        dependencies: ['research']
      },
      {
        id: 'campaign',
        name: 'Campaign Creation',
        agent: 'campaign',
        status: 'pending',
        dependencies: ['prospects']
      }
    ]
  },
  {
    id: 'competitive-analysis',
    name: 'Competitive Intelligence',
    description: 'Deep competitor analysis with prospect targeting',
    estimatedDuration: 60,
    successRate: 88,
    steps: [
      {
        id: 'market-research',
        name: 'Market Landscape',
        agent: 'research',
        status: 'pending',
        dependencies: []
      },
      {
        id: 'competitor-analysis',
        name: 'Competitor Analysis',
        agent: 'analysis',
        status: 'pending',
        dependencies: ['market-research']
      },
      {
        id: 'competitive-prospects',
        name: 'Competitive Prospects',
        agent: 'prospect',
        status: 'pending',
        dependencies: ['competitor-analysis']
      },
      {
        id: 'displacement-campaign',
        name: 'Displacement Campaign',
        agent: 'campaign',
        status: 'pending',
        dependencies: ['competitive-prospects']
      }
    ]
  },
  {
    id: 'account-expansion',
    name: 'Account Expansion',
    description: 'Identify expansion opportunities in existing accounts',
    estimatedDuration: 30,
    successRate: 96,
    steps: [
      {
        id: 'account-research',
        name: 'Account Analysis',
        agent: 'research',
        status: 'pending',
        dependencies: []
      },
      {
        id: 'expansion-prospects',
        name: 'Expansion Contacts',
        agent: 'prospect',
        status: 'pending',
        dependencies: ['account-research']
      },
      {
        id: 'expansion-campaign',
        name: 'Expansion Campaign',
        agent: 'campaign',
        status: 'pending',
        dependencies: ['expansion-prospects']
      }
    ]
  }
];

export default function WorkflowOrchestrator({ 
  currentWorkflow, 
  onStartWorkflow, 
  onStopWorkflow 
}: WorkflowOrchestratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [customWorkflowOpen, setCustomWorkflowOpen] = useState(false);
  const [workflowSettingsOpen, setWorkflowSettingsOpen] = useState(false);

  const getStepIcon = (agent: string, status: string) => {
    const icons = {
      research: BarChart3,
      prospect: Users,
      campaign: Mail,
      analysis: Target
    };
    
    const IconComponent = icons[agent as keyof typeof icons] || Activity;
    
    if (status === 'complete') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'error') return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (status === 'running') return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
    
    return <IconComponent className="w-4 h-4 text-muted-foreground" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'running': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
      case 'error': return 'text-red-600 bg-red-500/10 border-red-500/20';
      case 'pending': return 'text-muted-foreground bg-muted/20 border-border/40';
      default: return 'text-muted-foreground bg-muted/20 border-border/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Workflow Status */}
      {currentWorkflow && (
        <Card className="border-border/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Workflow className="w-5 h-5" />
                <span>{currentWorkflow.name}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(currentWorkflow.status)}>
                  {currentWorkflow.status}
                </Badge>
                {onStopWorkflow && (
                  <Button variant="outline" size="sm" onClick={onStopWorkflow}>
                    <Pause className="w-4 h-4 mr-1" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{currentWorkflow.progress}%</span>
              </div>
              <Progress value={currentWorkflow.progress} className="h-2" />
            </div>
            
            <div className="space-y-3">
              {currentWorkflow.steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-3">
                  {getStepIcon(step.agent, step.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{step.name}</span>
                      {step.duration && (
                        <span className="text-xs text-muted-foreground">
                          {step.duration}s
                        </span>
                      )}
                    </div>
                    {step.status === 'running' && (
                      <p className="text-xs text-muted-foreground">Processing...</p>
                    )}
                    {step.status === 'complete' && step.output && (
                      <p className="text-xs text-green-600">
                        {typeof step.output === 'string' ? step.output : 'Complete'}
                      </p>
                    )}
                  </div>
                  {index < currentWorkflow.steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Templates */}
      <Card className="border-border/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Workflow Templates</CardTitle>
            <div className="flex items-center space-x-2">
              <Dialog open={customWorkflowOpen} onOpenChange={setCustomWorkflowOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Custom
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Custom Workflow</DialogTitle>
                  </DialogHeader>
                  <CustomWorkflowBuilder onClose={() => setCustomWorkflowOpen(false)} />
                </DialogContent>
              </Dialog>
              
              <Dialog open={workflowSettingsOpen} onOpenChange={setWorkflowSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Workflow Settings</DialogTitle>
                  </DialogHeader>
                  <WorkflowSettings onClose={() => setWorkflowSettingsOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {workflowTemplates.map((template) => (
            <div 
              key={template.id} 
              className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                selectedTemplate?.id === template.id 
                  ? 'border-primary/40 bg-primary/5' 
                  : 'border-border/20 hover:border-border/40'
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{template.name}</h4>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {template.estimatedDuration}s
                  </Badge>
                  <Badge variant="secondary" className="text-xs text-green-600">
                    {template.successRate}% success
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
              
              <div className="flex items-center space-x-2">
                {template.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-1">
                    {getStepIcon(step.agent, 'pending')}
                    <span className="text-xs">{step.name}</span>
                    {index < template.steps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-muted-foreground mx-1" />
                    )}
                  </div>
                ))}
              </div>
              
              {selectedTemplate?.id === template.id && (
                <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-border/20">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartWorkflow?.(template);
                    }}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start Workflow
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Workflow History */}
      <Card className="border-border/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Workflows</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Market Research → Campaign', duration: '42s', status: 'complete', time: '2 hours ago' },
              { name: 'Competitive Intelligence', duration: '58s', status: 'complete', time: '5 hours ago' },
              { name: 'Account Expansion', duration: '31s', status: 'complete', time: '1 day ago' }
            ].map((workflow, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">{workflow.name}</p>
                    <p className="text-xs text-muted-foreground">{workflow.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">{workflow.duration}</Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CustomWorkflowBuilder({ onClose }: { onClose: () => void }) {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [workflowName, setWorkflowName] = useState('');

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${steps.length + 1}`,
      name: '',
      agent: 'research',
      status: 'pending',
      dependencies: []
    };
    setSteps([...steps, newStep]);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Workflow Name</Label>
        <Input 
          placeholder="My Custom Workflow"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Workflow Steps</Label>
          <Button variant="outline" size="sm" onClick={addStep}>
            <Plus className="w-4 h-4 mr-1" />
            Add Step
          </Button>
        </div>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.id} className="p-3 border border-border/20 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Step Name</Label>
                  <Input 
                    placeholder="Step name"
                    value={step.name}
                    onChange={(e) => {
                      const newSteps = [...steps];
                      newSteps[index].name = e.target.value;
                      setSteps(newSteps);
                    }}
                  />
                </div>
                <div>
                  <Label>Agent Type</Label>
                  <Select 
                    value={step.agent} 
                    onValueChange={(value: any) => {
                      const newSteps = [...steps];
                      newSteps[index].agent = value;
                      setSteps(newSteps);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research Agent</SelectItem>
                      <SelectItem value="prospect">Prospect Agent</SelectItem>
                      <SelectItem value="campaign">Campaign Agent</SelectItem>
                      <SelectItem value="analysis">Analysis Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {index > 0 && (
                <div className="mt-3">
                  <Label>Dependencies</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {steps.slice(0, index).map((prevStep, prevIndex) => (
                      <div key={prevStep.id} className="flex items-center space-x-1">
                        <Checkbox 
                          id={`dep-${index}-${prevIndex}`}
                          checked={step.dependencies?.includes(prevStep.id)}
                          onCheckedChange={(checked) => {
                            const newSteps = [...steps];
                            if (checked) {
                              newSteps[index].dependencies = [...(step.dependencies || []), prevStep.id];
                            } else {
                              newSteps[index].dependencies = step.dependencies?.filter(id => id !== prevStep.id) || [];
                            }
                            setSteps(newSteps);
                          }}
                        />
                        <Label htmlFor={`dep-${index}-${prevIndex}`} className="text-xs">
                          {prevStep.name || `Step ${prevIndex + 1}`}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>
          Save Workflow
        </Button>
      </div>
    </div>
  );
}

function WorkflowSettings({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Auto-retry failed steps</Label>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <Label>Parallel execution when possible</Label>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <Label>Send notifications on completion</Label>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <Label>Auto-export results</Label>
          <Switch />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label>Default timeout (seconds)</Label>
          <Input type="number" defaultValue="300" />
        </div>
        
        <div>
          <Label>Max retries per step</Label>
          <Input type="number" defaultValue="3" />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}