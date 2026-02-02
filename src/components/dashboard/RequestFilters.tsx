import React from 'react';
import { RequestStatus } from '@/types';

interface Props {
  searchQuery: string;
  statusFilter: RequestStatus | 'All';
  
  // Değişiklik olduğunda tetiklenecek fonksiyonlar (Callback)
  onSearchChange: (value: string) => void;
  onStatusChange: (status: RequestStatus | 'All') => void;
}

export default function RequestFilters({ 
  searchQuery, 
  statusFilter, 
  onSearchChange, 
  onStatusChange 
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
      
      {/* Arama Kutusu */}
      <div className="flex-1">
        <label htmlFor="search" className="block text-xs font-medium text-gray-700 mb-1">
          Ara
        </label>
        <input
          id="search"
          type="text"
          placeholder="Başlık veya müşteri adı..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Durum Filtresi */}
      <div className="w-full md:w-64">
        <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-1">
          Durum Filtrele
        </label>
        <select
          id="status"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm bg-white"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as any)}
        >
          <option value="All">Tüm Durumlar</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Waiting on Customer">Waiting on Customer</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
}