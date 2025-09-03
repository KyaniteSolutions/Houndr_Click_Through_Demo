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
  Target, 
  Brain, 
  Globe, 
  Users, 
  DollarSign, 
  Zap, 
  Activity, 
  Eye, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Building,
  MapPin,
  Calendar,
  Lightbulb,
  Search,
  Filter,
  PieChart,
  LineChart,
  Radar
} from 'lucide-react';

interface MarketTrend {
  category: string;
  growth: number;
  confidence: number;
  timeframe: string;
  description: string;
}

interface CompetitorAnalysis {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  recentActivity: string;
  threatLevel: 'low' | 'medium' | 'high';
}

interface MarketOpportunity {
  id: string;
  title: string;
  description: string;
  marketSize: string;
  growthRate: number;
  competitionLevel: 'low' | 'medium' | 'high';
  timeToMarket: string;
  confidence: number;
  requiredInvestment: string;
}

interface MarketIntelligenceData {
  marketSize: string;
  growthRate: number;
  keyTrends: MarketTrend[];
  competitors: CompetitorAnalysis[];
  opportunities: MarketOpportunity[];
  insights: string[];
  lastUpdated: Date;
}

interface MarketIntelligenceDashboardProps {
  industry?: string;
  region?: string;
  isAnalyzing?: boolean;
  onInsightGenerated?: (insight: string) => void;
}

export default function MarketIntelligenceDashboard({ 
  industry = 'Construction Software', 
  region = 'North America',
  isAnalyzing = false,
  onInsightGenerated 
}: MarketIntelligenceDashboardProps) {
  const [marketData, setMarketData] = useState<MarketIntelligenceData | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedOpportunity, setSelectedOpportunity] = useState<MarketOpportunity | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate market analysis
  useEffect(() => {
    if (isAnalyzing) {
      performMarketAnalysis();
    } else {
      // Load mock data
      loadMockData();
    }
  }, [isAnalyzing, industry, region]);

  const performMarketAnalysis = async () => {
    setAnalysisProgress(0);
    
    const steps = [
      'Analyzing market size and growth...',
      'Identifying key trends...',
      'Researching competitors...',
      'Mapping opportunities...',
      'Generating insights...',
      'Finalizing report...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
    }

    loadMockData();
  };

  const loadMockData = () => {
    const mockData: MarketIntelligenceData = {
      marketSize: '$12.4B',
      growthRate: 14.2,
      lastUpdated: new Date(),
      keyTrends: [
        {
          category: 'AI Integration',
          growth: 34.5,
          confidence: 92,
          timeframe: '2024-2026',
          description: 'Rapid adoption of AI-powered project management and predictive analytics'
        },
        {
          category: 'Mobile-First Solutions',
          growth: 28.3,
          confidence: 87,
          timeframe: '2024-2025',
          description: 'Field workers demanding mobile-optimized construction management tools'
        },
        {
          category: 'Sustainability Focus',
          growth: 22.1,
          confidence: 79,
          timeframe: '2024-2027',
          description: 'Green building initiatives driving demand for environmental tracking software'
        },
        {
          category: 'IoT Integration',
          growth: 31.7,
          confidence: 84,
          timeframe: '2024-2026',
          description: 'Connected equipment and sensors creating new data opportunities'
        }
      ],
      competitors: [
        {
          name: 'Procore',
          marketShare: 23.4,
          strengths: ['Market leader', 'Comprehensive platform', 'Strong integrations'],
          weaknesses: ['High cost', 'Complex setup', 'Limited customization'],
          recentActivity: 'Acquired Levelset for $500M to expand payment solutions',
          threatLevel: 'high'
        },
        {
          name: 'Autodesk Construction Cloud',
          marketShare: 18.7,
          strengths: ['Design integration', 'BIM capabilities', 'Global presence'],
          weaknesses: ['Fragmented user experience', 'Steep learning curve'],
          recentActivity: 'Launched AI-powered risk prediction features',
          threatLevel: 'high'
        },
        {
          name: 'PlanGrid',
          marketShare: 12.3,
          strengths: ['User-friendly', 'Strong mobile app', 'Quick deployment'],
          weaknesses: ['Limited features', 'Acquired by Autodesk'],
          recentActivity: 'Being integrated into Autodesk Construction Cloud',
          threatLevel: 'medium'
        }
      ],
      opportunities: [
        {
          id: '1',
          title: 'AI-Powered Predictive Analytics',
          description: 'Develop machine learning models to predict project delays and cost overruns',
          marketSize: '$2.1B',
          growthRate: 45.3,
          competitionLevel: 'low',
          timeToMarket: '12-18 months',
          confidence: 89,
          requiredInvestment: '$5-8M'
        },
        {
          id: '2',
          title: 'Sustainability Compliance Platform',
          description: 'Comprehensive solution for tracking and reporting environmental impact',
          marketSize: '$1.8B',
          growthRate: 38.7,
          competitionLevel: 'medium',
          timeToMarket: '8-12 months',
          confidence: 82,
          requiredInvestment: '$3-5M'
        },
        {
          id: '3',
          title: 'Small Contractor Mobile Suite',
          description: 'Simplified, affordable tools designed specifically for small construction businesses',
          marketSize: '$3.2B',
          growthRate: 29.4,
          competitionLevel: 'medium',
          timeToMarket: '6-9 months',
          confidence: 91,
          requiredInvestment: '$2-4M'
        }
      ],
      insights: [
        'Market consolidation accelerating - 3 major acquisitions in past 6 months',
        'AI adoption still early stage - significant first-mover advantage available',
        'Small contractors (50-200 employees) remain underserved segment',
        'Integration capabilities becoming key differentiator',
        'Subscription fatigue driving demand for all-in-one platforms'
      ]
    };

    setMarketData(mockData);
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh || !marketData) return;

    const interval = setInterval(() => {
      setMarketData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          growthRate: prev.growthRate + (Math.random() - 0.5) * 0.2,
          keyTrends: prev.keyTrends.map(trend => ({
            ...trend,
            growth: trend.growth + (Math.random() - 0.5) * 1.0
          }))
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh, marketData]);

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getCompetitionLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span>Market Intelligence Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Analyzing {industry} Market</h3>
            <p className="text-muted-foreground mb-6">AI is gathering and analyzing market intelligence...</p>
            
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>Analysis Progress</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!marketData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>Market Intelligence Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No market data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>Market Intelligence Dashboard</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {autoRefresh && (
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
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {industry} • {region} • Last updated: {marketData.lastUpdated.toLocaleString()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Market Size</p>
                  <p className="text-2xl font-bold">{marketData.marketSize}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold text-green-500">
                    {marketData.growthRate.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Opportunities</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {marketData.opportunities.length}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-500 opacity-20" />
              </div>
            </Card>
          </div>

          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trends">Market Trends</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Key Market Trends</h4>
                {marketData.keyTrends.map((trend, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{trend.category}</h5>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-500 border-green-500/20">
                          +{trend.growth.toFixed(1)}%
                        </Badge>
                        <Badge variant="outline">
                          {trend.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{trend.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Timeframe: {trend.timeframe}</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-green-500">Growing</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="competitors" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Competitive Landscape</h4>
                {marketData.competitors.map((competitor, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium">{competitor.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {competitor.marketShare}% market share
                        </p>
                      </div>
                      <Badge className={getThreatLevelColor(competitor.threatLevel)}>
                        {competitor.threatLevel} threat
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h6 className="text-sm font-medium text-green-600 mb-1">Strengths</h6>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {competitor.strengths.map((strength, i) => (
                            <li key={i}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-red-600 mb-1">Weaknesses</h6>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {competitor.weaknesses.map((weakness, i) => (
                            <li key={i}>• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-muted/50 rounded text-xs">
                      <span className="font-medium">Recent Activity: </span>
                      {competitor.recentActivity}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="opportunities" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Market Opportunities</h4>
                {marketData.opportunities.map((opportunity) => (
                  <Card 
                    key={opportunity.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedOpportunity?.id === opportunity.id ? 'ring-2 ring-primary/20' : ''
                    }`}
                    onClick={() => setSelectedOpportunity(opportunity)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{opportunity.title}</h5>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-500 border-green-500/20">
                          {opportunity.marketSize}
                        </Badge>
                        <Badge variant="outline" className={getCompetitionLevelColor(opportunity.competitionLevel)}>
                          {opportunity.competitionLevel} competition
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{opportunity.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="font-medium">Growth Rate</div>
                        <div className="text-green-500">+{opportunity.growthRate}%</div>
                      </div>
                      <div>
                        <div className="font-medium">Time to Market</div>
                        <div className="text-muted-foreground">{opportunity.timeToMarket}</div>
                      </div>
                      <div>
                        <div className="font-medium">Investment</div>
                        <div className="text-muted-foreground">{opportunity.requiredInvestment}</div>
                      </div>
                      <div>
                        <div className="font-medium">Confidence</div>
                        <div className="text-blue-500">{opportunity.confidence}%</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">AI-Generated Insights</h4>
                {marketData.insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-700">{insight}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-green-700 mb-1">Strategic Recommendation</h5>
                      <p className="text-sm text-green-600">
                        Focus on AI-powered predictive analytics for the construction industry. 
                        Low competition, high growth potential, and aligns with current market trends. 
                        Target small-to-medium contractors who are underserved by current solutions.
                      </p>
                    </div>
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

// Competitive Intelligence Tracker Component
export function CompetitiveIntelligenceTracker() {
  const [competitors, setCompetitors] = useState([
    {
      id: '1',
      name: 'Procore',
      logo: '/api/placeholder/40/40',
      status: 'monitoring',
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      alerts: [
        { type: 'pricing', message: 'Reduced pricing for small contractors by 15%', severity: 'high' },
        { type: 'feature', message: 'Launched AI-powered scheduling assistant', severity: 'medium' }
      ],
      metrics: {
        webTraffic: { current: 2.4, change: 12.3 },
        socialMentions: { current: 847, change: -5.2 },
        jobPostings: { current: 23, change: 8.7 },
        funding: { current: 0, change: 0 }
      }
    },
    {
      id: '2',
      name: 'Autodesk',
      logo: '/api/placeholder/40/40',
      status: 'monitoring',
      lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000),
      alerts: [
        { type: 'acquisition', message: 'Acquired BuildingConnected for $275M', severity: 'high' }
      ],
      metrics: {
        webTraffic: { current: 5.1, change: 8.9 },
        socialMentions: { current: 1203, change: 15.4 },
        jobPostings: { current: 45, change: 22.1 },
        funding: { current: 275, change: 100 }
      }
    }
  ]);

  const [selectedCompetitor, setSelectedCompetitor] = useState(competitors[0]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Radar className="w-5 h-5 text-primary" />
          <span>Competitive Intelligence Tracker</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Competitor List */}
          <div className="space-y-3">
            <h4 className="font-semibold">Monitored Competitors</h4>
            {competitors.map((competitor) => (
              <Card
                key={competitor.id}
                className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  selectedCompetitor.id === competitor.id ? 'ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedCompetitor(competitor)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{competitor.name}</h5>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Active</span>
                      <span>•</span>
                      <span>{competitor.alerts.length} alerts</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{selectedCompetitor.name} Intelligence</h4>
              <Badge variant="outline">
                Last updated: {selectedCompetitor.lastUpdate.toLocaleTimeString()}
              </Badge>
            </div>

            {/* Alerts */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Recent Alerts</h5>
              {selectedCompetitor.alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.severity === 'high' ? 'bg-red-500/5 border-red-500/20' :
                  alert.severity === 'medium' ? 'bg-yellow-500/5 border-yellow-500/20' :
                  'bg-blue-500/5 border-blue-500/20'
                }`}>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className={`w-4 h-4 mt-0.5 ${
                      alert.severity === 'high' ? 'text-red-500' :
                      alert.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div>
                      <div className="text-sm font-medium capitalize">{alert.type}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Web Traffic</div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">{selectedCompetitor.metrics.webTraffic.current}M</span>
                  <div className={`flex items-center text-xs ${
                    selectedCompetitor.metrics.webTraffic.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {selectedCompetitor.metrics.webTraffic.change > 0 ?
                      <TrendingUp className="w-3 h-3" /> :
                      <TrendingDown className="w-3 h-3" />
                    }
                    <span>{Math.abs(selectedCompetitor.metrics.webTraffic.change)}%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Social Mentions</div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">{selectedCompetitor.metrics.socialMentions.current}</span>
                  <div className={`flex items-center text-xs ${
                    selectedCompetitor.metrics.socialMentions.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {selectedCompetitor.metrics.socialMentions.change > 0 ?
                      <TrendingUp className="w-3 h-3" /> :
                      <TrendingDown className="w-3 h-3" />
                    }
                    <span>{Math.abs(selectedCompetitor.metrics.socialMentions.change)}%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Job Postings</div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">{selectedCompetitor.metrics.jobPostings.current}</span>
                  <div className={`flex items-center text-xs ${
                    selectedCompetitor.metrics.jobPostings.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {selectedCompetitor.metrics.jobPostings.change > 0 ?
                      <TrendingUp className="w-3 h-3" /> :
                      <TrendingDown className="w-3 h-3" />
                    }
                    <span>{Math.abs(selectedCompetitor.metrics.jobPostings.change)}%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Recent Funding</div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">
                    {selectedCompetitor.metrics.funding.current > 0 ?
                      `$${selectedCompetitor.metrics.funding.current}M` :
                      'None'
                    }
                  </span>
                  {selectedCompetitor.metrics.funding.change > 0 && (
                    <Badge variant="outline" className="text-green-500 border-green-500/20">
                      New
                    </Badge>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
