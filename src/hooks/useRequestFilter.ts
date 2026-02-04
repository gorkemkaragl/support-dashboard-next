import { useState, useMemo } from "react";
import { SupportRequest, RequestStatus } from "@/types";
import { checkNeedsAttention } from "@/utils/needsAttention";

export function useRequestFilter(requests: SupportRequest[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "All">(
    "All",
  );

  const [showNeedsAttention, setShowNeedsAttention] = useState(false);

  const filteredRequests = useMemo(() => {
    let result = [...requests];

    // Arama Filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.customer.toLowerCase().includes(query),
      );
    }

    if (showNeedsAttention) {
      // Sadece checkNeedsAttention true dönenleri al
      result = result.filter((r) => checkNeedsAttention(r).isCritical);
    }
    // Durum Filtresi (Eğer Needs Attention açık değilse çalışsın, yoksa çakışabilir)
    if (!showNeedsAttention && statusFilter !== "All") {
      result = result.filter((r) => r.status === statusFilter);
    }

    // Sıralama
    result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return result;
  }, [requests, searchQuery, statusFilter, showNeedsAttention]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    showNeedsAttention,
    setShowNeedsAttention,
    filteredRequests,
  };
}
