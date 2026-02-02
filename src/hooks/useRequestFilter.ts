import { useState, useMemo } from 'react';
import { SupportRequest, RequestStatus } from '@/types';

export function useRequestFilter(requests: SupportRequest[]) {
  // Filtre State'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');

  // Filtreleme Mantığı 
  const filteredRequests = useMemo(() => {
    let result = [...requests]; // Orijinal veriyi koru 

    // Arama (Search)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.customer.toLowerCase().includes(query)
      );
    }

    // Durum (Status)
    if (statusFilter !== 'All') {
      result = result.filter((r) => r.status === statusFilter);
    }

    // Sıralama (Sorting) - En yeni en üstte
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [requests, searchQuery, statusFilter]);

  // Hook'u kullanan sayfaya bu değerleri ve fonksiyonları döndür
  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredRequests,
  };
}