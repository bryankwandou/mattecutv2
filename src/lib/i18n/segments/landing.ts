import type { LocaleCode } from "@/lib/i18n";

export type LandingStrings = {
  useEyebrow: string;
  useHeading: string;
  cases: { title: string; body: string; cta: string }[];
  howEyebrow: string;
  howHeading: string;
  steps: { title: string; body: string }[];
  /** `{n}` is replaced with the real count of bundled backdrops. */
  facts: [string, string, string];
  positioning: string;
  ctaMicro: string;
};

export const landingStrings: Record<LocaleCode, LandingStrings> = {
  id: {
    useEyebrow: "Untuk apa",
    useHeading: "Tiga pekerjaan yang paling sering",
    cases: [
      { title: "Pasfoto Formal", body: "Jas charcoal, navy, atau blazer dipasang otomatis lewat deteksi bahu, dengan latar abu, putih, biru, atau merah.", cta: "Buat pasfoto" },
      { title: "Katalog Produk", body: "Latar bersih ala studio, siap diunggah ke toko online.", cta: "Buat foto katalog" },
      { title: "Konten Kreator", body: "Foto profil, thumbnail, dan materi konten dalam hitungan detik.", cta: "Buka studio" },
    ],
    howEyebrow: "Cara kerja",
    howHeading: "Tiga langkah, semuanya di perangkat Anda",
    steps: [
      { title: "Masukkan foto", body: "Tarik atau pilih dari galeri." },
      { title: "AI memotong di perangkat Anda", body: "Tidak ada unggah." },
      { title: "Pilih latar & unduh", body: "Siap pakai untuk pasfoto atau katalog." },
    ],
    facts: [
      "Pasang jas otomatis (deteksi bahu MediaPipe Pose)",
      "Mode cepat 0 MB tanpa unduh model",
      "{n} latar tersimpan lokal, jalan tanpa jaringan",
    ],
    positioning: "Dibuat untuk UMKM, freelancers, dan konten kreator yang butuh foto profesional tanpa studio mahal.",
    ctaMicro: "Coba Sekarang - Tanpa Daftar",
  },
  en: {
    useEyebrow: "What it's for",
    useHeading: "The three jobs people do most",
    cases: [
      { title: "Formal ID Photo", body: "A charcoal, navy, or blazer suit fitted automatically by shoulder detection, on grey, white, blue, or red.", cta: "Make an ID photo" },
      { title: "Product Catalog", body: "Clean studio-style backgrounds, ready for your online store.", cta: "Make catalog shots" },
      { title: "Content Creators", body: "Profile pictures, thumbnails, and quick content assets.", cta: "Open the studio" },
    ],
    howEyebrow: "How it works",
    howHeading: "Three steps, all on your device",
    steps: [
      { title: "Add a photo", body: "Drag it in or pick from your gallery." },
      { title: "AI cuts it out on your device", body: "Nothing is uploaded." },
      { title: "Pick a background & download", body: "Ready for ID photos or catalogs." },
    ],
    facts: [
      "Automatic suit fitting (MediaPipe Pose shoulder detection)",
      "0 MB quick mode, no model download",
      "{n} backgrounds stored locally, work offline",
    ],
    positioning: "Made for small businesses, freelancers, and content creators who need professional photos without an expensive studio.",
    ctaMicro: "Try it now - no sign-up",
  },
  ms: {
    useEyebrow: "Untuk apa",
    useHeading: "Tiga kerja yang paling kerap",
    cases: [
      { title: "Foto Pasport Formal", body: "Sut charcoal, navy, atau blazer dipasang automatik melalui pengesanan bahu, dengan latar kelabu, putih, biru, atau merah.", cta: "Buat foto pasport" },
      { title: "Katalog Produk", body: "Latar bersih gaya studio, sedia dimuat naik ke kedai dalam talian.", cta: "Buat foto katalog" },
      { title: "Pencipta Kandungan", body: "Foto profil, imej kecil, dan bahan kandungan pantas.", cta: "Buka studio" },
    ],
    howEyebrow: "Cara ia berfungsi",
    howHeading: "Tiga langkah, semuanya di peranti anda",
    steps: [
      { title: "Masukkan foto", body: "Seret atau pilih dari galeri." },
      { title: "AI memotong di peranti anda", body: "Tiada muat naik." },
      { title: "Pilih latar & muat turun", body: "Sedia untuk foto pasport atau katalog." },
    ],
    facts: [
      "Pasang sut automatik (pengesanan bahu MediaPipe Pose)",
      "Mod pantas 0 MB tanpa muat turun model",
      "{n} latar disimpan setempat, berfungsi luar talian",
    ],
    positioning: "Dibina untuk PKS, pekerja bebas, dan pencipta kandungan yang perlukan foto profesional tanpa studio mahal.",
    ctaMicro: "Cuba Sekarang - Tanpa Daftar",
  },
  es: {
    useEyebrow: "Para qué sirve",
    useHeading: "Los tres usos más comunes",
    cases: [
      { title: "Foto de carné formal", body: "Traje carbón, azul marino o blazer ajustado automáticamente por detección de hombros, sobre gris, blanco, azul o rojo.", cta: "Crear foto de carné" },
      { title: "Catálogo de productos", body: "Fondos limpios de estudio, listos para tu tienda online.", cta: "Crear fotos de catálogo" },
      { title: "Creadores de contenido", body: "Fotos de perfil, miniaturas y material de contenido rápido.", cta: "Abrir el estudio" },
    ],
    howEyebrow: "Cómo funciona",
    howHeading: "Tres pasos, todo en tu dispositivo",
    steps: [
      { title: "Añade una foto", body: "Arrástrala o elígela de tu galería." },
      { title: "La IA recorta en tu dispositivo", body: "No se sube nada." },
      { title: "Elige fondo y descarga", body: "Lista para carnés o catálogos." },
    ],
    facts: [
      "Traje automático (detección de hombros con MediaPipe Pose)",
      "Modo rápido de 0 MB, sin descargar modelo",
      "{n} fondos guardados localmente, funcionan sin conexión",
    ],
    positioning: "Hecho para pymes, freelancers y creadores de contenido que necesitan fotos profesionales sin un estudio caro.",
    ctaMicro: "Pruébalo ya - sin registro",
  },
  pt: {
    useEyebrow: "Para que serve",
    useHeading: "Os três usos mais comuns",
    cases: [
      { title: "Foto 3x4 formal", body: "Terno grafite, marinho ou blazer ajustado automaticamente pela detecção dos ombros, em cinza, branco, azul ou vermelho.", cta: "Criar foto 3x4" },
      { title: "Catálogo de produtos", body: "Fundos limpos de estúdio, prontos para sua loja online.", cta: "Criar fotos de catálogo" },
      { title: "Criadores de conteúdo", body: "Fotos de perfil, miniaturas e material de conteúdo rápido.", cta: "Abrir o estúdio" },
    ],
    howEyebrow: "Como funciona",
    howHeading: "Três passos, tudo no seu dispositivo",
    steps: [
      { title: "Adicione uma foto", body: "Arraste ou escolha da galeria." },
      { title: "A IA recorta no seu dispositivo", body: "Nada é enviado." },
      { title: "Escolha o fundo e baixe", body: "Pronta para documentos ou catálogos." },
    ],
    facts: [
      "Terno automático (detecção de ombros com MediaPipe Pose)",
      "Modo rápido de 0 MB, sem baixar modelo",
      "{n} fundos salvos localmente, funcionam offline",
    ],
    positioning: "Feito para pequenos negócios, freelancers e criadores de conteúdo que precisam de fotos profissionais sem um estúdio caro.",
    ctaMicro: "Experimente agora - sem cadastro",
  },
  fr: {
    useEyebrow: "À quoi ça sert",
    useHeading: "Les trois usages les plus fréquents",
    cases: [
      { title: "Photo d'identité formelle", body: "Costume anthracite, marine ou blazer ajusté automatiquement par détection des épaules, sur gris, blanc, bleu ou rouge.", cta: "Créer une photo d'identité" },
      { title: "Catalogue produits", body: "Fonds propres façon studio, prêts pour votre boutique en ligne.", cta: "Créer des photos catalogue" },
      { title: "Créateurs de contenu", body: "Photos de profil, miniatures et visuels rapides.", cta: "Ouvrir le studio" },
    ],
    howEyebrow: "Comment ça marche",
    howHeading: "Trois étapes, tout sur votre appareil",
    steps: [
      { title: "Ajoutez une photo", body: "Glissez-la ou choisissez-la dans la galerie." },
      { title: "L'IA détoure sur votre appareil", body: "Aucun envoi." },
      { title: "Choisissez un fond et téléchargez", body: "Prête pour l'identité ou le catalogue." },
    ],
    facts: [
      "Costume ajusté automatiquement (détection des épaules MediaPipe Pose)",
      "Mode rapide 0 Mo, sans téléchargement de modèle",
      "{n} fonds stockés localement, utilisables hors ligne",
    ],
    positioning: "Conçu pour les TPE, les freelances et les créateurs de contenu qui ont besoin de photos professionnelles sans studio coûteux.",
    ctaMicro: "Essayez maintenant - sans inscription",
  },
  de: {
    useEyebrow: "Wofür",
    useHeading: "Die drei häufigsten Aufgaben",
    cases: [
      { title: "Formelles Passfoto", body: "Anzug in Anthrazit, Navy oder Blazer, automatisch per Schultererkennung angepasst, auf Grau, Weiß, Blau oder Rot.", cta: "Passfoto erstellen" },
      { title: "Produktkatalog", body: "Saubere Studio-Hintergründe, bereit für Ihren Onlineshop.", cta: "Katalogfotos erstellen" },
      { title: "Content Creator", body: "Profilbilder, Thumbnails und schnelles Content-Material.", cta: "Studio öffnen" },
    ],
    howEyebrow: "So funktioniert's",
    howHeading: "Drei Schritte, alles auf Ihrem Gerät",
    steps: [
      { title: "Foto hinzufügen", body: "Hineinziehen oder aus der Galerie wählen." },
      { title: "KI schneidet auf Ihrem Gerät aus", body: "Kein Upload." },
      { title: "Hintergrund wählen & herunterladen", body: "Fertig für Passfoto oder Katalog." },
    ],
    facts: [
      "Automatische Anzug-Anpassung (Schultererkennung mit MediaPipe Pose)",
      "Schnellmodus mit 0 MB, ohne Modell-Download",
      "{n} Hintergründe lokal gespeichert, offline nutzbar",
    ],
    positioning: "Gemacht für kleine Unternehmen, Freelancer und Content Creator, die professionelle Fotos ohne teures Studio brauchen.",
    ctaMicro: "Jetzt testen - ohne Anmeldung",
  },
  it: {
    useEyebrow: "A cosa serve",
    useHeading: "I tre usi più comuni",
    cases: [
      { title: "Fototessera formale", body: "Abito antracite, blu navy o blazer adattato automaticamente tramite rilevamento delle spalle, su grigio, bianco, blu o rosso.", cta: "Crea fototessera" },
      { title: "Catalogo prodotti", body: "Sfondi puliti da studio, pronti per il tuo negozio online.", cta: "Crea foto catalogo" },
      { title: "Content creator", body: "Foto profilo, miniature e materiale per contenuti veloce.", cta: "Apri lo studio" },
    ],
    howEyebrow: "Come funziona",
    howHeading: "Tre passaggi, tutto sul tuo dispositivo",
    steps: [
      { title: "Aggiungi una foto", body: "Trascinala o scegli dalla galleria." },
      { title: "L'IA scontorna sul tuo dispositivo", body: "Nessun caricamento." },
      { title: "Scegli lo sfondo e scarica", body: "Pronta per fototessere o cataloghi." },
    ],
    facts: [
      "Abito automatico (rilevamento spalle con MediaPipe Pose)",
      "Modalità rapida da 0 MB, senza scaricare modelli",
      "{n} sfondi salvati in locale, funzionano offline",
    ],
    positioning: "Pensato per piccole imprese, freelance e content creator che vogliono foto professionali senza uno studio costoso.",
    ctaMicro: "Prova ora - senza registrazione",
  },
  nl: {
    useEyebrow: "Waarvoor",
    useHeading: "De drie meest gebruikte taken",
    cases: [
      { title: "Formele pasfoto", body: "Pak in antraciet, navy of blazer, automatisch passend via schouderdetectie, op grijs, wit, blauw of rood.", cta: "Pasfoto maken" },
      { title: "Productcatalogus", body: "Strakke studioachtergronden, klaar voor je webshop.", cta: "Catalogusfoto's maken" },
      { title: "Contentmakers", body: "Profielfoto's, thumbnails en snel contentmateriaal.", cta: "Studio openen" },
    ],
    howEyebrow: "Zo werkt het",
    howHeading: "Drie stappen, alles op je apparaat",
    steps: [
      { title: "Voeg een foto toe", body: "Sleep hem erin of kies uit je galerij." },
      { title: "AI knipt uit op je apparaat", body: "Er wordt niets geüpload." },
      { title: "Kies achtergrond & download", body: "Klaar voor pasfoto of catalogus." },
    ],
    facts: [
      "Automatisch pak passen (schouderdetectie met MediaPipe Pose)",
      "Snelle modus van 0 MB, zonder modeldownload",
      "{n} achtergronden lokaal opgeslagen, werken offline",
    ],
    positioning: "Gemaakt voor kleine ondernemers, freelancers en contentmakers die professionele foto's willen zonder dure studio.",
    ctaMicro: "Probeer nu - zonder account",
  },
  tr: {
    useEyebrow: "Ne işe yarar",
    useHeading: "En sık yapılan üç iş",
    cases: [
      { title: "Resmi vesikalık", body: "Antrasit, lacivert ya da blazer ceket, omuz algılamayla otomatik yerleşir; gri, beyaz, mavi veya kırmızı fon.", cta: "Vesikalık oluştur" },
      { title: "Ürün kataloğu", body: "Çevrimiçi mağazaya hazır, temiz stüdyo fonları.", cta: "Katalog fotoğrafı oluştur" },
      { title: "İçerik üreticileri", body: "Profil fotoğrafı, küçük resim ve hızlı içerik görselleri.", cta: "Stüdyoyu aç" },
    ],
    howEyebrow: "Nasıl çalışır",
    howHeading: "Üç adım, hepsi cihazınızda",
    steps: [
      { title: "Fotoğraf ekleyin", body: "Sürükleyin veya galeriden seçin." },
      { title: "Yapay zekâ cihazınızda keser", body: "Hiçbir şey yüklenmez." },
      { title: "Fon seçin ve indirin", body: "Vesikalık veya katalog için hazır." },
    ],
    facts: [
      "Otomatik ceket yerleştirme (MediaPipe Pose omuz algılama)",
      "Model indirmeden 0 MB hızlı mod",
      "{n} fon yerel olarak kayıtlı, internetsiz çalışır",
    ],
    positioning: "Pahalı stüdyoya gerek kalmadan profesyonel fotoğraf isteyen KOBİ'ler, serbest çalışanlar ve içerik üreticileri için.",
    ctaMicro: "Hemen dene - kayıt yok",
  },
  vi: {
    useEyebrow: "Dùng để làm gì",
    useHeading: "Ba việc hay làm nhất",
    cases: [
      { title: "Ảnh thẻ trang trọng", body: "Vest than chì, xanh navy hoặc blazer được ghép tự động nhờ nhận diện vai, trên nền xám, trắng, xanh hoặc đỏ.", cta: "Tạo ảnh thẻ" },
      { title: "Danh mục sản phẩm", body: "Nền studio sạch, sẵn sàng đăng lên cửa hàng trực tuyến.", cta: "Tạo ảnh danh mục" },
      { title: "Nhà sáng tạo nội dung", body: "Ảnh đại diện, thumbnail và tư liệu nội dung nhanh.", cta: "Mở studio" },
    ],
    howEyebrow: "Cách hoạt động",
    howHeading: "Ba bước, tất cả trên thiết bị của bạn",
    steps: [
      { title: "Thêm ảnh", body: "Kéo thả hoặc chọn từ thư viện." },
      { title: "AI tách nền trên thiết bị", body: "Không tải lên gì cả." },
      { title: "Chọn nền & tải về", body: "Sẵn dùng cho ảnh thẻ hoặc danh mục." },
    ],
    facts: [
      "Tự động mặc vest (nhận diện vai bằng MediaPipe Pose)",
      "Chế độ nhanh 0 MB, không tải mô hình",
      "{n} nền lưu cục bộ, dùng được khi không có mạng",
    ],
    positioning: "Dành cho doanh nghiệp nhỏ, freelancer và nhà sáng tạo nội dung cần ảnh chuyên nghiệp mà không cần studio đắt tiền.",
    ctaMicro: "Dùng thử ngay - không cần đăng ký",
  },
  th: {
    useEyebrow: "ใช้ทำอะไร",
    useHeading: "สามงานที่ใช้บ่อยที่สุด",
    cases: [
      { title: "รูปติดบัตรทางการ", body: "สูทสีชาร์โคล กรมท่า หรือเบลเซอร์ ใส่ให้อัตโนมัติด้วยการตรวจจับไหล่ พร้อมพื้นหลังเทา ขาว น้ำเงิน หรือแดง", cta: "ทำรูปติดบัตร" },
      { title: "แคตตาล็อกสินค้า", body: "พื้นหลังสะอาดแบบสตูดิโอ พร้อมลงร้านออนไลน์", cta: "ทำรูปแคตตาล็อก" },
      { title: "ครีเอเตอร์", body: "รูปโปรไฟล์ ภาพปก และสื่อคอนเทนต์แบบรวดเร็ว", cta: "เปิดสตูดิโอ" },
    ],
    howEyebrow: "ทำงานอย่างไร",
    howHeading: "สามขั้นตอน ทั้งหมดบนอุปกรณ์ของคุณ",
    steps: [
      { title: "ใส่รูป", body: "ลากมาวางหรือเลือกจากแกลเลอรี" },
      { title: "AI ตัดภาพบนอุปกรณ์ของคุณ", body: "ไม่มีการอัปโหลด" },
      { title: "เลือกพื้นหลังและดาวน์โหลด", body: "พร้อมใช้เป็นรูปติดบัตรหรือแคตตาล็อก" },
    ],
    facts: [
      "ใส่สูทอัตโนมัติ (ตรวจจับไหล่ด้วย MediaPipe Pose)",
      "โหมดเร็ว 0 MB ไม่ต้องดาวน์โหลดโมเดล",
      "พื้นหลัง {n} แบบเก็บในเครื่อง ใช้ได้แม้ไม่มีเน็ต",
    ],
    positioning: "สร้างมาเพื่อธุรกิจขนาดเล็ก ฟรีแลนซ์ และครีเอเตอร์ที่ต้องการรูปมืออาชีพโดยไม่ต้องจ้างสตูดิโอราคาแพง",
    ctaMicro: "ลองเลย - ไม่ต้องสมัคร",
  },
  ja: {
    useEyebrow: "用途",
    useHeading: "よく使われる3つの用途",
    cases: [
      { title: "証明写真", body: "チャコール、ネイビー、ブレザーのスーツを肩の検出で自動合成。背景はグレー、白、青、赤。", cta: "証明写真を作る" },
      { title: "商品カタログ", body: "ネットショップにそのまま使える、すっきりしたスタジオ背景。", cta: "カタログ写真を作る" },
      { title: "コンテンツクリエイター", body: "プロフィール写真、サムネイル、素材をすばやく。", cta: "スタジオを開く" },
    ],
    howEyebrow: "使い方",
    howHeading: "3ステップ、すべてお使いの端末で",
    steps: [
      { title: "写真を入れる", body: "ドラッグするか、ギャラリーから選択。" },
      { title: "AIが端末内で切り抜き", body: "アップロードはありません。" },
      { title: "背景を選んでダウンロード", body: "証明写真やカタログにすぐ使えます。" },
    ],
    facts: [
      "スーツ自動合成（MediaPipe Poseによる肩検出）",
      "モデル不要の0 MBクイックモード",
      "背景{n}種を端末に保存、オフラインで使用可",
    ],
    positioning: "高価なスタジオなしでプロの写真が必要な中小事業者、フリーランス、クリエイターのために。",
    ctaMicro: "今すぐ試す - 登録不要",
  },
  ko: {
    useEyebrow: "활용",
    useHeading: "가장 많이 쓰는 세 가지",
    cases: [
      { title: "정장 증명사진", body: "차콜, 네이비, 블레이저 정장을 어깨 인식으로 자동 합성하고 회색, 흰색, 파랑, 빨강 배경을 씌웁니다.", cta: "증명사진 만들기" },
      { title: "상품 카탈로그", body: "온라인 스토어에 바로 올릴 수 있는 깔끔한 스튜디오 배경.", cta: "카탈로그 사진 만들기" },
      { title: "콘텐츠 크리에이터", body: "프로필 사진, 썸네일, 콘텐츠 소재를 빠르게.", cta: "스튜디오 열기" },
    ],
    howEyebrow: "작동 방식",
    howHeading: "세 단계, 모두 내 기기에서",
    steps: [
      { title: "사진 넣기", body: "끌어다 놓거나 갤러리에서 선택하세요." },
      { title: "AI가 기기에서 누끼", body: "업로드는 없습니다." },
      { title: "배경 선택 후 다운로드", body: "증명사진이나 카탈로그에 바로 사용." },
    ],
    facts: [
      "정장 자동 합성 (MediaPipe Pose 어깨 인식)",
      "모델 다운로드 없는 0 MB 빠른 모드",
      "배경 {n}개 로컬 저장, 오프라인 사용 가능",
    ],
    positioning: "비싼 스튜디오 없이 전문 사진이 필요한 소상공인, 프리랜서, 크리에이터를 위해 만들었습니다.",
    ctaMicro: "지금 써보기 - 가입 없음",
  },
  zh: {
    useEyebrow: "用途",
    useHeading: "最常见的三种用法",
    cases: [
      { title: "正装证件照", body: "通过肩部检测自动套上炭灰、藏青或休闲西装，背景可选灰、白、蓝、红。", cta: "制作证件照" },
      { title: "商品目录", body: "干净的影棚背景，可直接上架网店。", cta: "制作商品图" },
      { title: "内容创作者", body: "头像、缩略图和素材，快速完成。", cta: "打开工作室" },
    ],
    howEyebrow: "工作原理",
    howHeading: "三步完成，全部在你的设备上",
    steps: [
      { title: "放入照片", body: "拖入或从相册选择。" },
      { title: "AI 在你的设备上抠图", body: "不上传任何内容。" },
      { title: "选择背景并下载", body: "可直接用于证件照或商品目录。" },
    ],
    facts: [
      "自动套西装（MediaPipe Pose 肩部检测）",
      "0 MB 快速模式，无需下载模型",
      "{n} 个背景存于本地，离线可用",
    ],
    positioning: "为需要专业照片却不想花钱进影棚的小微企业、自由职业者和内容创作者打造。",
    ctaMicro: "立即试用 - 无需注册",
  },
  hi: {
    useEyebrow: "किस काम का",
    useHeading: "तीन सबसे आम काम",
    cases: [
      { title: "औपचारिक पासपोर्ट फ़ोटो", body: "कंधे की पहचान से चारकोल, नेवी या ब्लेज़र सूट अपने-आप फ़िट, ग्रे, सफ़ेद, नीले या लाल बैकग्राउंड पर।", cta: "पासपोर्ट फ़ोटो बनाएँ" },
      { title: "प्रोडक्ट कैटलॉग", body: "साफ़ स्टूडियो बैकग्राउंड, ऑनलाइन स्टोर के लिए तैयार।", cta: "कैटलॉग फ़ोटो बनाएँ" },
      { title: "कंटेंट क्रिएटर", body: "प्रोफ़ाइल फ़ोटो, थंबनेल और झटपट कंटेंट सामग्री।", cta: "स्टूडियो खोलें" },
    ],
    howEyebrow: "कैसे काम करता है",
    howHeading: "तीन कदम, सब आपके डिवाइस पर",
    steps: [
      { title: "फ़ोटो डालें", body: "खींचकर लाएँ या गैलरी से चुनें।" },
      { title: "AI आपके डिवाइस पर काटता है", body: "कुछ भी अपलोड नहीं होता।" },
      { title: "बैकग्राउंड चुनें और डाउनलोड करें", body: "पासपोर्ट फ़ोटो या कैटलॉग के लिए तैयार।" },
    ],
    facts: [
      "अपने-आप सूट फ़िट (MediaPipe Pose से कंधे की पहचान)",
      "0 MB क्विक मोड, मॉडल डाउनलोड नहीं",
      "{n} बैकग्राउंड लोकल सेव, बिना नेटवर्क चलते हैं",
    ],
    positioning: "छोटे व्यवसायों, फ़्रीलांसरों और कंटेंट क्रिएटरों के लिए, जिन्हें महँगे स्टूडियो के बिना प्रोफ़ेशनल फ़ोटो चाहिए।",
    ctaMicro: "अभी आज़माएँ - बिना साइन-अप",
  },
  ru: {
    useEyebrow: "Для чего",
    useHeading: "Три самые частые задачи",
    cases: [
      { title: "Строгое фото на документы", body: "Костюм графит, тёмно-синий или блейзер подгоняется автоматически по плечам; фон серый, белый, синий или красный.", cta: "Сделать фото на документы" },
      { title: "Каталог товаров", body: "Чистый студийный фон, готовый для интернет-магазина.", cta: "Сделать фото для каталога" },
      { title: "Авторы контента", body: "Аватарки, обложки и быстрые материалы для контента.", cta: "Открыть студию" },
    ],
    howEyebrow: "Как это работает",
    howHeading: "Три шага, всё на вашем устройстве",
    steps: [
      { title: "Добавьте фото", body: "Перетащите или выберите из галереи." },
      { title: "ИИ вырезает на вашем устройстве", body: "Ничего не загружается." },
      { title: "Выберите фон и скачайте", body: "Готово для документов или каталога." },
    ],
    facts: [
      "Автоподбор костюма (распознавание плеч MediaPipe Pose)",
      "Быстрый режим 0 МБ без загрузки модели",
      "{n} фонов хранятся локально и работают без сети",
    ],
    positioning: "Для малого бизнеса, фрилансеров и авторов контента, которым нужны профессиональные фото без дорогой студии.",
    ctaMicro: "Попробуйте сейчас - без регистрации",
  },
  ar: {
    useEyebrow: "لماذا تستخدمه",
    useHeading: "أكثر ثلاث مهام شيوعًا",
    cases: [
      { title: "صورة رسمية للوثائق", body: "بدلة فحمية أو كحلية أو بليزر تُركَّب تلقائيًا عبر اكتشاف الكتفين، مع خلفية رمادية أو بيضاء أو زرقاء أو حمراء.", cta: "أنشئ صورة وثائق" },
      { title: "كتالوج المنتجات", body: "خلفيات نظيفة بأسلوب الاستوديو، جاهزة لمتجرك الإلكتروني.", cta: "أنشئ صور الكتالوج" },
      { title: "صنّاع المحتوى", body: "صور الملف الشخصي والصور المصغرة ومواد المحتوى بسرعة.", cta: "افتح الاستوديو" },
    ],
    howEyebrow: "كيف يعمل",
    howHeading: "ثلاث خطوات، كلها على جهازك",
    steps: [
      { title: "أضف صورة", body: "اسحبها أو اخترها من المعرض." },
      { title: "الذكاء الاصطناعي يقص على جهازك", body: "لا يُرفع أي شيء." },
      { title: "اختر الخلفية ونزّل", body: "جاهزة للوثائق أو الكتالوج." },
    ],
    facts: [
      "تركيب البدلة تلقائيًا (اكتشاف الكتفين عبر MediaPipe Pose)",
      "وضع سريع 0 MB دون تنزيل نموذج",
      "{n} خلفية محفوظة محليًا وتعمل دون اتصال",
    ],
    positioning: "صُمم للمشاريع الصغيرة والمستقلين وصنّاع المحتوى الذين يحتاجون صورًا احترافية دون استوديو مكلف.",
    ctaMicro: "جرّبه الآن - دون تسجيل",
  },
};

/** Counted from public/offline/ (934 .webp files) on 2026-11-19. */
export const OFFLINE_BACKDROP_COUNT = 934;
