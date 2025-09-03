import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { 
  Mail, 
  Brain, 
  Target, 
  Zap, 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  Settings, 
  Eye, 
  Copy, 
  Download,
  Linkedin,
  Phone,
  MessageSquare,
  Calendar,
  Globe,
  Sparkles,
  RefreshCw,
  Filter,
  PieChart
} from 'lucide-react';

interface CampaignTemplate {
  id: string;
  name: string;
  type: 'email' | 'linkedin' | 'phone' | 'multi-channel';
  subject?: string;
  content: string;
  personalizationScore: number;
  expectedOpenRate: number;
  expectedReplyRate: number;
  aiGenerated: boolean;
  variables: string[];
}

interface CampaignConfig {
  name: string;
  objective: 'awareness' | 'lead-gen' | 'demo' | 'sales';
  channels: Array<'email' | 'linkedin' | 'phone' | 'social'>;
  audienceSize: number;
  personalizationLevel: number;
  abTestEnabled: boolean;
  followUpSequence: boolean;
  smartTiming: boolean;
  templates: CampaignTemplate[];
}

interface AdvancedCampaignBuilderProps {
  prospects?: any[];
  onCampaignCreate?: (campaign: CampaignConfig) => void;
  isGenerating?: boolean;
}

export default function AdvancedCampaignBuilder({ 
  prospects = [], 
  onCampaignCreate, 
  isGenerating = false 
}: AdvancedCampaignBuilderProps) {
  const [campaign, setCampaign] = useState<CampaignConfig>({
    name: '',
    objective: 'lead-gen',
    channels: ['email'],
    audienceSize: prospects.length || 47,
    personalizationLevel: 80,
    abTestEnabled: true,
    followUpSequence: true,
    smartTiming: true,
    templates: []
  });

  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('analyzing');
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);

  // Simulate AI campaign generation
  useEffect(() => {
    if (isGenerating) {
      generateCampaign();
    }
  }, [isGenerating]);

  const generateCampaign = async () => {
    const steps = [
      { name: 'analyzing', label: 'Analyzing prospect data...', duration: 1500 },
      { name: 'personalizing', label: 'Creating personalized content...', duration: 2000 },
      { name: 'optimizing', label: 'Optimizing for engagement...', duration: 1200 },
      { name: 'testing', label: 'Setting up A/B tests...', duration: 800 },
      { name: 'complete', label: 'Campaign ready!', duration: 500 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].name);
      
      // Animate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, steps[i].duration / 10));
        setGenerationProgress((i * 100 + progress) / steps.length);
      }
    }

    // Generate mock templates
    const mockTemplates: CampaignTemplate[] = [
      {
        id: '1',
        name: 'Construction Tech Intro',
        type: 'email',
        subject: 'Streamlining {{company}} construction workflows',
        content: `Hi {{firstName}},

I noticed {{company}} is growing rapidly in the construction space. With {{companySize}} employees, you're likely facing challenges with project coordination and data management.

Our AI-powered platform has helped similar companies like {{competitor}} reduce project delays by 40% and improve team collaboration.

Would you be interested in a 15-minute demo to see how we could help {{company}} streamline operations?

Best regards,
{{senderName}}`,
        personalizationScore: 94,
        expectedOpenRate: 28,
        expectedReplyRate: 12,
        aiGenerated: true,
        variables: ['firstName', 'company', 'companySize', 'competitor', 'senderName']
      },
      {
        id: '2',
        name: 'LinkedIn Connection Request',
        type: 'linkedin',
        content: `Hi {{firstName}}, I see you're leading tech initiatives at {{company}}. I'd love to connect and share some insights about construction software trends that might be relevant to your work.`,
        personalizationScore: 87,
        expectedOpenRate: 45,
        expectedReplyRate: 18,
        aiGenerated: true,
        variables: ['firstName', 'company']
      },
      {
        id: '3',
        name: 'Follow-up Email',
        type: 'email',
        subject: 'Quick question about {{company}} tech stack',
        content: `Hi {{firstName}},

Following up on my previous email about construction workflow optimization.

I saw that {{company}} recently {{recentNews}}. This type of growth often creates new challenges with project management and team coordination.

Quick question: What's your biggest pain point with your current tech stack?

Happy to share some quick wins that have worked for other {{industry}} companies.

Best,
{{senderName}}`,
        personalizationScore: 91,
        expectedOpenRate: 32,
        expectedReplyRate: 15,
        aiGenerated: true,
        variables: ['firstName', 'company', 'recentNews', 'industry', 'senderName']
      }
    ];

    setCampaign(prev => ({ ...prev, templates: mockTemplates }));
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'social': return <MessageSquare className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getObjectiveColor = (objective: string) => {
    switch (objective) {
      case 'awareness': return 'text-blue-500 bg-blue-500/10';
      case 'lead-gen': return 'text-green-500 bg-green-500/10';
      case 'demo': return 'text-purple-500 bg-purple-500/10';
      case 'sales': return 'text-orange-500 bg-orange-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  if (isGenerating) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span>AI Campaign Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Generating Personalized Campaign</h3>
            <p className="text-muted-foreground mb-6">AI is creating optimized content for your prospects...</p>
            
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="capitalize">{currentStep.replace('-', ' ')}</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <div className="font-semibold">{campaign.audienceSize}</div>
                  <div className="text-muted-foreground">Prospects</div>
                </div>
                <div className="text-center p-3 bg-green-500/5 rounded-lg">
                  <div className="font-semibold">{campaign.channels.length}</div>
                  <div className="text-muted-foreground">Channels</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Advanced Campaign Builder</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={getObjectiveColor(campaign.objective)}>
                {campaign.objective}
              </Badge>
              <Button size="sm" onClick={() => onCampaignCreate?.(campaign)}>
                <Play className="w-4 h-4 mr-1" />
                Launch Campaign
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{campaign.audienceSize}</div>
              <div className="text-sm text-muted-foreground">Target Prospects</div>
            </div>
            <div className="text-center p-4 bg-green-500/5 rounded-lg">
              <div className="text-2xl font-bold text-green-500">{campaign.templates.length}</div>
              <div className="text-sm text-muted-foreground">AI Templates</div>
            </div>
            <div className="text-center p-4 bg-blue-500/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">{campaign.channels.length}</div>
              <div className="text-sm text-muted-foreground">Channels</div>
            </div>
            <div className="text-center p-4 bg-purple-500/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-500">{campaign.personalizationLevel}%</div>
              <div className="text-sm text-muted-foreground">Personalization</div>
            </div>
          </div>

          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="targeting">Targeting</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">AI-Generated Templates</h4>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {campaign.templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedTemplate?.id === template.id ? 'ring-2 ring-primary/20' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getChannelIcon(template.type)}
                          <span className="font-medium">{template.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {template.aiGenerated && (
                            <Badge variant="secondary" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {template.type}
                          </Badge>
                        </div>
                      </div>
                      {template.subject && (
                        <p className="text-sm text-muted-foreground font-medium">
                          {template.subject}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm bg-muted/50 p-3 rounded border-l-2 border-primary/20">
                          {template.content.substring(0, 150)}...
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-medium text-green-500">{template.personalizationScore}%</div>
                            <div className="text-muted-foreground">Personalization</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-blue-500">{template.expectedOpenRate}%</div>
                            <div className="text-muted-foreground">Open Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-purple-500">{template.expectedReplyRate}%</div>
                            <div className="text-muted-foreground">Reply Rate</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-1">
                            {template.variables.slice(0, 3).map((variable, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {variable}
                              </Badge>
                            ))}
                            {template.variables.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.variables.length - 3}
                              </Badge>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input 
                      id="campaign-name"
                      value={campaign.name}
                      onChange={(e) => setCampaign(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Construction Software Outreach Q4"
                    />
                  </div>
                  
                  <div>
                    <Label>Campaign Objective</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {(['awareness', 'lead-gen', 'demo', 'sales'] as const).map((obj) => (
                        <Button
                          key={obj}
                          variant={campaign.objective === obj ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCampaign(prev => ({ ...prev, objective: obj }))}
                          className="justify-start"
                        >
                          {obj === 'lead-gen' ? 'Lead Generation' : obj.charAt(0).toUpperCase() + obj.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Channels</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {(['email', 'linkedin', 'phone', 'social'] as const).map((channel) => (
                        <Button
                          key={channel}
                          variant={campaign.channels.includes(channel) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setCampaign(prev => ({
                              ...prev,
                              channels: prev.channels.includes(channel)
                                ? prev.channels.filter(c => c !== channel)
                                : [...prev.channels, channel]
                            }));
                          }}
                          className="justify-start"
                        >
                          {getChannelIcon(channel)}
                          <span className="ml-2 capitalize">{channel}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Personalization Level</Label>
                      <span className="text-sm text-muted-foreground">{campaign.personalizationLevel}%</span>
                    </div>
                    <Slider
                      value={[campaign.personalizationLevel]}
                      onValueChange={(value) => setCampaign(prev => ({ ...prev, personalizationLevel: value[0] }))}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ab-test">A/B Testing</Label>
                      <Switch
                        id="ab-test"
                        checked={campaign.abTestEnabled}
                        onCheckedChange={(checked) => setCampaign(prev => ({ ...prev, abTestEnabled: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="follow-up">Follow-up Sequence</Label>
                      <Switch
                        id="follow-up"
                        checked={campaign.followUpSequence}
                        onCheckedChange={(checked) => setCampaign(prev => ({ ...prev, followUpSequence: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smart-timing">Smart Timing</Label>
                      <Switch
                        id="smart-timing"
                        checked={campaign.smartTiming}
                        onCheckedChange={(checked) => setCampaign(prev => ({ ...prev, smartTiming: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="targeting" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Target Audience</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Campaign will target {campaign.audienceSize} prospects matching your criteria
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Job Titles</div>
                    <div className="text-muted-foreground">CTO, VP Engineering</div>
                  </div>
                  <div>
                    <div className="font-medium">Company Size</div>
                    <div className="text-muted-foreground">100-500 employees</div>
                  </div>
                  <div>
                    <div className="font-medium">Industry</div>
                    <div className="text-muted-foreground">Construction Tech</div>
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">North America</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">24%</div>
                    <div className="text-sm text-muted-foreground">Predicted Open Rate</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">8%</div>
                    <div className="text-sm text-muted-foreground">Predicted Reply Rate</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">12</div>
                    <div className="text-sm text-muted-foreground">Expected Meetings</div>
                  </div>
                </Card>
              </div>
              
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700 mb-1">Performance Prediction</h4>
                    <p className="text-sm text-blue-600">
                      Based on similar campaigns and prospect data, this campaign is expected to generate 
                      12-15 qualified meetings with an estimated pipeline value of $180K-$240K.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
