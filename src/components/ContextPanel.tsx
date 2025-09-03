import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Users, 
  Mail, 
  BarChart3, 
  MessageSquare, 
  ChevronRight,
  ExternalLink,
  Download,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  Zap,
  Target,
  Building,
  Phone,
  MapPin,
  TrendingUp,
  FileText
} from 'lucide-react';
import ProspectCard from './ProspectCard';
import DragDropProspectManager from './DragDropProspectManager';
import CampaignAnalytics from './CampaignAnalytics';

interface Agent {
  type: 'prospect' | 'campaign' | 'research' | 'conversation' | 'workflow';
  status: 'idle' | 'searching' | 'processing' | 'complete' | 'error';
  progress?: number;
  data?: any;
}

interface ContextPanelProps {
  activeAgent: Agent | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const agentConfig = {
  prospect: {
    title: 'Prospect Search',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  campaign: {
    title: 'Campaign Creation',
    icon: Mail,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  research: {
    title: 'Market Research',
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  conversation: {
    title: 'Conversation',
    icon: MessageSquare,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  workflow: {
    title: 'Multi-Agent Workflow',
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  }
};

export default function ContextPanel({ activeAgent, isCollapsed, onToggleCollapse }: ContextPanelProps) {
  if (isCollapsed) {
    return (
      <div className="hidden md:block w-12 border-l border-border/20 bg-background-alt/30 backdrop-blur">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-full h-12 rounded-none border-b border-border/20"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
        </Button>
      </div>
    );
  }

  if (!activeAgent) {
    return <WelcomePanel onToggleCollapse={onToggleCollapse} />;
  }

  const config = agentConfig[activeAgent.type];
  const IconComponent = config.icon;

  return (
    <div className="w-full md:w-1/2 border-l border-border/20 bg-background-alt/30 backdrop-blur flex flex-col md:max-h-none max-h-[60vh] md:relative absolute bottom-0 left-0 right-0 md:bottom-auto z-10">
      {/* Panel Header */}
      <div className="p-3 md:p-4 border-b border-border/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
              <IconComponent className={`w-4 h-4 ${config.color}`} />
            </div>
            <div>
              <h3 className="font-medium text-sm">{config.title}</h3>
              <p className="text-xs text-muted-foreground">
                {getStatusText(activeAgent.status)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {activeAgent.status === 'processing' && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="w-6 h-6 p-0"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        {activeAgent.progress !== undefined && (
          <div className="space-y-1">
            <Progress value={activeAgent.progress} className="h-1" />
            <p className="text-xs text-muted-foreground">{activeAgent.progress}% complete</p>
          </div>
        )}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-2 md:p-3">
        {activeAgent.type === 'prospect' && <ProspectContext agent={activeAgent} />}
        {activeAgent.type === 'campaign' && <CampaignContext agent={activeAgent} />}
        {activeAgent.type === 'research' && <ResearchContext agent={activeAgent} />}
        {activeAgent.type === 'workflow' && <WorkflowContext agent={activeAgent} />}
      </div>
    </div>
  );
}

function WelcomePanel({ onToggleCollapse }: { onToggleCollapse: () => void }) {
  return (
    <div className="w-full md:w-1/2 border-l border-border/20 bg-background-alt/30 backdrop-blur flex flex-col md:max-h-none max-h-[60vh] md:relative absolute bottom-0 left-0 right-0 md:bottom-auto z-10">
      <div className="p-3 md:p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Welcome</h3>
              <p className="text-xs text-muted-foreground">Ready to assist</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-6 h-6 p-0"
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-2 md:p-3 space-y-3">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-medium mb-2">Get Started</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Ask me to help you with:
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Finding prospects</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <Mail className="w-4 h-4 text-green-500" />
            <span className="text-sm">Creating campaigns</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Market research</span>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h5 className="font-medium text-sm mb-2">Recent Activity</h5>
          <p className="text-xs text-muted-foreground">No recent activity</p>
        </div>
        
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start h-8">
            <Plus className="w-3 h-3 mr-2" />
            Import Contacts
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start h-8">
            <FileText className="w-3 h-3 mr-2" />
            View Templates
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProspectContext({ agent }: { agent: Agent }) {
  const { data } = agent;
  
  return (
    <div className="space-y-3">
      {/* Search Criteria */}
      <Card className="border-border/20">
        <CardHeader className="pb-1 px-3 pt-3">
          <CardTitle className="text-sm">Search Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs px-3 pb-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Industry:</span>
            <span>Construction Software</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Job Titles:</span>
            <span>CTO, VP Engineering</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Company Size:</span>
            <span>50-500 employees</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>United States</span>
          </div>
        </CardContent>
      </Card>

      {/* Drag & Drop Prospect Management */}
      {data?.prospects && (
        <DragDropProspectManager
          prospects={data.prospects.map((p: any, index: number) => ({
            ...p,
            score: 8.5 - (index * 0.5),
            status: index === 0 ? 'qualified' : index === 1 ? 'contacted' : 'new'
          }))}
          onProspectsChange={(prospects) => {
            // Update prospects in context
            console.log('Prospects updated:', prospects);
          }}
        />
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <Button size="sm" className="w-full justify-start h-8">
          <Download className="w-3 h-3 mr-2" />
          Export CSV
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start h-8">
          <Mail className="w-3 h-3 mr-2" />
          Create Campaign
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start h-8">
          <Plus className="w-3 h-3 mr-2" />
          Save to CRM
        </Button>
      </div>
    </div>
  );
}

function CampaignContext({ agent }: { agent: Agent }) {
  const { data } = agent;
  
  // Mock campaign analytics data for active campaigns
  const mockCampaign = {
    name: 'Construction Software Q1',
    status: 'active' as const,
    startDate: '2024-01-15',
    totalProspects: 47,
    metrics: {
      sent: 47,
      delivered: 46,
      opened: 18,
      clicked: 8,
      replied: 6,
      bounced: 1,
      unsubscribed: 0,
      meetings: 4,
      deals: 2,
      revenue: 125000
    }
  };
  
  // Show analytics if campaign exists and is active, otherwise show creation interface
  if (agent.status === 'complete' && data?.campaign) {
    return <CampaignAnalytics campaign={mockCampaign} />;
  }
  
  return (
    <div className="space-y-3">
      {/* Campaign Overview */}
      <Card className="border-border/20">
        <CardHeader className="pb-1 px-3 pt-3">
          <CardTitle className="text-sm">Campaign Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs px-3 pb-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span>Construction Software Q1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span>Email Sequence (3 emails)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Target:</span>
            <span>47 prospects</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Timeline:</span>
            <span>2 weeks</span>
          </div>
        </CardContent>
      </Card>

      {/* Email Sequence */}
      {data?.campaign?.emails && (
        <Card className="border-border/20">
          <CardHeader className="pb-1 px-3 pt-3">
            <CardTitle className="text-sm">Email Sequence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-3 pb-3">
            {data.campaign.emails.map((email: any, index: number) => (
              <div key={index} className="p-2 rounded border border-border/20">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="secondary" className="text-xs">
                    Email {index + 1}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs font-medium truncate">{email.subject}</p>
                <p className="text-xs text-muted-foreground">Send: Day {index * 5 + 1}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Metrics Forecast */}
      <Card className="border-border/20">
        <CardHeader className="pb-1 px-3 pt-3">
          <CardTitle className="text-sm">Metrics Forecast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs px-3 pb-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Response Rate:</span>
            <span className="text-green-500">12-18%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Meetings:</span>
            <span className="text-blue-500">6-8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pipeline Value:</span>
            <span className="text-purple-500">$450K-$680K</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-2">
        <Button size="sm" className="w-full justify-start h-8">
          <CheckCircle className="w-3 h-3 mr-2" />
          Launch Campaign
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start h-8">
          <Clock className="w-3 h-3 mr-2" />
          Schedule
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start h-8">
          <Download className="w-3 h-3 mr-2" />
          Export Templates
        </Button>
      </div>
    </div>
  );
}

function ResearchContext({ agent }: { agent: Agent }) {
  return (
    <div className="space-y-4">
      {/* Research Focus */}
      <Card className="border-border/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Research Focus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Topic:</span>
            <span>Construction Software Market</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Scope:</span>
            <span>Austin, TX Metro Area</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Depth:</span>
            <span>Advanced Analysis</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sources:</span>
            <span>15 verified</span>
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card className="border-border/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Key Findings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
            <p className="text-green-700">Market Size: $2.3B (growing 15% YoY)</p>
          </div>
          <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
            <p className="text-blue-700">Key Players: Procore, Autodesk, PlanGrid</p>
          </div>
          <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
            <p className="text-purple-700">Trends: AI integration, mobile-first</p>
          </div>
          <div className="p-2 bg-orange-500/10 rounded border border-orange-500/20">
            <p className="text-orange-700">Pain Points: Data silos, manual processes</p>
          </div>
        </CardContent>
      </Card>

      {/* Target Companies */}
      <Card className="border-border/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Target Companies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-2 rounded border border-border/20">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium">BuildTech Solutions</p>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-700">
                8.5/10
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">150 employees, $25M revenue</p>
          </div>
          <div className="p-2 rounded border border-border/20">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium">ConstructCorp</p>
              <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-700">
                7.2/10
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">300 employees, $50M revenue</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-2">
        <Button size="sm" className="w-full justify-start h-8">
          <Download className="w-3 h-3 mr-2" />
          Export Report
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start h-8">
          <Users className="w-3 h-3 mr-2" />
          Find Prospects
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start h-8">
          <Mail className="w-3 h-3 mr-2" />
          Create Campaign
        </Button>
      </div>
    </div>
  );
}

function WorkflowContext({ agent }: { agent: Agent }) {
  const workflowSteps = [
    { name: 'Research', status: 'complete', time: '2.3s' },
    { name: 'Prospects', status: 'complete', time: '4.1s' },
    { name: 'Campaign', status: 'processing', time: '15s' }
  ];

  return (
    <div className="space-y-4">
      {/* Progress */}
      <Card className="border-border/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Multi-Agent Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Active Agents:</span>
            <Badge variant="secondary" className="text-xs">Research</Badge>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">Prospects</Badge>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">Campaign</Badge>
          </div>
          
          <Progress value={agent.progress || 80} className="h-2" />
          
          <div className="space-y-2">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {step.status === 'complete' ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : step.status === 'processing' ? (
                    <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Clock className="w-3 h-3 text-muted-foreground" />
                  )}
                  <span className="text-xs">{step.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{step.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Context Flow */}
      <Card className="border-border/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Context Flow</CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-2">
          <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
            <p className="text-green-700">✅ Market analysis complete</p>
            <p className="text-green-600">47 target companies identified</p>
          </div>
          <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
            <p className="text-blue-700">✅ Prospect search complete</p>
            <p className="text-blue-600">Decision makers identified</p>
          </div>
          <div className="p-2 bg-orange-500/10 rounded border border-orange-500/20">
            <p className="text-orange-700">🔄 Campaign creation in progress</p>
            <p className="text-orange-600">Personalizing sequences...</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-2">
        <Button size="sm" className="w-full justify-start h-8">
          <Eye className="w-3 h-3 mr-2" />
          View Details
        </Button>
        <Button size="sm" variant="outline" className="w-full justify-start h-8">
          <Download className="w-3 h-3 mr-2" />
          Export All
        </Button>
      </div>
    </div>
  );
}

function getStatusText(status: string): string {
  switch (status) {
    case 'searching': return 'Searching Apollo.io...';
    case 'processing': return 'Processing data...';
    case 'complete': return 'Complete';
    case 'error': return 'Error occurred';
    default: return 'Ready';
  }
}