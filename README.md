# Support Queue Dashboard

Bu proje, bir **Frontend Case Study** kapsamında geliştirilmiş; destek taleplerini izlemeyi, filtrelemeyi ve yönetmeyi sağlayan modern bir web uygulamasıdır.

Orijinal vaka analizinde Vue.js istenmiş olsa da, bu proje **öğrenme ve pratik yapma amacıyla Next.js (App Router) ve TypeScript** kullanılarak geliştirilmiştir.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_16_|_TypeScript_|_Tailwind-blue)

## 🚀 Özellikler

Uygulama aşağıdaki temel gereksinimleri ve fazlasını karşılamaktadır:

* **📋 İstek Listesi:** Tüm destek taleplerini tablo görünümünde listeleme.
* **🔍 Gelişmiş Filtreleme:** Başlık/Müşteri arama ve Duruma (Status) göre filtreleme.
* **⚠️ Needs Attention (İlgi Bekleyenler):** Özel bir algoritma ile acil müdahale gerektiren kayıtları (Eski tarihli, yüksek öncelikli ve hareketsiz) tespit etme.
* **📊 Görsel Özet:** Highcharts kullanılarak hazırlanan 3 farklı grafik (Durum, Öncelik, Zaman Çizelgesi).
* **✏️ Detay ve Güncelleme:** Taleplerin detayını görüntüleme, Durum ve Öncelik bilgilerini değiştirme.
* **💾 Veri Kalıcılığı (Persistence):** Yapılan değişiklikler `localStorage` üzerinde saklanır, sayfa yenilendiğinde kaybolmaz.
* **📥 CSV Export:** Filtrelenmiş listeyi Excel/CSV formatında indirme.

## 🛠️ Kullanılan Teknolojiler

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Dil:** [TypeScript](https://www.typescriptlang.org/) (Tip güvenliği için)
* **Stil:** [Tailwind CSS](https://tailwindcss.com/) (Hızlı ve responsive tasarım)
* **Grafik:** [Highcharts](https://www.highcharts.com/) & `highcharts-react-official`
* **State Yönetimi:** React Context API + Custom Hooks
* **Veri:** Mock Data + LocalStorage Simulation

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu klonlayın (veya indirin):**
    ```bash
    git clone [https://github.com/kullaniciadi/support-dashboard.git](https://github.com/kullaniciadi/support-dashboard.git)
    cd support-dashboard
    ```

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm run dev
    ```

4.  Tarayıcınızda `http://localhost:3000` adresine gidin.

## 📂 Proje Yapısı ve Kararlar

Proje, **Clean Architecture** prensiplerine sadık kalarak, mantık (Logic) ve görünümü (UI) ayıracak şekilde yapılandırılmıştır.

### 💡 Önemli Kararlar (Decisions)

1.  **Custom Hooks Kullanımı:** Filtreleme, arama ve sıralama mantığı `components` içine gömülmek yerine `hooks/useRequestFilter` içine taşındı. Bu sayede UI bileşenleri sadeleşti ve mantık test edilebilir hale geldi.
2.  **Veri Bütünlüğü (Data Integrity):** Case Study gereği, orijinal veri asla mutasyona uğratılmadı. `useMemo` kullanılarak orijinal listenin bir kopyası üzerinde filtreleme yapıldı.
3.  **Needs Attention Algoritması:** "7 günden eski" ve "3 gündür hareketsiz" gibi kurallar `utils/needsAttention.ts` içinde saf bir fonksiyon olarak yazıldı. Bu, mantığın başka sayfalarda da tekrar kullanılabilmesini sağladı.

## 🔮 Geliştirme Önerileri (Future Improvements)

Ekstra zamanım olsaydı şunları eklerdim:

* **Unit Tests:** Özellikle `needsAttention` ve filtreleme mantığı için Jest ile testler yazmak.
* **Backend Entegrasyonu:** Mock data yerine gerçek bir API ve veritabanı (PostgreSQL + Prisma) bağlamak.
* **Yorum Özelliği:** Detay sayfasında kullanıcıların metin yorumu ekleyebileceği bir alan oluşturmak.
* **Pagination:** Liste çok uzadığında sayfalama sistemi eklemek.
