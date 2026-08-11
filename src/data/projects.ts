import rt2_3Jpg from "@/image/img/Lanskap/CW2 LANDSCAPE-20260809T160238Z-1-001/CW2 LANDSCAPE/RT 2_3 - Photo.jpg";
import rt2_3Webp from "@/image/img/Lanskap/CW2 LANDSCAPE-20260809T160238Z-1-001/CW2 LANDSCAPE/RT 2_3 - Photo.webp";
import rt2_4Jpg from "@/image/img/Lanskap/CW2 LANDSCAPE-20260809T160238Z-1-001/CW2 LANDSCAPE/RT 2_4 - Photo.jpg";
import rt2_4Webp from "@/image/img/Lanskap/CW2 LANDSCAPE-20260809T160238Z-1-001/CW2 LANDSCAPE/RT 2_4 - Photo.webp";

import jengki1Webp from "@/image/img/Residensial/The Modern Jengki-20260809T160204Z-1-001/The Modern Jengki/1.3.webp";
import jengki2Webp from "@/image/img/Residensial/The Modern Jengki-20260809T160204Z-1-001/The Modern Jengki/2.4.webp";
import jengki3Webp from "@/image/img/Residensial/The Modern Jengki-20260809T160204Z-1-001/The Modern Jengki/3.2.webp";
import jengki4Webp from "@/image/img/Residensial/The Modern Jengki-20260809T160204Z-1-001/The Modern Jengki/4.1.webp";
import jengki5Webp from "@/image/img/Residensial/The Modern Jengki-20260809T160204Z-1-001/The Modern Jengki/5.1.webp";

import lcalmeScene1 from "@/image/img/Residensial/L_Calme/Scene 1.webp";
import lcalmeScene2 from "@/image/img/Residensial/L_Calme/Scene 2.webp";
import lcalmeScene3 from "@/image/img/Residensial/L_Calme/Scene 3.webp";
import lcalmeScene4 from "@/image/img/Residensial/L_Calme/Scene 4.webp";
import lcalmeScene5 from "@/image/img/Residensial/L_Calme/Scene 5.webp";
import lcalmeScene6 from "@/image/img/Residensial/L_Calme/Scene 6.webp";
import lcalmeA01 from "@/image/img/Residensial/L_Calme/A-01.webp";
import lcalmeA02 from "@/image/img/Residensial/L_Calme/A-02.webp";

const getMediaUrl = (media: any): string => {
  if (typeof media === "string") return media;
  if (media && typeof media === "object" && "src" in media) return media.src;
  if (media && typeof media === "object" && "default" in media) return media.default;
  return String(media);
};

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  videoUrl: string;
  renderPhotos: string[];
  story: string;
  location: string;
  year: string;
  area: string;
  client: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "The Modern Jengki",
    category: "Residensial",
    description: "Reinterpretasi kontemporer gaya arsitektur Jengki pasca-kolonial di atas lahan 60 m² yang merespons iklim tropis Yogyakarta.",
    image: getMediaUrl(jengki1Webp),
    tags: ["Jengki", "Asimetris", "Modern Tropis"],
    videoUrl: "/image/img/Residensial/The Modern Jengki-20260809T160204Z-1-001/The Modern Jengki/ANIMASI 6S.mp4",
    renderPhotos: [
      getMediaUrl(jengki1Webp),
      getMediaUrl(jengki2Webp),
      getMediaUrl(jengki3Webp),
      getMediaUrl(jengki4Webp),
      getMediaUrl(jengki5Webp),
    ],
    story: "The Jengki House lahir dari sebuah tantangan untuk merespons keterbatasan lahan perkotaan modern tanpa kehilangan identitas historis yang kuat. Berdiri di atas tapak seluas 60 m², proyek residensial untuk Mr. J di Yogyakarta ini merupakan sebuah selebrasi visual sekaligus reinterpretasi kontemporer terhadap arsitektur \"Jengki\"—gaya ikonik pasca-kolonial Indonesia yang terkenal dengan semangat kebebasan, bentuk-bentuk asimetris, dan eksperimentasi struktur yang berani. Desain ini mematahkan kekakuan geometri arsitektur modern konvensional. Atap pelana yang berselisih dan memiliki kemiringan ekstrem tidak hanya berfungsi secara estetika sebagai focal point yang ekspresif, tetapi juga dirancang secara fungsional untuk mengalirkan curah hujan tinggi khas iklim tropis Yogyakarta secara optimal. Fasad bangunan didominasi oleh perpaduan dinamis antara dinding panel putih yang bersih, aksen bata ekspos lengkung yang masif, serta permainan tiang-tiang struktural miring yang memberikan impresi visual yang kokoh sekaligus melayang.",
    location: "Yogyakarta, Indonesia",
    year: "2025",
    area: "60 m²",
    client: "Mr. J"
  },
  {
    id: 2,
    title: "Oasis Commercial Center",
    category: "Komersial",
    description: "Pusat perbelanjaan berkonsep open-air yang mengutamakan keberlanjutan dan sirkulasi udara alami.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2016&auto=format&fit=crop",
    tags: ["Urban", "Sustainable", "Retail"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-office-building-with-glass-facade-44336-large.mp4",
    renderPhotos: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2016&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2064&auto=format&fit=crop"
    ],
    story: "Oasis Commercial Center merevolusi ruang ritel perkotaan dengan desain open-air yang mengintegrasikan koridor hijau rimbun dan plaza air terjun mikro. Desain sirkulasi udaranya secara dramatis mengurangi kebutuhan akan pendingin udara buatan di area publik, memanfaatkan efek pendinginan evaporatif dari elemen air alami. Proyek ini memadukan material beton ekspos yang tangguh dengan tanaman merambat vertikal, menciptakan hutan kota fungsional yang menyatukan komunitas sosial dan bisnis secara berkelanjutan.",
    location: "Jakarta, Indonesia",
    year: "2026",
    area: "18,500 m²",
    client: "PT. Oasis Dinamika"
  },
  {
    id: 3,
    title: "Serenity Villa",
    category: "Interior",
    description: "Desain interior premium yang menggabungkan material kayu lokal dengan sentuhan marmer mewah.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2080&auto=format&fit=crop",
    tags: ["Luxury", "Wood", "Marble"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-with-wooden-details-42042-large.mp4",
    renderPhotos: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop"
    ],
    story: "Mengusung filosofi ketenangan batin, Serenity Villa adalah eksperimen tentang bagaimana material bertekstur kasar seperti kayu jati daur ulang berinteraksi dengan kehalusan marmer Carrara Italia. Setiap sudut dirancang secara presisi untuk mengarahkan pandangan ke pemandangan luar, menciptakan kesinambungan visual yang menenangkan. Detail pencahayaan temaram tidak langsung (indirect lighting) disembunyikan di balik panel kayu untuk menghadirkan atmosfer hangat dan intim di malam hari.",
    location: "Ubud, Bali",
    year: "2024",
    area: "320 m²",
    client: "Private Collector"
  },
  {
    id: 4,
    title: "Lumina Office Tower",
    category: "Komersial",
    description: "Gedung perkantoran futuristik dengan fasad kinetik yang merespons cahaya matahari.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["Corporate", "Futuristic", "Kinetic"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-building-with-a-glass-facade-44339-large.mp4",
    renderPhotos: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
    ],
    story: "Lumina Office Tower merepresentasikan pergeseran paradigma arsitektur tinggi yang cerdas. Fasad luar gedung dilapisi dengan panel kinetik pintar yang membuka dan menutup secara otomatis berdasarkan sudut matahari. Teknologi ini secara radikal meminimalkan beban pendinginan termal gedung hingga 40% sekaligus memastikan ruang kerja bagian dalam selalu menerima pencahayaan alami yang optimal. Di bagian tengah menara, terdapat atrium vertikal terbuka yang berfungsi sebagai paru-paru sosial bagi ribuan profesional di dalamnya.",
    location: "Surabaya, Indonesia",
    year: "2027",
    area: "42,000 m²",
    client: "Lumina Development Group"
  },
  {
    id: 5,
    title: "Zen Garden Estate",
    category: "Lanskap",
    description: "Desain lanskap meditatif yang menggabungkan elemen air, batu, dan flora tropis eksotis.",
    image: getMediaUrl(rt2_3Webp),
    tags: ["Zen", "Tropical", "Water"],
    videoUrl: "/videos/ANIMASI.mp4",
    renderPhotos: [
      getMediaUrl(rt2_3Webp),
      getMediaUrl(rt2_3Jpg),
      getMediaUrl(rt2_4Webp),
      getMediaUrl(rt2_4Jpg),
    ],
    story: "Zen Garden Estate dirancang sebagai oasis meditatif di tengah hiruk-pikuk wilayah urban. Proyek ini memadukan prinsip taman Zen Jepang kuno dengan keanekaragaman hayati vegetasi tropis Indonesia. Aliran air bertingkat dirancang secara akustik untuk menyamarkan kebisingan perkotaan di sekitarnya, sedangkan pemilihan batuan sungai andesit lokal memberikan tekstur bumi yang kuat dan abadi. Setiap sudut taman dirancang untuk memberikan sudut pandang reflektif yang unik seiring perubahan musim dan waktu.",
    location: "Sentul, Indonesia",
    year: "2025",
    area: "1,200 m²",
    client: "Estate Management"
  },
  {
    id: 6,
    title: "L'Calme",
    category: "Residensial",
    description: "Hunian modern seluas 72 m² berbasis geometri kontemporer dengan second skin kayu dan vegetasi asri di Surabaya.",
    image: getMediaUrl(lcalmeScene1),
    tags: ["Minimalis", "Second Skin", "Kontemporer"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-interior-architecture-42036-large.mp4",
    renderPhotos: [
      getMediaUrl(lcalmeScene1),
      getMediaUrl(lcalmeScene2),
      getMediaUrl(lcalmeScene3),
      getMediaUrl(lcalmeScene4),
      getMediaUrl(lcalmeScene5),
      getMediaUrl(lcalmeScene6),
      getMediaUrl(lcalmeA01),
      getMediaUrl(lcalmeA02),
    ],
    story: "L'Calme : Manifestasi Ketenangan dalam Garis Presisi. Diambil dari bahasa Prancis yang berarti 'tenang' atau 'sang ketenangan', L'Calme dirancang bukan sekadar sebagai struktur fisik hunian, melainkan sebuah ruang perlindungan untuk menjeda hiruk-pikuk kehidupan. Berdiri di atas lahan seluas 72 m² di Surabaya, proyek residensial ini merespons iklim urban yang padat dengan menghadirkan sebuah oase mikro yang intim, damai, dan selaras dengan ritme alam di sekitarnya. Mengusung filosofi 'Pure lines, Carved into spaces!', fasad bangunan tampil memukau melalui permainan geometri kontemporer yang berani namun tetap terasa teduh. Bentuk atap asimetris yang tajam berpadu apik dengan panel-panel vertikal bermotif kayu hangat, menciptakan lapisan privasi (second skin) yang melindungi interior rumah dari terik matahari Surabaya tanpa memutus sirkulasi udara dan cahaya alami.",
    location: "Surabaya, Indonesia",
    year: "2025",
    area: "72 m²",
    client: "Mrs. C"
  }
];
