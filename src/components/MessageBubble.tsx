import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Brain, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  agent?: 'prospect' | 'campaign' | 'research' | 'conversation' | 'workflow';
  data?: any;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  const isSystem = message.type === 'system';

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-1 ml-4">$1</ul>')
      .replace(/\n/g, '<br />');
  };

  if (isSystem) {
    return (
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary/20">
            <Brain className="w-4 h-4 text-primary" />
          </AvatarFallback>
        </Avatar>
        <Card className="flex-1 p-4 bg-card/50 backdrop-blur border-border/20">
          <div 
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
          />
          <div className="text-xs text-muted-foreground mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </Card>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex items-start space-x-3 justify-end">
        <Card className="max-w-[70%] p-4 bg-primary text-primary-foreground">
          <div className="text-sm leading-relaxed">
            {message.content}
          </div>
          <div className="text-xs text-primary-foreground/70 mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </Card>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-secondary">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  // AI message
  return (
    <div className="flex items-start space-x-3">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-primary/20">
          <Brain className="w-4 h-4 text-primary" />
        </AvatarFallback>
      </Avatar>
      <Card className="flex-1 p-4 bg-card/50 backdrop-blur border-border/20">
        <div 
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <div className="text-xs text-muted-foreground mt-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </Card>
    </div>
  );
}