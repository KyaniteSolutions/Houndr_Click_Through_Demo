import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  Calendar, 
  BarChart3, 
  LineChart, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Download, 
  RefreshCw,
  Lightbulb,
  Sparkles,
  Globe,
  Users,
  DollarSign
} from 'lucide-react';

interface TrendPrediction {
  id: string;
  title: string;
  description: string;
  category: 'technology' | 'market' | 'consumer' | 'regulatory';
  confidence: number;
  timeframe: string;
  impact: 'low' | 'medium' | 'high';
  probability: number;
  keyDrivers: string[];
  potentialOutcomes: string[];
  recommendedActions: string[];
  dataPoints: number;
  lastUpdated: Date;
}

interface MarketSignal {
  source: string;
  signal: string;
  strength: number;
  relevance: number;
  timestamp: Date;
  category: string;
}

interface TrendPredictionEngineProps {
  industry?: string;
  isAnalyzing?: boolean;
  onPredictionGenerated?: (prediction: TrendPrediction) => void;
}

export default function TrendPredictionEngine({ 
  industry = 'Construction Software',
  isAnalyzing = false,
  onPredictionGenerated 
}: TrendPredictionEngineProps) {
  const [predictions, setPredictions] = useState<TrendPrediction[]>([]);
  const [signals, setSignals] = useState<MarketSignal[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<TrendPrediction | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isLive, setIsLive] = useState(true);

  // Mock predictions data
  useEffect(() => {
    if (!isAnalyzing) {
      loadMockData();
    }
  }, [isAnalyzing]);

  // Simulate trend analysis
  useEffect(() => {
    if (isAnalyzing) {
      performTrendAnalysis();
    }
  }, [isAnalyzing]);

  const performTrendAnalysis = async () => {
    setAnalysisProgress(0);
    
    const steps = [
      'Collecting market signals...',
      'Analyzing historical patterns...',
      'Processing social sentiment...',
      'Evaluating technology adoption...',
      'Generating predictions...',
      'Calculating confidence scores...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
    }

    loadMockData();
  };

  const loadMockData = () => {
    const mockPredictions: TrendPrediction[] = [
      {
        id: '1',
        title: 'AI-Powered Autonomous Construction Equipment',
        description: 'Self-operating construction machinery will become mainstream, reducing labor costs and improving safety',
        category: 'technology',
        confidence: 87,
        timeframe: '2025-2027',
        impact: 'high',
        probability: 78,
        keyDrivers: [
          'Labor shortage in construction industry',
          'Advances in computer vision and robotics',
          'Increasing safety regulations',
          'Cost pressure on construction projects'
        ],
        potentialOutcomes: [
          '40% reduction in construction labor requirements',
          '60% decrease in workplace accidents',
          'New job categories in equipment monitoring',
          'Significant initial capital investment required'
        ],
        recommendedActions: [
          'Partner with robotics companies early',
          'Develop software for equipment coordination',
          'Create training programs for operators',
          'Invest in safety monitoring systems'
        ],
        dataPoints: 2847,
        lastUpdated: new Date()
      },
      {
        id: '2',
        title: 'Mandatory Carbon Tracking in Construction',
        description: 'Government regulations will require real-time carbon footprint monitoring for all construction projects',
        category: 'regulatory',
        confidence: 92,
        timeframe: '2024-2025',
        impact: 'high',
        probability: 89,
        keyDrivers: [
          'Climate change legislation',
          'ESG reporting requirements',
          'Public pressure for sustainability',
          'Carbon tax implementations'
        ],
        potentialOutcomes: [
          'New compliance software market worth $2.1B',
          'Increased project costs by 3-5%',
          'Competitive advantage for green builders',
          'Integration with existing project management tools'
        ],
        recommendedActions: [
          'Develop carbon tracking features',
          'Partner with environmental consultants',
          'Create sustainability reporting dashboards',
          'Build compliance automation tools'
        ],
        dataPoints: 1923,
        lastUpdated: new Date()
      },
      {
        id: '3',
        title: 'Virtual Reality Training Becomes Standard',
        description: 'VR-based safety and skills training will replace traditional methods in construction education',
        category: 'technology',
        confidence: 74,
        timeframe: '2024-2026',
        impact: 'medium',
        probability: 71,
        keyDrivers: [
          'VR hardware cost reduction',
          'Improved training effectiveness',
          'Remote work capabilities',
          'Insurance premium reductions'
        ],
        potentialOutcomes: [
          '50% reduction in training time',
          'Standardized skill assessments',
          'Remote certification programs',
          'New VR content creation market'
        ],
        recommendedActions: [
          'Integrate VR training modules',
          'Develop skill assessment tools',
          'Create certification tracking',
          'Partner with VR hardware vendors'
        ],
        dataPoints: 1456,
        lastUpdated: new Date()
      }
    ];

    const mockSignals: MarketSignal[] = [
      {
        source: 'Patent Filings',
        signal: '34% increase in construction robotics patents',
        strength: 89,
        relevance: 92,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'technology'
      },
      {
        source: 'Government Policy',
        signal: 'EU announces mandatory carbon reporting for construction',
        strength: 95,
        relevance: 88,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        category: 'regulatory'
      },
      {
        source: 'Investment Trends',
        signal: '$2.3B invested in construction tech Q3 2024',
        strength: 82,
        relevance: 85,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        category: 'market'
      },
      {
        source: 'Social Media',
        signal: 'VR training mentions up 156% in construction forums',
        strength: 67,
        relevance: 74,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        category: 'consumer'
      }
    ];

    setPredictions(mockPredictions);
    setSignals(mockSignals);
    if (mockPredictions.length > 0) {
      setSelectedPrediction(mockPredictions[0]);
    }
  };

  // Simulate real-time signal updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Add new signal occasionally
      if (Math.random() > 0.7) {
        const newSignal: MarketSignal = {
          source: ['News Articles', 'Research Papers', 'Industry Reports', 'Social Media'][Math.floor(Math.random() * 4)],
          signal: 'New market signal detected',
          strength: Math.floor(Math.random() * 40) + 60,
          relevance: Math.floor(Math.random() * 30) + 70,
          timestamp: new Date(),
          category: ['technology', 'market', 'consumer', 'regulatory'][Math.floor(Math.random() * 4)]
        };
        
        setSignals(prev => [newSignal, ...prev.slice(0, 9)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technology': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'market': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'consumer': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'regulatory': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span>AI Trend Prediction Engine</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Market Trends</h3>
            <p className="text-muted-foreground mb-6">AI is processing signals and generating predictions...</p>
            
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

  return (
    <div className="space-y-6">
      {/* Trend Predictions Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>AI Trend Prediction Engine</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {isLive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500">LIVE</span>
                </div>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsLive(!isLive)}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {industry} • {predictions.length} active predictions • {signals.length} market signals
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="predictions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="signals">Market Signals</TabsTrigger>
              <TabsTrigger value="analysis">Deep Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="predictions" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {predictions.map((prediction) => (
                  <Card 
                    key={prediction.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedPrediction?.id === prediction.id ? 'ring-2 ring-primary/20' : ''
                    }`}
                    onClick={() => setSelectedPrediction(prediction)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium pr-2">{prediction.title}</h4>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={getCategoryColor(prediction.category)}>
                            {prediction.category}
                          </Badge>
                          <Badge className={getImpactColor(prediction.impact)}>
                            {prediction.impact} impact
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{prediction.description}</p>
                      
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="font-semibold text-green-500">{prediction.confidence}%</div>
                          <div className="text-muted-foreground">Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-500">{prediction.probability}%</div>
                          <div className="text-muted-foreground">Probability</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-purple-500">{prediction.timeframe}</div>
                          <div className="text-muted-foreground">Timeline</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{prediction.dataPoints.toLocaleString()} data points</span>
                        <span>Updated {prediction.lastUpdated.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="signals" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Real-time Market Signals</h4>
                {signals.map((signal, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className={getCategoryColor(signal.category)}>
                            {signal.category}
                          </Badge>
                          <span className="text-sm font-medium">{signal.source}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{signal.signal}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-muted-foreground">Strength:</div>
                          <div className="text-sm font-semibold">{signal.strength}%</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-muted-foreground">Relevance:</div>
                          <div className="text-sm font-semibold">{signal.relevance}%</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {signal.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              {selectedPrediction && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Deep Analysis: {selectedPrediction.title}</h4>
                    <Badge className={getImpactColor(selectedPrediction.impact)}>
                      {selectedPrediction.impact} impact
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">{selectedPrediction.confidence}%</div>
                        <div className="text-sm text-muted-foreground">AI Confidence</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{selectedPrediction.probability}%</div>
                        <div className="text-sm text-muted-foreground">Probability</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-500">{selectedPrediction.dataPoints.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Data Points</div>
                      </div>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Key Drivers</h5>
                        <ul className="space-y-1">
                          {selectedPrediction.keyDrivers.map((driver, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{driver}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Potential Outcomes</h5>
                        <ul className="space-y-1">
                          {selectedPrediction.potentialOutcomes.map((outcome, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                              <TrendingUp className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Recommended Actions</h5>
                      <ul className="space-y-1">
                        {selectedPrediction.recommendedActions.map((action, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <Lightbulb className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
