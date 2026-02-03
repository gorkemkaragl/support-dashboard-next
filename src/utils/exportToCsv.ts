import { SupportRequest } from '@/types';

export const exportToCsv = (data: SupportRequest[], filename = 'destek-talepleri.csv') => {
  if (data.length === 0) {
    alert("İndirilecek veri yok!");
    return;
  }

  // CSV Başlıkları (Excel'in ilk satırı)
  const headers = ['ID', 'Başlık', 'Müşteri', 'Durum', 'Öncelik', 'Oluşturulma Tarihi'];

  // Verileri CSV formatına çevirme
  // Not: Metinlerin içinde virgül varsa Excel karıştırır, o yüzden tırnak içine ("...") alıyoruz.
  const rows = data.map(req => [
    req.id,
    `"${req.title.replace(/"/g, '""')}"`,   // Başlık (içindeki tırnakları temizle)
    `"${req.customer.replace(/"/g, '""')}"`, // Müşteri
    req.status,
    req.priority,
    req.createdAt
  ]);

  // Başlık ve Satırları Birleştirme 
  const csvContent = [
    headers.join(','), // Başlıkları virgülle birleştir
    ...rows.map(row => row.join(',')) // Satırları virgülle birleştir
  ].join('\n');

  // 4. Dosya İndirme İşlemi (Blob Yöntemi)
  // Türkçe karakter sorunu olmasın diye başına BOM (Byte Order Mark) ekliyoruz: \uFEFF
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click(); // Sanal olarak linke tıkla
  document.body.removeChild(link); // Temizlik yap
};