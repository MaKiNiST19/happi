/**
 * Happi - Keşfet Bölümü Makaleleri
 * 
 * Hamilelik, bebek bakımı, gelişim ve beslenme konularında
 * detaylı makaleler. İleride CMS veya veritabanına taşınabilir.
 */

import { Article } from "../types";

export const articles: Article[] = [
  {
    id: "wonder-weeks",
    title: "Atak Haftaları (Wonder Weeks) Rehberi",
    summary: "Bebeğinizin zihinsel gelişim sıçramalarını anlamak için kapsamlı rehber.",
    content: `Atak haftaları, bebeklerin zihinsel gelişiminde yaşanan büyük sıçrama dönemleridir. Bu dönemlerde bebekler yeni beceriler kazanırken huzursuz olabilirler.

## Atak Haftaları Nedir?

Hollandalı araştırmacılar Dr. Hetty van de Rijt ve Dr. Frans Plooij tarafından keşfedilen atak haftaları, bebeklerin doğumdan sonraki ilk 20 ayda yaşadığı 10 zihinsel gelişim sıçramasını tanımlar.

## 10 Atak Haftası

1. **5. Hafta** - Değişen Duyular
2. **8. Hafta** - Kalıplar
3. **12. Hafta** - Yumuşak Geçişler
4. **19. Hafta** - Olaylar
5. **26. Hafta** - İlişkiler
6. **37. Hafta** - Kategoriler
7. **46. Hafta** - Diziler
8. **55. Hafta** - Programlar
9. **64. Hafta** - İlkeler
10. **75. Hafta** - Sistemler

## Atak Döneminde Ne Yapmalı?

- Ekstra sabırlı olun
- Fiziksel yakınlık sağlayın
- Rutinlere sadık kalın
- Yeni becerileri destekleyin`,
    category: "wonder-weeks",
    emoji: "⚡",
    readTime: 8,
    tags: ["atak haftaları", "bebek gelişimi", "wonder weeks", "zihinsel gelişim"]
  },
  {
    id: "teething-guide",
    title: "Diş Çıkarma Süreci ve Öneriler",
    summary: "Bebeğinizin diş çıkarma sürecini rahat atlatması için bilmeniz gereken her şey.",
    content: `Diş çıkarma, bebeklerin yaklaşık 6. aydan itibaren yaşadığı doğal bir süreçtir. Bu dönemde bebekler huzursuz olabilir ve çeşitli belirtiler gösterebilir.

## Ne Zaman Başlar?

Çoğu bebekte diş çıkarma 4-7 ay arasında başlar. İlk çıkan dişler genellikle alt ön kesici dişlerdir.

## Diş Çıkarma Belirtileri

- Aşırı salya akması
- Huzursuzluk ve ağlama
- Dişetlerinde şişlik ve kızarıklık
- Isırma isteği
- Uyku düzeninde bozulma
- Hafif ateş (38°C altında)

## Rahatlatma Yöntemleri

1. **Soğuk diş kaşıyıcılar** - Buzdolabında soğutulmuş (dondurulmuş değil)
2. **Dişeti masajı** - Temiz parmakla hafifçe
3. **Serin yiyecekler** - Soğuk meyve püresi
4. **Dikkat dağıtma** - Oyun ve aktiviteler

## Diş Bakımı Ne Zaman Başlamalı?

İlk diş çıktığı andan itibaren! Yumuşak bir bebek diş fırçası ve çok az miktarda florürlü diş macunu kullanın.`,
    category: "teething",
    emoji: "🦷",
    readTime: 6,
    tags: ["diş çıkarma", "bebek bakımı", "diş sağlığı"]
  },
  {
    id: "solid-foods",
    title: "Katı Gıdaya Geçiş Rehberi (BLW & Geleneksel)",
    summary: "6. aydan itibaren ek gıdaya geçiş için adım adım rehber.",
    content: `Katı gıdaya geçiş, bebeğinizin beslenmesinde önemli bir dönüm noktasıdır. DSÖ, ilk 6 ay sadece anne sütü, ardından ek gıdayla birlikte emzirmeyi 2 yaşına kadar sürdürmeyi önerir.

## Hazır Olma Belirtileri

- Desteksiz veya az destekle oturabilme
- Baş kontrolü sağlama
- Yiyeceklere ilgi gösterme
- Dil itme refleksinin azalması

## İki Yaklaşım

### Geleneksel Yöntem (Kaşıkla Besleme)
- Püreler ve ezilmiş gıdalarla başlanır
- Kıvam yavaş yavaş artırılır

### BLW (Baby-Led Weaning)
- Bebek kendi eliyle yer
- Parmak yiyecekler sunulur
- Bebek kendi hızında keşfeder

## İlk Gıdalar

1. Tek bileşenli sebze püreleri (havuç, kabak, patates)
2. Meyve püreleri (elma, armut, muz)
3. Tahıllar (pirinç, yulaf)
4. Protein kaynakları (et, tavuk, mercimek)

## Dikkat Edilmesi Gerekenler

- Her yeni gıdayı 3-5 gün arayla tanıtın
- Alerjik reaksiyonları gözleyin
- Bal 1 yaşından önce verilmemelidir
- Tuz ve şeker eklemeyin`,
    category: "solid-foods",
    emoji: "🥄",
    readTime: 10,
    tags: ["ek gıda", "BLW", "bebek beslenmesi", "katı gıda"]
  },
  {
    id: "sleep-training",
    title: "Bebek Uyku Düzeni ve Eğitimi",
    summary: "Sağlıklı uyku alışkanlıkları oluşturmak için yaşa göre rehber.",
    content: `Uyku, bebeğinizin fiziksel ve zihinsel gelişimi için kritik öneme sahiptir. Her yaş grubunun farklı uyku ihtiyaçları vardır.

## Yaşa Göre Uyku İhtiyacı

| Yaş | Toplam Uyku | Gece | Gündüz |
|-----|-------------|------|--------|
| 0-3 ay | 14-17 saat | 8-9 saat | 7-9 saat |
| 4-6 ay | 12-15 saat | 10-11 saat | 3-4 saat |
| 7-12 ay | 12-14 saat | 10-12 saat | 2-3 saat |
| 1-2 yaş | 11-14 saat | 10-12 saat | 1-3 saat |
| 2-3 yaş | 10-13 saat | 10-12 saat | 1-2 saat |

## Uyku Rutini Oluşturma

1. Her gün aynı saatte yatırın
2. Sakinleştirici bir rutin oluşturun (banyo → kitap → ninni)
3. Karanlık ve sessiz bir ortam sağlayın
4. Beyaz gürültü kullanabilirsiniz

## Uyku Eğitimi Yöntemleri

- **Gradual Retreat** - Yavaş yavaş uzaklaşma
- **Pick Up/Put Down** - Kaldır/Bırak yöntemi
- **Ferber Metodu** - Kontrollü ağlatma
- **Chair Method** - Sandalye yöntemi

Her bebek farklıdır. Ailenize en uygun yöntemi seçin.`,
    category: "sleep-training",
    emoji: "😴",
    readTime: 7,
    tags: ["uyku eğitimi", "bebek uykusu", "uyku düzeni"]
  },
  {
    id: "pregnancy-nutrition",
    title: "Hamilelikte Beslenme Rehberi",
    summary: "Trimesterlere göre beslenme önerileri ve vitamin/mineral ihtiyaçları.",
    content: `Hamilelikte doğru beslenme, hem annenin hem de bebeğin sağlığı için hayati önem taşır.

## Trimesterlere Göre Beslenme

### 1. Trimester (1-12 hafta)
- Folik asit çok önemli (günde 400-800 mcg)
- Bulantı için küçük sık öğünler
- Demir açısından zengin gıdalar

### 2. Trimester (13-26 hafta)
- Kalori ihtiyacı günde 300 kcal artar
- Kalsiyum ve D vitamini önemli
- Protein ihtiyacı artar

### 3. Trimester (27-40 hafta)
- Omega-3 yağ asitleri (DHA) beyin gelişimi için
- Demir ihtiyacı en yüksek seviyede
- Lif alımına dikkat (kabızlık önleme)

## Kaçınılması Gereken Gıdalar

- Çiğ et ve balık (suşi dahil)
- Pastörize edilmemiş süt ürünleri
- Yüksek cıvalı balıklar
- Alkol
- Aşırı kafein (günde 200mg'dan fazla)

## Önerilen Takviyeler

1. Folik asit
2. Demir
3. Kalsiyum
4. D Vitamini
5. DHA (Omega-3)`,
    category: "pregnancy",
    emoji: "🥗",
    readTime: 8,
    tags: ["hamilelik", "beslenme", "vitamin", "mineral"]
  },
  {
    id: "baby-milestones",
    title: "Bebek Gelişim Kilometre Taşları",
    summary: "0-3 yaş arası motor, bilişsel ve sosyal gelişim adımları.",
    content: `Her bebeğin gelişim hızı farklıdır, ancak genel kilometre taşları gelişimi takip etmek için rehber niteliğindedir.

## Motor Gelişim

### 0-6 Ay
- Başını tutma (2-4 ay)
- Dönme (4-6 ay)
- Nesneleri kavrama (3-5 ay)
- Destekle oturma (4-6 ay)

### 6-12 Ay
- Desteksiz oturma (6-8 ay)
- Emekleme (7-10 ay)
- Tutunarak ayağa kalkma (8-10 ay)
- İlk adımlar (9-12 ay)

### 12-24 Ay
- Yürüme (12-15 ay)
- Koşma (18-24 ay)
- Merdiven çıkma (18-24 ay)

### 24-36 Ay
- Zıplama
- Tek ayak üzerinde durma
- Üç tekerlekli bisiklete binme

## Dil Gelişimi

- **2 ay**: Agu sesleri
- **6 ay**: Babırdama (ba-ba, da-da)
- **12 ay**: İlk kelimeler
- **18 ay**: 50+ kelime
- **24 ay**: 2 kelimelik cümleler
- **36 ay**: Basit hikayeler anlatma

## Dikkat!

Bu zamanlamalar ortalamadır. Her bebek kendi hızında gelişir. Endişelerinizi pediatristinizle paylaşın.`,
    category: "development",
    emoji: "📊",
    readTime: 9,
    tags: ["gelişim", "kilometre taşları", "motor gelişim", "dil gelişimi"]
  },
  {
    id: "postpartum-health",
    title: "Doğum Sonrası Anne Sağlığı",
    summary: "Lohusalık dönemi, emzirme ve anne ruh sağlığı hakkında bilgiler.",
    content: `Doğum sonrası dönem (lohusalık), annenin hem fiziksel hem de duygusal olarak iyileşme sürecidir.

## Fiziksel İyileşme

### Normal Doğum Sonrası
- Loşi (kanama) 4-6 hafta sürebilir
- Perine bölgesi iyileşmesi
- Rahim eski boyutuna dönme (6 hafta)

### Sezaryen Sonrası
- Ameliyat izi bakımı
- 6-8 hafta ağır kaldırma yasağı
- Yara enfeksiyonu belirtilerine dikkat

## Emzirme

- İlk saat içinde emzirmeyi deneyin
- Günde 8-12 kez emzirme normal
- Doğru tutma pozisyonunu öğrenin
- Emzirme danışmanından destek alın

## Anne Ruh Sağlığı

### Baby Blues (Doğum Sonrası Hüzün)
- İlk 2 haftada yaygın
- Ağlama, kaygı, ruh hali değişimleri
- Genellikle kendiliğinden geçer

### Postpartum Depresyon
- 2 haftadan uzun sürerse profesyonel yardım alın
- Belirtiler: aşırı üzüntü, ilgisizlik, uykusuzluk
- Tedavi edilebilir bir durumdur

**Yardım istemekten çekinmeyin. Güçlü olmak yardım istemektir.** 💪`,
    category: "health",
    emoji: "❤️‍🩹",
    readTime: 7,
    tags: ["doğum sonrası", "lohusalık", "emzirme", "ruh sağlığı"]
  },
  {
    id: "vaccination-schedule",
    title: "Aşı Takvimi (0-3 Yaş)",
    summary: "Türkiye'deki çocukluk çağı aşı takvimi ve önemli bilgiler.",
    content: `Aşılar, bebeğinizi ciddi hastalıklardan korumanın en etkili yoludur. Türkiye'deki ulusal aşı takvimini takip edin.

## Aşı Takvimi

### Doğumda
- Hepatit B (1. doz)
- BCG (verem aşısı)

### 1. Ay
- Hepatit B (2. doz)

### 2. Ay
- DaBT-İPA-Hib (1. doz)
- KPA (1. doz)
- OPA (1. doz)

### 4. Ay
- DaBT-İPA-Hib (2. doz)
- KPA (2. doz)
- OPA (2. doz)

### 6. Ay
- DaBT-İPA-Hib (3. doz)
- KPA (3. doz)
- OPA (3. doz)
- Hepatit B (3. doz)

### 12. Ay
- KKK (1. doz)
- KPA (rapel)
- Suçiçeği (1. doz)
- Hepatit A (1. doz)

### 18. Ay
- DaBT-İPA-Hib (rapel)
- OPA (rapel)
- Hepatit A (2. doz)

## Aşı Sonrası

- Hafif ateş ve huzursuzluk normal
- Enjeksiyon yerinde kızarıklık olabilir
- Ciddi reaksiyonlarda doktora başvurun

**Aşılarınızı zamanında yaptırın!** 💉`,
    category: "health",
    emoji: "💉",
    readTime: 5,
    tags: ["aşı", "aşı takvimi", "bebek sağlığı"]
  }
];
