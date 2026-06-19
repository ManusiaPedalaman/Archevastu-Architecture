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
    title: "The Glass House",
    category: "Residensial",
    description: "Hunian modern dengan pencahayaan alami maksimal dan integrasi tanpa batas dengan alam sekitar.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    tags: ["Modern", "Minimalist", "Glass"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-contemporary-house-exterior-with-swimming-pool-42037-large.mp4",
    renderPhotos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop"
    ],
    story: "The Glass House lahir dari visi untuk menciptakan dialog harmonis antara ruang privat dan alam liar. Menggunakan teknologi kaca rendah emisivitas (low-E glass) berkinerja tinggi, struktur ini menghilangkan dinding pembatas tradisional tanpa mengorbankan kenyamanan termal atau privasi penghuni. Dengan mengintegrasikan sistem pemanas pasif dan ventilasi silang yang cermat, rumah ini beroperasi dengan konsumsi energi minimal, menawarkan pengalaman hidup mewah yang selaras dengan siklus alam harian.",
    location: "Bandung, Indonesia",
    year: "2025",
    area: "450 m²",
    client: "Private Family"
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
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2072&auto=format&fit=crop",
    tags: ["Zen", "Tropical", "Water"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-house-surrounded-by-nature-42044-large.mp4",
    renderPhotos: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2069&auto=format&fit=crop"
    ],
    story: "Zen Garden Estate dirancang sebagai oasis meditatif di tengah hiruk-pikuk wilayah urban. Proyek ini memadukan prinsip taman Zen Jepang kuno dengan keanekaragaman hayati vegetasi tropis Indonesia. Aliran air bertingkat dirancang secara akustik untuk menyamarkan kebisingan perkotaan di sekitarnya, sedangkan pemilihan batuan sungai andesit lokal memberikan tekstur bumi yang kuat dan abadi. Setiap sudut taman dirancang untuk memberikan sudut pandang reflektif yang unik seiring perubahan musim dan waktu.",
    location: "Sentul, Indonesia",
    year: "2025",
    area: "1,200 m²",
    client: "Estate Management"
  },
  {
    id: 6,
    title: "Eco Retreat Haven",
    category: "Residensial",
    description: "Vila ramah lingkungan yang dibangun sepenuhnya dengan material daur ulang dan energi surya terintegrasi.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2187&auto=format&fit=crop",
    tags: ["Eco-friendly", "Solar", "Off-grid"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-interior-architecture-42036-large.mp4",
    renderPhotos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
    ],
    story: "Eco Retreat Haven menantang gagasan arsitektur mewah konvensional. Struktur hunian ini sepenuhnya dibangun menggunakan material bersumber ramah lingkungan, termasuk bambu laminasi struktural, semen bersertifikat hijau, dan kayu reklamasi. Menggunakan jaringan atap fotovoltaik surya berskala besar dengan sistem penyimpanan baterai tesla, vila ini mampu beroperasi secara mandiri tanpa terhubung ke jaringan listrik utama. Sistem pengelolaan air limbah liminasi abu-abu berbasis biologis juga terintegrasi untuk menyiram tanaman lokal di sekitarnya.",
    location: "Lombok, Indonesia",
    year: "2026",
    area: "550 m²",
    client: "Green Eco Resort"
  }
];
