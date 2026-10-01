'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
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
    labelAr: 'خضروات',
    productsRow1: [
      {
        id: 'tomatoes',
        name: 'Tomatoes',
        nameAr: 'طماطم طازجة',
        subName: '(Fresh Harvest)',
        subNameAr: '(حصاد يومي)',
        imageUrl: '/products/vegetables/tomatoes.jpg',
      },
      {
        id: 'capsicum',
        name: 'Capsicum',
        nameAr: 'فلفل ألوان',
        subName: '(Green, Red & Yellow)',
        subNameAr: '(أخضر، أحمر، أصفر)',
        imageUrl: '/products/vegetables/capsicum.jpg',
      },
      {
        id: 'cucumbers',
        name: 'Cucumbers',
        nameAr: 'خيار بيوت محمية',
        subName: '(Greenhouse Sourced)',
        subNameAr: '(إنتاج محمي)',
        imageUrl: '/products/vegetables/cucumbers.jpg',
      },
      {
        id: 'marrow-zucchini',
        name: 'Eggplant & Zucchini',
        nameAr: 'باذنجان وكوسا',
        subName: '(Marrow Selection)',
        subNameAr: '(تشكيلة ممتازة)',
        imageUrl: '/products/vegetables/marrow-zucchini.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'cauliflower-cabbage',
        name: 'Cauliflower & Cabbage',
        nameAr: 'زهرة وملفوف',
        subName: '(Farm Select)',
        subNameAr: '(مزارع معتمدة)',
        imageUrl: '/products/vegetables/cauliflower.jpg',
      },
      {
        id: 'potatoes-onions',
        name: 'Potatoes & Onions',
        nameAr: 'بطاطس وبصل',
        subName: '(Crisp Quality)',
        subNameAr: '(جودة مائدة)',
        imageUrl: '/products/vegetables/potatoes.jpg',
      },
      {
        id: 'chilli-okra',
        name: 'Chilli & Okra',
        nameAr: 'فلفل وبامية',
        subName: '(Fresh Spice & Pods)',
        subNameAr: '(طازج ومختار)',
        imageUrl: '/products/vegetables/chilli.jpg',
      },
      {
        id: 'beans',
        name: 'Fresh Beans',
        nameAr: 'فاصوليا خضراء',
        subName: '(Green Harvest)',
        subNameAr: '(حصاد طازج)',
        imageUrl: '/products/vegetables/beans.jpg',
      },
    ],
  },
  {
    id: 'fruits',
    label: 'Fruits',
    labelAr: 'فواكه',
    productsRow1: [
      {
        id: 'melons',
        name: 'Watermelon & Sweet Melon',
        nameAr: 'بطيخ وشمام',
        subName: '(Juicy Harvest)',
        subNameAr: '(حلاوة طبيعية)',
        imageUrl: '/products/fruits/watermelon.jpg',
      },
      {
        id: 'citrus',
        name: 'Citrus Selection',
        nameAr: 'حمضيات مختارة',
        subName: '(Orange, Lemon, Lime, Mandarin)',
        subNameAr: '(برتقال، ليمون، يوسفي)',
        imageUrl: '/products/fruits/citrus.jpg',
      },
      {
        id: 'stone-fruit',
        name: 'Stone Fruit',
        nameAr: 'فواكه صيفية',
        subName: '(Peach, Nectarine, Plum, Cherry)',
        subNameAr: '(خوخ، دراق، كرز)',
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
        nameAr: 'مانجو فاخر',
        subName: '(Seasonal Selection)',
        subNameAr: '(موسمي ممتاز)',
        imageUrl: '/products/fruits/mango.jpg',
      },
      {
        id: 'berries',
        name: 'Strawberries & Berries',
        nameAr: 'فراولة وتوتيات',
        subName: '(Fresh Blueberries & Strawberries)',
        subNameAr: '(توت وفراولة طازجة)',
        imageUrl: '/products/fruits/berries.jpg',
      },
      {
        id: 'pomegranate',
        name: 'Pomegranate',
        nameAr: 'رمان ياقوتي',
        subName: '(Ruby Red Seeds)',
        subNameAr: '(حبوب ياقوتية)',
        imageUrl: '/products/fruits/ruby-pomegranate.jpg',
      },
      {
        id: 'avocado',
        name: 'Avocado',
        nameAr: 'أفوكادو طازج',
        subName: '(Fresh Selection)',
        subNameAr: '(جودة كريمية)',
        imageUrl: '/products/fruits/avocado.jpg',
      },
    ],
  },
  {
    id: 'leafy-herbs',
    label: 'Leafy & Herbs',
    labelAr: 'ورقيات وأعشاب',
    productsRow1: [
      {
        id: 'lettuce-romaine-iceberg',
        name: 'Lettuce Romaine & Iceberg',
        nameAr: 'خس روماني وآيسبيرغ',
        subName: '(Crisp Leaf Selection)',
        subNameAr: '(أوراق مقرمشة)',
        imageUrl: '/products/leafy-herbs/lettuce.jpg',
      },
      {
        id: 'broccoli-fresh',
        name: 'Broccoli',
        nameAr: 'بروكلي أخضر',
        subName: '(Farm Fresh Florets)',
        subNameAr: '(طازج من المزرعة)',
        imageUrl: '/products/leafy-herbs/broccoli.jpg',
      },
      {
        id: 'radish-beetroot',
        name: 'Radish & Beetroot',
        nameAr: 'فجل وشمندر',
        subName: '(Fresh Root Harvest)',
        subNameAr: '(محاصيل جذرية طازجة)',
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
        nameAr: 'ريحان إيطالي',
        subName: '(Italian Genovese)',
        subNameAr: '(جينوفيز أصلي)',
        imageUrl: '/products/leafy-herbs/basil.jpg',
      },
      {
        id: 'flat-parsley',
        name: 'Flat Parsley',
        nameAr: 'بقدونس بلدي',
        subName: '(Mediterranean Bunch)',
        subNameAr: '(باقات طازجة)',
        imageUrl: '/products/leafy-herbs/parsley.jpg',
      },
      {
        id: 'thyme-rosemary-pair',
        name: 'Thyme & Rosemary',
        nameAr: 'زعتر وإكليل الجبل',
        subName: '(Culinary Pair)',
        subNameAr: '(أعشاب فاخرة)',
        imageUrl: '/products/leafy-herbs/thyme-rosemary.jpg',
      },
      {
        id: 'fresh-herbs-mix',
        name: 'Fresh Herbs',
        nameAr: 'أعشاب منوعة',
        subName: '(Dill, Sage & Tarragon)',
        subNameAr: '(شبت، ميرمية، طرخون)',
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
        nameAr: 'ميكروجرين وأوراق صغيرة',
        subName: '(Tender Gourmet Mix)',
        subNameAr: '(تشكيلة راقية)',
        imageUrl: '/products/specialty-gourmet/baby-leaves.jpg',
      },
      {
        id: 'exotic-mushrooms',
        name: 'Exotic Mushrooms',
        nameAr: 'فطر فاخر (مشروم)',
        subName: '(Shiitake, Oyster & Morels)',
        subNameAr: '(شيتاكي، محار، بورتوبيلو)',
        imageUrl: '/products/specialty-gourmet/fresh-mushrooms.jpg',
      },
      {
        id: 'passion-fruit-gourmet',
        name: 'Passion Fruit',
        nameAr: 'باشن فروت',
        subName: '(Purple Selection)',
        subNameAr: '(مستورد جواً)',
        imageUrl: '/products/specialty-gourmet/purple-passion-fruit.jpg',
      },
      {
        id: 'lychee-rambutan',
        name: 'Lychee & Rambutan',
        nameAr: 'ليتشي ورامبوتان',
        subName: '(Air Freight Import)',
        subNameAr: '(طازج ومبرد)',
        imageUrl: '/products/specialty-gourmet/fresh-lychee.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'dragon-fruit-exotic',
        name: 'Dragon Fruit',
        nameAr: 'دراجون فروت (بيتايا)',
        subName: '(Red & White)',
        subNameAr: '(أحمر وأبيض)',
        imageUrl: '/products/specialty-gourmet/dragon-fruit.jpg',
      },
      {
        id: 'black-figs-gourmet',
        name: 'Black Figs',
        nameAr: 'تين أسود فاخر',
        subName: '(Turkish Import)',
        subNameAr: '(مستورد من تركيا)',
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
        nameAr: 'أصناف موسمية نادرة',
        subName: '(Curated Exotics)',
        subNameAr: '(مختارة للمطاعم الراقية)',
        imageUrl: '/products/specialty-gourmet/seasonal-specialties.jpg',
      },
    ],
  },
];

export function Products() {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const userPauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleCategorySelect = (index: number) => {
    setCategoryIndex(index);
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

  // Auto scroll category selection smoothly when not dragging/hovering
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % categoriesData.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  // Smoothly scroll card track when categoryIndex changes (when not actively dragging)
  useEffect(() => {
    if (!isDownRef.current && row1Ref.current && row2Ref.current) {
      const rowWidth = row1Ref.current.clientWidth;
      row1Ref.current.scrollTo({ left: categoryIndex * rowWidth, behavior: 'smooth' });
      row2Ref.current.scrollTo({ left: categoryIndex * rowWidth, behavior: 'smooth' });
    }
  }, [categoryIndex]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDownRef.current = true;
    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = e.pageX;
    if (row1Ref.current) {
      scrollLeftRef.current = row1Ref.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !row1Ref.current || !row2Ref.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startXRef.current) * 1.3;
    row1Ref.current.scrollLeft = scrollLeftRef.current - walk;
    row2Ref.current.scrollLeft = scrollLeftRef.current - walk;

    const rowWidth = row1Ref.current.clientWidth;
    const nearestIndex = Math.min(
      Math.max(0, Math.round(row1Ref.current.scrollLeft / rowWidth)),
      categoriesData.length - 1
    );
    if (nearestIndex !== categoryIndex) {
      setCategoryIndex(nearestIndex);
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDragging(false);

    if (row1Ref.current && row2Ref.current) {
      const rowWidth = row1Ref.current.clientWidth;
      const finalIndex = Math.min(
        Math.max(0, Math.round(row1Ref.current.scrollLeft / rowWidth)),
        categoriesData.length - 1
      );
      setCategoryIndex(finalIndex);
      row1Ref.current.scrollTo({ left: finalIndex * rowWidth, behavior: 'smooth' });
      row2Ref.current.scrollTo({ left: finalIndex * rowWidth, behavior: 'smooth' });
    }
  };

  // Touch Handlers for Mobile / Trackpad
  const handleTouchStart = (e: React.TouchEvent) => {
    isDownRef.current = true;
    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = e.touches[0].pageX;
    if (row1Ref.current) {
      scrollLeftRef.current = row1Ref.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDownRef.current || !row1Ref.current || !row2Ref.current) return;
    const x = e.touches[0].pageX;
    const walk = (x - startXRef.current) * 1.3;
    row1Ref.current.scrollLeft = scrollLeftRef.current - walk;
    row2Ref.current.scrollLeft = scrollLeftRef.current - walk;

    const rowWidth = row1Ref.current.clientWidth;
    const nearestIndex = Math.min(
      Math.max(0, Math.round(row1Ref.current.scrollLeft / rowWidth)),
      categoriesData.length - 1
    );
    if (nearestIndex !== categoryIndex) {
      setCategoryIndex(nearestIndex);
    }
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      });

      tl.fromTo(
        '.product-header-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      ).fromTo(
        '.product-gallery-wrapper',
        { opacity: 0, y: 30, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
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
            {isAr ? 'طزاجة فائقة، مستوردة من أنحاء العالم.' : 'Freshness, Sourced From Around the World.'}
          </h2>

          {/* Interactive Category Selector Pills */}
          <div className="product-header-item flex flex-wrap items-center justify-center gap-2 pt-2">
            {categoriesData.map((cat, idx) => (
              <button
                key={cat.id}
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

        {/* 100% Edge-to-Edge Full Width Product Showcase Gallery Container with Drag to Scroll */}
        <div
          dir="ltr"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseUpOrLeave();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          className={`product-gallery-wrapper relative w-full rounded-none overflow-hidden bg-white flex flex-col gap-0 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* ROW 1: Horizontal Card Scroll Track */}
          <div
            ref={row1Ref}
            className="flex flex-row overflow-x-hidden scroll-smooth w-full"
          >
            {categoriesData.map((cat) => (
              <div
                key={`row1-${cat.id}`}
                className="grid grid-cols-2 sm:grid-cols-4 min-w-full flex-shrink-0 gap-0"
              >
                {cat.productsRow1.map((item, itemIndex) => {
                  const itemName = isAr && item.nameAr ? item.nameAr : item.name;
                  const itemSubName = isAr && item.subNameAr ? item.subNameAr : item.subName;

                  return (
                    <div
                      key={item.id}
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
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ROW 2: Horizontal Card Scroll Track */}
          <div
            ref={row2Ref}
            className="flex flex-row overflow-x-hidden scroll-smooth w-full"
          >
            {categoriesData.map((cat) => (
              <div
                key={`row2-${cat.id}`}
                className="grid grid-cols-2 sm:grid-cols-4 min-w-full flex-shrink-0 gap-0"
              >
                {cat.productsRow2.map((item, itemIndex) => {
                  const itemName = isAr && item.nameAr ? item.nameAr : item.name;
                  const itemSubName = isAr && item.subNameAr ? item.subNameAr : item.subName;

                  return (
                    <div
                      key={item.id}
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
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
