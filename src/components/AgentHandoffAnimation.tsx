import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Users, 
  Mail, 
  BarChart3, 
  MessageSquare, 
  ArrowRight,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';

interface AgentHandoffAnimationProps {
  workflow: {
    currentStep: number;
    steps: Array<{
      agent: 'research' | 'prospect' | 'campaign' | 'conversation';
      name: string;
      status: 'pending' | 'active' | 'complete';
      duration?: number;
      output?: string;
    }>;
  };
  onComplete?: () => void;
}

const agentConfig = {
  research: {
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  prospect: {
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  campaign: {
    icon: Mail,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  conversation: {
    icon: MessageSquare,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20'
  }
};

export default function AgentHandoffAnimation({ workflow, onComplete }: AgentHandoffAnimationProps) {
  const [animationStep, setAnimationStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      setTimeout(onComplete, 500);
    }
  }, [progress, onComplete]);

  return (
    <Card className="border-border/20 bg-card/50 backdrop-blur">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-sm">Multi-Agent Workflow</span>
            <Badge variant="secondary" className="text-xs">
              Active
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Agent Flow */}
          <div className="space-y-3">
            {workflow.steps.map((step, index) => {
              const config = agentConfig[step.agent];
              const IconComponent = config.icon;
              const isActive = index === workflow.currentStep;
              const isComplete = step.status === 'complete';
              const isPending = step.status === 'pending';

              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < workflow.steps.length - 1 && (
                    <div className="absolute left-4 top-8 w-px h-6 bg-border/40" />
                  )}
                  
                  <div className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-500 ${
                    isActive ? `${config.borderColor} ${config.bgColor} border-2` :
                    isComplete ? 'border-green-500/20 bg-green-500/5' :
                    'border-border/20'
                  }`}>
                    {/* Agent Icon */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? config.bgColor :
                      isComplete ? 'bg-green-500/10' :
                      'bg-muted'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : isActive ? (
                        <div className="relative">
                          <IconComponent className={`w-4 h-4 ${config.color}`} />
                          <div className="absolute -inset-1 rounded-full border-2 border-current animate-pulse opacity-50" />
                        </div>
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>

                    {/* Agent Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium text-sm ${
                          isActive ? config.color :
                          isComplete ? 'text-green-600' :
                          'text-muted-foreground'
                        }`}>
                          {step.name}
                        </h4>
                        
                        <div className="flex items-center space-x-2">
                          {step.duration && (
                            <span className="text-xs text-muted-foreground">
                              {step.duration}ms
                            </span>
                          )}
                          
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              isActive ? 'bg-orange-500/20 text-orange-700' :
                              isComplete ? 'bg-green-500/20 text-green-700' :
                              'bg-muted text-muted-foreground'
                            }`}
                          >
                            {isActive ? 'Processing' :
                             isComplete ? 'Complete' :
                             'Waiting'}
                          </Badge>
                        </div>
                      </div>
                      
                      {step.output && (isActive || isComplete) && (
                        <p className="text-xs text-muted-foreground">
                          {step.output}
                        </p>
                      )}
                      
                      {isActive && (
                        <div className="mt-2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Data Flow Visualization */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs font-medium">Context Flow</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Market insights → Targeting criteria</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Prospect data → Campaign personalization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Unified output → Launch ready</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}