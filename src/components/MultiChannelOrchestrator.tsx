import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Mail, 
  Linkedin, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Target, 
  Zap, 
  Brain, 
  Activity, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Pause, 
  Settings,
  Users,
  BarChart3,
  TrendingUp,
  Eye
} from 'lucide-react';

interface TouchPoint {
  id: string;
  channel: 'email' | 'linkedin' | 'phone' | 'social';
  day: number;
  time: string;
  template: string;
  status: 'pending' | 'sent' | 'opened' | 'replied' | 'completed';
  responseRate: number;
  aiOptimized: boolean;
}

interface ProspectJourney {
  prospectId: string;
  name: string;
  company: string;
  currentStep: number;
  totalSteps: number;
  status: 'active' | 'responded' | 'meeting-scheduled' | 'unresponsive' | 'opted-out';
  touchPoints: TouchPoint[];
  lastActivity: Date;
  engagementScore: number;
  nextAction: {
    channel: string;
    scheduledFor: Date;
    template: string;
  };
}

interface MultiChannelOrchestratorProps {
  prospects?: any[];
  isActive?: boolean;
  onJourneyUpdate?: (journey: ProspectJourney) => void;
}

export default function MultiChannelOrchestrator({ 
  prospects = [], 
  isActive = false, 
  onJourneyUpdate 
}: MultiChannelOrchestratorProps) {
  const [journeys, setJourneys] = useState<ProspectJourney[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<ProspectJourney | null>(null);
  const [orchestrationActive, setOrchestrationActive] = useState(false);

  // Mock prospect journeys
  useEffect(() => {
    const mockJourneys: ProspectJourney[] = [
      {
        prospectId: '1',
        name: 'Sarah Chen',
        company: 'BuildTech Solutions',
        currentStep: 3,
        totalSteps: 7,
        status: 'active',
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
        engagementScore: 78,
        nextAction: {
          channel: 'linkedin',
          scheduledFor: new Date(Date.now() + 4 * 60 * 60 * 1000),
          template: 'Follow-up Connection'
        },
        touchPoints: [
          {
            id: '1',
            channel: 'email',
            day: 1,
            time: '09:00',
            template: 'Initial Outreach',
            status: 'opened',
            responseRate: 24,
            aiOptimized: true
          },
          {
            id: '2',
            channel: 'linkedin',
            day: 3,
            time: '14:30',
            template: 'Connection Request',
            status: 'completed',
            responseRate: 45,
            aiOptimized: true
          },
          {
            id: '3',
            channel: 'email',
            day: 5,
            time: '10:15',
            template: 'Value Proposition',
            status: 'sent',
            responseRate: 18,
            aiOptimized: true
          },
          {
            id: '4',
            channel: 'phone',
            day: 7,
            time: '15:00',
            template: 'Discovery Call',
            status: 'pending',
            responseRate: 35,
            aiOptimized: false
          }
        ]
      },
      {
        prospectId: '2',
        name: 'Michael Rodriguez',
        company: 'ConstructFlow',
        currentStep: 5,
        totalSteps: 7,
        status: 'responded',
        lastActivity: new Date(Date.now() - 30 * 60 * 1000),
        engagementScore: 92,
        nextAction: {
          channel: 'email',
          scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000),
          template: 'Meeting Scheduler'
        },
        touchPoints: [
          {
            id: '1',
            channel: 'email',
            day: 1,
            time: '09:00',
            template: 'Initial Outreach',
            status: 'replied',
            responseRate: 24,
            aiOptimized: true
          },
          {
            id: '2',
            channel: 'linkedin',
            day: 2,
            time: '11:00',
            template: 'Connection Request',
            status: 'completed',
            responseRate: 45,
            aiOptimized: true
          },
          {
            id: '3',
            channel: 'email',
            day: 4,
            time: '14:00',
            template: 'Case Study Share',
            status: 'opened',
            responseRate: 32,
            aiOptimized: true
          },
          {
            id: '4',
            channel: 'linkedin',
            day: 6,
            time: '16:30',
            template: 'Industry Insights',
            status: 'replied',
            responseRate: 28,
            aiOptimized: true
          }
        ]
      }
    ];

    setJourneys(mockJourneys);
    if (mockJourneys.length > 0) {
      setSelectedJourney(mockJourneys[0]);
    }
  }, []);

  // Simulate real-time orchestration
  useEffect(() => {
    if (!orchestrationActive) return;

    const interval = setInterval(() => {
      setJourneys(prev => prev.map(journey => {
        // Simulate progress
        if (journey.status === 'active' && Math.random() > 0.8) {
          const updatedJourney = {
            ...journey,
            currentStep: Math.min(journey.currentStep + 1, journey.totalSteps),
            lastActivity: new Date(),
            engagementScore: Math.min(journey.engagementScore + Math.floor(Math.random() * 5), 100)
          };
          onJourneyUpdate?.(updatedJourney);
          return updatedJourney;
        }
        return journey;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [orchestrationActive, onJourneyUpdate]);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'social': return <MessageSquare className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email': return 'text-blue-500 bg-blue-500/10';
      case 'linkedin': return 'text-blue-600 bg-blue-600/10';
      case 'phone': return 'text-green-500 bg-green-500/10';
      case 'social': return 'text-purple-500 bg-purple-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'responded': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'meeting-scheduled': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'unresponsive': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'opted-out': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getTouchPointStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'replied':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'opened':
      case 'sent':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Orchestrator Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Multi-Channel Orchestrator</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {orchestrationActive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500">ACTIVE</span>
                </div>
              )}
              <Button
                size="sm"
                onClick={() => setOrchestrationActive(!orchestrationActive)}
                variant={orchestrationActive ? "default" : "outline"}
              >
                {orchestrationActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {orchestrationActive ? 'Pause' : 'Start'} Orchestration
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{journeys.length}</div>
              <div className="text-sm text-muted-foreground">Active Journeys</div>
            </div>
            <div className="text-center p-4 bg-green-500/5 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {journeys.filter(j => j.status === 'responded').length}
              </div>
              <div className="text-sm text-muted-foreground">Responses</div>
            </div>
            <div className="text-center p-4 bg-blue-500/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">
                {Math.round(journeys.reduce((acc, j) => acc + j.engagementScore, 0) / journeys.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Engagement</div>
            </div>
            <div className="text-center p-4 bg-purple-500/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-500">
                {journeys.filter(j => j.status === 'meeting-scheduled').length}
              </div>
              <div className="text-sm text-muted-foreground">Meetings Scheduled</div>
            </div>
          </div>

          {/* Journey List */}
          <div className="space-y-3">
            <h4 className="font-semibold">Prospect Journeys</h4>
            {journeys.map((journey) => (
              <Card 
                key={journey.prospectId}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedJourney?.prospectId === journey.prospectId ? 'ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedJourney(journey)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{journey.name}</h5>
                      <p className="text-sm text-muted-foreground">{journey.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(journey.status)}>
                          {journey.status.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Step {journey.currentStep}/{journey.totalSteps}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="text-lg font-semibold text-green-500">
                      {journey.engagementScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                    <div className="text-xs text-muted-foreground">
                      Last: {journey.lastActivity.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Progress value={(journey.currentStep / journey.totalSteps) * 100} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Journey View */}
      {selectedJourney && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>{selectedJourney.name} - Journey Details</span>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedJourney(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Journey Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Journey Progress</h4>
                  <Badge className={getStatusColor(selectedJourney.status)}>
                    {selectedJourney.status.replace('-', ' ')}
                  </Badge>
                </div>
                <Progress 
                  value={(selectedJourney.currentStep / selectedJourney.totalSteps) * 100} 
                  className="h-3" 
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Step {selectedJourney.currentStep} of {selectedJourney.totalSteps}</span>
                  <span>{Math.round((selectedJourney.currentStep / selectedJourney.totalSteps) * 100)}% Complete</span>
                </div>
              </div>

              {/* Touch Points Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold">Touch Points Timeline</h4>
                <div className="space-y-3">
                  {selectedJourney.touchPoints.map((touchPoint, index) => (
                    <div key={touchPoint.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded ${getChannelColor(touchPoint.channel)}`}>
                          {getChannelIcon(touchPoint.channel)}
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Day {touchPoint.day}</div>
                          <div className="text-muted-foreground">{touchPoint.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{touchPoint.template}</span>
                          {touchPoint.aiOptimized && (
                            <Badge variant="secondary" className="text-xs">
                              <Brain className="w-3 h-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expected response rate: {touchPoint.responseRate}%
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getTouchPointStatusIcon(touchPoint.status)}
                        <span className="text-sm capitalize">{touchPoint.status}</span>
                      </div>
                      
                      {index < selectedJourney.touchPoints.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Action */}
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700 mb-1">Next Scheduled Action</h4>
                    <div className="text-sm text-blue-600">
                      <div className="flex items-center space-x-2 mb-1">
                        {getChannelIcon(selectedJourney.nextAction.channel)}
                        <span className="font-medium capitalize">{selectedJourney.nextAction.channel}</span>
                        <span>•</span>
                        <span>{selectedJourney.nextAction.scheduledFor.toLocaleString()}</span>
                      </div>
                      <div>Template: {selectedJourney.nextAction.template}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Brain className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">AI Insights</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• High engagement score ({selectedJourney.engagementScore}%) indicates strong interest</li>
                      <li>• LinkedIn messages show 2x higher response rate for this prospect</li>
                      <li>• Optimal contact time: Tuesday-Thursday, 10-11 AM</li>
                      <li>• Recommend mentioning recent company funding in next outreach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
