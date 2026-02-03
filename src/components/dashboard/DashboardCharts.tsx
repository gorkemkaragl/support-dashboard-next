"use client";

import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { SupportRequest } from '@/types';

interface Props {
  requests: SupportRequest[];
}

export default function DashboardCharts({ requests }: Props) {
  
  // --- VERİ HESAPLAMALARI ---
  const chartData = useMemo(() => {
    // Durum Sayıları (Pasta Grafik İçin)
    const statusCounts = { 'New': 0, 'In Progress': 0, 'Waiting on Customer': 0, 'Done': 0 };
    // Öncelik Sayıları (Bar Grafik İçin)
    const priorityCounts = { 'High': 0, 'Medium': 0, 'Low': 0 };
    // Tarih Sayıları (Çizgi Grafik İçin)
    const dateCounts: Record<string, number> = {};

    requests.forEach(req => {
      // Durum say
      if (statusCounts[req.status] !== undefined) statusCounts[req.status]++;
      
      // Öncelik say
      if (priorityCounts[req.priority] !== undefined) priorityCounts[req.priority]++;

      // Tarih say (Sadece gün kısmını al: YYYY-MM-DD)
      const dateKey = new Date(req.createdAt).toLocaleDateString('tr-TR'); 
      dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
    });

    // Çizgi grafik için tarihleri sırala
    const sortedDates = Object.keys(dateCounts).sort((a, b) => {
        // Tarih stringlerini karşılaştırmak için basit bir dönüşüm
        const partsA = a.split('.').reverse().join('-');
        const partsB = b.split('.').reverse().join('-');
        return new Date(partsA).getTime() - new Date(partsB).getTime();
    });

    return {
      status: [
        { name: 'New', y: statusCounts['New'], color: '#3b82f6' },   
        { name: 'In Progress', y: statusCounts['In Progress'], color: '#a855f7' }, 
        { name: 'Waiting', y: statusCounts['Waiting on Customer'], color: '#f97316' }, 
        { name: 'Done', y: statusCounts['Done'], color: '#22c55e' }     
      ],
      priority: [
        priorityCounts['High'], 
        priorityCounts['Medium'], 
        priorityCounts['Low']
      ],
      timeline: {
        categories: sortedDates,
        data: sortedDates.map(date => dateCounts[date])
      }
    };
  }, [requests]);


  // --- GRAFİK AYARLARI (OPTIONS) ---

  // PASTA GRAFİĞİ (Durumlar)
  const pieOptions: Highcharts.Options = {
    chart: { type: 'pie', height: 250, backgroundColor: 'transparent' },
    title: { text: 'Durum Dağılımı', style: { fontSize: '14px' } },
    plotOptions: {
      pie: {
        innerSize: '60%', // Ortası boş olsun 
        dataLabels: { enabled: false },
        showInLegend: true
      }
    },
    series: [{ type: 'pie', name: 'Talepler', data: chartData.status }],
    credits: { enabled: false }
  };

  // ÇUBUK GRAFİĞİ (Öncelikler)
  const barOptions: Highcharts.Options = {
    chart: { type: 'bar', height: 250, backgroundColor: 'transparent' },
    title: { text: 'Öncelik Seviyeleri', style: { fontSize: '14px' } },
    xAxis: { categories: ['Yüksek', 'Orta', 'Düşük'] },
    yAxis: { title: { text: "Talep Sayısı" }, allowDecimals: false },
    plotOptions: { bar: { colorByPoint: true } },
    colors: ['#ef4444', '#eab308', '#3b82f6'], // Kırmızı, Sarı, Mavi
    series: [{ type: 'bar', name: 'Adet', data: chartData.priority, showInLegend: false }],
    credits: { enabled: false }
  };

  // 3. ALAN GRAFİĞİ (Zaman Çizelges)
  const areaOptions: Highcharts.Options = {
    chart: { type: 'areaspline', height: 250, backgroundColor: 'transparent' },
    title: { text: 'Günlük Talep Girişi', style: { fontSize: '14px' } },
    xAxis: { categories: chartData.timeline.categories },
    yAxis: { title: { text: "Talep Sayısı" }, allowDecimals: false },
    plotOptions: { areaspline: { fillOpacity: 0.3 } },
    series: [{ type: 'areaspline', name: 'Yeni Talep', data: chartData.timeline.data, color: '#6366f1' }],
    credits: { enabled: false }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Kart 1: Durumlar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={pieOptions} />
      </div>

      {/* Kart 2: Öncelikler */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={barOptions} />
      </div>

      {/* Kart 3: Zaman Çizelgesi */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={areaOptions} />
      </div>
    </div>
  );
}