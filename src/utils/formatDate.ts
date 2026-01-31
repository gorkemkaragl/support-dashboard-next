
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '-'; // Tarih yoksa çizgi koy
  
  // Tarihi Türkçe formatında (Gün.Ay.Yıl) gösterir
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};