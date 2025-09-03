import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  MessageSquare, 
  ChevronRight,
  Zap,
  Target,
  Mail,
  BarChart3,
  Upload,
  FileText,
  Settings
} from 'lucide-react';
import { toast } from "sonner";

interface WelcomePanelProps {
  onToggleCollapse: () => void;
}

export default function WelcomePanelFixed({ onToggleCollapse }: WelcomePanelProps) {
  return (
    <div className="w-full md:w-1/2 border-l border-border/20 bg-background-alt/30 backdrop-blur flex flex-col md:max-h-none max-h-[60vh] md:relative absolute bottom-0 left-0 right-0 md:bottom-auto z-10">
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Welcome to Houndr</h3>
              <p className="text-sm text-muted-foreground">Ready to assist you</p>
            </div>
          </div>
          
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
      
      <div className="flex-1 p-4 space-y-4">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h4 className="font-medium mb-2">AI Sales Intelligence</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Start a conversation to see real-time agent activity and insights here.
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <Target className="w-5 h-5 text-blue-500" />
            <div>
              <span className="font-medium">Prospect Discovery</span>
              <p className="text-xs text-muted-foreground">Find and qualify leads</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <Mail className="w-5 h-5 text-green-500" />
            <div>
              <span className="font-medium">Campaign Creation</span>
              <p className="text-xs text-muted-foreground">Build personalized outreach</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <div>
              <span className="font-medium">Market Research</span>
              <p className="text-xs text-muted-foreground">Analyze opportunities</p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h5 className="font-medium mb-3">Quick Actions</h5>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => toast.success('Opening file upload dialog...')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Prospect List
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => toast.success('Opening template library...')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Browse Templates
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => toast.success('Opening integration settings...')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure Integrations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}