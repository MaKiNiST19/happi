/**
 * Happi - Haftalık Hamilelik Verileri
 * 
 * Hamileliğin 1. haftasından 42. haftaya kadar haftalık bilgiler.
 * İleride veritabanına taşınacak statik veri kaynağı.
 */

import { WeekInfo } from "../types";

export const pregnancyWeeks: WeekInfo[] = [
  {
    week: 1,
    period: "pregnancy",
    title: "Yolculuk Başlıyor",
    summary: "Son adet tarihiniz. Vücudunuz yeni bir hayata hazırlanıyor.",
    emoji: "🌱",
    details: [
      "Son adet döneminizin ilk günü, hamileliğin resmi başlangıcı sayılır.",
      "Vücut yeni bir döngüye hazırlanmaya başlar.",
      "Folik asit takviyesi almaya şimdiden başlayabilirsiniz."
    ],
    tips: [
      "Folik asit takviyesi almaya başlayın",
      "Sağlıklı beslenme alışkanlıkları edinin",
      "Düzenli uyku rutini oluşturun"
    ]
  },
  {
    week: 2,
    period: "pregnancy",
    title: "Yumurtlama Dönemi",
    summary: "Yumurtlama gerçekleşiyor, döllenme bu hafta olabilir.",
    emoji: "✨",
    details: [
      "Yumurtalıktan yumurta salınır.",
      "Döllenme genellikle bu hafta gerçekleşir.",
      "Sperm ve yumurta tüp içinde buluşur."
    ],
    tips: [
      "Stresten uzak durmaya çalışın",
      "Bol su için",
      "Kafein tüketimini azaltın"
    ]
  },
  {
    week: 3,
    period: "pregnancy",
    title: "Döllenme",
    summary: "Zigot oluştu! Hücre bölünmesi başladı.",
    emoji: "🔬",
    details: [
      "Döllenmiş yumurta (zigot) hızla bölünmeye başlar.",
      "Rahme doğru yolculuğa çıkar.",
      "Bebeğin tüm genetik yapısı bu anda belirlenir."
    ],
    tips: [
      "Alkol ve sigaradan uzak durun",
      "Dengeli beslenmeye devam edin",
      "Doktorunuzla iletişime geçin"
    ]
  },
  {
    week: 4,
    period: "pregnancy",
    title: "İmplantasyon",
    summary: "Embriyo rahme yerleşiyor. İlk belirtiler başlayabilir.",
    emoji: "🏠",
    details: [
      "Blastosist rahim duvarına yerleşir (implantasyon).",
      "hCG hormonu üretilmeye başlar.",
      "Hamilelik testi pozitif çıkabilir."
    ],
    tips: [
      "Hamilelik testi yapabilirsiniz",
      "Doktorunuzdan randevu alın",
      "Prenatal vitamin almaya başlayın"
    ]
  },
  {
    week: 5,
    period: "pregnancy",
    title: "Kalp Atışı Başlıyor",
    summary: "Bebeğin kalbi atmaya başlıyor! Boyut: Susam tanesi kadar.",
    emoji: "💓",
    details: [
      "Embriyonun kalbi atmaya başlar.",
      "Sinir sistemi gelişmeye başlar.",
      "Boyut yaklaşık 2mm."
    ],
    babySize: "Susam tanesi",
    tips: [
      "Bulantıyla başa çıkmak için zencefil çayı deneyin",
      "Küçük ve sık öğünler yiyin",
      "Yorgunluk normaldir, dinlenin"
    ]
  },
  {
    week: 6,
    period: "pregnancy",
    title: "Yüz Şekilleniyor",
    summary: "Göz, burun ve ağız oluşmaya başlıyor.",
    emoji: "👶",
    details: [
      "Yüz hatları belirginleşmeye başlar.",
      "Kol ve bacak tomurcukları görülür.",
      "Boyut yaklaşık mercimek büyüklüğünde."
    ],
    babySize: "Mercimek",
    tips: [
      "İlk ultrason randevunuzu planlayın",
      "Hamilelik belirtileri yoğunlaşabilir",
      "Bol bol dinlenin"
    ]
  },
  {
    week: 7,
    period: "pregnancy",
    title: "Beyin Gelişimi",
    summary: "Beyin hızla büyüyor. El ve ayak parmakları beliriyor.",
    emoji: "🧠",
    details: [
      "Beyin her dakika 100 yeni hücre üretir.",
      "El ve ayak parmakları oluşmaya başlar.",
      "Boyut yaklaşık yaban mersini büyüklüğünde."
    ],
    babySize: "Yaban mersini",
    tips: [
      "Omega-3 yağ asitleri beyin gelişimi için önemli",
      "Düzenli yürüyüş yapın",
      "Bolca su için"
    ]
  },
  {
    week: 8,
    period: "pregnancy",
    title: "Hareket Başlıyor",
    summary: "Bebek refleks hareketler yapıyor. Boyut: Ahududu kadar.",
    emoji: "🫐",
    details: [
      "Bebek ilk refleks hareketlerini yapar.",
      "Tüm temel organlar oluşmuştur.",
      "Boyut yaklaşık 1.6cm."
    ],
    babySize: "Ahududu",
    tips: [
      "İlk trimester taramalarını planlayın",
      "Hamilelik kıyafetlerine geçiş düşünün",
      "Diş sağlığınıza özen gösterin"
    ]
  },
  {
    week: 9,
    period: "pregnancy",
    title: "Embriyo'dan Fetüs'e",
    summary: "Artık 'fetüs' olarak adlandırılıyor. Yüz hatları belirginleşiyor.",
    emoji: "🫒",
    details: [
      "Embriyonik dönem sona erer, fetal dönem başlar.",
      "Parmaklar ve tırnaklar oluşur.",
      "Boyut yaklaşık üzüm büyüklüğünde."
    ],
    babySize: "Üzüm",
    tips: [
      "Demir açısından zengin gıdalar tüketin",
      "Hamilelik yogası deneyebilirsiniz",
      "Bol uyuyun"
    ]
  },
  {
    week: 10,
    period: "pregnancy",
    title: "Parmaklar ve Tırnaklar",
    summary: "El ve ayak parmakları tamamen ayrıştı!",
    emoji: "🖐️",
    details: [
      "Parmaklar arasındaki perdeler kaybolur.",
      "Diş tomurcukları oluşur.",
      "Boyut yaklaşık 3cm."
    ],
    babySize: "Kiraz domates",
    tips: [
      "Protein alımınıza dikkat edin",
      "Stresten uzak durun",
      "İlk trimester neredeyse bitiyor!"
    ]
  },
  {
    week: 11,
    period: "pregnancy",
    title: "Büyüme Hızlanıyor",
    summary: "Bebek hızla büyüyor. Baş gövdenin yarısı kadar.",
    emoji: "📏",
    details: [
      "Kemikler sertleşmeye başlar.",
      "Saç kökleri oluşur.",
      "Boyut yaklaşık incir büyüklüğünde."
    ],
    babySize: "İncir",
    tips: [
      "Kalsiyum ihtiyacınız artıyor",
      "Düzenli doktor kontrollerine devam edin",
      "Gebelik diyabeti taraması hakkında bilgi alın"
    ]
  },
  {
    week: 12,
    period: "pregnancy",
    title: "İlk Trimester Sonu",
    summary: "Kritik dönem tamamlanıyor. Düşük riski azalıyor.",
    emoji: "🎉",
    details: [
      "Tüm organlar oluşmuştur ve olgunlaşmaya devam eder.",
      "Refleksler gelişir - bebek yutkunabilir.",
      "Boyut yaklaşık limon büyüklüğünde."
    ],
    babySize: "Limon",
    tips: [
      "İlk trimester taraması bu hafta yapılabilir",
      "Müjdeyi paylaşmaya hazır olabilirsiniz",
      "İkinci trimesterde enerji artışı bekleyebilirsiniz"
    ]
  },
  {
    week: 13,
    period: "pregnancy",
    title: "İkinci Trimester Başlangıcı",
    summary: "Altın dönem başlıyor! Bulantı azalabilir.",
    emoji: "☀️",
    details: [
      "Parmak izleri oluşmaya başlar.",
      "Vokal kordlar gelişir.",
      "Boyut yaklaşık bezelye kabuğu büyüklüğünde."
    ],
    babySize: "Şeftali",
    tips: [
      "Enerji seviyeniz artacak",
      "Egzersize başlamak için iyi bir zaman",
      "Hamilelik sırt ağrılarına karşı duruşunuza dikkat edin"
    ]
  },
  {
    week: 14,
    period: "pregnancy",
    title: "Yüz İfadeleri",
    summary: "Bebek kaşlarını çatıp gülümseyebiliyor!",
    emoji: "😊",
    details: [
      "Yüz kasları gelişir ve ifade yapabilir.",
      "Böbrekler idrar üretmeye başlar.",
      "Boyut yaklaşık 8.5cm."
    ],
    babySize: "Nektarin",
    tips: [
      "Bel ve karın desteği için hamilelik yastığı düşünün",
      "Cilt bakımınıza özen gösterin",
      "Bol C vitamini alın"
    ]
  },
  {
    week: 15,
    period: "pregnancy",
    title: "Duyular Gelişiyor",
    summary: "Bebek ışığa tepki verebiliyor.",
    emoji: "👁️",
    details: [
      "Gözler hâlâ kapalı ama ışığa tepki verir.",
      "Tat alma duyusu gelişir.",
      "Boyut yaklaşık elma büyüklüğünde."
    ],
    babySize: "Elma",
    tips: [
      "Amniyosentez bu dönemde yapılabilir",
      "Hafif egzersizlere devam edin",
      "Dengeli beslenmeyi sürdürün"
    ]
  },
  {
    week: 16,
    period: "pregnancy",
    title: "İlk Hareketler Hissedilebilir",
    summary: "Bebeğin ilk tekme atışını hissedebilirsiniz!",
    emoji: "🦶",
    details: [
      "Anne bebeğin hareketini hafifçe hissedebilir (kanat çırpma hissi).",
      "Bebek emme refleksi geliştirir.",
      "Boyut yaklaşık avokado büyüklüğünde."
    ],
    babySize: "Avokado",
    tips: [
      "Bebek hareketlerini takip etmeye başlayın",
      "Düzenli su içmeyi unutmayın",
      "Uyku pozisyonunuzu sol yana çevirmeye başlayın"
    ]
  },
  {
    week: 17,
    period: "pregnancy",
    title: "Yağ Tabakası",
    summary: "Bebek yağ biriktirmeye başlıyor. Kordon güçleniyor.",
    emoji: "🧈",
    details: [
      "Cilt altı yağ dokusu oluşmaya başlar.",
      "Göbek kordonu kalınlaşır ve güçlenir.",
      "Boyut yaklaşık nar büyüklüğünde."
    ],
    babySize: "Nar",
    tips: [
      "Vücudunuzdaki değişimlere hazır olun",
      "Hamilelik çatlak kremleri kullanabilirsiniz",
      "Rahat giysiler tercih edin"
    ]
  },
  {
    week: 18,
    period: "pregnancy",
    title: "Cinsiyet Belirlenebilir",
    summary: "Ultrasonla cinsiyeti öğrenebilirsiniz!",
    emoji: "🔮",
    details: [
      "Cinsiyet ultrasonla belirlenebilir.",
      "Bebek sesler duymaya başlar.",
      "Boyut yaklaşık tatlı patates büyüklüğünde."
    ],
    babySize: "Tatlı patates",
    tips: [
      "Detaylı ultrason randevunuzu planlayın",
      "Bebeğe sesli kitap okumaya başlayabilirsiniz",
      "Rahatlatıcı müzik dinleyin"
    ]
  },
  {
    week: 19,
    period: "pregnancy",
    title: "Beş Duyu Gelişiyor",
    summary: "Tüm duyular hızla gelişiyor.",
    emoji: "👂",
    details: [
      "İşitme duyusu gelişir - annenin sesini tanır.",
      "Verniks (koruyucu tabaka) oluşur.",
      "Boyut yaklaşık mango büyüklüğünde."
    ],
    babySize: "Mango",
    tips: [
      "Bebeğinizle konuşun, sesinizi tanıyacak",
      "Doğum hazırlık kursları hakkında araştırma yapın",
      "Hamilelik yogası faydalı olabilir"
    ]
  },
  {
    week: 20,
    period: "pregnancy",
    title: "Yarı Yoldayız! 🎊",
    summary: "Hamileliğin tam ortasındasınız! Bebek 25cm boyunda.",
    emoji: "🎊",
    details: [
      "Hamileliğin yarısı tamamlandı!",
      "Bebek yaklaşık 25cm boyunda.",
      "Detaylı anatomi taraması bu hafta yapılır."
    ],
    babySize: "Muz",
    tips: [
      "20. hafta detaylı ultrason zamanı",
      "Bebek odası planlamaya başlayabilirsiniz",
      "Doğum planınızı düşünmeye başlayın"
    ]
  },
  {
    week: 21,
    period: "pregnancy",
    title: "Tat Alma",
    summary: "Bebek amniyotik sıvının tadını alıyor!",
    emoji: "👅",
    details: [
      "Tat tomurcukları tam olarak gelişir.",
      "Bebek yutma ve emme pratiği yapar.",
      "Hareketler artık daha belirgin hissedilir."
    ],
    babySize: "Havuç",
    tips: [
      "Farklı tatlar deneyerek bebeğin tat deneyimini zenginleştirin",
      "Kegel egzersizlerine başlayın",
      "Ayak şişmesi başlayabilir, ayaklarınızı yükseğe kaldırın"
    ]
  },
  {
    week: 22,
    period: "pregnancy",
    title: "Dokunma Duyusu",
    summary: "Bebek yüzüne dokunuyor ve çevresini keşfediyor.",
    emoji: "🤚",
    details: [
      "Dokunma duyusu gelişir.",
      "Bebek göbek kordonuyla oynar.",
      "Göz kapakları ve kaşlar tam oluşur."
    ],
    babySize: "Papaya",
    tips: [
      "Karnınıza dokunarak bebeğinizle iletişim kurun",
      "Uyku düzeninize dikkat edin",
      "Demir takviyesi ihtiyacınızı doktorunuza sorun"
    ]
  },
  {
    week: 23,
    period: "pregnancy",
    title: "İşitme Güçleniyor",
    summary: "Bebek dış sesleri duyabiliyor. Müzik dinletin!",
    emoji: "🎵",
    details: [
      "İşitme tam olarak gelişir.",
      "Bebek annenin kalp atışını ve sesini duyar.",
      "Akciğerler olgunlaşmaya devam eder."
    ],
    babySize: "Greyfurt",
    tips: [
      "Bebeğe müzik dinletin",
      "Yüksek seslerden kaçının",
      "Baba da bebeğe seslenebilir"
    ]
  },
  {
    week: 24,
    period: "pregnancy",
    title: "Yaşam Şansı",
    summary: "Bebek artık dışarıda yaşayabilecek olgunluğa yaklaşıyor.",
    emoji: "💪",
    details: [
      "Akciğerler surfaktan üretmeye başlar.",
      "Prematüre doğsa yaşam şansı artar.",
      "İç kulak tamamen gelişir - denge duyusu oluşur."
    ],
    babySize: "Mısır koçanı",
    tips: [
      "Glukoz tarama testi yaptırın",
      "Doğum çantanızı hazırlamaya başlayın",
      "Bebek karyolası ve araba koltuğu araştırın"
    ]
  },
  {
    week: 25,
    period: "pregnancy",
    title: "Cilt Rengi Oluşuyor",
    summary: "Ciltte melanin üretimi başlıyor.",
    emoji: "🎨",
    details: [
      "Cilt kırışıklıkları yağ birikimi ile düzelmeye başlar.",
      "Saç rengi ve dokusu belirlenir.",
      "Boyut yaklaşık 35cm."
    ],
    babySize: "Karnabahar",
    tips: [
      "Sırt ağrıları artabilir - duruşunuza dikkat edin",
      "Pelvik taban egzersizlerine devam edin",
      "Preeklampsi belirtilerini öğrenin"
    ]
  },
  {
    week: 26,
    period: "pregnancy",
    title: "Gözler Açılıyor",
    summary: "Bebek ilk kez gözlerini açıyor!",
    emoji: "👀",
    details: [
      "Göz kapakları açılır ve bebek görmeye başlar.",
      "Beyin dalgaları işitsel ve görsel uyarılara tepki verir.",
      "Bebek nefes egzersizi yapar."
    ],
    babySize: "Kabak",
    tips: [
      "İstirahat molalarını artırın",
      "Doğum hazırlık kursuna başlayın",
      "Üçüncü trimester yaklaşıyor"
    ]
  },
  {
    week: 27,
    period: "pregnancy",
    title: "Rüya Görme",
    summary: "Bebek REM uykusuna giriyor ve rüya görüyor olabilir!",
    emoji: "💤",
    details: [
      "REM (hızlı göz hareketi) uykusu başlar.",
      "Beyin hızla gelişmeye devam eder.",
      "Bebek hıçkırık yapabilir."
    ],
    babySize: "Karnıbahar",
    tips: [
      "İkinci trimester sona eriyor",
      "Doğum planınızı gözden geçirin",
      "Hastane çantanızı hazırlayın"
    ]
  },
  {
    week: 28,
    period: "pregnancy",
    title: "Üçüncü Trimester!",
    summary: "Son trimester başlıyor. Bebek 1kg'ı geçti!",
    emoji: "🏃‍♀️",
    details: [
      "Üçüncü ve son trimester başlar.",
      "Bebek yaklaşık 1-1.1 kg ağırlığında.",
      "Göz kırpma refleksi gelişir."
    ],
    babySize: "Patlıcan",
    tips: [
      "Anti-D enjeksiyonu gerekebilir (Rh negatif ise)",
      "Doğum hazırlık kursuna devam edin",
      "Uyku pozisyonunuza dikkat edin"
    ]
  },
  {
    week: 29,
    period: "pregnancy",
    title: "Kemik Gelişimi",
    summary: "Kemikler güçleniyor ama hâlâ esnek. Kalsiyum önemli!",
    emoji: "🦴",
    details: [
      "Kemikler sertleşmeye devam eder.",
      "Beyin yüzey alanı büyür (kıvrımlar oluşur).",
      "Bebek 1.1-1.3 kg ağırlığında."
    ],
    babySize: "Balkabağı (küçük)",
    tips: [
      "Kalsiyum alımınızı artırın",
      "Bacak krampları yaşayabilirsiniz",
      "Doğum sonrası için hazırlık yapın"
    ]
  },
  {
    week: 30,
    period: "pregnancy",
    title: "Göz Takibi",
    summary: "Bebek gözlerini hareket eden ışığa doğru çevirebiliyor.",
    emoji: "🔦",
    details: [
      "Görme yeteneği gelişir.",
      "Beyin hızla büyür - baş çevresi artar.",
      "Bebek 1.3-1.5 kg ağırlığında."
    ],
    babySize: "Hindistan cevizi",
    tips: [
      "Nefes darlığı yaşayabilirsiniz - bu normal",
      "Doğum sancısının belirtilerini öğrenin",
      "Bebek eşyalarını hazırlamaya devam edin"
    ]
  },
  {
    week: 31,
    period: "pregnancy",
    title: "Beyin Patlaması",
    summary: "Beyin bağlantıları katlanarak artıyor.",
    emoji: "⚡",
    details: [
      "Beyin nöral bağlantıları hızla çoğalır.",
      "Beş duyu tam fonksiyonel hale gelir.",
      "Bebek 1.5-1.7 kg ağırlığında."
    ],
    babySize: "Ananas",
    tips: [
      "DHA içeren besinleri tüketin (balık, ceviz)",
      "Doğum planınızı doktorunuzla paylaşın",
      "Emzirme hakkında bilgi edinin"
    ]
  },
  {
    week: 32,
    period: "pregnancy",
    title: "Ters Dönüyor",
    summary: "Bebek baş aşağı pozisyona geçiyor.",
    emoji: "🔄",
    details: [
      "Çoğu bebek baş aşağı pozisyona yerleşir.",
      "Tırnaklar parmak ucuna kadar uzar.",
      "Bebek 1.7-1.9 kg ağırlığında."
    ],
    babySize: "Kavun",
    tips: [
      "Bebek hareketlerini düzenli sayın",
      "Erken doğum belirtilerini bilin",
      "Doğum çantanızı tamamlayın"
    ]
  },
  {
    week: 33,
    period: "pregnancy",
    title: "Bağışıklık Transferi",
    summary: "Annenin antikorları bebeğe geçiyor.",
    emoji: "🛡️",
    details: [
      "Anne antikorlarını bebeğe aktarır.",
      "Bebek günde yarım litre amniyotik sıvı yutar.",
      "Bebek 1.9-2.1 kg ağırlığında."
    ],
    babySize: "Ananas (büyük)",
    tips: [
      "Bağışıklık sisteminizi güçlendirin",
      "Sağlıklı beslenmeye devam edin",
      "Doğum sonrası destek planı yapın"
    ]
  },
  {
    week: 34,
    period: "pregnancy",
    title: "Akciğer Olgunlaşması",
    summary: "Akciğerler neredeyse tam olgunluğa ulaştı.",
    emoji: "🫁",
    details: [
      "Akciğerler olgunlaşmaya devam eder.",
      "Merkezi sinir sistemi olgunlaşır.",
      "Bebek 2.1-2.3 kg ağırlığında."
    ],
    babySize: "Kavun (büyük)",
    tips: [
      "İstirahat çok önemli",
      "Hastane çantanızı kapının yanına koyun",
      "Emzirme pozisyonlarını araştırın"
    ]
  },
  {
    week: 35,
    period: "pregnancy",
    title: "Hızlı Kilo Alımı",
    summary: "Bebek haftada 200-250 gram alıyor!",
    emoji: "⚖️",
    details: [
      "Bebek hızla kilo almaya devam eder.",
      "Böbrekler tam gelişir.",
      "Bebek 2.3-2.5 kg ağırlığında."
    ],
    babySize: "Karpuz (küçük)",
    tips: [
      "GBS (Grup B Streptokok) testi yaptırın",
      "Doğum planınızı finalize edin",
      "Destek kişinizi bilgilendirin"
    ]
  },
  {
    week: 36,
    period: "pregnancy",
    title: "Baş Pelvise İniyor",
    summary: "Bebek doğum kanalına doğru iniyor. Nefes almak kolaylaşır.",
    emoji: "⬇️",
    details: [
      "Bebek pelvise yerleşir (engagement).",
      "Anne daha rahat nefes alabilir.",
      "Bebek 2.5-2.8 kg ağırlığında."
    ],
    babySize: "Papaya (büyük)",
    tips: [
      "Haftalık doktor kontrollerine geçin",
      "Doğum belirtilerini iyi bilin",
      "Sakin ve pozitif kalın"
    ]
  },
  {
    week: 37,
    period: "pregnancy",
    title: "Erken Term!",
    summary: "Bebek artık 'erken term' kabul ediliyor.",
    emoji: "🌟",
    details: [
      "Bebek akciğerleri yeterli olgunluğa ulaşır.",
      "El kavrama refleksi güçlüdür.",
      "Bebek 2.8-3.0 kg ağırlığında."
    ],
    babySize: "Karpuz (orta)",
    tips: [
      "Her an doğum başlayabilir",
      "Servikal muayene yapılabilir",
      "Rahat ve huzurlu kalmaya çalışın"
    ]
  },
  {
    week: 38,
    period: "pregnancy",
    title: "Tam Term!",
    summary: "Bebek tam olgun! Her an gelebilir.",
    emoji: "🎯",
    details: [
      "Tüm organlar tam fonksiyonel.",
      "Mekonyum (ilk dışkı) bağırsaklarda birikir.",
      "Bebek 2.9-3.2 kg ağırlığında."
    ],
    babySize: "Karpuz",
    tips: [
      "Doğum sancılarının gerçek ve yalancı ayrımını bilin",
      "Hastaneye ne zaman gideceğinizi planlayın",
      "Son hazırlıkları tamamlayın"
    ]
  },
  {
    week: 39,
    period: "pregnancy",
    title: "Geri Sayım",
    summary: "Beklenen doğum tarihine çok az kaldı!",
    emoji: "⏰",
    details: [
      "Beyin gelişimi doğumdan sonra da devam edecek.",
      "Bebek doğum pozisyonundadır.",
      "Bebek 3.0-3.4 kg ağırlığında."
    ],
    babySize: "Karpuz (büyük)",
    tips: [
      "Sakin kalın ve dinlenin",
      "Büyük öğünler yerine küçük atıştırmalıklar tercih edin",
      "Doğum partnerinizle son kez plan gözden geçirin"
    ]
  },
  {
    week: 40,
    period: "pregnancy",
    title: "Beklenen Doğum Tarihi! 🎉",
    summary: "Tahmini doğum tarihiniz geldi! Bebeğiniz hazır.",
    emoji: "🎂",
    details: [
      "Beklenen doğum tarihi (tahmini).",
      "Bebeklerin sadece %5'i tam bu tarihte doğar.",
      "Bebek 3.2-3.6 kg ağırlığında."
    ],
    babySize: "Karpuz 🍉",
    tips: [
      "Sakin olun, birçok bebek 40. haftadan sonra doğar",
      "Doktorunuzla iletişimde kalın",
      "Bebeğinize kavuşmak üzeresiniz! 💕"
    ]
  },
  {
    week: 41,
    period: "pregnancy",
    title: "Biraz Daha Sabır",
    summary: "Bebeğiniz biraz daha zamana ihtiyaç duyuyor.",
    emoji: "🕐",
    details: [
      "41. haftayı geçen gebelikler yakından takip edilir.",
      "NST (Non-Stress Test) yapılabilir.",
      "Doğumun tetiklenmesi görüşülebilir."
    ],
    babySize: "Karpuz 🍉",
    tips: [
      "Doktorunuzun önerilerine uyun",
      "Yürüyüş doğumu tetikleyebilir",
      "Rahat olmaya çalışın"
    ]
  },
  {
    week: 42,
    period: "pregnancy",
    title: "Son Hafta",
    summary: "Doğum için müdahale planlanabilir.",
    emoji: "🏥",
    details: [
      "42 haftayı geçen gebeliklerde genellikle doğum tetiklenir.",
      "Bebek ve anne yakından izlenir.",
      "Doktorunuzla birlikte en iyi kararı verin."
    ],
    babySize: "Karpuz 🍉",
    tips: [
      "Doktorunuzun yönlendirmelerine güvenin",
      "Sakin ve pozitif kalın",
      "Bebeğinize kavuşacaksınız! 🌈"
    ]
  },
];

/** Doğum sonrası haftalık veriler (0-156 hafta = 0-3 yaş) */
export const postnatalWeeks: WeekInfo[] = [
  {
    week: 0,
    period: "newborn",
    title: "Hoş Geldin Bebek! 🎉",
    summary: "Bebeğiniz dünyaya geldi! İlk saatler ve günler çok özel.",
    emoji: "👶",
    details: [
      "İlk emzirme mümkün olan en kısa sürede denenmelidir.",
      "Bebek ten tene temas ister.",
      "İlk saatlerde bebek çok uyanık olabilir."
    ],
    tips: [
      "Ten tene temas çok önemli",
      "Emzirmeye mümkün olan en kısa sürede başlayın",
      "Kendinize ve bebeğinize zaman tanıyın"
    ]
  },
  {
    week: 1,
    period: "newborn",
    title: "İlk Hafta",
    summary: "Yeni dünyaya adaptasyon. Emzirme ve uyku düzeni.",
    emoji: "🍼",
    details: [
      "Bebek günde 8-12 kez emzirilmelidir.",
      "Göbek kordonu düşmeyi bekler.",
      "Sarılık (yenidoğan sarılığı) görülebilir."
    ],
    tips: [
      "Bebek 24 saatte en az 6 ıslak bez yapmalı",
      "Göbek bakımını öğrenin",
      "Kendinizi de dinlendirmeyi unutmayın"
    ]
  },
  {
    week: 2,
    period: "newborn",
    title: "Büyüme Atağı",
    summary: "İlk büyüme atağı! Bebek daha sık emmek isteyebilir.",
    emoji: "📈",
    details: [
      "İlk büyüme atağı genellikle 7-10. günlerde yaşanır.",
      "Bebek daha sık beslenmek isteyebilir.",
      "Bu geçici bir durumdur, birkaç gün sürer."
    ],
    tips: [
      "Talep üzerine emzirmeye devam edin",
      "Büyüme atakları geçicidir, endişelenmeyin",
      "Bol su içmeyi unutmayın"
    ]
  },
  {
    week: 3,
    period: "newborn",
    title: "Göz Teması",
    summary: "Bebek yüzünüze odaklanmaya başlıyor.",
    emoji: "👁️",
    details: [
      "Bebek 20-30cm mesafedeki yüzlere odaklanabilir.",
      "Siyah-beyaz kontrastları fark eder.",
      "Sesle sakinleşir."
    ],
    tips: [
      "Bebeğinizle göz teması kurun",
      "Yüksek kontrastlı görsellerle uyarın",
      "Kolik belirtilerine dikkat edin"
    ]
  },
  {
    week: 4,
    period: "newborn",
    title: "İlk Ay Tamam!",
    summary: "İlk ayı başarıyla geçtiniz! Bebek sosyal gülümseme yapabilir.",
    emoji: "😊",
    details: [
      "İlk gerçek gülümseme bu dönemde görülebilir.",
      "Baş kontrolü gelişmeye başlar.",
      "Uyku düzeni henüz oluşmamıştır."
    ],
    tips: [
      "1 aylık kontrol muayenesini yaptırın",
      "Aşı takvimine uyun",
      "Kendinize zaman ayırmayı unutmayın"
    ]
  },
  {
    week: 5,
    period: "newborn",
    title: "Atak Haftası! ⚡",
    summary: "5. hafta atak haftası - bebek huzursuz olabilir.",
    emoji: "⚡",
    details: [
      "Wonder Week 1 - 'Değişen Duyular' atağı.",
      "Bebek daha fazla ağlayabilir ve huzursuz olabilir.",
      "Duyusal farkındalık artmaktadır."
    ],
    tips: [
      "Atak dönemleri geçicidir, sabırlı olun",
      "Ekstra ten tene temas verin",
      "Sakin bir ortam sağlayın"
    ]
  },
  {
    week: 6,
    period: "newborn",
    title: "Sosyal Gülümseme",
    summary: "Bilinçli gülümseme başlıyor! İlk sosyal etkileşim.",
    emoji: "😃",
    details: [
      "Bebek bilinçli olarak gülümsemeye başlar.",
      "Agu sesleri çıkarmaya başlayabilir.",
      "Göz takibi gelişir."
    ],
    tips: [
      "Bebeğinizle bol bol konuşun",
      "Yüz ifadelerinizi abartın",
      "6 haftalık kontrol muayenesi"
    ]
  },
  {
    week: 8,
    period: "newborn",
    title: "Atak Haftası! ⚡",
    summary: "8. hafta atağı - 'Kalıplar' keşfi.",
    emoji: "⚡",
    details: [
      "Wonder Week 2 - 'Kalıplar' atağı.",
      "Bebek basit kalıpları fark etmeye başlar.",
      "El ve ayaklarını keşfeder."
    ],
    tips: [
      "Bebeğe tekrarlayan aktiviteler sunun",
      "Müzikli oyuncaklar faydalı olabilir",
      "Düzenli rutinler oluşturmaya başlayın"
    ]
  },
  {
    week: 12,
    period: "infant",
    title: "Atak Haftası! ⚡",
    summary: "12. hafta atağı - 'Yumuşak Geçişler' keşfi.",
    emoji: "⚡",
    details: [
      "Wonder Week 3 - 'Yumuşak Geçişler' atağı.",
      "Bebek hareketlerini daha yumuşak yapabilir.",
      "Sesler daha çeşitlenir."
    ],
    tips: [
      "3 aylık kontrol ve aşıları yaptırın",
      "Karın üstü zamanı (tummy time) artırın",
      "Uyku eğitimine yavaş yavaş başlayabilirsiniz"
    ]
  },
  {
    week: 15,
    period: "infant",
    title: "Olaylar Dünyası",
    summary: "Bebek olay-sonuç ilişkisini keşfediyor.",
    emoji: "🎯",
    details: [
      "Nesneleri yakalamaya çalışır.",
      "Oyuncaklara uzanır.",
      "Dönme hareketleri başlayabilir."
    ],
    tips: [
      "Nesneleri uzatıp tutturma oyunları oynayın",
      "Farklı dokular keşfettirin",
      "Düzenli uyku rutini önemli"
    ]
  },
  {
    week: 19,
    period: "infant",
    title: "Atak Haftası! ⚡",
    summary: "19. hafta atağı - 'Olaylar' keşfi. Büyük bir sıçrama!",
    emoji: "⚡",
    details: [
      "Wonder Week 4 - 'Olaylar' atağı.",
      "Bebek neden-sonuç ilişkisini anlamaya başlar.",
      "Nesneleri ağzına götürür, dünyayı keşfeder."
    ],
    tips: [
      "Güvenli keşif ortamı oluşturun",
      "Ağıza götürülebilir güvenli oyuncaklar sağlayın",
      "Bu atak uzun sürebilir - sabırlı olun"
    ]
  },
  {
    week: 23,
    period: "infant",
    title: "İlk Katı Gıdalar",
    summary: "6. aya yaklaşıyorsunuz - katı gıdaya geçiş zamanı!",
    emoji: "🥄",
    details: [
      "6 aydan sonra ek gıdaya geçiş başlayabilir.",
      "Bebek oturma desteğiyle oturmaya başlar.",
      "Diş çıkarma belirtileri görülebilir."
    ],
    tips: [
      "Ek gıdaya geçiş için doktorunuza danışın",
      "Tek tek yeni besinler tanıtın",
      "Alerjik reaksiyonlara dikkat edin"
    ]
  },
  {
    week: 26,
    period: "infant",
    title: "Atak Haftası! ⚡",
    summary: "26. hafta atağı - 'İlişkiler' dünyası.",
    emoji: "⚡",
    details: [
      "Wonder Week 5 - 'İlişkiler' atağı.",
      "Bebek nesneler arasındaki mesafeyi anlar.",
      "Yabancı korkusu başlayabilir."
    ],
    tips: [
      "Yabancı korkusu normal gelişimin bir parçası",
      "ce-ee oyunu oynayın",
      "6 aylık kontrol ve aşıları"
    ]
  },
  {
    week: 30,
    period: "infant",
    title: "Emekleme Dönemi",
    summary: "Hareket kabiliyeti artıyor - emekleme yakın!",
    emoji: "🐛",
    details: [
      "Birçok bebek emeklemeye başlar.",
      "Mobilya desteğiyle ayağa kalkma denemeleri.",
      "Pençe kavrama gelişir."
    ],
    tips: [
      "Evi bebek güvenliği için tarayın",
      "Priz koruyucuları ve köşe koruyucuları takın",
      "Bebeğin keşfetmesine izin verin"
    ]
  },
  {
    week: 37,
    period: "infant",
    title: "Atak Haftası! ⚡",
    summary: "37. hafta atağı - 'Kategoriler' keşfi.",
    emoji: "⚡",
    details: [
      "Wonder Week 6 - 'Kategoriler' atağı.",
      "Bebek nesneleri kategorize etmeye başlar.",
      "İlk kelimeler yaklaşıyor olabilir."
    ],
    tips: [
      "Nesneleri isimlendirin ve kategorize edin",
      "Kitap okuma alışkanlığı başlatın",
      "9 aylık kontrol muayenesi"
    ]
  },
  {
    week: 42,
    period: "infant",
    title: "İlk Kelimeler",
    summary: "Mama, baba gibi ilk anlamlı kelimeler gelebilir!",
    emoji: "🗣️",
    details: [
      "İlk anlamlı kelimeler söylenebilir.",
      "Basit komutları anlamaya başlar.",
      "İşaret parmağıyla göstermeye başlar."
    ],
    tips: [
      "Her şeyi isimlendirin",
      "Kitap okumaya devam edin",
      "Bebeğin iletişim çabalarına karşılık verin"
    ]
  },
  {
    week: 46,
    period: "infant",
    title: "Atak Haftası! ⚡",
    summary: "46. hafta atağı - 'Diziler' keşfi.",
    emoji: "⚡",
    details: [
      "Wonder Week 7 - 'Diziler' atağı.",
      "Bebek sıralı eylemleri anlamaya başlar.",
      "Nesneleri üst üste koyma, sıralama dener."
    ],
    tips: [
      "Kule yapma oyunları oynayın",
      "Rutinleri adım adım anlatın",
      "İlk doğum günü yaklaşıyor!"
    ]
  },
  {
    week: 52,
    period: "toddler",
    title: "1 Yaş! 🎂",
    summary: "İlk yaş gününüz kutlu olsun! Ne büyük yol kat ettiniz!",
    emoji: "🎂",
    details: [
      "İlk doğum günü!",
      "Birçok bebek yürümeye başlar veya yakındır.",
      "3-5 kelime söyleyebilir."
    ],
    tips: [
      "12 aylık kontrol ve aşıları",
      "İnek sütüne geçişi doktorunuzla konuşun",
      "Ayakkabı seçimine dikkat edin"
    ]
  },
  {
    week: 55,
    period: "toddler",
    title: "Atak Haftası! ⚡",
    summary: "55. hafta atağı - 'Programlar' keşfi. Son büyük atak!",
    emoji: "⚡",
    details: [
      "Wonder Week 8 - 'Programlar' atağı.",
      "Çocuk kendi 'programlarını' oluşturmaya başlar.",
      "İnatlaşma ve bağımsızlık isteği artar."
    ],
    tips: [
      "Bağımsızlığı destekleyin ama güvenli sınırlar koyun",
      "Çocuğun seçim yapmasına izin verin",
      "Sabırlı olun - bu dönüşüm süreci"
    ]
  },
  {
    week: 64,
    period: "toddler",
    title: "Atak Haftası! ⚡",
    summary: "64. hafta atağı - 'İlkeler' keşfi.",
    emoji: "⚡",
    details: [
      "Wonder Week 9 - 'İlkeler' atağı.",
      "Çocuk kuralları ve ilkeleri anlamaya başlar.",
      "Empati gelişmeye başlar."
    ],
    tips: [
      "Basit kurallar koyun ve tutarlı olun",
      "Duygular hakkında konuşun",
      "Sosyal etkileşim fırsatları yaratın"
    ]
  },
  {
    week: 75,
    period: "toddler",
    title: "Atak Haftası! ⚡",
    summary: "75. hafta atağı - 'Sistemler' keşfi. Son Wonder Week!",
    emoji: "⚡",
    details: [
      "Wonder Week 10 - 'Sistemler' atağı (son atak!).",
      "Çocuk karmaşık sistemleri anlamaya başlar.",
      "Hayal gücü ve yaratıcılık patlaması."
    ],
    tips: [
      "Hayal gücünü destekleyin",
      "Rol yapma oyunları oynayın",
      "Bu son zihinsel sıçrama dönemini kutlayın"
    ]
  },
  {
    week: 78,
    period: "toddler",
    title: "18 Aylar - Yarım Yaş!",
    summary: "1.5 yaşındasınız! Kelime hazinesi patlıyor.",
    emoji: "📚",
    details: [
      "Kelime hazinesi hızla genişler (50+ kelime).",
      "Koşma ve tırmanma kabiliyeti artar.",
      "Bağımsızlık isteği güçlenir."
    ],
    tips: [
      "18 aylık kontrol muayenesi",
      "Tuvalet eğitimi için hazırlık belirtilerini izleyin",
      "Çok fazla ekran süresinden kaçının"
    ]
  },
  {
    week: 104,
    period: "toddler",
    title: "2 Yaş! 🎂",
    summary: "İkinci doğum günü! 'Terrible Twos' dönemi.",
    emoji: "🎂",
    details: [
      "2 yaş kontrol muayenesi.",
      "İki kelimelik cümleler kurar.",
      "Bağımsızlık isteği doruk noktada."
    ],
    tips: [
      "Sabır ve tutarlılık çok önemli",
      "Seçenekler sunun (kırmızı mı mavi mi?)",
      "Olumlu disiplin yöntemlerini uygulayın"
    ]
  },
  {
    week: 130,
    period: "toddler",
    title: "2.5 Yaş",
    summary: "Dil patlaması! Küçük bir sohbet arkadaşınız var.",
    emoji: "💬",
    details: [
      "300+ kelime bilir.",
      "3-4 kelimelik cümleler kurar.",
      "Renkleri ve şekilleri tanıyabilir."
    ],
    tips: [
      "Bol bol kitap okuyun",
      "Tuvalet eğitimine başlamayı düşünün",
      "Sosyal beceriler için oyun gruplarına katılın"
    ]
  },
  {
    week: 156,
    period: "toddler",
    title: "3 Yaş! 🎂 Happi Tamamlandı!",
    summary: "Üçüncü doğum günü! Bu muhteşem yolculuk tamamlandı.",
    emoji: "🎉",
    details: [
      "3 yaş kontrol muayenesi.",
      "Kreş/anaokulu hazırlığı.",
      "Hayal gücü ve sosyal beceriler gelişmiş durumda."
    ],
    tips: [
      "Bu günleri hatıra defterine kaydedin",
      "Anaokulu araştırması yapın",
      "Gurur duyun - harika bir iş çıkardınız! 🌟"
    ]
  }
];
