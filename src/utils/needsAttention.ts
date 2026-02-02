import { SupportRequest } from '@/types';

// Sonuç tipimiz: Hem "Acil mi?" cevabını hem de sebeplerini dönecek
interface AttentionResult {
  isCritical: boolean;
  reasons: string[];
}

export const checkNeedsAttention = (req: SupportRequest): AttentionResult => {
  const reasons: string[] = [];

  // 1. KURAL: Zaten bitmişse ilgilenmeye gerek yok
  if (req.status === 'Done') {
    return { isCritical: false, reasons: [] };
  }

  // Tarih hesaplamaları için şimdiki zaman
  const now = new Date();
  
  // -- Tarihleri Nesneye Çevirme --
  const createdDate = new Date(req.createdAt);
  const updatedDate = new Date(req.updatedAt);
  const lastCommentDate = req.lastCommentAt ? new Date(req.lastCommentAt) : null;

  // -- Gün Farklarını Hesaplama (Milisaniye -> Gün) --
  const oneDay = 24 * 60 * 60 * 1000;
  
  // Kaç gündür açık?
  const daysOpen = Math.floor((now.getTime() - createdDate.getTime()) / oneDay);
  
  // Son aktivite zamanını bul (Güncelleme mi daha yeni, yorum mu?)
  // Eğer yorum yoksa, son güncelleme tarihini al.
  const lastActivityDate = lastCommentDate && lastCommentDate > updatedDate 
    ? lastCommentDate 
    : updatedDate;

  // Son aktiviteden beri geçen gün
  const daysInactive = Math.floor((now.getTime() - lastActivityDate.getTime()) / oneDay);


  // 2. KURAL: Son 3 gündür sessizlik var mı?
  if (daysInactive < 3) {
    // 3 gün içinde işlem yapılmışsa, sorun yok demektir.
    return { isCritical: false, reasons: [] }; 
  }

  // 3. KURAL: Ya Yüksek Öncelikli olmalı YA DA Çok Eski (7+ gün) olmalı
  let isPotentiallyCritical = false;

  if (req.priority === 'High') {
    reasons.push('Yüksek Öncelik');
    isPotentiallyCritical = true;
  }

  if (daysOpen > 7) {
    reasons.push('Eski Kayıt (7+ gün)');
    isPotentiallyCritical = true;
  }

  // Sonuç: Eğer aktivite yoksa (Kural 2) VE (Yüksek öncelik veya Eskiyse)
  if (isPotentiallyCritical) {
    reasons.push('Son 3 gündür işlem yok');
    return { isCritical: true, reasons };
  }

  return { isCritical: false, reasons: [] };
};