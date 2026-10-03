'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

interface ProductItem {
  id: string;
  name: string;
  nameAr?: string;
  subName?: string;
  subNameAr?: string;
  imageUrl: string;
}

interface CategoryData {
  id: string;
  label: string;
  labelAr: string;
  productsRow1: ProductItem[];
  productsRow2: ProductItem[];
}

const categoriesData: CategoryData[] = [
  {
    id: 'vegetables',
    label: 'Vegetables',
    labelAr: 'الخضروات',
    productsRow1: [
      {
        id: 'tomatoes',
        name: 'Tomatoes',
        nameAr: 'طماطم',
        subName: '(Fresh Harvest)',
        subNameAr: '(حصاد طازج)',
        imageUrl: '/products/vegetables/tomatoes.jpg',
      },
      {
        id: 'capsicum',
        name: 'Capsicum',
        nameAr: 'فلفل رومي (كابسيكوم)',
        subName: '(Green, Red & Yellow)',
        subNameAr: '(أخضر وأحمر وأصفر)',
        imageUrl: '/products/vegetables/capsicum.jpg',
      },
      {
        id: 'cucumbers',
        name: 'Cucumbers',
        nameAr: 'خيار',
        subName: '(Greenhouse Sourced)',
        subNameAr: '(مصدر بيوت محمية)',
        imageUrl: '/products/vegetables/cucumbers.jpg',
      },
      {
        id: 'marrow-zucchini',
        name: 'Eggplant & Zucchini',
        nameAr: 'باذنجان وكوسا',
        subName: '(Marrow Selection)',
        subNameAr: '(مجموعة الكوسا)',
        imageUrl: '/products/vegetables/marrow-zucchini.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'cauliflower-cabbage',
        name: 'Cauliflower & Cabbage',
        nameAr: 'قرنبيط وملفوف',
        subName: '(Farm Select)',
        subNameAr: '(مختار من المزرعة)',
        imageUrl: '/products/vegetables/cauliflower.jpg',
      },
      {
        id: 'potatoes-onions',
        name: 'Potatoes & Onions',
        nameAr: 'بطاطس وبصل',
        subName: '(Crisp Quality)',
        subNameAr: '(جودة مقرمشة)',
        imageUrl: '/products/vegetables/potatoes.jpg',
      },
      {
        id: 'chilli-okra',
        name: 'Chilli & Okra',
        nameAr: 'فلفل حار وبامية',
        subName: '(Fresh Spice & Pods)',
        subNameAr: '(توابل وقرون طازجة)',
        imageUrl: '/products/vegetables/chilli.jpg',
      },
      {
        id: 'beans',
        name: 'Fresh Beans',
        nameAr: 'فاصوليا طازجة',
        subName: '(Green Harvest)',
        subNameAr: '(حصاد أخضر)',
        imageUrl: '/products/vegetables/beans.jpg',
      },
    ],
  },
  {
    id: 'fruits',
    label: 'Fruits',
    labelAr: 'الفواكه',
    productsRow1: [
      {
        id: 'melons',
        name: 'Watermelon & Sweet Melon',
        nameAr: 'بطيخ وشمام حلو',
        subName: '(Juicy Harvest)',
        subNameAr: '(حصاد مروي)',
        imageUrl: '/products/fruits/watermelon.jpg',
      },
      {
        id: 'citrus',
        name: 'Citrus Selection',
        nameAr: 'مختارات الحمضيات',
        subName: '(Orange, Lemon, Lime, Mandarin)',
        subNameAr: '(برتقال، ليمون، ليمون حامض، يوسفي)',
        imageUrl: '/products/fruits/citrus.jpg',
      },
      {
        id: 'stone-fruit',
        name: 'Stone Fruit',
        nameAr: 'فواكه ذات نواة',
        subName: '(Peach, Nectarine, Plum, Cherry)',
        subNameAr: '(خوخ، نكتارين، برقوق، كرز)',
        imageUrl: '/products/fruits/stone-fruit.jpg',
      },
      {
        id: 'grapes',
        name: 'Fresh Grapes',
        nameAr: 'عنب طازج',
        subName: '(Red & Green Seedless)',
        subNameAr: '(أحمر وأخضر بدون بذور)',
        imageUrl: '/products/fruits/table-grapes.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'mango',
        name: 'Fresh Mango',
        nameAr: 'مانجو طازج',
        subName: '(Seasonal Selection)',
        subNameAr: '(تشكيلة موسمية)',
        imageUrl: '/products/fruits/mango.jpg',
      },
      {
        id: 'berries',
        name: 'Strawberries & Berries',
        nameAr: 'فراولة وتوتيات',
        subName: '(Fresh Blueberries & Strawberries)',
        subNameAr: '(توت أزرق وفراولة طازجة)',
        imageUrl: '/products/fruits/berries.jpg',
      },
      {
        id: 'pomegranate',
        name: 'Pomegranate',
        nameAr: 'رمان',
        subName: '(Ruby Red Seeds)',
        subNameAr: '(بذور حمراء ياقوتية)',
        imageUrl: '/products/fruits/ruby-pomegranate.jpg',
      },
      {
        id: 'avocado',
        name: 'Avocado',
        nameAr: 'أفوكادو',
        subName: '(Fresh Selection)',
        subNameAr: '(تشكيلة طازجة)',
        imageUrl: '/products/fruits/avocado.jpg',
      },
    ],
  },
  {
    id: 'leafy-herbs',
    label: 'Leafy & Herbs',
    labelAr: 'الورقيات والأعشاب',
    productsRow1: [
      {
        id: 'lettuce-romaine-iceberg',
        name: 'Lettuce Romaine & Iceberg',
        nameAr: 'خس روماني وآيسبيرغ',
        subName: '(Crisp Leaf Selection)',
        subNameAr: '(مختارات أوراق مقرمشة)',
        imageUrl: '/products/leafy-herbs/lettuce.jpg',
      },
      {
        id: 'broccoli-fresh',
        name: 'Broccoli',
        nameAr: 'بروكلي',
        subName: '(Farm Fresh Florets)',
        subNameAr: '(زهيرات طازجة من المزرعة)',
        imageUrl: '/products/leafy-herbs/broccoli.jpg',
      },
      {
        id: 'radish-beetroot',
        name: 'Radish & Beetroot',
        nameAr: 'فجل وشمندر',
        subName: '(Fresh Root Harvest)',
        subNameAr: '(حصاد جذور طازجة)',
        imageUrl: '/products/leafy-herbs/radish.jpg',
      },
      {
        id: 'fresh-coriander-mint',
        name: 'Fresh Coriander & Mint',
        nameAr: 'كزبرة ونعناع طازج',
        subName: '(Aromatic Herbs)',
        subNameAr: '(أعشاب عطرية)',
        imageUrl: '/products/leafy-herbs/coriander-mint.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'sweet-basil-leaf',
        name: 'Sweet Basil',
        nameAr: 'ريحان حلو',
        subName: '(Fragrant Kitchen Herb)',
        subNameAr: '(عشبة طهي فواحة)',
        imageUrl: '/products/leafy-herbs/basil.jpg',
      },
      {
        id: 'flat-parsley',
        name: 'Flat Parsley',
        nameAr: 'بقدونس مسطح',
        subName: '(Mediterranean Bunch)',
        subNameAr: '(باقة البحر الأبيض المتوسط)',
        imageUrl: '/products/leafy-herbs/parsley.jpg',
      },
      {
        id: 'thyme-rosemary-pair',
        name: 'Thyme & Rosemary',
        nameAr: 'زعتر وإكليل الجبل',
        subName: '(Culinary Pair)',
        subNameAr: '(ثنائي الطهي)',
        imageUrl: '/products/leafy-herbs/thyme-rosemary.jpg',
      },
      {
        id: 'fresh-herbs-mix',
        name: 'Fresh Herbs',
        nameAr: 'أعشاب طازجة',
        subName: '(Dill, Sage & Tarragon)',
        subNameAr: '(شبت، ميرمية وطرخون)',
        imageUrl: '/products/leafy-herbs/fresh-herbs.jpg',
      },
    ],
  },
  {
    id: 'specialty-gourmet',
    label: 'Specialty & Gourmet',
    labelAr: 'أصناف خاصة وفاخرة',
    productsRow1: [
      {
        id: 'baby-leaves',
        name: 'Baby Leaves',
        nameAr: 'أوراق صغيرة',
        subName: '(Tender Gourmet Mix)',
        subNameAr: '(مزيج ذواقة غض)',
        imageUrl: '/products/specialty-gourmet/baby-leaves.jpg',
      },
      {
        id: 'exotic-mushrooms',
        name: 'Exotic Mushrooms',
        nameAr: 'فطر استوائي',
        subName: '(Shiitake, Oyster & Morels)',
        subNameAr: '(شيتاكي، محار وموريل)',
        imageUrl: '/products/specialty-gourmet/fresh-mushrooms.jpg',
      },
      {
        id: 'passion-fruit-gourmet',
        name: 'Passion Fruit',
        nameAr: 'باشن فروت',
        subName: '(Purple Selection)',
        subNameAr: '(تشكيلة أرجوانية)',
        imageUrl: '/products/specialty-gourmet/purple-passion-fruit.jpg',
      },
      {
        id: 'lychee-rambutan',
        name: 'Lychee & Rambutan',
        nameAr: 'ليتشي ورامبوتان',
        subName: '(Air Freight Import)',
        subNameAr: '(استيراد شحن جوي)',
        imageUrl: '/products/specialty-gourmet/fresh-lychee.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'dragon-fruit-exotic',
        name: 'Dragon Fruit',
        nameAr: 'دراجون فروت',
        subName: '(Red & White)',
        subNameAr: '(أحمر وأبيض)',
        imageUrl: '/products/specialty-gourmet/dragon-fruit.jpg',
      },
      {
        id: 'black-figs-gourmet',
        name: 'Black Figs',
        nameAr: 'تين أسود',
        subName: '(Turkish Import)',
        subNameAr: '(استيراد تركي)',
        imageUrl: '/products/specialty-gourmet/black-figs.jpg',
      },
      {
        id: 'golden-apricots-gourmet',
        name: 'Golden Apricots',
        nameAr: 'مشمش ذهبي',
        subName: '(Uzbekistan)',
        subNameAr: '(أوزبكستان)',
        imageUrl: '/products/specialty-gourmet/golden-apricots.jpg',
      },
      {
        id: 'seasonal-specialities',
        name: 'Seasonal Specialties',
        nameAr: 'أصناف موسمية خاصة',
        subName: '(Curated Exotics)',
        subNameAr: '(أصناف استوائية منتقاة)',
        imageUrl: '/products/specialty-gourmet/seasonal-specialties.jpg',
      },
    ],
  },
];

export function Products() {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const prefix = locale === 'ar' ? '/ar' : '';
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [fadeState, setFadeState] = useState<'visible' | 'fading'>('visible');

  const containerRef = useRef<HTMLDivElement>(null);
  const userPauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const activeCategory = categoriesData[categoryIndex];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCategorySelect = (index: number) => {
    if (index === categoryIndex) return;
    setFadeState('fading');
    setTimeout(() => {
      setCategoryIndex(index);
      setFadeState('visible');
    }, 150);

    setIsPaused(true);
    if (userPauseTimerRef.current) {
      clearTimeout(userPauseTimerRef.current);
    }
    // Pause auto-rotation for 12 seconds when user manually selects a tab
    userPauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 12000);
  };

  useEffect(() => {
    return () => {
      if (userPauseTimerRef.current) {
        clearTimeout(userPauseTimerRef.current);
      }
    };
  }, []);

  // Auto rotate categories smoothly only when in view and not hovered or interacting
  useEffect(() => {
    if (isPaused || !isInView) return;

    const interval = setInterval(() => {
      setFadeState('fading');
      setTimeout(() => {
        setCategoryIndex((prev) => (prev + 1) % categoriesData.length);
        setFadeState('visible');
      }, 150);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, isInView]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Horizontal swipe gesture check
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swipe Left -> Next Category (or prev if RTL)
        const nextIdx = isAr
          ? (categoryIndex - 1 + categoriesData.length) % categoriesData.length
          : (categoryIndex + 1) % categoriesData.length;
        handleCategorySelect(nextIdx);
      } else {
        // Swipe Right -> Prev Category (or next if RTL)
        const prevIdx = isAr
          ? (categoryIndex + 1) % categoriesData.length
          : (categoryIndex - 1 + categoriesData.length) % categoriesData.length;
        handleCategorySelect(prevIdx);
      }
    }
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true,
        },
      });

      tl.fromTo(
        '.product-header-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
      ).fromTo(
        '.product-gallery-wrapper',
        { opacity: 0, y: 20, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.25'
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="products" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 pt-12 sm:pt-16 2xl:pt-20 pb-4 sm:pb-6 2xl:pb-8 bg-white text-neutral-900 overflow-hidden">
      <div className="w-full space-y-6 sm:space-y-8 2xl:space-y-10 px-0">

        {/* Section Header */}
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center space-y-3 px-4">
          <div className="product-header-item flex justify-center">
            <SectionEyebrow title={isAr ? 'منتجاتنا' : 'OUR PRODUCTS'} />
          </div>

          <h2 className="product-header-item font-display type-h2 font-semibold text-[#111814]">
            {isAr ? 'نضارة، تم توريدها من جميع أنحاء العالم.' : 'Freshness, Sourced From Around the World.'}
          </h2>

          {/* Interactive Category Selector Pills with True Filtering */}
          <div className="product-header-item flex flex-wrap items-center justify-center gap-2 pt-2">
            {categoriesData.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(idx)}
                className={`font-sans text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  categoryIndex === idx
                    ? 'bg-[#168849] text-white shadow-md shadow-[#168849]/25 scale-105'
                    : 'bg-[#F4F6F5] text-[#6B7280] hover:text-[#111814] hover:bg-[#eaecea]'
                }`}
              >
                {isAr ? cat.labelAr : cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 100% Edge-to-Edge Full Width Product Showcase Gallery Container with True Filtering */}
        <div
          dir="ltr"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`product-gallery-wrapper relative w-full rounded-none overflow-hidden bg-white flex flex-col gap-0 select-none transition-all duration-200 ${
            fadeState === 'visible' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.995]'
          }`}
        >
          {/* ROW 1: Active Category Products */}
          <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-0 bg-white">
            {activeCategory.productsRow1.map((item, itemIndex) => {
              const itemName = isAr && item.nameAr ? item.nameAr : item.name;
              const itemSubName = isAr && item.subNameAr ? item.subNameAr : item.subName;

              return (
                <Link
                  key={item.id}
                  href={`${prefix}/products/${activeCategory.id}`}
                  className={`group relative aspect-square w-full overflow-hidden bg-white cursor-pointer flex flex-col justify-end p-2 xs:p-3 sm:p-5 md:p-6 lg:p-7 ${
                    itemIndex >= 2 ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  {/* Full-bleed Product Image */}
                  <Image
                    src={item.imageUrl}
                    alt={itemName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                    className="object-cover scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform transform-gpu"
                    loading="lazy"
                  />

                  {/* Dark Gradient Bottom Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 pointer-events-none" />

                  {/* Bottom Title Text Overlay */}
                  <div
                    className="relative z-10 text-center space-y-0.5 sm:space-y-1"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    <h3 className="font-display font-semibold text-[11px] xs:text-xs sm:text-base md:text-lg text-white drop-shadow-md tracking-[-0.015em] leading-tight">
                      {itemName}
                    </h3>
                    {itemSubName && (
                      <p className="font-sans text-[9px] xs:text-[10px] sm:text-xs text-white/80 font-normal drop-shadow-sm leading-tight">
                        {itemSubName}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ROW 2: Active Category Products */}
          <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-0 bg-white">
            {activeCategory.productsRow2.map((item, itemIndex) => {
              const itemName = isAr && item.nameAr ? item.nameAr : item.name;
              const itemSubName = isAr && item.subNameAr ? item.subNameAr : item.subName;

              return (
                <Link
                  key={item.id}
                  href={`${prefix}/products/${activeCategory.id}`}
                  className={`group relative aspect-square w-full overflow-hidden bg-white cursor-pointer flex flex-col justify-end p-2 xs:p-3 sm:p-5 md:p-6 lg:p-7 ${
                    itemIndex >= 2 ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  {/* Full-bleed Product Image */}
                  <Image
                    src={item.imageUrl}
                    alt={itemName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                    className="object-cover scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform transform-gpu"
                    loading="lazy"
                  />

                  {/* Dark Gradient Bottom Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 pointer-events-none" />

                  {/* Bottom Title Text Overlay */}
                  <div
                    className="relative z-10 text-center space-y-0.5 sm:space-y-1"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    <h3 className="font-display font-semibold text-[11px] xs:text-xs sm:text-base md:text-lg text-white drop-shadow-md tracking-[-0.015em] leading-tight">
                      {itemName}
                    </h3>
                    {itemSubName && (
                      <p className="font-sans text-[9px] xs:text-[10px] sm:text-xs text-white/80 font-normal drop-shadow-sm leading-tight">
                        {itemSubName}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
