import { RequestStatus } from '@/types';

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
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-end">
      
      {/* Arama Kutusu */}
      <div className="flex-1 w-full">
        <label htmlFor="search" className="block text-xs font-medium text-gray-700 mb-1">Ara</label>
        <input
          id="search"
          type="text"
          placeholder="Başlık veya müşteri..."
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={showNeedsAttention} // Mod aktifken aramayı kapatabiliriz 
        />
      </div>

      {/* Durum Filtresi */}
      <div className="w-full md:w-64">
        <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-1">Durum</label>
        <select
          id="status"
          className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as any)}
          disabled={showNeedsAttention} // Mod aktifken diğer filtreyi kapat
        >
          <option value="All">Tüm Durumlar</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Waiting on Customer">Waiting on Customer</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Needs Attention Toggle */}
      <div className="w-full md:w-auto">
        <button
          onClick={() => onToggleAttention(!showNeedsAttention)}
          className={`w-full md:w-auto px-4 py-2 rounded-md text-sm font-bold transition-all border
            ${showNeedsAttention 
              ? 'bg-red-600 text-white border-red-700 shadow-inner' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50' 
            }`}
        >
          {showNeedsAttention ? '🔥 Acil Modu Kapat' : '⚠️ İlgilenilmesi Gerekenler'}
        </button>
      </div>
    </div>
  );
}