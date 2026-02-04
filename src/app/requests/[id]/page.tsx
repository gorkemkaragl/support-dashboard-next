"use client";

import { useParams, useRouter } from "next/navigation";
import { useRequests } from "@/context/RequestContext";
import { RequestStatus, RequestPriority } from "@/types";
import { formatDate } from "@/utils/formatDate";

import RequestComments from "@/components/dashboard/RequestComments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { ArrowLeft, Trash2, Calendar, User, Tag } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function RequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { requests, updateRequest, deleteRequest, isLoading } = useRequests();

  const request = requests.find((r) => r.id === id);

  if (isLoading) return <div className="p-8 text-center">Yükleniyor...</div>;
  if (!request) return <div className="p-8 text-center">Talep bulunamadı.</div>;

  // --- ACTIONS ---

  const handleStatusChange = (val: string) => {
    updateRequest({
      ...request,
      status: val as RequestStatus,
      updatedAt: new Date().toISOString(),
    });
    toast.success("Durum güncellendi");
  };

  const handlePriorityChange = (val: string) => {
    updateRequest({
      ...request,
      priority: val as RequestPriority,
      updatedAt: new Date().toISOString(),
    });
    toast.success("Öncelik güncellendi");
  };

  const handleDelete = () => {
    deleteRequest(request.id);
    toast.success("Talep başarıyla silindi");
    router.push("/");
  };

  return (
    <main className="container mx-auto p-6 max-w-6xl">
      {/* Üst Bar */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 pl-0 hover:pl-2 transition-all"
        >
          <ArrowLeft size={16} /> Listeye Dön
        </Button>

        {/* Silme butonu ve alert */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Sil</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bu kaydı silmek istediğinize emin misiniz?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Bu işlem geri alınamaz. Talep kalıcı olarak silinecektir.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Vazgeç</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Evet, Sil
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- SOL KOLON (ANA İÇERİK) --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Başlık Kartı */}
          <Card>
            <CardHeader>
              <div className="flex gap-2 mb-2">
                {request.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 leading-tight">
                {request.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <User size={16} />
                <span className="font-medium text-gray-900">
                  {request.customer}
                </span>
                <span>tarafından oluşturuldu.</span>
              </div>

              {/* Sahte Açıklama (Mock veride açıklama alanı yok, varmış gibi gösterelim) */}
              <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-sm leading-relaxed border border-gray-100">
                <p>Merhaba,</p>
                <p className="mt-2">
                  Sistemde yaşadığımız bu sorunla ilgili detayları iletiyorum.
                  Ekiplerin kontrol etmesini rica ederim.
                </p>
                <p className="mt-4 italic text-xs text-gray-400">
                  *Not: Bu açıklama alanı temsilidir, mock veride açıklama alanı
                  yoktur.*
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Yorumlar Bölümü */}
          <Card>
            <CardContent className="pt-6">
              <RequestComments request={request} onUpdate={updateRequest} />
            </CardContent>
          </Card>
        </div>

        {/* --- SAĞ KOLON (SIDEBAR) --- */}
        <div className="space-y-6">
          {/* Durum & Öncelik Paneli */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Talep Yönetimi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Durum */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  Durum
                </label>
                <Select
                  value={request.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Waiting on Customer">
                      Waiting on Customer
                    </SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Öncelik */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  Öncelik
                </label>
                <Select
                  value={request.priority}
                  onValueChange={handlePriorityChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Tarih Bilgileri */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Calendar size={14} /> Oluşturulma
                  </span>
                  <span className="font-medium text-gray-900 text-xs">
                    {formatDate(request.createdAt).split(" ")[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Calendar size={14} /> Güncelleme
                  </span>
                  <span className="font-medium text-gray-900 text-xs">
                    {formatDate(request.updatedAt).split(" ")[0]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ekstra Bilgi Paneli (Etiketler vb.) */}
          <Card className="bg-blue-50/50 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Tag size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm">
                    Destek İpucu
                  </h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Bu talep <strong>{request.priority}</strong> önceliğinde.
                    {request.priority === "High" &&
                      " Lütfen SLA süresine dikkat edin!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
