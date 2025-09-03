import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AgentDataService, { SearchCriteria, ProspectData, MarketData, CampaignData } from '../services/AgentDataService';
import {
  Users,
  Mail,
  BarChart3,
  MessageSquare,
  ChevronRight,
  Download,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  Zap,
  TrendingUp,
  Calendar,
  Filter,
  Database,
  Send,
  Copy,
  Edit,
  Trash2,
  Star,
  AlertCircle,
  RotateCcw,
  Building
} from 'lucide-react';
import DragDropProspectManager from './DragDropProspectManager';
import CampaignAnalytics from './CampaignAnalytics';
import WelcomePanelFixed from './WelcomePanelFixed';
import ProspectIntelligencePanel from './ProspectIntelligencePanel';
import LeadScoringEngine from './LeadScoringEngine';
import AdvancedCampaignBuilder from './AdvancedCampaignBuilder';
import CampaignAnalyticsDashboard from './CampaignAnalyticsDashboard';
import MultiChannelOrchestrator from './MultiChannelOrchestrator';
import MarketIntelligenceDashboard, { CompetitiveIntelligenceTracker } from './MarketIntelligenceDashboard';
import TrendPredictionEngine from './TrendPredictionEngine';

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

export default function EnhancedContextPanel({ activeAgent, isCollapsed, onToggleCollapse }: ContextPanelProps) {
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
    return <WelcomePanelFixed onToggleCollapse={onToggleCollapse} />;
  }

  const config = agentConfig[activeAgent.type];
  const IconComponent = config.icon;

  return (
    <div className="w-full md:w-2/3 border-l border-border/20 bg-background-alt/30 backdrop-blur flex flex-col md:max-h-none max-h-[60vh] md:relative absolute bottom-0 left-0 right-0 md:bottom-auto z-10">
      {/* Panel Header */}
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
              <IconComponent className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <h3 className="font-medium">{config.title}</h3>
              <p className="text-sm text-muted-foreground">
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
              className="w-8 h-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {activeAgent.progress !== undefined && (
          <div className="space-y-2">
            <Progress value={activeAgent.progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{activeAgent.progress}% complete</p>
          </div>
        )}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeAgent.type === 'prospect' && <EnhancedProspectContext agent={activeAgent} />}
        {activeAgent.type === 'campaign' && <EnhancedCampaignContext agent={activeAgent} />}
        {activeAgent.type === 'research' && <EnhancedResearchContext agent={activeAgent} />}
        {activeAgent.type === 'workflow' && <EnhancedWorkflowContext agent={activeAgent} />}
      </div>
    </div>
  );
}



function EnhancedProspectContext({ agent }: { agent: Agent }) {
  const { data } = agent;
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [crmDialogOpen, setCrmDialogOpen] = useState(false);
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [prospects, setProspects] = useState<ProspectData[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    industry: 'Construction Software',
    companySize: '50-500 employees',
    location: 'United States',
    jobTitles: ['CTO', 'VP Engineering', 'Director of Technology'],
    verifiedEmailsOnly: true
  });

  const dataService = AgentDataService.getInstance();

  // Auto-search when agent becomes active
  useEffect(() => {
    if (agent.status === 'searching' || agent.status === 'processing') {
      performProspectSearch();
    }
  }, [agent.status]);

  const performProspectSearch = async () => {
    setIsSearching(true);
    setSearchProgress(0);

    try {
      const searchResults = await dataService.searchProspects(
        searchCriteria,
        (progress) => setSearchProgress(progress)
      );

      setProspects(searchResults);
      toast.success(`Found ${searchResults.length} qualified prospects!`);
    } catch (error) {
      toast.error('Failed to search prospects. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdvancedSearch = async (newCriteria: SearchCriteria) => {
    setSearchCriteria(newCriteria);
    setFilterDialogOpen(false);
    await performProspectSearch();
  };

  const handleExportProspects = (format: string, _fields: string[]) => {
    toast.success(`Exporting ${data?.prospects?.length || 47} prospects as ${format.toUpperCase()}`);
    setExportDialogOpen(false);
    // Simulate export process
    setTimeout(() => {
      toast.success('Export completed! Download ready.');
    }, 2000);
  };

  const handleCrmIntegration = (crm: string, _options: any) => {
    toast.success(`Integrating ${data?.prospects?.length || 47} prospects with ${crm}`);
    setCrmDialogOpen(false);
    // Simulate CRM integration
    setTimeout(() => {
      toast.success('Prospects successfully added to CRM');
    }, 3000);
  };

  const handleCreateCampaign = (_campaignData: any) => {
    toast.success('Creating campaign from prospects...');
    setCampaignDialogOpen(false);
    // Simulate campaign creation
    setTimeout(() => {
      toast.success('Campaign created successfully!');
    }, 2500);
  };
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
        <TabsTrigger value="scoring">AI Scoring</TabsTrigger>
        <TabsTrigger value="actions">Actions</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        {/* Enhanced Search Criteria */}
        <Card className="border-border/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Search Parameters</CardTitle>
              <div className="flex items-center space-x-2">
                {isSearching && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
                <Button variant="ghost" size="sm" onClick={() => setFilterDialogOpen(true)}>
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Industry:</span>
                <span>{searchCriteria.industry || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company Size:</span>
                <span>{searchCriteria.companySize || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Job Titles:</span>
                <span>{searchCriteria.jobTitles?.join(', ') || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{searchCriteria.location || 'Not specified'}</span>
              </div>
            </div>

            {isSearching ? (
              <div className="pt-2 border-t border-border/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Search Progress:</span>
                  <span className="text-sm font-medium">{searchProgress}%</span>
                </div>
                <Progress value={searchProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {searchProgress < 30 ? 'Searching Apollo.io database...' :
                   searchProgress < 60 ? 'Enriching with ZoomInfo data...' :
                   searchProgress < 90 ? 'Validating contact information...' :
                   'Finalizing prospect scores...'}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-2 border-t border-border/20">
                <span className="text-sm text-muted-foreground">Results Found:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-600">{prospects.length} prospects</span>
                  <Button size="sm" variant="outline" onClick={performProspectSearch}>
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Advanced Filters Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Advanced Prospect Filters</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Tabs defaultValue="company" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="person">Person</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="company" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Industry</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Company Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-1000">201-1000</SelectItem>
                        <SelectItem value="1000+">1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Revenue Range</Label>
                    <Input placeholder="e.g., $1M-$10M" />
                  </div>
                  <div>
                    <Label>Founded Year</Label>
                    <Input placeholder="e.g., 2015-2023" />
                  </div>
                </div>
                <div>
                  <Label>Keywords</Label>
                  <Textarea placeholder="Construction software, project management, BIM..." />
                </div>
              </TabsContent>

              <TabsContent value="person" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Job Titles</Label>
                    <Textarea placeholder="CTO, VP Engineering, Director of Technology..." />
                  </div>
                  <div>
                    <Label>Seniority Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual Contributor</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="vp">VP</SelectItem>
                        <SelectItem value="c-level">C-Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="United States, Austin TX, Remote..." />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="verified-email" />
                    <Label htmlFor="verified-email">Verified email addresses only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="exclude-competitors" />
                    <Label htmlFor="exclude-competitors">Exclude competitors</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="funding-events" />
                    <Label htmlFor="funding-events">Recent funding events</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="job-changes" />
                    <Label htmlFor="job-changes">Recent job changes</Label>
                  </div>
                </div>
                <div>
                  <Label>Technographics</Label>
                  <Input placeholder="Salesforce, HubSpot, Slack..." />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setFilterDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setFilterDialogOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Drag & Drop Prospect Management */}
      {(prospects.length > 0 || data?.prospects) && (
        <Card className="border-border/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Prospect Management</CardTitle>
              <Badge variant="secondary">{prospects.length || data?.prospects?.length || 0} prospects</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <DragDropProspectManager
              prospects={(prospects.length > 0 ? prospects : data?.prospects || []).map((p: any, index: number) => ({
                ...p,
                score: p.aiScore || (8.5 - (index * 0.5)),
                status: index === 0 ? 'qualified' : index === 1 ? 'contacted' : 'new'
              }))}
              onProspectsChange={(updatedProspects) => {
                console.log('Prospects updated:', updatedProspects);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Enhanced Actions */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Export CSV Dialog */}
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Prospects
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Prospects</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Export Format</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Include Fields</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="name" defaultChecked />
                      <Label htmlFor="name">Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" defaultChecked />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="company" defaultChecked />
                      <Label htmlFor="company">Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="title" defaultChecked />
                      <Label htmlFor="title">Title</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="phone" />
                      <Label htmlFor="phone">Phone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="linkedin" />
                      <Label htmlFor="linkedin">LinkedIn</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleExportProspects('csv', ['name', 'email', 'company', 'title'])}>
                    <Download className="w-4 h-4 mr-2" />
                    Export 47 Prospects
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Campaign Creation Dialog */}
          <Dialog open={campaignDialogOpen} onOpenChange={setCampaignDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Campaign from Prospects</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Campaign Name</Label>
                    <Input placeholder="Construction Software Q1 Outreach" />
                  </div>
                  <div>
                    <Label>Campaign Type</Label>
                    <Select defaultValue="email-sequence">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email-sequence">Email Sequence</SelectItem>
                        <SelectItem value="linkedin">LinkedIn Outreach</SelectItem>
                        <SelectItem value="multi-channel">Multi-Channel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Target Prospects</Label>
                  <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm">47 qualified prospects will be added to this campaign</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>• CTOs: 18</span>
                      <span>• VP Engineering: 15</span>
                      <span>• Directors: 14</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Email Sequence</Label>
                  <div className="space-y-3 mt-2">
                    <div className="p-3 border border-border/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Email 1 - Introduction</Badge>
                        <span className="text-xs text-muted-foreground">Send immediately</span>
                      </div>
                      <Input placeholder="Subject line..." defaultValue="Streamlining workflows at {{company}}" className="mb-2" />
                      <Textarea placeholder="Email content..." className="min-h-[80px]" />
                    </div>
                    <div className="p-3 border border-border/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Email 2 - Value Prop</Badge>
                        <span className="text-xs text-muted-foreground">Send after 3 days</span>
                      </div>
                      <Input placeholder="Subject line..." className="mb-2" />
                      <Textarea placeholder="Email content..." className="min-h-[80px]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setCampaignDialogOpen(false)}>
                    Save as Draft
                  </Button>
                  <Button onClick={() => handleCreateCampaign({ name: 'Construction Software Q1 Outreach', prospects: 47 })}>
                    <Send className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* CRM Integration Dialog */}
          <Dialog open={crmDialogOpen} onOpenChange={setCrmDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Database className="w-4 h-4 mr-2" />
                Save to CRM
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>CRM Integration</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select CRM</Label>
                  <Select defaultValue="salesforce">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="hubspot">HubSpot</SelectItem>
                      <SelectItem value="pipedrive">Pipedrive</SelectItem>
                      <SelectItem value="airtable">Airtable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Import Options</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="create-leads" defaultChecked />
                      <Label htmlFor="create-leads">Create as Leads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="create-accounts" />
                      <Label htmlFor="create-accounts">Create Company Accounts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="add-tags" defaultChecked />
                      <Label htmlFor="add-tags">Add "Houndr Import" tag</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Lead Source</Label>
                  <Input defaultValue="Houndr AI Prospect Search" />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setCrmDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleCrmIntegration('salesforce', { createLeads: true, addTags: true })}>
                    <Database className="w-4 h-4 mr-2" />
                    Import 47 Prospects
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value="intelligence" className="space-y-4">
        <ProspectIntelligencePanel
          prospects={prospects}
          isSearching={isSearching || agent.status === 'processing'}
        />
      </TabsContent>

      <TabsContent value="scoring" className="space-y-4">
        <LeadScoringEngine prospectId="current-prospect" />
      </TabsContent>

      <TabsContent value="actions" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Generate Personalized Campaign
            </Button>
            <Button className="w-full justify-start" size="lg" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Find Similar Prospects
            </Button>
            <Button className="w-full justify-start" size="lg" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analyze Market Segment
            </Button>
            <Button className="w-full justify-start" size="lg" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Prospect Data
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function EnhancedCampaignContext({ agent }: { agent: Agent }) {
  const { data } = agent;
  const [launchDialogOpen, setLaunchDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const dataService = AgentDataService.getInstance();

  // Auto-generate campaign data when agent becomes active
  useEffect(() => {
    if (agent.status === 'processing' && !campaignData) {
      generateCampaignData();
    }
  }, [agent.status]);

  const generateCampaignData = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      const results = await dataService.searchCampaignData(
        'Construction Software',
        'lead-gen',
        (progress) => setGenerationProgress(progress)
      );

      setCampaignData(results);
      toast.success('Campaign templates and strategies generated!');
    } catch (error) {
      toast.error('Failed to generate campaign data. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLaunchCampaign = () => {
    toast.success('Launching campaign: Construction Software Q1');
    setLaunchDialogOpen(false);
    setTimeout(() => {
      toast.success('Campaign launched! First emails sending now.');
    }, 1500);
  };

  const handleScheduleCampaign = (_scheduleData: any) => {
    toast.success('Campaign scheduled successfully');
    setScheduleDialogOpen(false);
    setTimeout(() => {
      toast.success('Campaign scheduled for tomorrow at 9:00 AM');
    }, 1000);
  };

  const handleExportTemplates = (format: string) => {
    toast.success(`Exporting email templates as ${format.toUpperCase()}`);
    setTemplateDialogOpen(false);
    setTimeout(() => {
      toast.success('Templates exported successfully!');
    }, 1500);
  };
  
  // Mock campaign analytics data for active campaigns
  const mockCampaign = {
    id: 'campaign-1',
    name: 'Construction Software Q1',
    status: 'active' as const,
    channel: 'email' as const,
    startDate: new Date('2024-01-15'),
    totalProspects: 47,
    targetAudience: 47,
    budget: 5000,
    roi: 2500,
    conversionRate: 12.8,
    avgResponseTime: 24,
    bestPerformingTemplate: 'Construction Pain Points Template',
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
    return (
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="orchestrator">Multi-Channel</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <CampaignAnalyticsDashboard campaigns={[mockCampaign]} isLive={true} />
        </TabsContent>

        <TabsContent value="orchestrator" className="space-y-4">
          <MultiChannelOrchestrator isActive={true} />
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <CampaignAnalytics campaign={{
            name: mockCampaign.name,
            status: mockCampaign.status,
            startDate: '2024-01-15',
            totalProspects: mockCampaign.totalProspects,
            metrics: mockCampaign.metrics
          }} />

          {/* Enhanced Campaign Actions */}
          <Card className="border-border/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Campaign Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                onClick={() => toast.success('Opening full analytics dashboard...')}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Full Analytics
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.success('Opening campaign editor...')}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Campaign
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.success('Campaign duplicated successfully!')}
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Campaign
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={() => toast.success('Campaign archived')}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Archive Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    );
  }
  
  return (
    <Tabs defaultValue="builder" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="builder">Campaign Builder</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="builder" className="space-y-4">
        <AdvancedCampaignBuilder
          prospects={data?.prospects || []}
          isGenerating={isGenerating || agent.status === 'processing'}
          onCampaignCreate={(campaign) => {
            toast.success(`Campaign "${campaign.name}" created successfully!`);
          }}
        />

        {campaignData && (
          <Card className="border-border/20 mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">AI-Generated Campaign Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm font-medium text-blue-700">Expected Open Rate</p>
                  <p className="text-lg font-bold text-blue-600">{campaignData.industryBenchmarks.openRate}%</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <p className="text-sm font-medium text-green-700">Expected Reply Rate</p>
                  <p className="text-lg font-bold text-green-600">{campaignData.industryBenchmarks.replyRate}%</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Best Practices:</p>
                <ul className="text-xs space-y-1">
                  {campaignData.bestPractices.slice(0, 3).map((practice, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="overview" className="space-y-4">
        {/* Enhanced Campaign Overview */}
        <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Campaign Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span>Construction Software Q1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span>3-Email Sequence</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Prospects:</span>
              <span>47 qualified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timeline:</span>
              <span>14 days</span>
            </div>
          </div>
          <div className="pt-2 border-t border-border/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Readiness Score:</span>
              <div className="flex items-center space-x-2">
                <Progress value={94} className="w-16 h-2" />
                <span className="text-sm font-medium text-green-600">94%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Email Sequence */}
      {data?.campaign?.emails && (
        <Card className="border-border/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Email Sequence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.campaign.emails.map((email: any, index: number) => (
              <div key={index} className="p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">
                    Email {index + 1} - {email.type}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="font-medium text-sm mb-1">{email.subject}</p>
                <p className="text-xs text-muted-foreground mb-2">{email.preview}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Send: Day {index * 5 + 1}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>High Impact</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Follow-up Email
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Metrics Forecast */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Performance Forecast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Open Rate</span>
              <div className="flex items-center space-x-2">
                <Progress value={28} className="w-20 h-2" />
                <span className="text-sm font-medium text-green-600">28%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Reply Rate</span>
              <div className="flex items-center space-x-2">
                <Progress value={12} className="w-20 h-2" />
                <span className="text-sm font-medium text-blue-600">12%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Meeting Rate</span>
              <div className="flex items-center space-x-2">
                <Progress value={8} className="w-20 h-2" />
                <span className="text-sm font-medium text-purple-600">8%</span>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-border/20 grid grid-cols-2 gap-4 text-center">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <p className="text-xl font-bold text-green-600">6-8</p>
              <p className="text-xs text-muted-foreground">Expected Meetings</p>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <p className="text-xl font-bold text-purple-600">$650K</p>
              <p className="text-xs text-muted-foreground">Pipeline Value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Actions */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Campaign Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Launch Campaign Dialog */}
          <Dialog open={launchDialogOpen} onOpenChange={setLaunchDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Launch Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Ready to Launch</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All 47 prospects have been validated and email templates are optimized.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Send first email immediately</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Track opens and clicks</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-pause on high bounce rate</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div>
                  <Label>Daily send limit</Label>
                  <Select defaultValue="25">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 emails/day</SelectItem>
                      <SelectItem value="25">25 emails/day</SelectItem>
                      <SelectItem value="50">50 emails/day</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setLaunchDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleLaunchCampaign}>
                    <Send className="w-4 h-4 mr-2" />
                    Launch Now
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Schedule Dialog */}
          <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Launch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Campaign Launch</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>
                
                <div>
                  <Label>Time Zone</Label>
                  <Select defaultValue="america/chicago">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                      <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Send Window</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Input type="time" defaultValue="09:00" />
                    <Input type="time" defaultValue="17:00" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Only send emails during business hours
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleScheduleCampaign({ date: 'tomorrow', time: '09:00' })}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Campaign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Template Export Dialog */}
          <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Templates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Email Templates</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Export Format</Label>
                  <Select defaultValue="html">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="html">HTML Templates</SelectItem>
                      <SelectItem value="text">Plain Text</SelectItem>
                      <SelectItem value="both">Both HTML & Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Include</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-content" defaultChecked />
                      <Label htmlFor="email-content">Email content</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="personalization" defaultChecked />
                      <Label htmlFor="personalization">Personalization tokens</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="timing" />
                      <Label htmlFor="timing">Send timing rules</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="analytics" />
                      <Label htmlFor="analytics">Analytics tracking</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleExportTemplates('html')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Templates
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      </TabsContent>
    </Tabs>
  );
}

function EnhancedResearchContext({ agent }: { agent: Agent }) {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [prospectDialogOpen, setProspectDialogOpen] = useState(false);
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [researchProgress, setResearchProgress] = useState(0);
  const [isResearching, setIsResearching] = useState(false);

  const dataService = AgentDataService.getInstance();

  // Auto-research when agent becomes active
  useEffect(() => {
    if (agent.status === 'processing' && !marketData) {
      performMarketResearch();
    }
  }, [agent.status]);

  const performMarketResearch = async () => {
    setIsResearching(true);
    setResearchProgress(0);

    try {
      const results = await dataService.searchMarketData(
        'Construction Software',
        'North America',
        (progress) => setResearchProgress(progress)
      );

      setMarketData(results);
      toast.success('Market research completed successfully!');
    } catch (error) {
      toast.error('Failed to complete market research. Please try again.');
    } finally {
      setIsResearching(false);
    }
  };

  const handleExportReport = (format: string, _sections: string[]) => {
    toast.success(`Generating ${format.toUpperCase()} market research report...`);
    setReportDialogOpen(false);
    setTimeout(() => {
      toast.success('Market research report generated successfully!');
    }, 3000);
  };

  const handleGenerateProspects = (_criteria: any) => {
    toast.success('Generating prospect list from research data...');
    setProspectDialogOpen(false);
    setTimeout(() => {
      toast.success('141 qualified prospects generated from research!');
    }, 2500);
  };

  const handleCreateResearchCampaign = (strategy: string) => {
    toast.success(`Creating ${strategy} campaign...`);
    setCampaignDialogOpen(false);
    setTimeout(() => {
      toast.success('Research-driven campaign created successfully!');
    }, 2000);
  };
  
  return (
    <Tabs defaultValue="intelligence" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-4">
        <TabsTrigger value="intelligence">Market Intel</TabsTrigger>
        <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        <TabsTrigger value="competitors">Competitors</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>

      <TabsContent value="intelligence" className="space-y-4">
        <MarketIntelligenceDashboard
          industry="Construction Software"
          region="North America"
          isAnalyzing={agent.status === 'processing'}
        />
      </TabsContent>

      <TabsContent value="trends" className="space-y-4">
        <TrendPredictionEngine
          industry="Construction Software"
          isAnalyzing={agent.status === 'processing'}
        />
      </TabsContent>

      <TabsContent value="competitors" className="space-y-4">
        <CompetitiveIntelligenceTracker />
      </TabsContent>

      <TabsContent value="overview" className="space-y-4">
        {/* Enhanced Research Focus */}
        <Card className="border-border/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Research Parameters</CardTitle>
            {isResearching && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market:</span>
              <span>Construction Software</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Geography:</span>
              <span>North America</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Analysis Type:</span>
              <span>Comprehensive</span>
            </div>
          </div>

          {isResearching ? (
            <div className="pt-2 border-t border-border/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Research Progress:</span>
                <span className="text-sm font-medium">{researchProgress}%</span>
              </div>
              <Progress value={researchProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {researchProgress < 20 ? 'Collecting market data from Crunchbase...' :
                 researchProgress < 40 ? 'Analyzing PitchBook industry reports...' :
                 researchProgress < 60 ? 'Processing CB Insights trends...' :
                 researchProgress < 80 ? 'Gathering Gartner research...' :
                 'Finalizing market analysis...'}
              </p>
            </div>
          ) : marketData ? (
            <div className="pt-2 border-t border-border/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Market Size:</span>
                <span className="text-sm font-medium text-green-600">${marketData.marketSize}B</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate:</span>
                <span className="text-sm font-medium text-blue-600">{marketData.growthRate}% YoY</span>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Enhanced Key Findings */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Market Intelligence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-green-700">Market Size</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-green-600">$2.3B market, growing 15% YoY</p>
          </div>
          
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-blue-700">Market Leaders</p>
              <Building className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-blue-600">Procore (32%), Autodesk (18%), PlanGrid (15%)</p>
          </div>
          
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-purple-700">Key Trends</p>
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-sm text-purple-600">AI integration (+45%), Mobile-first solutions</p>
          </div>
          
          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-orange-700">Pain Points</p>
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-sm text-orange-600">Data silos (73%), Manual processes (68%)</p>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Target Companies */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">High-Value Targets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">BuildTech Solutions</p>
              <Badge className="bg-green-500/20 text-green-700 border-green-500/20">
                9.2/10
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>150 employees • $25M ARR • Series B</p>
              <p>Recent $10M funding • Expanding to new markets</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="text-xs">High Intent</Badge>
              <Badge variant="secondary" className="text-xs">Growth Stage</Badge>
            </div>
          </div>
          
          <div className="p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">ConstructCorp</p>
              <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/20">
                8.7/10
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>300 employees • $50M ARR • Public</p>
              <p>Digital transformation initiative started</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="text-xs">Enterprise</Badge>
              <Badge variant="secondary" className="text-xs">Active Buyer</Badge>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            View All 47 Companies
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Actions */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Research Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Export Report Dialog */}
          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Full Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Export Market Research Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Report Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="powerpoint">PowerPoint</SelectItem>
                        <SelectItem value="excel">Excel Workbook</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Report Type</Label>
                    <Select defaultValue="executive">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="executive">Executive Summary</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Include Sections</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="market-size" defaultChecked />
                      <Label htmlFor="market-size">Market Size & Growth</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="competitive" defaultChecked />
                      <Label htmlFor="competitive">Competitive Landscape</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="trends" defaultChecked />
                      <Label htmlFor="trends">Key Trends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="opportunities" defaultChecked />
                      <Label htmlFor="opportunities">Opportunities</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="target-companies" />
                      <Label htmlFor="target-companies">Target Companies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="recommendations" />
                      <Label htmlFor="recommendations">Recommendations</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Custom Branding</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Switch id="company-logo" />
                    <Label htmlFor="company-logo">Include company logo</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleExportReport('pdf', ['market-size', 'competitive', 'trends'])}>
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Find Prospects Dialog */}
          <Dialog open={prospectDialogOpen} onOpenChange={setProspectDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Find Prospects from Research
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Prospect List</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Based on your research, we've identified 47 high-value target companies.
                    Create a prospect list focusing on decision-makers at these companies.
                  </p>
                </div>
                
                <div>
                  <Label>Target Job Titles</Label>
                  <Textarea 
                    placeholder="CTO, VP Engineering, Director of Technology..."
                    defaultValue="CTO, VP Engineering, Director of Technology, Head of Software Development"
                  />
                </div>
                
                <div>
                  <Label>Company Selection</Label>
                  <Select defaultValue="top-rated">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All 47 companies</SelectItem>
                      <SelectItem value="top-rated">Top 20 companies (score 8.0+)</SelectItem>
                      <SelectItem value="high-intent">High intent companies only</SelectItem>
                      <SelectItem value="custom">Custom selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Filters</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified-contacts" defaultChecked />
                      <Label htmlFor="verified-contacts">Verified contact info only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="recent-funding" />
                      <Label htmlFor="recent-funding">Recent funding events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="expansion-signals" />
                      <Label htmlFor="expansion-signals">Expansion signals</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setProspectDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleGenerateProspects({ companies: 'top-rated', titles: 'CTO,VP Engineering' })}>
                    <Users className="w-4 h-4 mr-2" />
                    Generate Prospect List
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Create Campaign Dialog */}
          <Dialog open={campaignDialogOpen} onOpenChange={setCampaignDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Create Targeted Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Research-Based Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-700">
                    Use market research insights to create highly targeted campaigns that speak to specific pain points and opportunities.
                  </p>
                </div>
                
                <div>
                  <Label>Campaign Strategy</Label>
                  <Select defaultValue="pain-point">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pain-point">Address Data Silos Pain Point</SelectItem>
                      <SelectItem value="trend-based">AI Integration Trend</SelectItem>
                      <SelectItem value="competitive">Competitive Displacement</SelectItem>
                      <SelectItem value="growth">Growth Stage Targeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Message Personalization</Label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="company-news" defaultChecked />
                      <Label htmlFor="company-news">Reference recent company news</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="funding-events" defaultChecked />
                      <Label htmlFor="funding-events">Mention funding events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="industry-trends" defaultChecked />
                      <Label htmlFor="industry-trends">Include industry insights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pain-points" defaultChecked />
                      <Label htmlFor="pain-points">Address specific pain points</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Campaign Name</Label>
                  <Input placeholder="Construction Software - Data Silos Solution" />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setCampaignDialogOpen(false)}>
                    Save as Template
                  </Button>
                  <Button onClick={() => handleCreateResearchCampaign('pain-point')}>
                    <Mail className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      </TabsContent>
    </Tabs>
  );
}

function EnhancedWorkflowContext({ agent }: { agent: Agent }) {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [coordinationProgress, setCoordinationProgress] = useState(0);
  const [isCoordinating, setIsCoordinating] = useState(false);

  const dataService = AgentDataService.getInstance();

  // Auto-coordinate when agent becomes active
  useEffect(() => {
    if (agent.status === 'processing' && !isCoordinating) {
      coordinateAgents();
    }
  }, [agent.status]);

  const coordinateAgents = async () => {
    setIsCoordinating(true);
    setCoordinationProgress(0);

    try {
      await dataService.coordinateAgentData(
        ['research', 'prospect', 'campaign'],
        (progress) => setCoordinationProgress(progress)
      );

      toast.success('Agent coordination completed successfully!');
    } catch (error) {
      toast.error('Failed to coordinate agents. Please try again.');
    } finally {
      setIsCoordinating(false);
    }
  };

  const handleExportWorkflow = (packageType: string, _components: string[]) => {
    toast.success(`Exporting ${packageType} workflow package...`);
    setExportDialogOpen(false);
    setTimeout(() => {
      toast.success('Workflow package exported successfully!');
    }, 2500);
  };
  
  const workflowSteps = [
    { name: 'Market Research', status: 'complete', time: '2.3s', output: '$2.3B market, 47 companies identified' },
    { name: 'Prospect Discovery', status: 'complete', time: '4.1s', output: '141 decision makers found' },
    { name: 'Campaign Creation', status: 'processing', time: '15s', output: 'Personalizing 3-email sequence...' }
  ];

  return (
    <div className="space-y-4">
      {/* Enhanced Workflow Progress */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Multi-Agent Coordination</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Active Workflow:</span>
              <Badge variant="secondary">Research → Prospects → Campaign</Badge>
            </div>
            <Badge className="bg-orange-500/20 text-orange-700">
              Processing
            </Badge>
          </div>
          
          <Progress value={isCoordinating ? coordinationProgress : (agent.progress || 75)} className="h-3" />

          {isCoordinating && (
            <p className="text-xs text-muted-foreground mt-2">
              {coordinationProgress < 20 ? 'Initializing agent communication...' :
               coordinationProgress < 40 ? 'Sharing context between agents...' :
               coordinationProgress < 60 ? 'Synchronizing data sources...' :
               coordinationProgress < 80 ? 'Optimizing search parameters...' :
               'Consolidating results...'}
            </p>
          )}
          
          <div className="space-y-3">
            {workflowSteps.map((step, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {step.status === 'complete' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : step.status === 'processing' ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">{step.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{step.time}</span>
                </div>
                <p className="text-sm text-muted-foreground ml-8">{step.output}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Context Flow */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Agent Context Handoffs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-700">Research Agent → Complete</span>
            </div>
            <p className="text-sm text-green-600">
              Market analysis passed to Prospect Agent: 47 high-value companies, growth trends, pain points identified
            </p>
          </div>
          
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-700">Prospect Agent → Complete</span>
            </div>
            <p className="text-sm text-blue-600">
              Prospect data passed to Campaign Agent: 141 decision makers, contact verification, scoring complete
            </p>
          </div>
          
          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="flex items-center space-x-2 mb-1">
              <Mail className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-orange-700">Campaign Agent → Processing</span>
            </div>
            <p className="text-sm text-orange-600">
              Creating personalized sequences using research insights and prospect data...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Actions */}
      <Card className="border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Workflow Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* View Details Dialog */}
          <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                View Detailed Timeline
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Workflow Execution Timeline</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="data-flow">Data Flow</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border border-border/20 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Research Agent Execution</h4>
                        <Badge className="bg-green-500/20 text-green-700">Completed</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Time:</span>
                          <span>14:32:15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>2.3 seconds</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data Sources:</span>
                          <span>15 verified sources</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Output:</span>
                          <span>Market analysis, 47 target companies</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-border/20 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Prospect Agent Execution</h4>
                        <Badge className="bg-green-500/20 text-green-700">Completed</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Time:</span>
                          <span>14:32:18</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>4.1 seconds</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Apollo Queries:</span>
                          <span>12 search queries</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Output:</span>
                          <span>141 decision makers identified</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-border/20 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Campaign Agent Execution</h4>
                        <Badge className="bg-orange-500/20 text-orange-700">Processing</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Time:</span>
                          <span>14:32:22</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated Duration:</span>
                          <span>15 seconds</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Progress:</span>
                          <span>75% complete</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Task:</span>
                          <span>Personalizing email templates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="data-flow" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border border-border/20 rounded-lg">
                      <h4 className="font-medium mb-3">Research → Prospects Data Transfer</h4>
                      <div className="space-y-2 text-sm">
                        <div>• Market size and growth data ($2.3B, 15% YoY)</div>
                        <div>• 47 target companies with scoring</div>
                        <div>• Industry pain points (data silos, manual processes)</div>
                        <div>• Technology trends (AI integration, mobile-first)</div>
                        <div>• Competitive landscape analysis</div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-border/20 rounded-lg">
                      <h4 className="font-medium mb-3">Prospects → Campaign Data Transfer</h4>
                      <div className="space-y-2 text-sm">
                        <div>• 141 verified decision maker contacts</div>
                        <div>• Contact scoring and qualification data</div>
                        <div>• Company-specific context for personalization</div>
                        <div>• Recent activity signals and intent data</div>
                        <div>• Optimal contact timing preferences</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-border/20 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">2.3s</p>
                      <p className="text-sm text-muted-foreground">Research Speed</p>
                    </div>
                    <div className="p-4 border border-border/20 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">4.1s</p>
                      <p className="text-sm text-muted-foreground">Prospect Discovery</p>
                    </div>
                    <div className="p-4 border border-border/20 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">96%</p>
                      <p className="text-sm text-muted-foreground">Data Accuracy</p>
                    </div>
                    <div className="p-4 border border-border/20 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">100%</p>
                      <p className="text-sm text-muted-foreground">Context Transfer</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          {/* Export All Dialog */}
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Complete Workflow
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Workflow Results</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Export Package</Label>
                  <Select defaultValue="complete">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complete">Complete Package</SelectItem>
                      <SelectItem value="research-only">Research Report Only</SelectItem>
                      <SelectItem value="prospects-only">Prospect List Only</SelectItem>
                      <SelectItem value="campaign-only">Campaign Templates Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Include Components</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="market-report" defaultChecked />
                      <Label htmlFor="market-report">Market research report (PDF)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prospect-list" defaultChecked />
                      <Label htmlFor="prospect-list">Prospect database (CSV)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="campaign-templates" defaultChecked />
                      <Label htmlFor="campaign-templates">Email templates (HTML)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="workflow-log" />
                      <Label htmlFor="workflow-log">Execution timeline (JSON)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="performance-metrics" />
                      <Label htmlFor="performance-metrics">Performance metrics</Label>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-700">
                    This will create a comprehensive package with all workflow outputs ready for your sales team.
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleExportWorkflow('complete', ['market-report', 'prospect-list', 'campaign-templates'])}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Package
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

function getStatusText(status: string): string {
  switch (status) {
    case 'searching': return 'Searching Apollo.io...';
    case 'processing': return 'Processing data...';
    case 'complete': return 'Analysis complete';
    case 'error': return 'Error occurred';
    default: return 'Ready to assist';
  }
}