"use client";

import { useParams, useRouter } from 'next/navigation';
import { useRequests } from '@/context/RequestContext';
import { formatDate } from '@/utils/formatDate';
import { RequestStatus, RequestPriority } from '@/types'; 

export default function RequestDetailPage() {
  const { id } = useParams(); // URL'deki ID'yi (örn: REQ-001) yakalar
  const router = useRouter(); // Geri dönmek için
  const { requests, updateRequest, isLoading } = useRequests();

  // O anki isteği bul
  const request = requests.find((r) => r.id === id);

  if (isLoading) return <div className="p-8 text-center">Yükleniyor...</div>;

  // Bulunamadı durumu (Yanlış ID girilirse)
  if (!request) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Talep bulunamadı!</p>
        <button onClick={() => router.back()} className="text-blue-600 underline">Geri Dön</button>
      </div>
    );
  }

  // --- GÜNCELLEME FONKSİYONLARI ---
  
  // Durum (Status) değişince çalışır
  const handleStatusChange = (newStatus: RequestStatus) => {
    // Orijinal veriyi bozmadan, sadece statüsü değişmiş yeni bir obje oluşturuyoruz
    const updatedReq = { 
      ...request, 
      status: newStatus,
      updatedAt: new Date().toISOString() // Güncellenme tarihini de yenile!
    };
    updateRequest(updatedReq); // Context'teki ana veriyi güncelle
  };

  // Öncelik (Priority) değişince çalışır
  const handlePriorityChange = (newPriority: RequestPriority) => {
    const updatedReq = { 
      ...request, 
      priority: newPriority,
      updatedAt: new Date().toISOString()
    };
    updateRequest(updatedReq);
  };

  return (
    <main className="container mx-auto p-8 max-w-4xl">
      {/* Üst Bar: Geri Dön Butonu */}
      <button 
        onClick={() => router.back()} 
        className="mb-6 text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm"
      >
        ← Listeye Dön
      </button>

      {/* Başlık Kartı */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
            <p className="text-gray-500 mt-1">Müşteri: <span className="font-medium text-gray-800">{request.customer}</span></p>
          </div>
          <div className="text-right text-xs text-gray-400">
            <p>ID: {request.id}</p>
            <p>Oluşturulma: {formatDate(request.createdAt)}</p>
            <p>Son İşlem: {formatDate(request.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* Kontrol Paneli (Güncelleme Alanı) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Durum Değiştirme */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            value={request.status}
            onChange={(e) => handleStatusChange(e.target.value as RequestStatus)}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Waiting on Customer">Waiting on Customer</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Öncelik Değiştirme */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">Öncelik</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            value={request.priority}
            onChange={(e) => handlePriorityChange(e.target.value as RequestPriority)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

      </div>

      {/* Etiketler (Read Only) */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Etiketler</h3>
        <div className="flex gap-2">
          {request.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}