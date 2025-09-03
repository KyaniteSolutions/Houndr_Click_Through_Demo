import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Brain, Send, User, ChevronDown, LogOut, Settings, MessageSquare, Zap, PanelRightClose, PanelRightOpen, Plus, RotateCcw, Users, Mail, BarChart3 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ProspectCard from './ProspectCard';
import CampaignPreview from './CampaignPreview';
import EnhancedContextPanel from './EnhancedContextPanel';
import AgentHandoffAnimation from './AgentHandoffAnimation';
import AgentOrchestrator from './AgentOrchestrator';
import AgentActivityMonitor from './AgentActivityMonitor';
import AgentPerformanceDashboard from './AgentPerformanceDashboard';

interface ChatInterfaceProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  agent?: 'prospect' | 'campaign' | 'research' | 'conversation' | 'workflow';
  data?: any;
}

interface Agent {
  type: 'prospect' | 'campaign' | 'research' | 'conversation' | 'workflow';
  status: 'idle' | 'searching' | 'processing' | 'complete' | 'error';
  progress?: number;
  data?: any;
}

export default function ChatInterface({ user, onLogout }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to Houndr AI! I\'m your intelligent sales assistant. I can help you find prospects, create campaigns, conduct market research, and provide strategic guidance. What would you like to work on today?',
      timestamp: new Date(),
      agent: 'conversation'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [workflowAnimation, setWorkflowAnimation] = useState<any>(null);
  const [showAgentOrchestrator, setShowAgentOrchestrator] = useState(false);
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    setCurrentAgent('conversation');

    // Trigger agent orchestrator for complex workflows
    if (userMessage.toLowerCase().includes('research') && userMessage.toLowerCase().includes('prospect') && userMessage.toLowerCase().includes('campaign')) {
      setActiveWorkflow('full-pipeline');
      setShowAgentOrchestrator(true);
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response: Message;
    
    // Route to different agents based on user intent
    if (userMessage.toLowerCase().includes('prospect') || userMessage.toLowerCase().includes('find') || userMessage.toLowerCase().includes('search')) {
      setCurrentAgent('prospect');
      
      // Set active agent with search status
      setActiveAgent({
        type: 'prospect',
        status: 'searching',
        progress: 0
      });
      
      // Simulate progress updates
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setActiveAgent(prev => prev ? { ...prev, progress: i } : null);
      }
      
      setActiveAgent(prev => prev ? { ...prev, status: 'processing' } : null);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `🔍 **Prospect Agent Activated**\n\nI'll help you find high-quality prospects. Let me search our Apollo.io integration for relevant contacts based on your criteria.\n\n**Search Parameters:**\n• Industry: Construction Software\n• Job Titles: CTO, VP Engineering, Director of Technology\n• Company Size: 50-500 employees\n• Location: United States\n\nSearching for prospects...`,
        timestamp: new Date(),
        agent: 'prospect'
      };
      
      setMessages(prev => [...prev, response]);
      
      // Simulate prospect results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const prospects = [
        {
          id: '1',
          name: 'Sarah Chen',
          title: 'CTO',
          company: 'BuildTech Solutions',
          email: 'sarah.chen@buildtech.com',
          phone: '+1 (555) 123-4567',
          location: 'Austin, TX',
          employees: '150-200',
          industry: 'Construction Software'
        },
        {
          id: '2',
          name: 'Michael Rodriguez',
          title: 'VP of Engineering',
          company: 'ConstructFlow',
          email: 'michael@constructflow.com',
          phone: '+1 (555) 234-5678',
          location: 'Denver, CO',
          employees: '75-100',
          industry: 'Construction Technology'
        },
        {
          id: '3',
          name: 'Jennifer Liu',
          title: 'Director of Technology',
          company: 'SiteManager Pro',
          email: 'jennifer.liu@sitemanager.com',
          phone: '+1 (555) 345-6789',
          location: 'Seattle, WA',
          employees: '200-300',
          industry: 'Construction Management'
        }
      ];
      
      // Update agent with results
      setActiveAgent({
        type: 'prospect',
        status: 'complete',
        progress: 100,
        data: { prospects }
      });
      
      const prospectResults: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Found **47 qualified prospects** matching your criteria. Here are the top matches:`,
        timestamp: new Date(),
        agent: 'prospect',
        data: {
          type: 'prospects',
          prospects
        }
      };
      
      setMessages(prev => [...prev, prospectResults]);
      
    } else if (userMessage.toLowerCase().includes('campaign') || userMessage.toLowerCase().includes('email') || userMessage.toLowerCase().includes('outreach')) {
      setCurrentAgent('campaign');
      
      // Set active agent with campaign creation status
      setActiveAgent({
        type: 'campaign',
        status: 'processing',
        progress: 0
      });
      
      // Simulate progress updates
      for (let i = 0; i <= 100; i += 25) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setActiveAgent(prev => prev ? { ...prev, progress: i } : null);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `📧 **Campaign Agent Activated**\n\nI'll create a personalized email campaign for your prospects. Let me design a strategic outreach sequence.\n\n**Campaign Strategy:**\n• Target Audience: Construction Software CTOs\n• Sequence Type: 3-email follow-up series\n• Focus: Digital transformation and efficiency\n• Personalization: Industry-specific pain points\n\nCreating campaign assets...`,
        timestamp: new Date(),
        agent: 'campaign'
      };
      
      setMessages(prev => [...prev, response]);
      
      // Simulate campaign creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const campaign = {
        name: 'Construction Software CTO Outreach',
        emails: [
          {
            subject: 'Streamlining construction workflows at {{company}}',
            preview: 'Quick introduction about improving operational efficiency...',
            type: 'Introduction'
          },
          {
            subject: 'How BuildTech reduced project delays by 30%',
            preview: 'Case study showing measurable results in construction...',
            type: 'Value Proposition'
          },
          {
            subject: 'Ready to modernize {{company}}\'s tech stack?',
            preview: 'Direct call-to-action with calendar booking link...',
            type: 'Call to Action'
          }
        ],
        metrics: {
          expectedDeliverability: '94%',
          estimatedOpenRate: '28%',
          estimatedReplyRate: '12%'
        }
      };
      
      // Update agent with campaign results
      setActiveAgent({
        type: 'campaign',
        status: 'complete',
        progress: 100,
        data: { campaign }
      });
      
      const campaignResults: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Campaign created successfully! Here's your **3-email sequence** for construction software decision-makers:`,
        timestamp: new Date(),
        agent: 'campaign',
        data: {
          type: 'campaign',
          campaign
        }
      };
      
      setMessages(prev => [...prev, campaignResults]);
      
    } else if (userMessage.toLowerCase().includes('research') || userMessage.toLowerCase().includes('market') || userMessage.toLowerCase().includes('industry')) {
      setCurrentAgent('research');
      
      // Set active agent with research status
      setActiveAgent({
        type: 'research',
        status: 'processing',
        progress: 0
      });
      
      // Simulate progress updates
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setActiveAgent(prev => prev ? { ...prev, progress: i } : null);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `🔬 **Research Agent Activated**\n\nI'll conduct comprehensive market research using real-time data sources. Analyzing industry trends, competitive landscape, and growth opportunities.\n\n**Research Scope:**\n• Industry Analysis: Construction Software Market\n• Competitive Intelligence: Key players and positioning\n• Market Trends: Digital transformation drivers\n• Opportunity Mapping: Untapped segments\n\nGathering intelligence...`,
        timestamp: new Date(),
        agent: 'research'
      };
      
      setMessages(prev => [...prev, response]);
      
      // Simulate research results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update agent with research complete status
      setActiveAgent({
        type: 'research',
        status: 'complete',
        progress: 100
      });
      
      const researchResults: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `**Market Research Complete** 📊\n\n**Construction Software Market Overview:**\n• Market Size: $2.4B (2024), growing at 8.5% CAGR\n• Key Growth Drivers: Digital transformation, labor shortages, efficiency demands\n• Top Segments: Project management (35%), BIM software (28%), field management (22%)\n\n**Competitive Landscape:**\n• Market Leaders: Autodesk, Procore, PlanGrid\n• Emerging Players: 15+ startups with $10M+ funding\n• White Space: Mid-market companies (50-200 employees) underserved\n\n**Key Trends:**\n• AI integration in project planning (+45% adoption)\n• Mobile-first solutions for field workers\n• Integration with IoT and sensor data\n\n**Opportunity Recommendations:**\n1. Target mid-market construction companies\n2. Focus on AI-powered efficiency tools\n3. Emphasize mobile workforce solutions`,
        timestamp: new Date(),
        agent: 'research'
      };
      
      setMessages(prev => [...prev, researchResults]);
      
    } else if (userMessage.toLowerCase().includes('research') && (userMessage.toLowerCase().includes('find') || userMessage.toLowerCase().includes('prospect')) && userMessage.toLowerCase().includes('campaign')) {
      // Multi-agent workflow
      setCurrentAgent('workflow');
      
      setActiveAgent({
        type: 'workflow',
        status: 'processing',
        progress: 0
      });
      
      // Simulate multi-agent workflow
      const workflowSteps = [
        { name: 'Research Agent', duration: 2000, progress: 30 },
        { name: 'Prospect Agent', duration: 2500, progress: 65 },
        { name: 'Campaign Agent', duration: 2000, progress: 100 }
      ];
      
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `🔄 **Multi-Agent Workflow Activated**\n\nI'll coordinate multiple agents to handle this complex request:\n\n**Workflow Steps:**\n1. Research Agent: Market analysis\n2. Prospect Agent: Lead discovery\n3. Campaign Agent: Sequence creation\n\nInitializing agents...`,
        timestamp: new Date(),
        agent: 'conversation'
      };
      
      setMessages(prev => [...prev, response]);
      
      for (const step of workflowSteps) {
        await new Promise(resolve => setTimeout(resolve, step.duration));
        setActiveAgent(prev => prev ? { ...prev, progress: step.progress } : null);
      }
      
      setActiveAgent(prev => prev ? { ...prev, status: 'complete' } : null);
      
      const workflowComplete: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `✅ **Multi-Agent Workflow Complete**\n\n**Research Results:** Construction software market analyzed ($2.3B, 15% growth)\n**Prospects Found:** 47 qualified CTOs and VP Engineering contacts\n**Campaign Created:** 3-email personalized sequence ready for approval\n\n**Next Steps:** Review the campaign in the context panel and approve for launch.`,
        timestamp: new Date(),
        agent: 'workflow'
      };
      
      setMessages(prev => [...prev, workflowComplete]);
      
    } else {
      // General conversation
      setActiveAgent({
        type: 'conversation',
        status: 'complete'
      });
      
      const responses = [
        "I can help you with prospect discovery, campaign creation, market research, and strategic guidance. What specific area would you like to focus on?",
        "Let me know what you'd like to work on! I can find prospects, create email campaigns, research markets, or provide sales strategy advice.",
        "I'm here to help accelerate your sales process. Would you like me to find prospects, create a campaign, or conduct market research?",
        "What sales challenge can I help you solve today? I specialize in prospect discovery, campaign automation, and market intelligence."
      ];
      
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        agent: 'conversation'
      };
      
      setMessages(prev => [...prev, response]);
    }
    
    setIsTyping(false);
    setCurrentAgent(null);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = input;
    setInput('');

    await simulateAIResponse(messageContent);
  };

  const handleNewChat = () => {
    setIsTransitioning(true);
    
    // Animate out current state
    setTimeout(() => {
      setMessages([{
        id: '1',
        type: 'system',
        content: 'Welcome to Houndr AI! I\'m your intelligent sales assistant. I can help you find prospects, create campaigns, conduct market research, and provide strategic guidance. What would you like to work on today?',
        timestamp: new Date(),
        agent: 'conversation'
      }]);
      setActiveAgent(null);
      setCurrentAgent(null);
      setWorkflowAnimation(null);
      setInput('');
      setIsTyping(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    {
      text: "Find 50 prospects in construction software with AI scoring",
      description: "Demonstrates advanced prospect discovery with AI-powered lead scoring and enrichment",
      agents: ["Prospect Agent", "Enrichment Agent"],
      icon: Users
    },
    {
      text: "Create a multi-channel campaign for CTOs with A/B testing",
      description: "Shows intelligent campaign generation with personalization and optimization",
      agents: ["Campaign Agent", "Analytics Agent"],
      icon: Mail
    },
    {
      text: "Research fintech market trends and competitive landscape",
      description: "Comprehensive market analysis with predictive insights and opportunity mapping",
      agents: ["Research Agent", "Analytics Agent"],
      icon: BarChart3
    },
    {
      text: "Full pipeline: Research fintech, find prospects, create campaigns, and optimize",
      description: "Complete multi-agent workflow showcasing the full power of AI orchestration",
      agents: ["All Agents", "Workflow Orchestrator"],
      icon: Zap
    }
  ];

  const getAgentBadge = (agent?: string) => {
    if (!agent) return null;
    
    const agentConfig = {
      prospect: { label: 'Prospect Agent', color: 'bg-blue-500' },
      campaign: { label: 'Campaign Agent', color: 'bg-green-500' },
      research: { label: 'Research Agent', color: 'bg-purple-500' },
      conversation: { label: 'Conversation Agent', color: 'bg-primary' }
    };
    
    const config = agentConfig[agent as keyof typeof agentConfig];
    if (!config) return null;
    
    return (
      <Badge variant="secondary" className={`${config.color} text-white text-xs mb-2`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold">Houndr AI</h1>
              <p className="text-xs text-muted-foreground">Sales Intelligence Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentAgent && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>{currentAgent} agent is working...</span>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewChat}
              disabled={isTransitioning}
              className="flex items-center space-x-2"
            >
              <RotateCcw className={`w-4 h-4 ${isTransitioning ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">New Chat</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAgentOrchestrator(!showAgentOrchestrator)}
              className="flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Agents</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPerformanceDashboard(!showPerformanceDashboard)}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Performance</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
              className="flex items-center space-x-2"
            >
              {isPanelCollapsed ? (
                <PanelRightOpen className="w-4 h-4" />
              ) : (
                <PanelRightClose className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Context</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Feedback
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Area - Split Screen */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Chat Interface (60% or full width when panel collapsed) */}
        <div className={`flex flex-col ${isPanelCollapsed ? 'w-full' : 'w-full md:w-1/3'} transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 1 && (
          <div className="text-center py-8 md:py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Welcome to Houndr AI
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto px-4">
              Your intelligent sales assistant powered by specialized AI agents. Watch the context panel update as agents work.
            </p>
            <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto px-4">
              {quickPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <Card
                    key={index}
                    className="p-4 border-primary/20 hover:border-primary/40 cursor-pointer transition-all duration-200 hover:shadow-md"
                    onClick={() => setInput(prompt.text)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{prompt.text}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{prompt.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {prompt.agents.map((agent, agentIndex) => (
                            <Badge key={agentIndex} variant="secondary" className="text-xs">
                              {agent}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            {isPanelCollapsed && (
              <div className="mt-6 px-4">
                <p className="text-xs text-muted-foreground mb-2">💡 Tip: Open the context panel to see real-time agent activity</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPanelCollapsed(false)}
                  className="text-primary"
                >
                  <PanelRightOpen className="w-4 h-4 mr-2" />
                  Show Context Panel
                </Button>
              </div>
            )}
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            {message.agent && getAgentBadge(message.agent)}
            <MessageBubble message={message} />
            {message.data?.type === 'prospects' && (
              <div className="mt-4 space-y-3">
                {message.data.prospects.map((prospect: any) => (
                  <ProspectCard key={prospect.id} prospect={prospect} />
                ))}
              </div>
            )}
            {message.data?.type === 'campaign' && (
              <div className="mt-4">
                <CampaignPreview campaign={message.data.campaign} />
              </div>
            )}
            {message.agent === 'workflow' && workflowAnimation && (
              <div className="mt-4">
                <AgentHandoffAnimation 
                  workflow={workflowAnimation}
                  onComplete={() => setWorkflowAnimation(null)}
                />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/20">
                <Brain className="w-4 h-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <Card className="p-4 bg-card/50 backdrop-blur border-border/20">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </Card>
          </div>
        )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/20 bg-background/95 backdrop-blur p-4 md:p-6">
            <div className="flex space-x-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me to find prospects, create campaigns, research markets, or provide strategic guidance..."
                className="flex-1 min-h-[50px] md:min-h-[60px] max-h-32 resize-none bg-input-background border-border/20 text-sm md:text-base"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-primary hover:bg-primary-dark h-[50px] md:h-[60px] px-4 md:px-6"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Context Panel - Hidden on mobile when collapsed, shown as overlay when expanded */}
        <div className={`${isPanelCollapsed ? 'hidden' : 'block'} md:block`}>
          <EnhancedContextPanel
            activeAgent={activeAgent}
            isCollapsed={isPanelCollapsed}
            onToggleCollapse={() => setIsPanelCollapsed(!isPanelCollapsed)}
          />
        </div>
      </div>

      {/* Agent Orchestrator Overlay */}
      {showAgentOrchestrator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">AI Agent Orchestrator</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAgentOrchestrator(false)}
              >
                ✕
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <AgentOrchestrator
                activeWorkflow={activeWorkflow || undefined}
                onWorkflowComplete={(results) => {
                  console.log('Workflow completed:', results);
                  setActiveWorkflow(null);
                }}
              />
              <div className="mt-6">
                <AgentActivityMonitor isActive={!!activeWorkflow} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Dashboard Overlay */}
      {showPerformanceDashboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Agent Performance Dashboard</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPerformanceDashboard(false)}
              >
                ✕
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <AgentPerformanceDashboard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}