
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentTag } from './AgentCard';

interface AgentFiltersProps {
  onFilterChange: (filters: AgentTag[]) => void;
  onSortChange: (sort: string) => void;
}

const AgentFilters: React.FC<AgentFiltersProps> = ({ onFilterChange, onSortChange }) => {
  const [activeFilters, setActiveFilters] = useState<AgentTag[]>([]);
  
  const toggleFilter = (filter: AgentTag) => {
    let newFilters: AgentTag[];
    
    if (activeFilters.includes(filter)) {
      newFilters = activeFilters.filter(f => f !== filter);
    } else {
      newFilters = [...activeFilters, filter];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const filterOptions: { value: AgentTag; label: string }[] = [
    { value: 'Voice', label: 'Voice' },
    { value: 'Email', label: 'Email' },
    { value: 'SMS', label: 'SMS' },
    { value: 'Web', label: 'Web' },
    { value: 'Workflow', label: 'Workflow' },
  ];
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map(({ value, label }) => (
          <Badge
            key={value}
            variant={activeFilters.includes(value) ? "default" : "outline"}
            className={`cursor-pointer px-3 py-1 ${
              activeFilters.includes(value) 
                ? "bg-primary text-primary-foreground hover:bg-primary/80 transform scale-105 shadow-md transition-all" 
                : "bg-transparent hover:bg-slate-100"
            }`}
            onClick={() => toggleFilter(value)}
          >
            {label}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center">
        <Select onValueChange={onSortChange} defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="recent">Recently Used</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AgentFilters;
