import Link from 'next/link';
import { SupportRequest } from '@/types';
import { formatDate } from '@/utils/formatDate';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  requests: SupportRequest[];
  isLoading: boolean;
}

export default function RequestTable({ requests, isLoading }: Props) {
  if (isLoading) return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>;
  if (requests.length === 0) return <div className="p-8 text-center text-gray-500">Kayıt bulunamadı.</div>;

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Durum</TableHead>
            <TableHead>Öncelik</TableHead>
            <TableHead>Başlık</TableHead>
            <TableHead>Müşteri</TableHead>
            <TableHead>Oluşturulma</TableHead>
            <TableHead className="text-right">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              {/* Durum (Badge ile) */}
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`
                    ${req.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                      req.status === 'In Progress' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                      req.status === 'Waiting on Customer' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                      'bg-green-50 text-green-700 border-green-200'}
                  `}
                >
                  {req.status}
                </Badge>
              </TableCell>

              {/* Öncelik */}
              <TableCell className={`font-medium ${
                  req.priority === 'High' ? 'text-red-600' : 
                  req.priority === 'Medium' ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                {req.priority}
              </TableCell>

              {/* Başlık */}
              <TableCell>
                <div className="font-medium">{req.title}</div>
                <div className="text-xs text-gray-400">{req.id}</div>
              </TableCell>

              {/* Müşteri */}
              <TableCell>{req.customer}</TableCell>

              {/* Tarih */}
              <TableCell>{formatDate(req.createdAt)}</TableCell>

              {/* Buton */}
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/requests/${req.id}`}>Detay</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}