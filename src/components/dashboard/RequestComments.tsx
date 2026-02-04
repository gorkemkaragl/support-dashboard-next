// components/RequestComments.tsx
import React, { useState } from 'react';
import { SupportRequest, Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/formatDate';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface Props {
  request: SupportRequest;
  onUpdate: (updatedReq: SupportRequest) => void; // Güncelleme fonksiyonu
}

export default function RequestComments({ request, onUpdate }: Props) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    // Yeni yorum objesi oluştur
    const comment: Comment = {
      id: Date.now().toString(), // Basit ID
      author: 'Ben (Admin)',     // Şimdilik sabit yazar
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    // Mevcut yorumları al (yoksa boş dizi)
    const existingComments = request.comments || [];

    // İsteği güncelle
    const updatedRequest = {
      ...request,
      comments: [...existingComments, comment], // Listeye ekle
      lastCommentAt: comment.createdAt,         // Son işlem tarihini güncelle
      updatedAt: comment.createdAt              // Kayıt tarihini güncelle
    };

    onUpdate(updatedRequest);
    setNewComment('');
    toast.success('Yorum eklendi!');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">İşlem Geçmişi & Yorumlar</h3>
      
      {/* Yorum Listesi */}
      <div className="space-y-4">
        {(request.comments || []).length === 0 ? (
           <p className="text-sm text-gray-500 italic">Henüz bir yorum yok.</p>
        ) : (
          (request.comments || []).map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">
                  {comment.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Separator />

      {/* Yorum Ekleme Alanı */}
      <div className="flex gap-4">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-200">SİZ</AvatarFallback>
        </Avatar>
        <div className="flex-1 gap-2 flex flex-col">
          <Textarea 
            placeholder="Dahili bir not veya yorum ekleyin..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-25"
          />
          <Button onClick={handleAddComment} className="self-end" size="sm">
            Yorum Gönder
          </Button>
        </div>
      </div>
    </div>
  );
}