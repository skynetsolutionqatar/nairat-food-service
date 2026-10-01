/**
 * Nairat Food Services — Official Global Sourcing & Origins Data (2026)
 * Source of truth for regional sourcing networks, origin countries, and supply lines.
 */

export interface SourcingRegion {
  id: string;
  name: string;
  nameAr: string;
  originsCount: number;
  productsCount: number;
  countries: {
    name: string;
    nameAr: string;
    flag?: string;
    productCount?: number;
    keyLines: string[];
    keyLinesAr: string[];
  }[];
}

export const sourcingRegions: SourcingRegion[] = [
  {
    id: 'middle-east',
    name: 'Middle East',
    nameAr: 'الشرق الأوسط',
    originsCount: 9,
    productsCount: 241,
    countries: [
      {
        name: 'Qatar',
        nameAr: 'قطر',
        flag: '/flags/qatar.svg',
        productCount: 22,
        keyLines: ['Cucumbers', 'Tomatoes', 'Capsicums', 'Eggplants', 'Local Field Greens'],
        keyLinesAr: ['خيار', 'طماطم', 'فلفل رومي', 'باذنجان', 'خضروات ورقية حقلية محلية'],
      },
      {
        name: 'Jordan',
        nameAr: 'الأردن',
        flag: '/flags/jordan.svg',
        productCount: 41,
        keyLines: ['Tomatoes', 'Cucumbers', 'Stone Fruits', 'Bell Peppers', 'Herbs'],
        keyLinesAr: ['طماطم', 'خيار', 'فواكه ذات نواة حجرية', 'فلفل حلو', 'أعشاب'],
      },
      {
        name: 'Saudi Arabia',
        nameAr: 'المملكة العربية السعودية',
        flag: '/flags/saudi-arabia.svg',
        productCount: 33,
        keyLines: ['Premium Dates', 'Hydroponic Greens', 'Seasonal Field Crops', 'Melons'],
        keyLinesAr: ['تمور فاخرة', 'ورقيات بالزراعة المائية', 'محاصيل حقلية موسمية', 'بطيخ وشمام'],
      },
      {
        name: 'Lebanon',
        nameAr: 'لبنان',
        flag: '/flags/lebanon.svg',
        productCount: 31,
        keyLines: ['Mountain Apples', 'Cherries', 'Peaches', 'Pears', 'Vine Leaves'],
        keyLinesAr: ['تفاح جبلي', 'كرز', 'خوخ', 'كمثرى', 'ورق عنب'],
      },
      {
        name: 'Iran',
        nameAr: 'إيران',
        flag: '/flags/iran.svg',
        productCount: 36,
        keyLines: ['Watermelons', 'Pomegranates', 'Pistachios', 'Apples', 'Saffron'],
        keyLinesAr: ['بطيخ', 'رمان', 'فستق حلبي', 'تفاح', 'زعفران'],
      },
      {
        name: 'Syria',
        nameAr: 'سوريا',
        flag: '/flags/syria.svg',
        productCount: 27,
        keyLines: ['Citrus', 'Stone Fruits', 'Pomegranates', 'Seasonal Roots'],
        keyLinesAr: ['حمضيات', 'فواكه ذات نواة حجرية', 'رمان', 'جذور موسمية'],
      },
      {
        name: 'Turkey',
        nameAr: 'تركيا',
        productCount: 22,
        keyLines: ['Apples', 'Cherries', 'Citrus', 'Quince', 'Chestnuts'],
        keyLinesAr: ['تفاح', 'كرز', 'حمضيات', 'سفرجل', 'كستناء'],
      },
      {
        name: 'Oman',
        nameAr: 'عمان',
        productCount: 22,
        keyLines: ['Melons', 'Watermelons', 'Chillies', 'Field Vegetables'],
        keyLinesAr: ['شمام', 'بطيخ', 'فلفل حار', 'خضروات حقلية'],
      },
      {
        name: 'Yemen',
        nameAr: 'اليمن',
        productCount: 7,
        keyLines: ['Mangoes', 'Jumbo Pomegranates', 'Watermelons', 'Dry Onions'],
        keyLinesAr: ['مانجو', 'رمان جامبو', 'بطيخ', 'بصل جاف'],
      },
    ],
  },
  {
    id: 'africa',
    name: 'Africa',
    nameAr: 'إفريقيا',
    originsCount: 12,
    productsCount: 78,
    countries: [
      {
        name: 'Egypt',
        nameAr: 'مصر',
        flag: '/flags/egypt.svg',
        productCount: 20,
        keyLines: ['Valencia Oranges', 'Dry Onions', 'Potatoes', 'Mangoes', 'Strawberries'],
        keyLinesAr: ['برتقال فالنسيا', 'بصل جاف', 'بطاطس', 'مانجو', 'فراولة'],
      },
      {
        name: 'South Africa',
        nameAr: 'جنوب إفريقيا',
        flag: '/flags/south-africa.svg',
        productCount: 22,
        keyLines: ['Table Grapes', 'Navel Citrus', 'Pears', 'Stone Fruits', 'Apples'],
        keyLinesAr: ['عنب مائدة', 'حمضيات نافل', 'كمثرى', 'فواكه ذات نواة حجرية', 'تفاح'],
      },
      {
        name: 'Morocco',
        nameAr: 'المغرب',
        productCount: 18,
        keyLines: ['Nadorcott Mandarins', 'Blueberries', 'Cherry Tomatoes', 'Fagga Truffles'],
        keyLinesAr: ['يوسفي نادركوت', 'توت أزرق', 'طماطم كرزية', 'كمأة الفقع'],
      },
      {
        name: 'Kenya',
        nameAr: 'كينيا',
        productCount: 5,
        keyLines: ['Hass Avocados', 'Fine Green Beans', 'Fresh Culinary Herbs'],
        keyLinesAr: ['أفوكادو هاس', 'فاصوليا خضراء رفيعة', 'أعشاب طهي طازجة'],
      },
    ],
  },
  {
    id: 'europe-central-asia',
    name: 'Europe & Central Asia',
    nameAr: 'أوروبا وآسيا الوسطى',
    originsCount: 18,
    productsCount: 91,
    countries: [
      {
        name: 'Netherlands',
        nameAr: 'هولندا',
        productCount: 28,
        keyLines: ['Specialty Tomatoes', 'Exotic Mushrooms', 'Cress & Microgreens', 'Capsicums'],
        keyLinesAr: ['طماطم متخصصة', 'فطر غريب', 'حب الرشاد وميكروجرين', 'فلفل رومي'],
      },
      {
        name: 'Spain',
        nameAr: 'إسبانيا',
        productCount: 23,
        keyLines: ['Citrus', 'Stone Fruits', 'Broccoli', 'Berries', 'Little Gem Lettuce'],
        keyLinesAr: ['حمضيات', 'فواكه ذات نواة حجرية', 'بروكلي', 'توتيات', 'خس ليتل جيم'],
      },
      {
        name: 'Italy',
        nameAr: 'إيطاليا',
        productCount: 10,
        keyLines: ['Apples', 'Grapes', 'Kiwi', 'Mesclun Salad Leaves', 'Culinary Herbs'],
        keyLinesAr: ['تفاح', 'عنب', 'كيوي', 'أوراق سلطة ميسكلون', 'أعشاب طهي'],
      },
      {
        name: 'France',
        nameAr: 'فرنسا',
        productCount: 7,
        keyLines: ['Gourmet Apples', 'Artichokes', 'Shallots', 'Romanesco Cauliflower'],
        keyLinesAr: ['تفاح فاخر', 'خرشوف', 'كراث أندلسي (شالوت)', 'قرنبيط رومانيسكو'],
      },
    ],
  },
  {
    id: 'asia',
    name: 'Asia',
    nameAr: 'آسيا',
    originsCount: 9,
    productsCount: 109,
    countries: [
      {
        name: 'India',
        nameAr: 'الهند',
        productCount: 45,
        keyLines: ['Red Onions', 'Royal Mangoes', 'Table Grapes', 'Hot Chillies', 'Okra'],
        keyLinesAr: ['بصل أحمر', 'مانجو ملكي', 'عنب مائدة', 'فلفل حار', 'بامية'],
      },
      {
        name: 'Thailand',
        nameAr: 'تايلاند',
        productCount: 25,
        keyLines: ['Exotic Fruits', 'Baby Corn', 'Lemongrass', 'Ginger & Galangal'],
        keyLinesAr: ['فواكه غريبة', 'ذرة صغيرة', 'عشبة الليمون', 'زنجبيل وخولنجان'],
      },
      {
        name: 'Vietnam',
        nameAr: 'فيتنام',
        productCount: 12,
        keyLines: ['Dragon Fruit (Pitaya)', 'Passion Fruit', 'Seedless Limes'],
        keyLinesAr: ['فاكهة التنين (بيتايا)', 'فاكهة زهرة الآلام (باشن فروت)', 'ليمون بدون بذور'],
      },
    ],
  },
  {
    id: 'americas',
    name: 'Americas',
    nameAr: 'الأمريكتان',
    originsCount: 10,
    productsCount: 47,
    countries: [
      {
        name: 'United States',
        nameAr: 'الولايات المتحدة',
        productCount: 15,
        keyLines: ['Washington Apples', 'Strawberries', 'Valencia Oranges', 'Lettuce'],
        keyLinesAr: ['تفاح واشنطن', 'فراولة', 'برتقال فالنسيا', 'خس'],
      },
      {
        name: 'Chile',
        nameAr: 'تشيلي',
        productCount: 12,
        keyLines: ['Off-Season Cherries', 'Table Grapes', 'Blueberries', 'Kiwi'],
        keyLinesAr: ['كرز خارج الموسم', 'عنب مائدة', 'توت أزرق', 'كيوي'],
      },
      {
        name: 'Ecuador & Colombia',
        nameAr: 'الإكوادور وكولومبيا',
        productCount: 10,
        keyLines: ['Exotic Passiflora', 'Bananas', 'Physalis'],
        keyLinesAr: ['باسيفلورا غريبة', 'موز', 'حرنكش (فيزاليس)'],
      },
    ],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    nameAr: 'أوقيانوسيا',
    originsCount: 2,
    productsCount: 13,
    countries: [
      {
        name: 'Australia',
        nameAr: 'أستراليا',
        productCount: 8,
        keyLines: ['Grapes', 'Citrus', 'Carrots'],
        keyLinesAr: ['عنب', 'حمضيات', 'جزر'],
      },
      {
        name: 'New Zealand',
        nameAr: 'نيوزيلندا',
        productCount: 5,
        keyLines: ['Gold & Green Kiwi', 'Envy & Jazz Apples'],
        keyLinesAr: ['كيوي ذهبي وأخضر', 'تفاح إنفي وجاز'],
      },
    ],
  },
];

export const coreSourcingSummary = {
  activeProduceLines: '1,200+',
  dailyVolumeTonnes: '~100 t',
  coreOriginsCount: '15+',
  globalOriginsCount: '60',
  continentsCount: '6',
  retailBranchesSupplied: '100+',
  warehouseSqM: '5,000 m²',
  fleetVehiclesCount: '40',
};
