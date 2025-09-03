import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Users, 
  Building, 
  DollarSign, 
  Activity,
  Settings,
  Eye,
  Filter,
  RotateCcw
} from 'lucide-react';

interface ScoringFactor {
  name: string;
  weight: number;
  score: number;
  maxScore: number;
  description: string;
  category: 'demographic' | 'behavioral' | 'firmographic' | 'technographic' | 'intent';
}

interface LeadScore {
  overall: number;
  demographic: number;
  behavioral: number;
  firmographic: number;
  technographic: number;
  intent: number;
  factors: ScoringFactor[];
  confidence: number;
  tier: 'A' | 'B' | 'C' | 'D';
  recommendation: string;
}

interface LeadScoringEngineProps {
  prospectId?: string;
  onScoreUpdate?: (score: LeadScore) => void;
}

export default function LeadScoringEngine({ prospectId, onScoreUpdate }: LeadScoringEngineProps) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock lead scoring calculation
  useEffect(() => {
    if (prospectId) {
      calculateLeadScore();
    }
  }, [prospectId]);

  const calculateLeadScore = async () => {
    setIsCalculating(true);
    setCalculationProgress(0);

    // Simulate AI scoring process
    const steps = [
      'Analyzing demographic data...',
      'Processing behavioral signals...',
      'Evaluating company firmographics...',
      'Assessing technology stack...',
      'Measuring buying intent...',
      'Calculating final score...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCalculationProgress(((i + 1) / steps.length) * 100);
    }

    // Generate mock lead score
    const mockScore: LeadScore = {
      overall: 87,
      demographic: 92,
      behavioral: 78,
      firmographic: 89,
      technographic: 85,
      intent: 94,
      confidence: 91,
      tier: 'A',
      recommendation: 'High-priority prospect with strong buying signals. Recommend immediate outreach.',
      factors: [
        {
          name: 'Job Title Relevance',
          weight: 15,
          score: 95,
          maxScore: 100,
          description: 'CTO role indicates decision-making authority',
          category: 'demographic'
        },
        {
          name: 'Company Size Match',
          weight: 12,
          score: 88,
          maxScore: 100,
          description: '150-200 employees fits ideal customer profile',
          category: 'firmographic'
        },
        {
          name: 'Technology Alignment',
          weight: 10,
          score: 92,
          maxScore: 100,
          description: 'Uses React/Node.js stack - good fit for our solution',
          category: 'technographic'
        },
        {
          name: 'Recent LinkedIn Activity',
          weight: 8,
          score: 76,
          maxScore: 100,
          description: 'Posted about digital transformation 3 days ago',
          category: 'behavioral'
        },
        {
          name: 'Industry Relevance',
          weight: 12,
          score: 94,
          maxScore: 100,
          description: 'Construction software is a target vertical',
          category: 'firmographic'
        },
        {
          name: 'Funding Status',
          weight: 8,
          score: 85,
          maxScore: 100,
          description: 'Series B funding indicates growth phase',
          category: 'firmographic'
        },
        {
          name: 'Website Visits',
          weight: 6,
          score: 67,
          maxScore: 100,
          description: '2 visits to pricing page in last 30 days',
          category: 'intent'
        },
        {
          name: 'Email Engagement',
          weight: 5,
          score: 82,
          maxScore: 100,
          description: 'Opened 3 of last 5 emails, clicked 2 links',
          category: 'behavioral'
        },
        {
          name: 'Social Media Signals',
          weight: 7,
          score: 71,
          maxScore: 100,
          description: 'Follows competitors and industry thought leaders',
          category: 'behavioral'
        },
        {
          name: 'Geographic Location',
          weight: 4,
          score: 90,
          maxScore: 100,
          description: 'Austin, TX - strong tech market',
          category: 'demographic'
        }
      ]
    };

    setLeadScore(mockScore);
    setIsCalculating(false);
    onScoreUpdate?.(mockScore);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 bg-green-500/10';
    if (score >= 70) return 'text-blue-500 bg-blue-500/10';
    if (score >= 50) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'B': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'C': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'D': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'demographic': return <Users className="w-4 h-4" />;
      case 'behavioral': return <Activity className="w-4 h-4" />;
      case 'firmographic': return <Building className="w-4 h-4" />;
      case 'technographic': return <Settings className="w-4 h-4" />;
      case 'intent': return <Target className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const filteredFactors = selectedCategory === 'all' 
    ? leadScore?.factors || []
    : leadScore?.factors.filter(f => f.category === selectedCategory) || [];

  if (isCalculating) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span>AI Lead Scoring Engine</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Calculating Lead Score</h3>
            <p className="text-muted-foreground mb-6">AI is analyzing multiple data points...</p>
            
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>Processing</span>
                <span>{Math.round(calculationProgress)}%</span>
              </div>
              <Progress value={calculationProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!leadScore) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI Lead Scoring Engine</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Select a prospect to calculate lead score</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI Lead Scoring Engine</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getTierColor(leadScore.tier)}>
              Tier {leadScore.tier}
            </Badge>
            <Button size="sm" variant="outline" onClick={calculateLeadScore}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Recalculate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Overall Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(leadScore.overall)}`}>
              {leadScore.overall}
            </div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
            <div className="text-xs text-muted-foreground mt-1">
              {leadScore.confidence}% confidence
            </div>
          </div>
          
          <div className="col-span-2 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Demographic</span>
                <span className="font-medium">{leadScore.demographic}/100</span>
              </div>
              <Progress value={leadScore.demographic} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Behavioral</span>
                <span className="font-medium">{leadScore.behavioral}/100</span>
              </div>
              <Progress value={leadScore.behavioral} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Firmographic</span>
                <span className="font-medium">{leadScore.firmographic}/100</span>
              </div>
              <Progress value={leadScore.firmographic} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Technographic</span>
                <span className="font-medium">{leadScore.technographic}/100</span>
              </div>
              <Progress value={leadScore.technographic} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Buying Intent</span>
                <span className="font-medium">{leadScore.intent}/100</span>
              </div>
              <Progress value={leadScore.intent} className="h-2" />
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mb-6 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-700 mb-1">AI Recommendation</h4>
              <p className="text-sm text-green-600">{leadScore.recommendation}</p>
            </div>
          </div>
        </div>

        {/* Scoring Factors */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Scoring Factors</h4>
            <TabsList className="grid grid-cols-6 w-auto">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="demographic" className="text-xs">Demo</TabsTrigger>
              <TabsTrigger value="behavioral" className="text-xs">Behavior</TabsTrigger>
              <TabsTrigger value="firmographic" className="text-xs">Firmo</TabsTrigger>
              <TabsTrigger value="technographic" className="text-xs">Tech</TabsTrigger>
              <TabsTrigger value="intent" className="text-xs">Intent</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-2">
            {leadScore.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded bg-primary/10">
                    {getCategoryIcon(factor.category)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{factor.name}</div>
                    <div className="text-xs text-muted-foreground">{factor.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getScoreColor(factor.score)}`}>
                    {factor.score}/{factor.maxScore}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Weight: {factor.weight}%
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          {['demographic', 'behavioral', 'firmographic', 'technographic', 'intent'].map(category => (
            <TabsContent key={category} value={category} className="space-y-2">
              {leadScore.factors.filter(f => f.category === category).map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="p-1 rounded bg-primary/10">
                      {getCategoryIcon(factor.category)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{factor.name}</div>
                      <div className="text-xs text-muted-foreground">{factor.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getScoreColor(factor.score)}`}>
                      {factor.score}/{factor.maxScore}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Weight: {factor.weight}%
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
