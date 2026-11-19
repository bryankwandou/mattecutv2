import type { LocaleCode } from "@/lib/i18n";

export type HeroVisualStrings = {
  /** Toggle button: portrait sample. */
  person: string;
  /** Toggle button: product sample. */
  product: string;
  /** Accessible name of the sample switcher group. */
  switchLabel: string;
  /** Caption under the live before/after preview. */
  caption: string;
};

export const heroVisualStrings: Record<LocaleCode, HeroVisualStrings> = {
  id: { person: "Potret", product: "Produk", switchLabel: "Pilih foto contoh", caption: "Contoh nyata, diproses di peramban" },
  en: { person: "Portrait", product: "Product", switchLabel: "Choose a sample photo", caption: "A real sample, processed in the browser" },
  ms: { person: "Potret", product: "Produk", switchLabel: "Pilih foto contoh", caption: "Contoh sebenar, diproses dalam pelayar" },
  es: { person: "Retrato", product: "Producto", switchLabel: "Elige una foto de ejemplo", caption: "Ejemplo real, procesado en el navegador" },
  pt: { person: "Retrato", product: "Produto", switchLabel: "Escolha uma foto de exemplo", caption: "Exemplo real, processado no navegador" },
  fr: { person: "Portrait", product: "Produit", switchLabel: "Choisir une photo d'exemple", caption: "Exemple réel, traité dans le navigateur" },
  de: { person: "Porträt", product: "Produkt", switchLabel: "Beispielfoto wählen", caption: "Echtes Beispiel, im Browser verarbeitet" },
  it: { person: "Ritratto", product: "Prodotto", switchLabel: "Scegli una foto di esempio", caption: "Esempio reale, elaborato nel browser" },
  nl: { person: "Portret", product: "Product", switchLabel: "Kies een voorbeeldfoto", caption: "Echt voorbeeld, verwerkt in de browser" },
  tr: { person: "Portre", product: "Ürün", switchLabel: "Örnek fotoğraf seçin", caption: "Gerçek örnek, tarayıcıda işlendi" },
  vi: { person: "Chân dung", product: "Sản phẩm", switchLabel: "Chọn ảnh mẫu", caption: "Ví dụ thật, xử lý ngay trong trình duyệt" },
  th: { person: "ภาพบุคคล", product: "สินค้า", switchLabel: "เลือกภาพตัวอย่าง", caption: "ตัวอย่างจริง ประมวลผลในเบราว์เซอร์" },
  ja: { person: "人物", product: "商品", switchLabel: "サンプル写真を選択", caption: "ブラウザ内で処理した実際の例" },
  ko: { person: "인물", product: "제품", switchLabel: "샘플 사진 선택", caption: "브라우저에서 처리한 실제 예시" },
  zh: { person: "人像", product: "产品", switchLabel: "选择示例照片", caption: "真实示例，在浏览器中处理" },
  hi: { person: "पोर्ट्रेट", product: "उत्पाद", switchLabel: "नमूना फ़ोटो चुनें", caption: "असली उदाहरण, ब्राउज़र में प्रोसेस किया गया" },
  ru: { person: "Портрет", product: "Товар", switchLabel: "Выберите пример фото", caption: "Реальный пример, обработан в браузере" },
  ar: { person: "صورة شخصية", product: "منتج", switchLabel: "اختر صورة نموذجية", caption: "مثال حقيقي، تمت معالجته في المتصفح" },
};
