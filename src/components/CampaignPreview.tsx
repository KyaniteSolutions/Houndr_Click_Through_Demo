import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Mail, TrendingUp, Users, CheckCircle, Eye, Edit } from 'lucide-react';
import { useState } from 'react';

interface Email {
  subject: string;
  preview: string;
  type: string;
}

interface Campaign {
  name: string;
  emails: Email[];
  metrics: {
    expectedDeliverability: string;
    estimatedOpenRate: string;
    estimatedReplyRate: string;
  };
}

interface CampaignPreviewProps {
  campaign: Campaign;
}

export default function CampaignPreview({ campaign }: CampaignPreviewProps) {
  const [isApproved, setIsApproved] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const handleApprove = () => {
    setIsApproved(true);
    // Simulate approval process
    setTimeout(() => {
      setIsApproved(false);
    }, 3000);
  };

  const emailTypeColors = {
    'Introduction': 'bg-blue-500',
    'Value Proposition': 'bg-green-500',
    'Call to Action': 'bg-orange-500'
  };

  return (
    <Card className="border-border/20 bg-card/30 backdrop-blur">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>{campaign.name}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              3-email automated sequence • Ready for review
            </p>
          </div>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600">
            Pending Approval
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Sequence */}
        <div>
          <h4 className="font-medium mb-3">Email Sequence</h4>
          <div className="space-y-3">
            {campaign.emails.map((email, index) => (
              <Card 
                key={index} 
                className={`p-4 cursor-pointer transition-colors ${
                  selectedEmail === index ? 'border-primary bg-primary/5' : 'border-border/20 hover:border-border/40'
                }`}
                onClick={() => setSelectedEmail(selectedEmail === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        className={`text-white text-xs ${emailTypeColors[email.type as keyof typeof emailTypeColors]}`}
                      >
                        Email {index + 1}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{email.type}</span>
                    </div>
                    <h5 className="font-medium text-sm mb-1">{email.subject}</h5>
                    <p className="text-xs text-muted-foreground">{email.preview}</p>
                  </div>
                  <div className="flex space-x-1 ml-4">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                {selectedEmail === index && (
                  <div className="mt-3 pt-3 border-t border-border/20">
                    <div className="bg-muted/30 rounded p-3 text-sm">
                      <p className="font-medium mb-2">Email Preview:</p>
                      <p className="text-muted-foreground">
                        Subject: {email.subject}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        Hi {'{{firstName}}'}, <br /><br />
                        {email.preview} This email would contain personalized content based on the prospect's company and role.
                        <br /><br />
                        Best regards,<br />
                        {'{{senderName}}'}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Performance Metrics */}
        <div>
          <h4 className="font-medium mb-3">Expected Performance</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Deliverability</span>
              </div>
              <p className="text-2xl font-bold text-primary">{campaign.metrics.expectedDeliverability}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Eye className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Open Rate</span>
              </div>
              <p className="text-2xl font-bold text-green-500">{campaign.metrics.estimatedOpenRate}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Reply Rate</span>
              </div>
              <p className="text-2xl font-bold text-blue-500">{campaign.metrics.estimatedReplyRate}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Campaign ready for human approval and launch
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Campaign
            </Button>
            
            <Button 
              onClick={handleApprove}
              disabled={isApproved}
              className={`${isApproved ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary-dark'}`}
            >
              {isApproved ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approved & Launched
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Launch
                </>
              )}
            </Button>
          </div>
        </div>

        {isApproved && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-green-700">Campaign Approved & Launched</p>
                <p className="text-sm text-green-600">
                  Your email sequence is now live and will be sent to qualified prospects over the next 7 days.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}