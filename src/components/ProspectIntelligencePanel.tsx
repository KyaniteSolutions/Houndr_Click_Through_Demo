import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Users, 
  Brain, 
  TrendingUp, 
  Star, 
  MapPin, 
  Building, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe, 
  DollarSign, 
  Calendar, 
  Target, 
  Zap, 
  Eye, 
  Download, 
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface ProspectData {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  companyWebsite?: string;
  aiScore: number;
  leadScore: number;
  engagementScore: number;
  buyingIntent: 'high' | 'medium' | 'low';
  lastActivity: Date;
  companyData: {
    size: string;
    revenue: string;
    industry: string;
    founded: number;
    funding: string;
    technologies: string[];
    competitors: string[];
  };
  socialInsights: {
    linkedinConnections: number;
    recentPosts: number;
    engagement: number;
    topics: string[];
  };
  predictiveInsights: {
    conversionProbability: number;
    bestContactTime: string;
    preferredChannel: string;
    dealSize: string;
    timeToClose: string;
  };
}

interface ProspectIntelligencePanelProps {
  prospects?: ProspectData[];
  isSearching?: boolean;
  onProspectSelect?: (prospect: ProspectData) => void;
}

export default function ProspectIntelligencePanel({ 
  prospects = [], 
  isSearching = false, 
  onProspectSelect 
}: ProspectIntelligencePanelProps) {
  const [selectedProspect, setSelectedProspect] = useState<ProspectData | null>(null);
  const [searchProgress, setSearchProgress] = useState(0);
  const [enrichmentProgress, setEnrichmentProgress] = useState(0);

  // Simulate search and enrichment progress
  useEffect(() => {
    if (isSearching) {
      const searchInterval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev >= 100) {
            clearInterval(searchInterval);
            // Start enrichment
            const enrichInterval = setInterval(() => {
              setEnrichmentProgress(prev => {
                if (prev >= 100) {
                  clearInterval(enrichInterval);
                  return 100;
                }
                return prev + 10;
              });
            }, 200);
            return 100;
          }
          return prev + 20;
        });
      }, 300);
      
      return () => clearInterval(searchInterval);
    }
  }, [isSearching]);

  const mockProspects: ProspectData[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'CTO',
      company: 'BuildTech Solutions',
      email: 'sarah.chen@buildtech.com',
      phone: '+1 (555) 123-4567',
      location: 'Austin, TX',
      linkedinUrl: 'https://linkedin.com/in/sarahchen',
      companyWebsite: 'https://buildtech.com',
      aiScore: 94,
      leadScore: 87,
      engagementScore: 92,
      buyingIntent: 'high',
      lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      companyData: {
        size: '150-200 employees',
        revenue: '$25M - $50M',
        industry: 'Construction Software',
        founded: 2018,
        funding: 'Series B - $15M',
        technologies: ['React', 'Node.js', 'AWS', 'MongoDB'],
        competitors: ['Procore', 'PlanGrid', 'Autodesk']
      },
      socialInsights: {
        linkedinConnections: 2847,
        recentPosts: 12,
        engagement: 8.4,
        topics: ['Digital Transformation', 'Construction Tech', 'AI in Construction']
      },
      predictiveInsights: {
        conversionProbability: 78,
        bestContactTime: 'Tuesday 10-11 AM PST',
        preferredChannel: 'LinkedIn',
        dealSize: '$50K - $100K',
        timeToClose: '45-60 days'
      }
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'VP of Engineering',
      company: 'ConstructFlow',
      email: 'michael@constructflow.com',
      location: 'Denver, CO',
      aiScore: 89,
      leadScore: 82,
      engagementScore: 85,
      buyingIntent: 'medium',
      lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      companyData: {
        size: '75-100 employees',
        revenue: '$10M - $25M',
        industry: 'Construction Technology',
        founded: 2020,
        funding: 'Series A - $8M',
        technologies: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        competitors: ['BuildTech', 'SiteManager', 'FieldLens']
      },
      socialInsights: {
        linkedinConnections: 1523,
        recentPosts: 8,
        engagement: 6.2,
        topics: ['Engineering Leadership', 'SaaS', 'Team Building']
      },
      predictiveInsights: {
        conversionProbability: 65,
        bestContactTime: 'Wednesday 2-3 PM MST',
        preferredChannel: 'Email',
        dealSize: '$25K - $75K',
        timeToClose: '60-90 days'
      }
    }
  ];

  const displayProspects = prospects.length > 0 ? prospects : mockProspects;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 bg-green-500/10';
    if (score >= 70) return 'text-blue-500 bg-blue-500/10';
    if (score >= 50) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  const getBuyingIntentColor = (intent: string) => {
    switch (intent) {
      case 'high': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (isSearching) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span>AI Prospect Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Discovering High-Quality Prospects</h3>
            <p className="text-muted-foreground mb-6">AI agents are searching and enriching prospect data...</p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Searching Apollo.io Database</span>
                  <span>{searchProgress}%</span>
                </div>
                <Progress value={searchProgress} className="h-2" />
              </div>
              
              {searchProgress === 100 && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>AI Data Enrichment</span>
                    <span>{enrichmentProgress}%</span>
                  </div>
                  <Progress value={enrichmentProgress} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Prospect Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Prospect Intelligence</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-500/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                {displayProspects.length} Qualified
              </Badge>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{displayProspects.length}</div>
              <div className="text-sm text-muted-foreground">Total Prospects</div>
            </div>
            <div className="text-center p-4 bg-green-500/5 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {Math.round(displayProspects.reduce((acc, p) => acc + p.aiScore, 0) / displayProspects.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg AI Score</div>
            </div>
            <div className="text-center p-4 bg-blue-500/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">
                {displayProspects.filter(p => p.buyingIntent === 'high').length}
              </div>
              <div className="text-sm text-muted-foreground">High Intent</div>
            </div>
            <div className="text-center p-4 bg-purple-500/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-500">
                {Math.round(displayProspects.reduce((acc, p) => acc + p.predictiveInsights.conversionProbability, 0) / displayProspects.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Conversion</div>
            </div>
          </div>

          <div className="space-y-3">
            {displayProspects.map((prospect) => (
              <Card 
                key={prospect.id}
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary/40"
                onClick={() => {
                  setSelectedProspect(prospect);
                  onProspectSelect?.(prospect);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={prospect.avatar} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {prospect.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{prospect.name}</h4>
                      <p className="text-sm text-muted-foreground">{prospect.title} at {prospect.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{prospect.location}</span>
                        <Badge variant="outline" className={getBuyingIntentColor(prospect.buyingIntent)}>
                          {prospect.buyingIntent} intent
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className={`text-lg font-bold px-2 py-1 rounded ${getScoreColor(prospect.aiScore)}`}>
                      {prospect.aiScore}
                    </div>
                    <div className="text-xs text-muted-foreground">AI Score</div>
                    <div className="text-xs text-green-500">
                      {prospect.predictiveInsights.conversionProbability}% conversion
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Prospect View */}
      {selectedProspect && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-primary" />
                <span>Prospect Intelligence: {selectedProspect.name}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProspect(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="company">Company Intel</TabsTrigger>
                <TabsTrigger value="social">Social Insights</TabsTrigger>
                <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={selectedProspect.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary text-lg">
                          {selectedProspect.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{selectedProspect.name}</h3>
                        <p className="text-muted-foreground">{selectedProspect.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedProspect.company}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedProspect.email}</span>
                      </div>
                      {selectedProspect.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedProspect.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedProspect.location}</span>
                      </div>
                      {selectedProspect.linkedinUrl && (
                        <div className="flex items-center space-x-2">
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          <a href={selectedProspect.linkedinUrl} className="text-sm text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">{selectedProspect.aiScore}</div>
                        <div className="text-xs text-muted-foreground">AI Score</div>
                      </div>
                      <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">{selectedProspect.leadScore}</div>
                        <div className="text-xs text-muted-foreground">Lead Score</div>
                      </div>
                      <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-purple-500">{selectedProspect.engagementScore}</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Buying Intent</span>
                          <Badge className={getBuyingIntentColor(selectedProspect.buyingIntent)}>
                            {selectedProspect.buyingIntent}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Last Activity</span>
                          <span className="text-muted-foreground">
                            {selectedProspect.lastActivity.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="company" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>Company Overview</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{selectedProspect.companyData.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span>{selectedProspect.companyData.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span>{selectedProspect.companyData.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Founded:</span>
                        <span>{selectedProspect.companyData.founded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Funding:</span>
                        <span>{selectedProspect.companyData.funding}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProspect.companyData.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">{tech}</Badge>
                      ))}
                    </div>

                    <h4 className="font-semibold">Competitors</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProspect.companyData.competitors.map((competitor, index) => (
                        <Badge key={index} variant="outline">{competitor}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <span>LinkedIn Insights</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Connections:</span>
                        <span>{selectedProspect.socialInsights.linkedinConnections.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recent Posts:</span>
                        <span>{selectedProspect.socialInsights.recentPosts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engagement Rate:</span>
                        <span>{selectedProspect.socialInsights.engagement}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Discussion Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProspect.socialInsights.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="predictions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span>AI Predictions</span>
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Conversion Probability</span>
                          <span className="font-semibold text-green-500">
                            {selectedProspect.predictiveInsights.conversionProbability}%
                          </span>
                        </div>
                        <Progress value={selectedProspect.predictiveInsights.conversionProbability} className="h-2" />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Best Contact Time:</span>
                          <span>{selectedProspect.predictiveInsights.bestContactTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Preferred Channel:</span>
                          <span>{selectedProspect.predictiveInsights.preferredChannel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expected Deal Size:</span>
                          <span>{selectedProspect.predictiveInsights.dealSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time to Close:</span>
                          <span>{selectedProspect.predictiveInsights.timeToClose}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Recommended Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Personalized Email
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Linkedin className="w-4 h-4 mr-2" />
                        Connect on LinkedIn
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Follow-up
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Target className="w-4 h-4 mr-2" />
                        Add to Campaign
                      </Button>
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
