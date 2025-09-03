import { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Users, 
  Star, 
  Clock,
  CheckCircle,
  X,
  GripVertical,
  Mail,
  Phone,
  Building
} from 'lucide-react';

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
  score?: number;
  status?: 'new' | 'contacted' | 'qualified' | 'interested' | 'rejected';
}

interface ProspectCardProps {
  prospect: Prospect;
  index: number;
  moveProspect: (dragIndex: number, hoverIndex: number) => void;
  onStatusChange: (id: string, status: string) => void;
}

const ItemTypes = {
  PROSPECT: 'prospect'
};

function DraggableProspectCard({ prospect, index, moveProspect, onStatusChange }: ProspectCardProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.PROSPECT,
    item: { type: ItemTypes.PROSPECT, id: prospect.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.PROSPECT,
    hover: (item: { index: number }) => {
      if (!drag) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveProspect(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-700',
    contacted: 'bg-yellow-500/20 text-yellow-700',
    qualified: 'bg-green-500/20 text-green-700',
    interested: 'bg-purple-500/20 text-purple-700',
    rejected: 'bg-red-500/20 text-red-700'
  };

  return (
    <div ref={(node) => drag(drop(node))}>
      <Card 
        className={`border-border/20 transition-all cursor-move hover:border-primary/40 ${
          isDragging ? 'opacity-50 rotate-2 scale-105' : ''
        }`}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <GripVertical className="w-3 h-3 text-muted-foreground" />
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs">
                {prospect.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium">{prospect.name}</p>
                <p className="text-xs text-muted-foreground">{prospect.title}</p>
              </div>
            </div>
            
            {prospect.score && (
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs">{prospect.score}/10</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1 mb-3">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Building className="w-3 h-3" />
              <span>{prospect.company}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span className="truncate">{prospect.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Phone className="w-3 h-3" />
              <span>{prospect.phone}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className={`text-xs ${statusColors[prospect.status || 'new']}`}
            >
              {prospect.status || 'new'}
            </Badge>
            
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => onStatusChange(prospect.id, 'qualified')}
              >
                <CheckCircle className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => onStatusChange(prospect.id, 'rejected')}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface DragDropProspectManagerProps {
  prospects: Prospect[];
  onProspectsChange: (prospects: Prospect[]) => void;
}

export default function DragDropProspectManager({ prospects, onProspectsChange }: DragDropProspectManagerProps) {
  const [localProspects, setLocalProspects] = useState(prospects);

  const moveProspect = (dragIndex: number, hoverIndex: number) => {
    const draggedProspect = localProspects[dragIndex];
    const updatedProspects = [...localProspects];
    updatedProspects.splice(dragIndex, 1);
    updatedProspects.splice(hoverIndex, 0, draggedProspect);
    
    setLocalProspects(updatedProspects);
    onProspectsChange(updatedProspects);
  };

  const handleStatusChange = (id: string, status: string) => {
    const updatedProspects = localProspects.map(prospect => 
      prospect.id === id ? { ...prospect, status: status as any } : prospect
    );
    setLocalProspects(updatedProspects);
    onProspectsChange(updatedProspects);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Prospect Management</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {localProspects.length} prospects
          </Badge>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {localProspects.map((prospect, index) => (
            <DraggableProspectCard
              key={prospect.id}
              prospect={prospect}
              index={index}
              moveProspect={moveProspect}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-green-500/10 rounded border border-green-500/20 text-center">
            <span className="text-green-700">
              {localProspects.filter(p => p.status === 'qualified').length} Qualified
            </span>
          </div>
          <div className="p-2 bg-red-500/10 rounded border border-red-500/20 text-center">
            <span className="text-red-700">
              {localProspects.filter(p => p.status === 'rejected').length} Rejected
            </span>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}