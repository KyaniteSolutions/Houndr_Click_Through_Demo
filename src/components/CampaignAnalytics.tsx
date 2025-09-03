import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  TrendingUp, 
  TrendingDown,
  Mail,
  Eye,
  MousePointerClick,
  Calendar,
  Users,
  DollarSign,
  Target,
  Clock
} from 'lucide-react';

interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
  meetings: number;
  deals: number;
  revenue: number;
}

interface CampaignAnalyticsProps {
  campaign: {
    name: string;
    status: 'draft' | 'active' | 'paused' | 'completed';
    startDate: string;
    endDate?: string;
    totalProspects: number;
    metrics: CampaignMetrics;
  };
}

export default function CampaignAnalytics({ campaign }: CampaignAnalyticsProps) {
  const { metrics } = campaign;
  
  const deliveryRate = metrics.sent > 0 ? (metrics.delivered / metrics.sent) * 100 : 0;
  const openRate = metrics.delivered > 0 ? (metrics.opened / metrics.delivered) * 100 : 0;
  const clickRate = metrics.opened > 0 ? (metrics.clicked / metrics.opened) * 100 : 0;
  const replyRate = metrics.delivered > 0 ? (metrics.replied / metrics.delivered) * 100 : 0;
  const meetingRate = metrics.replied > 0 ? (metrics.meetings / metrics.replied) * 100 : 0;

  const statusColors = {
    draft: 'bg-gray-500/20 text-gray-700',
    active: 'bg-green-500/20 text-green-700',
    paused: 'bg-yellow-500/20 text-yellow-700',
    completed: 'bg-blue-500/20 text-blue-700'
  };

  return (
    <div className="space-y-3">
      {/* Campaign Status */}
      <Card className="border-border/20">
        <CardHeader className="pb-1 px-3 pt-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Campaign Performance</CardTitle>
            <Badge className={statusColors[campaign.status]}>
              {campaign.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Started:</span>
            <span>{campaign.startDate}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Prospects:</span>
            <span>{campaign.totalProspects}</span>
          </div>
          {campaign.endDate && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Ended:</span>
              <span>{campaign.endDate}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="border-border/20">
        <CardHeader className="pb-1 px-3 pt-3">
          <CardTitle className="text-sm">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-3">
          {/* Email Performance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3 text-blue-500" />
                <span className="text-xs">Delivery Rate</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium">{deliveryRate.toFixed(1)}%</span>
                {deliveryRate >= 95 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
              </div>
            </div>
            <Progress value={deliveryRate} className="h-1" />
            <div className="text-xs text-muted-foreground">
              {metrics.delivered}/{metrics.sent} delivered
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-3 h-3 text-green-500" />
                <span className="text-xs">Open Rate</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium">{openRate.toFixed(1)}%</span>
                {openRate >= 25 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
              </div>
            </div>
            <Progress value={openRate} className="h-1" />
            <div className="text-xs text-muted-foreground">
              {metrics.opened}/{metrics.delivered} opened
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MousePointerClick className="w-3 h-3 text-purple-500" />
                <span className="text-xs">Reply Rate</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium">{replyRate.toFixed(1)}%</span>
                {replyRate >= 10 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
              </div>
            </div>
            <Progress value={replyRate} className="h-1" />
            <div className="text-xs text-muted-foreground">
              {metrics.replied}/{metrics.delivered} replied
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Impact */}
      <Card className="border-border/20">
        <CardHeader className="pb-1 px-3 pt-3">
          <CardTitle className="text-sm">Business Impact</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-green-500/10 rounded border border-green-500/20">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-700">Meetings</span>
              </div>
              <div className="text-lg font-bold text-green-700">{metrics.meetings}</div>
              <div className="text-xs text-green-600">{meetingRate.toFixed(1)}% conversion</div>
            </div>
            
            <div className="text-center p-2 bg-blue-500/10 rounded border border-blue-500/20">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-3 h-3 text-blue-600 mr-1" />
                <span className="text-xs text-blue-700">Deals</span>
              </div>
              <div className="text-lg font-bold text-blue-700">{metrics.deals}</div>
              <div className="text-xs text-blue-600">
                {metrics.meetings > 0 ? ((metrics.deals / metrics.meetings) * 100).toFixed(1) : 0}% close rate
              </div>
            </div>
          </div>
          
          <div className="text-center p-3 bg-purple-500/10 rounded border border-purple-500/20">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-sm text-purple-700">Pipeline Value</span>
            </div>
            <div className="text-xl font-bold text-purple-700">
              ${metrics.revenue.toLocaleString()}
            </div>
            <div className="text-xs text-purple-600">
              ${metrics.deals > 0 ? (metrics.revenue / metrics.deals).toLocaleString() : 0} avg deal size
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Indicators */}
      <Card className="border-border/20">
        <CardHeader className="pb-1 px-3 pt-3">
          <CardTitle className="text-sm">Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Bounce Rate:</span>
            <div className="flex items-center space-x-1">
              <span className={metrics.bounced / metrics.sent > 0.05 ? 'text-red-500' : 'text-green-500'}>
                {((metrics.bounced / metrics.sent) * 100).toFixed(1)}%
              </span>
              {metrics.bounced / metrics.sent > 0.05 ? (
                <TrendingUp className="w-3 h-3 text-red-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-green-500" />
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Unsubscribe Rate:</span>
            <div className="flex items-center space-x-1">
              <span className={metrics.unsubscribed / metrics.delivered > 0.02 ? 'text-red-500' : 'text-green-500'}>
                {((metrics.unsubscribed / metrics.delivered) * 100).toFixed(1)}%
              </span>
              {metrics.unsubscribed / metrics.delivered > 0.02 ? (
                <TrendingUp className="w-3 h-3 text-red-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-green-500" />
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Cost per Meeting:</span>
            <span className="font-medium">
              ${metrics.meetings > 0 ? (500 / metrics.meetings).toFixed(0) : '∞'}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">ROI:</span>
            <span className="font-medium text-green-500">
              {metrics.revenue > 500 ? `${((metrics.revenue - 500) / 500 * 100).toFixed(0)}%` : '0%'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}