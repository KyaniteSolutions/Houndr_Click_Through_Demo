import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Building, Mail, Phone, MapPin, Users, ExternalLink, Plus } from 'lucide-react';
import { useState } from 'react';

interface Prospect {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  employees: string;
  industry: string;
}

interface ProspectCardProps {
  prospect: Prospect;
}

export default function ProspectCard({ prospect }: ProspectCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddProspect = () => {
    setIsAdded(true);
    // Simulate adding to prospect list
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Card className="p-4 border-border/20 bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary/20 text-primary font-medium">
                {getInitials(prospect.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate">{prospect.name}</h3>
              <p className="text-sm text-muted-foreground">{prospect.title}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Building className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground truncate">{prospect.company}</span>
              </div>
            </div>
          </div>
          
          <Badge variant="secondary" className="shrink-0">
            {prospect.industry}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{prospect.email}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{prospect.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{prospect.location}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{prospect.employees} employees</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="h-8">
              <ExternalLink className="w-3 h-3 mr-1" />
              LinkedIn
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Building className="w-3 h-3 mr-1" />
              Company
            </Button>
          </div>
          
          <Button 
            size="sm" 
            onClick={handleAddProspect}
            disabled={isAdded}
            className={`h-8 ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary-dark'}`}
          >
            {isAdded ? (
              <>
                <span className="w-3 h-3 mr-1">✓</span>
                Added
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}