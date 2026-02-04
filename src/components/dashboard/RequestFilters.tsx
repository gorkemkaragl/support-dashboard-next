import React from 'react';
import { RequestStatus } from '@/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  searchQuery: string;
  statusFilter: RequestStatus | 'All';
  showNeedsAttention: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: RequestStatus | 'All') => void;
  onToggleAttention: (val: boolean) => void;
}

export default function RequestFilters({ 
  searchQuery, 
  statusFilter, 
  showNeedsAttention,
  onSearchChange, 
  onStatusChange,
  onToggleAttention 
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-end">
      
      {/* Arama Kutusu (Input) */}
      <div className="flex-1 w-full space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Ara
        </label>
        <Input
          placeholder="Başlık veya müşteri..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={showNeedsAttention}
          className="bg-white"
        />
      </div>

      {/* Durum Filtresi (Select) */}
      <div className="w-full md:w-64 space-y-2">
        <label className="text-sm font-medium leading-none">
          Durum
        </label>
        <Select 
          value={statusFilter} 
          onValueChange={(val) => onStatusChange(val as any)}
          disabled={showNeedsAttention}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Durum Seç" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Tüm Durumlar</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Waiting on Customer">Waiting on Customer</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Needs Attention Toggle (Button) */}
      <div className="w-full md:w-auto">
  <Button
    onClick={() => onToggleAttention(!showNeedsAttention)}
    className={`w-full md:w-auto font-medium flex items-center gap-2 transition cursor-pointer
      ${
        showNeedsAttention
          ? "bg-red-300 text-black hover:bg-red-400"
          : "text-black bg-background border border-input hover:bg-accent"
      }
    `}
  >
    <AlertTriangle className="h-4 w-4" />
    {showNeedsAttention ? "Acil Kayıtlar Aktif" : "Acil Kayıtları Göster"}
  </Button>
</div>
    </div>
  );
}