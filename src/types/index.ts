// Durumlar (Status) sabit olduğu için Union Type kullanıyoruz
export type RequestStatus = 'New' | 'In Progress' | 'Waiting on Customer' | 'Done';

// Öncelikler (Priority) de sabit 
export type RequestPriority = 'Low' | 'Medium' | 'High';

// Ana Veri Modeli 
export interface SupportRequest {
  id: string;              // Benzersiz kimlik 
  title: string;           // Başlık 
  customer: string;        // Müşteri adı 
  status: RequestStatus;   // Durum 
  priority: RequestPriority; // Öncelik 
  createdAt: string;       // ISO Date String 
  updatedAt: string;       // ISO Date String 
  lastCommentAt: string | null; // Son yorum tarihi (boş olabilir) 
  tags: string[];          // Etiketler dizisi 
}