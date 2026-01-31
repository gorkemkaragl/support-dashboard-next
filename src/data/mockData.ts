import { SupportRequest } from '@/types';

// Yardımcı fonksiyon: Geçmiş tarih oluşturmak için
const subDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const initialRequests: SupportRequest[] = [
  {
    id: 'REQ-001',
    title: 'Login sayfasi calismiyor',
    customer: 'Acme Corp',
    status: 'New',
    priority: 'High',
    createdAt: subDays(1), // 1 gün önce
    updatedAt: subDays(1),
    lastCommentAt: null,
    tags: ['bug', 'auth'],
  },
  {
    id: 'REQ-002',
    title: 'Fatura goruntulenemiyor',
    customer: 'Wayne Ent',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: subDays(8), // 8 gün önce
    updatedAt: subDays(2), // 2 gün önce güncellendi
    lastCommentAt: subDays(2),
    tags: ['billing'],
  },
  {
    id: 'REQ-003',
    title: 'Yeni kullanici ekleme hatasi',
    customer: 'Stark Ind',
    status: 'Waiting on Customer',
    priority: 'Low',
    createdAt: subDays(10),
    updatedAt: subDays(5),
    lastCommentAt: subDays(5),
    tags: ['feature'],
  },
  {
    id: 'REQ-004',
    title: 'API erisim sorunu',
    customer: 'Cyberdyne',
    status: 'New',
    priority: 'High',
    createdAt: subDays(15), 
    updatedAt: subDays(15), // Uzun süredir işlem yok (Needs Attention adayı)
    lastCommentAt: null,
    tags: ['api', 'urgent'],
  },
   {
    id: 'REQ-005',
    title: 'Raporlar yavas yukleniyor',
    customer: 'Massive Dynamic',
    status: 'Done',
    priority: 'Medium',
    createdAt: subDays(20),
    updatedAt: subDays(1),
    lastCommentAt: subDays(2),
    tags: ['performance'],
  }
];