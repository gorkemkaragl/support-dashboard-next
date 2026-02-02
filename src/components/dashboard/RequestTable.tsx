import { SupportRequest } from "@/types";
import { formatDate } from "@/utils/formatDate";

interface Props {
  requests: SupportRequest[];
  isLoading: boolean;
}

export default function RequestTable({ requests, isLoading }: Props) {
  // Yükleniyor durumu
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">Veriler yükleniyor...</div>
    );
  }

  // Veri yok durumu
  if (requests.length === 0) {
    return (
      <div className="p-8 text-center border rounded-lg bg-gray-50">
        <p className="text-gray-500">Henüz hiç destek talebi yok.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table className="w-full text-sm text-left text-gray-600">
        {/* Tablo Başlıkları */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3">Başlık</th>
            <th className="px-6 py-3">Müşteri</th>
            <th className="px-6 py-3">Durum</th>
            <th className="px-6 py-3">Öncelik</th>
            <th className="px-6 py-3">Oluşturulma</th>
            <th className="px-6 py-3">{/* İşlemler kolonu boş başlık */}</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr
              key={req.id}
              className="bg-white border-b hover:bg-gray-50 transition-colors"
            >
              {/* Başlık ve ID */}
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{req.title}</div>
                <div className="text-xs text-gray-400">{req.id}</div>
              </td>

              {/* Müşteri */}
              <td className="px-6 py-4">{req.customer}</td>

              {/* Durum (Status) */}
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border
                ${
                  req.status === "New"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : req.status === "In Progress"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : req.status === "Waiting on Customer"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : req.status === "Done"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
                >
                  {req.status}
                </span>
              </td>

              {/* Öncelik (Priority) */}
              <td className="px-6 py-4">
                <span
                  className={`font-semibold ${
                    req.priority === "High"
                      ? "text-red-600"
                      : req.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-gray-500"
                  }`}
                >
                  {req.priority}
                </span>
              </td>

              {/* Tarih (Bizim helper fonksiyonu kullanıyoruz) */}
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(req.createdAt)}
              </td>

              {/* Detay Butonu (Şimdilik işlevsiz) */}
              <td className="px-6 py-4 text-right">
                <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                  Detay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
