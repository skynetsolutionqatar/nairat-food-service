'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface ProductItem {
  id: string;
  name: string;
  subName?: string;
  imageUrl: string;
}

interface CategoryData {
  id: string;
  label: string;
  leftBarTitle: string;
  leftBarColor: string;
  rightBarTitle: string;
  rightBarColor: string;
  productsRow1: ProductItem[];
  productsRow2: ProductItem[];
}

const categoriesData: CategoryData[] = [
  {
    id: 'vegetables',
    label: 'Vegetables',
    leftBarTitle: 'LOCAL VARIETIES',
    leftBarColor: 'bg-[#38A84E]',
    rightBarTitle: 'IMPORTED VARIETIES',
    rightBarColor: 'bg-[#F3C623]',
    productsRow1: [
      {
        id: 'tomatoes',
        name: 'Tomatoes',
        subName: '(Fresh Harvest)',
        imageUrl: '/products/vegetables/tomatoes.jpg',
      },
      {
        id: 'capsicum',
        name: 'Capsicum',
        subName: '(Green, Red & Yellow)',
        imageUrl: '/products/vegetables/capsicum.jpg',
      },
      {
        id: 'cucumbers',
        name: 'Cucumbers',
        subName: '(Greenhouse Sourced)',
        imageUrl: '/products/vegetables/cucumbers.jpg',
      },
      {
        id: 'marrow-zucchini',
        name: 'Eggplant & Zucchini',
        subName: '(Marrow Selection)',
        imageUrl: '/products/vegetables/marrow-zucchini.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'cauliflower-cabbage',
        name: 'Cauliflower & Cabbage',
        subName: '(Farm Select)',
        imageUrl: '/products/vegetables/cauliflower.jpg',
      },
      {
        id: 'potatoes-onions',
        name: 'Potatoes & Onions',
        subName: '(Crisp Quality)',
        imageUrl: '/products/vegetables/potatoes.jpg',
      },
      {
        id: 'chilli-okra',
        name: 'Chilli & Okra',
        subName: '(Fresh Spice & Pods)',
        imageUrl: '/products/vegetables/chilli.jpg',
      },
      {
        id: 'beans',
        name: 'Fresh Beans',
        subName: '(Green Harvest)',
        imageUrl: '/products/vegetables/beans.jpg',
      },
    ],
  },
  {
    id: 'fruits',
    label: 'Fruits',
    leftBarTitle: 'INDIAN VARIETIES',
    leftBarColor: 'bg-[#38A84E]',
    rightBarTitle: 'IMPORTED VARIETIES',
    rightBarColor: 'bg-[#F3C623]',
    productsRow1: [
      {
        id: 'melons',
        name: 'Watermelon & Sweet Melon',
        subName: '(Juicy Harvest)',
        imageUrl: '/products/fruits/watermelon.jpg',
      },
      {
        id: 'citrus',
        name: 'Citrus Selection',
        subName: '(Orange, Lemon, Lime, Mandarin)',
        imageUrl: '/products/fruits/citrus.jpg',
      },
      {
        id: 'stone-fruit',
        name: 'Stone Fruit',
        subName: '(Peach, Nectarine, Plum, Cherry)',
        imageUrl: '/products/fruits/stone-fruit.jpg',
      },
      {
        id: 'grapes',
        name: 'Fresh Grapes',
        subName: '(Red & Green Seedless)',
        imageUrl: '/products/fruits/table-grapes.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'mango',
        name: 'Fresh Mango',
        subName: '(Seasonal Selection)',
        imageUrl: '/products/fruits/mango.jpg',
      },
      {
        id: 'berries',
        name: 'Strawberries & Berries',
        subName: '(Fresh Blueberries & Strawberries)',
        imageUrl: '/products/fruits/berries.jpg',
      },
      {
        id: 'pomegranate',
        name: 'Pomegranate',
        subName: '(Ruby Red Seeds)',
        imageUrl: '/products/fruits/ruby-pomegranate.jpg',
      },
      {
        id: 'avocado',
        name: 'Avocado',
        subName: '(Fresh Selection)',
        imageUrl: '/products/fruits/avocado.jpg',
      },
    ],
  },
  {
    id: 'leafy-herbs',
    label: 'Leafy & Herbs',
    leftBarTitle: 'CULINARY HERBS',
    leftBarColor: 'bg-[#15803D]',
    rightBarTitle: 'LEAFY SELECTION',
    rightBarColor: 'bg-[#0D9488]',
    productsRow1: [
      {
        id: 'lettuce-romaine-iceberg',
        name: 'Lettuce Romaine & Iceberg',
        subName: '(Crisp Leaf Selection)',
        imageUrl: '/products/leafy-herbs/lettuce.jpg',
      },
      {
        id: 'broccoli-fresh',
        name: 'Broccoli',
        subName: '(Farm Fresh Florets)',
        imageUrl: '/products/leafy-herbs/broccoli.jpg',
      },
      {
        id: 'radish-beetroot',
        name: 'Radish & Beetroot',
        subName: '(Fresh Root Harvest)',
        imageUrl: '/products/leafy-herbs/radish.jpg',
      },
      {
        id: 'fresh-coriander-mint',
        name: 'Fresh Coriander & Mint',
        subName: '(Aromatic Herbs)',
        imageUrl: '/products/leafy-herbs/coriander-mint.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'sweet-basil-leaf',
        name: 'Sweet Basil',
        subName: '(Italian Genovese)',
        imageUrl: '/products/leafy-herbs/basil.jpg',
      },
      {
        id: 'flat-parsley',
        name: 'Flat Parsley',
        subName: '(Mediterranean Bunch)',
        imageUrl: '/products/leafy-herbs/parsley.jpg',
      },
      {
        id: 'thyme-rosemary-pair',
        name: 'Thyme & Rosemary',
        subName: '(Culinary Pair)',
        imageUrl: '/products/leafy-herbs/thyme-rosemary.jpg',
      },
      {
        id: 'fresh-herbs-mix',
        name: 'Fresh Herbs',
        subName: '(Dill, Sage & Tarragon)',
        imageUrl: '/products/leafy-herbs/fresh-herbs.jpg',
      },
    ],
  },
  {
    id: 'specialty-gourmet',
    label: 'Specialty & Gourmet',
    leftBarTitle: 'EXOTIC SELECTION',
    leftBarColor: 'bg-[#C2410C]',
    rightBarTitle: 'GOURMET SPECIALS',
    rightBarColor: 'bg-[#D97706]',
    productsRow1: [
      {
        id: 'baby-leaves',
        name: 'Baby Leaves',
        subName: '(Tender Gourmet Mix)',
        imageUrl: '/products/specialty-gourmet/baby-leaves.jpg',
      },
      {
        id: 'exotic-mushrooms',
        name: 'Exotic Mushrooms',
        subName: '(Shiitake, Oyster & Morels)',
        imageUrl: '/products/specialty-gourmet/fresh-mushrooms.jpg',
      },
      {
        id: 'passion-fruit-gourmet',
        name: 'Passion Fruit',
        subName: '(Purple Selection)',
        imageUrl: '/products/specialty-gourmet/purple-passion-fruit.jpg',
      },
      {
        id: 'lychee-rambutan',
        name: 'Lychee & Rambutan',
        subName: '(Air Freight Import)',
        imageUrl: '/products/specialty-gourmet/fresh-lychee.jpg',
      },
    ],
    productsRow2: [
      {
        id: 'dragon-fruit-exotic',
        name: 'Dragon Fruit',
        subName: '(Red & White)',
        imageUrl: '/products/specialty-gourmet/dragon-fruit.jpg',
      },
      {
        id: 'black-figs-gourmet',
        name: 'Black Figs',
        subName: '(Turkish Import)',
        imageUrl: '/products/specialty-gourmet/black-figs.jpg',
      },
      {
        id: 'golden-apricots-gourmet',
        name: 'Golden Apricots',
        subName: '(Uzbekistan)',
        imageUrl: '/products/specialty-gourmet/golden-apricots.jpg',
      },
      {
        id: 'seasonal-specialities',
        name: 'Seasonal Specialties',
        subName: '(Curated Exotics)',
        imageUrl: '/products/specialty-gourmet/seasonal-specialties.jpg',
      },
    ],
  },
];

export function Products() {
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

  const activeCategory = categoriesData[categoryIndex];

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
            <SectionEyebrow title="OUR PRODUCTS" />
          </div>

          <h2 className="product-header-item font-display type-h2 font-semibold text-[#111814]">
            Freshness, Sourced From Around the World.
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
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 100% Edge-to-Edge Full Width Product Showcase Gallery Container with Drag to Scroll */}
        <div
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
          className={`product-gallery-wrapper relative w-full rounded-none overflow-hidden bg-neutral-950 flex flex-col gap-0 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* ROW 1: Left Vertical Bar + Horizontal Card Scroll Track */}
          <div className="flex flex-row items-stretch w-full overflow-hidden">
            {/* Left Colored Sidebar Bar */}
            <div
              className={`w-7 xs:w-9 sm:w-14 md:w-16 lg:w-20 ${activeCategory.leftBarColor} flex items-center justify-center shrink-0 select-none overflow-hidden transition-colors duration-500`}
            >
              <span className="[writing-mode:vertical-lr] rotate-180 font-sans text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base font-extrabold tracking-widest text-white uppercase whitespace-nowrap">
                {activeCategory.leftBarTitle}
              </span>
            </div>

            {/* Horizontal Scrolling Cards Track for Row 1 */}
            <div
              ref={row1Ref}
              className="flex flex-row flex-grow overflow-x-hidden scroll-smooth w-full"
            >
              {categoriesData.map((cat) => (
                <div
                  key={`row1-${cat.id}`}
                  className="grid grid-cols-2 sm:grid-cols-4 min-w-full flex-shrink-0 gap-0"
                >
                  {cat.productsRow1.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={`group relative aspect-square w-full overflow-hidden bg-neutral-900 cursor-pointer flex flex-col justify-end p-2 xs:p-3 sm:p-5 md:p-6 lg:p-7 ${
                        itemIndex >= 2 ? 'hidden sm:flex' : 'flex'
                      }`}
                    >
                      {/* Full-bleed Product Image */}
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform transform-gpu"
                        loading="lazy"
                      />

                      {/* Dark Gradient Bottom Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 pointer-events-none" />

                      {/* Bottom Title Text Overlay */}
                      <div className="relative z-10 text-center space-y-0.5 sm:space-y-1">
                        <h3 className="font-display font-semibold text-[11px] xs:text-xs sm:text-base md:text-lg text-white drop-shadow-md tracking-[-0.015em] leading-tight">
                          {item.name}
                        </h3>
                        {item.subName && (
                          <p className="font-sans text-[9px] xs:text-[10px] sm:text-xs text-white/80 font-normal drop-shadow-sm leading-tight">
                            {item.subName}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: Horizontal Card Scroll Track + Right Vertical Bar */}
          <div className="flex flex-row items-stretch w-full overflow-hidden">
            {/* Horizontal Scrolling Cards Track for Row 2 */}
            <div
              ref={row2Ref}
              className="flex flex-row flex-grow overflow-x-hidden scroll-smooth w-full"
            >
              {categoriesData.map((cat) => (
                <div
                  key={`row2-${cat.id}`}
                  className="grid grid-cols-2 sm:grid-cols-4 min-w-full flex-shrink-0 gap-0"
                >
                  {cat.productsRow2.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={`group relative aspect-square w-full overflow-hidden bg-neutral-900 cursor-pointer flex flex-col justify-end p-2 xs:p-3 sm:p-5 md:p-6 lg:p-7 ${
                        itemIndex >= 2 ? 'hidden sm:flex' : 'flex'
                      }`}
                    >
                      {/* Full-bleed Product Image */}
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform transform-gpu"
                        loading="lazy"
                      />

                      {/* Dark Gradient Bottom Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 pointer-events-none" />

                      {/* Bottom Title Text Overlay */}
                      <div className="relative z-10 text-center space-y-0.5 sm:space-y-1">
                        <h3 className="font-display font-semibold text-[11px] xs:text-xs sm:text-base md:text-lg text-white drop-shadow-md tracking-[-0.015em] leading-tight">
                          {item.name}
                        </h3>
                        {item.subName && (
                          <p className="font-sans text-[9px] xs:text-[10px] sm:text-xs text-white/80 font-normal drop-shadow-sm leading-tight">
                            {item.subName}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Colored Sidebar Bar */}
            <div
              className={`w-7 xs:w-9 sm:w-14 md:w-16 lg:w-20 ${activeCategory.rightBarColor} flex items-center justify-center shrink-0 select-none overflow-hidden transition-colors duration-500`}
            >
              <span className="[writing-mode:vertical-lr] font-sans text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base font-extrabold tracking-widest text-white uppercase whitespace-nowrap">
                {activeCategory.rightBarTitle}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
