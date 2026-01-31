"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportRequest } from '@/types';
import { initialRequests } from '@/data/mockData';

// Context'in içinde ne tür veriler/fonksiyonlar olacağını tanımlıyoruz
interface RequestContextType {
  requests: SupportRequest[]; // İsteklerin listesi
  isLoading: boolean;         // Veri yükleniyor mu?
}

// Boş bir context oluşturuyoruz
const RequestContext = createContext<RequestContextType | undefined>(undefined);

// Provider: Veriyi tüm uygulamaya sağlayan kapsayıcı bileşen
export const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Uygulama ilk açıldığında çalışır (Mount anı)
  useEffect(() => {
    // 1. Önce tarayıcının hafızasına (localStorage) bak
    const storedData = localStorage.getItem('support_requests');
    
    if (storedData) {
      // Hafızada veri varsa onu kullan (JSON'dan çevir)
      setRequests(JSON.parse(storedData));
    } else {
      // Hafıza boşsa (ilk kez giriliyorsa), bizim mock veriyi yükle
      setRequests(initialRequests);
    }
    
    // Yükleme işlemi bitti
    setIsLoading(false);
  }, []);

  // "requests" değişkeni her değiştiğinde (yeni kayıt, güncelleme vb.), bunu hafızaya kaydet
  useEffect(() => {
    if (!isLoading && requests.length > 0) {
      localStorage.setItem('support_requests', JSON.stringify(requests));
    }
  }, [requests, isLoading]);

  return (
    <RequestContext.Provider value={{ requests, isLoading }}>
      {children}
    </RequestContext.Provider>
  );
};

// Başka dosyalarda veriyi kolayca çekmek için kullanacağımız (Hook)
export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};