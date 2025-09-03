import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import { 
  Filter, 
  Building, 
  Users, 
  MapPin, 
  DollarSign,
  Calendar,
  TrendingUp,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

interface ProspectFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
}

export default function ProspectFilterDialog({ open, onOpenChange, onApplyFilters }: ProspectFilterDialogProps) {
  const [filters, setFilters] = useState({
    company: {
      industry: '',
      size: '',
      revenue: '',
      founded: '',
      location: '',
      keywords: ''
    },
    person: {
      titles: '',
      seniority: '',
      departments: '',
      location: ''
    },
    advanced: {
      verifiedEmail: true,
      excludeCompetitors: false,
      fundingEvents: false,
      jobChanges: false,
      technographics: '',
      intentSignals: false
    }
  });

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Advanced Prospect Filters</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="person">Person</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Industry</span>
                  </Label>
                  <Select value={filters.company.industry} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, company: { ...prev.company, industry: value } }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="software">Software & Technology</SelectItem>
                      <SelectItem value="fintech">Financial Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Company Size</span>
                  </Label>
                  <Select value={filters.company.size} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, company: { ...prev.company, size: value } }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Employee count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                      <SelectItem value="1000+">1,000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </Label>
                  <Input 
                    placeholder="United States, Austin TX, Remote..."
                    value={filters.company.location}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      company: { ...prev.company, location: e.target.value } 
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Revenue Range</span>
                  </Label>
                  <Input 
                    placeholder="e.g., $1M-$10M"
                    value={filters.company.revenue}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      company: { ...prev.company, revenue: e.target.value } 
                    }))}
                  />
                </div>

                <div>
                  <Label className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Founded Year</span>
                  </Label>
                  <Input 
                    placeholder="e.g., 2015-2023"
                    value={filters.company.founded}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      company: { ...prev.company, founded: e.target.value } 
                    }))}
                  />
                </div>

                <div>
                  <Label>Funding Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bootstrap">Bootstrapped</SelectItem>
                      <SelectItem value="seed">Seed Funded</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B+</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label>Company Keywords</Label>
              <Textarea 
                placeholder="Construction software, project management, BIM, digital transformation..."
                value={filters.company.keywords}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  company: { ...prev.company, keywords: e.target.value } 
                }))}
                className="h-20"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate keywords with commas. These will be searched in company descriptions and recent news.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="person" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Job Titles</Label>
                  <Textarea 
                    placeholder="CTO, VP Engineering, Director of Technology, Head of Software Development..."
                    value={filters.person.titles}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      person: { ...prev.person, titles: e.target.value } 
                    }))}
                    className="h-24"
                  />
                </div>

                <div>
                  <Label>Seniority Level</Label>
                  <Select value={filters.person.seniority} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, person: { ...prev.person, seniority: value } }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Contributor</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="director">Director</SelectItem>
                      <SelectItem value="vp">VP</SelectItem>
                      <SelectItem value="c-level">C-Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Departments</Label>
                  <div className="space-y-2">
                    {['Engineering', 'Product', 'Operations', 'IT', 'Digital', 'Innovation'].map((dept) => (
                      <div key={dept} className="flex items-center space-x-2">
                        <Checkbox id={`dept-${dept}`} />
                        <Label htmlFor={`dept-${dept}`}>{dept}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Years of Experience</Label>
                  <div className="px-3 py-2">
                    <Slider
                      defaultValue={[5, 15]}
                      max={30}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0 years</span>
                      <span>30+ years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Person Location</Label>
              <Input 
                placeholder="United States, Remote, Austin TX..."
                value={filters.person.location}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  person: { ...prev.person, location: e.target.value } 
                }))}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-6">
              <div>
                <Label className="flex items-center space-x-2 mb-3">
                  <Shield className="w-4 h-4" />
                  <span>Data Quality</span>
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="verified-email" 
                      checked={filters.advanced.verifiedEmail}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ 
                          ...prev, 
                          advanced: { ...prev.advanced, verifiedEmail: !!checked } 
                        }))
                      }
                    />
                    <Label htmlFor="verified-email">Verified email addresses only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="exclude-competitors"
                      checked={filters.advanced.excludeCompetitors}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ 
                          ...prev, 
                          advanced: { ...prev.advanced, excludeCompetitors: !!checked } 
                        }))
                      }
                    />
                    <Label htmlFor="exclude-competitors">Exclude competitors</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="phone-verified" />
                    <Label htmlFor="phone-verified">Phone numbers verified</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="linkedin-active" />
                    <Label htmlFor="linkedin-active">Active LinkedIn profiles</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Buying Signals</span>
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="funding-events"
                      checked={filters.advanced.fundingEvents}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ 
                          ...prev, 
                          advanced: { ...prev.advanced, fundingEvents: !!checked } 
                        }))
                      }
                    />
                    <Label htmlFor="funding-events">Recent funding events (last 12 months)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="job-changes"
                      checked={filters.advanced.jobChanges}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ 
                          ...prev, 
                          advanced: { ...prev.advanced, jobChanges: !!checked } 
                        }))
                      }
                    />
                    <Label htmlFor="job-changes">Recent job changes (last 6 months)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hiring-surge" />
                    <Label htmlFor="hiring-surge">Hiring surge (engineering roles)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="intent-signals"
                      checked={filters.advanced.intentSignals}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ 
                          ...prev, 
                          advanced: { ...prev.advanced, intentSignals: !!checked } 
                        }))
                      }
                    />
                    <Label htmlFor="intent-signals">High purchase intent signals</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Technographics</span>
                </Label>
                <Textarea 
                  placeholder="Salesforce, HubSpot, Slack, AWS, Microsoft 365..."
                  value={filters.advanced.technographics}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    advanced: { ...prev.advanced, technographics: e.target.value } 
                  }))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Technologies and tools currently used by the target companies
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-3">Filter Summary</h4>
              <div className="space-y-2">
                {filters.company.industry && (
                  <Badge variant="secondary">Industry: {filters.company.industry}</Badge>
                )}
                {filters.company.size && (
                  <Badge variant="secondary">Size: {filters.company.size}</Badge>
                )}
                {filters.person.seniority && (
                  <Badge variant="secondary">Seniority: {filters.person.seniority}</Badge>
                )}
                {filters.advanced.verifiedEmail && (
                  <Badge variant="secondary">Verified Emails</Badge>
                )}
                {filters.advanced.fundingEvents && (
                  <Badge variant="secondary">Recent Funding</Badge>
                )}
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-700">Estimated Results</span>
              </div>
              <p className="text-sm text-blue-600">
                Based on your filters, we estimate finding approximately <strong>120-180 prospects</strong> 
                across <strong>45-60 companies</strong> that match your criteria.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Search Quality Score: 94%</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• High data quality filters applied</div>
                <div>• Buying signal detection enabled</div>
                <div>• Technographic matching configured</div>
                <div>• Geographic targeting optimized</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply}>
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}