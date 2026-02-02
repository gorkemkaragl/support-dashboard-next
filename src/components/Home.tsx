"use client";

import { useRequests } from '@/context/RequestContext';
import { useRequestFilter } from '@/hooks/useRequestFilter';
import RequestTable from '@/components/dashboard/RequestTable';
import RequestFilters from '@/components/dashboard/RequestFilters'; 

export default function Home() {
  const { requests, isLoading } = useRequests();
  
  // Hook bize hem verileri hem de değiştirme fonksiyonlarını (set...) veriyor
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    filteredRequests 
  } = useRequestFilter(requests);

  return (
    <main className="container mx-auto p-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destek Talepleri</h1>
          <p className="text-gray-500 mt-1">Talepleri arayın, filtreleyin ve yönetin.</p>
        </div>
        
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition-colors shadow-sm">
          + Yeni Talep
        </button>
      </div>

      {/* State'i ve State değiştirici fonksiyonu prop olarak veriyoruz */}
      <RequestFilters 
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
      />

      <RequestTable requests={filteredRequests} isLoading={isLoading} />
    </main>
  );
}