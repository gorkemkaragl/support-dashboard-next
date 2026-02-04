"use client";

import { useRequests } from "@/context/RequestContext";
import { useRequestFilter } from "@/hooks/useRequestFilter";
import RequestTable from "@/components/dashboard/RequestTable";
import RequestFilters from "@/components/dashboard/RequestFilters";
import DashboardCharts from "./dashboard/DashboardCharts";
import { exportToCsv } from "@/utils/exportToCsv";
import { Button } from "./ui/button";
import { toast } from "sonner"
export default function Home() {
  const { requests, isLoading } = useRequests();

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    showNeedsAttention,
    setShowNeedsAttention,
    filteredRequests,
  } = useRequestFilter(requests);

  return (
    <main className="container mx-auto p-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destek Talepleri</h1>
          <p className="text-gray-500 mt-1">
            Talepleri arayın, filtreleyin ve yönetin.
          </p>
        </div>

        {/* CSV İndir Butonu */}
        <Button
          variant="link"
          onClick={() => {
            exportToCsv(filteredRequests);
            toast.success('Excel dosyası indirildi!');
          }}
        >
          📥 Excel / CSV İndir
        </Button>
      </div>

      {/* Veri varsa grafikleri göster */}
      {!isLoading && requests.length > 0 && (
        <DashboardCharts requests={requests} />
      )}

      <RequestFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        showNeedsAttention={showNeedsAttention}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onToggleAttention={setShowNeedsAttention}
      />

      {/* Eğer acil mod açıksa ve liste boşsa, kullanıcıya özel mesaj gösterebiliriz */}
      {filteredRequests.length === 0 && showNeedsAttention ? (
        <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200 text-green-700">
          Harika! İlgilenilmesi gereken acil bir kayıt yok. 🎉
        </div>
      ) : (
        <RequestTable requests={filteredRequests} isLoading={isLoading} />
      )}
    </main>
  );
}
