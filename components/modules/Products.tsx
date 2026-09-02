'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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
        imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800',
      },
      {
        id: 'capsicum',
        name: 'Capsicum',
        subName: '(Green, Red & Yellow)',
        imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=800',
      },
      {
        id: 'cucumbers',
        name: 'Cucumbers',
        subName: '(Greenhouse Sourced)',
        imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=800',
      },
      {
        id: 'marrow-zucchini',
        name: 'Eggplant & Zucchini',
        subName: '(Marrow Selection)',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800',
      },
    ],
    productsRow2: [
      {
        id: 'cauliflower-cabbage',
        name: 'Cauliflower & Cabbage',
        subName: '(Farm Select)',
        imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=800',
      },
      {
        id: 'potatoes-onions',
        name: 'Potatoes & Onions',
        subName: '(Crisp Quality)',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800',
      },
      {
        id: 'chilli-okra',
        name: 'Chilli & Okra',
        subName: '(Fresh Spice & Pods)',
        imageUrl: 'https://images.unsplash.com/photo-1588879460418-472064119d67?q=80&w=800',
      },
      {
        id: 'beans',
        name: 'Fresh Beans',
        subName: '(Green Harvest)',
        imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800',
      },
      {
        id: 'citrus',
        name: 'Citrus Selection',
        subName: '(Orange, Lemon, Lime, Mandarin)',
        imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=800',
      },
      {
        id: 'stone-fruit',
        name: 'Stone Fruit',
        subName: '(Peach, Nectarine, Plum, Cherry)',
        imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800',
      },
      {
        id: 'grapes',
        name: 'Fresh Grapes',
        subName: '(Red & Green Seedless)',
        imageUrl: 'https://images.unsplash.com/photo-1596368708356-6e1e1025ee72?q=80&w=800',
      },
    ],
    productsRow2: [
      {
        id: 'mango',
        name: 'Fresh Mango',
        subName: '(Alphonso & Premium)',
        imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800',
      },
      {
        id: 'berries',
        name: 'Strawberries & Berries',
        subName: '(Fresh Blueberries & Strawberries)',
        imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=800',
      },
      {
        id: 'pomegranate',
        name: 'Pomegranate',
        subName: '(Ruby Red Seeds)',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800',
      },
      {
        id: 'avocado',
        name: 'Avocado',
        subName: '(Hass Variety)',
        imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800',
      },
    ],
  },
  {
    id: 'leafy-herbs',
    label: 'Leafy & Herbs',
    leftBarTitle: 'ORGANIC HERBS',
    leftBarColor: 'bg-[#15803D]',
    rightBarTitle: 'LEAFY SELECTION',
    rightBarColor: 'bg-[#0D9488]',
    productsRow1: [
      {
        id: 'lettuce-romaine-iceberg',
        name: 'Lettuce Romaine & Iceberg',
        subName: '(Crisp Leaf Selection)',
        imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=800',
      },
      {
        id: 'broccoli-fresh',
        name: 'Broccoli',
        subName: '(Farm Fresh Florets)',
        imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=800',
      },
      {
        id: 'radish-beetroot',
        name: 'Radish & Beetroot',
        subName: '(Fresh Root Harvest)',
        imageUrl: 'https://images.unsplash.com/photo-1598170845058-128a2b163351?q=80&w=800',
      },
      {
        id: 'fresh-coriander-mint',
        name: 'Fresh Coriander & Mint',
        subName: '(Aromatic Herbs)',
        imageUrl: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fa?q=80&w=800',
      },
    ],
    productsRow2: [
      {
        id: 'sweet-basil-leaf',
        name: 'Sweet Basil',
        subName: '(Italian Genovese)',
        imageUrl: 'https://images.unsplash.com/photo-1749655248287-d1e0acb5f8d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3dlZXQtYmFzaWwtbGVhZnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: 'flat-parsley',
        name: 'Flat Parsley',
        subName: '(Mediterranean Bunch)',
        imageUrl: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fa?q=80&w=800',
      },
      {
        id: 'thyme-rosemary-pair',
        name: 'Thyme & Rosemary',
        subName: '(Culinary Pair)',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1763665457124-91652cbebf44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGh5bWUtcm9zZW1hcnktcGFpcnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: 'fresh-herbs-mix',
        name: 'Fresh Herbs',
        subName: '(Dill, Sage & Tarragon)',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1675237625952-c2e254de1d13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlc2gtaGVyYnMtbWl4fGVufDB8fDB8fHww',
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
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800',
      },
      {
        id: 'exotic-mushrooms',
        name: 'Exotic Mushrooms',
        subName: '(Shiitake, Oyster & Morels)',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800',
      },
      {
        id: 'passion-fruit-gourmet',
        name: 'Passion Fruit',
        subName: '(Purple Selection)',
        imageUrl: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?q=80&w=800',
      },
      {
        id: 'lychee-rambutan',
        name: 'Lychee & Rambutan',
        subName: '(Air Freight Import)',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800',
      },
    ],
    productsRow2: [
      {
        id: 'dragon-fruit-exotic',
        name: 'Dragon Fruit',
        subName: '(Red & White)',
        imageUrl: 'https://images.unsplash.com/photo-1527325678964-54921646bc0d?q=80&w=800',
      },
      {
        id: 'black-figs-gourmet',
        name: 'Black Figs',
        subName: '(Turkish Import)',
        imageUrl: 'https://images.unsplash.com/photo-1601379327928-bedfac7da2d2?q=80&w=800',
      },
      {
        id: 'golden-apricots-gourmet',
        name: 'Golden Apricots',
        subName: '(Uzbekistan)',
        imageUrl: 'https://images.unsplash.com/photo-1501746877-14782df589a4?q=80&w=800',
      },
      {
        id: 'seasonal-specialities',
        name: 'Seasonal Specialties',
        subName: '(Curated Exotics)',
        imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=800',
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

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const activeCategory = categoriesData[categoryIndex];

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
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

      // GSAP ScrollTrigger Parallax & Zoom on Product Cards on scroll down
      const cardBgImages = gsap.utils.toArray<HTMLElement>('.product-card-bg');
      cardBgImages.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1.02,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="products" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 pt-12 sm:pt-16 2xl:pt-20 pb-4 sm:pb-6 2xl:pb-8 bg-white text-neutral-900 overflow-hidden">
      <div className="w-full space-y-6 sm:space-y-8 2xl:space-y-10 px-0">

        {/* Section Header */}
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center space-y-3 px-4">
          <div className="product-header-item flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4 text-[#168849]" aria-hidden="true" />
            <span className="font-display type-eyebrow text-[#168849]">
              OUR PRODUCTS
            </span>
          </div>

          <h2 className="product-header-item font-display type-h2 font-semibold text-[#111814]">
            Freshness, Sourced From Around the World.
          </h2>

          {/* Interactive Category Selector Pills */}
          <div className="product-header-item flex flex-wrap items-center justify-center gap-2 pt-2">
            {categoriesData.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setCategoryIndex(idx)}
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
          <div className="flex flex-row items-stretch h-48 xs:h-56 sm:h-72 md:h-96 lg:h-[480px] xl:h-[520px] 2xl:h-[580px] w-full overflow-hidden">
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
              className="flex flex-row flex-grow overflow-x-hidden scroll-smooth w-full h-full"
            >
              {categoriesData.map((cat) => (
                <div
                  key={`row1-${cat.id}`}
                  className="grid grid-cols-2 sm:grid-cols-4 min-w-full flex-shrink-0 gap-0 h-full"
                >
                  {cat.productsRow1.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={`group relative h-full overflow-hidden bg-neutral-900 cursor-pointer flex-col justify-end p-2 xs:p-3 sm:p-5 md:p-7 lg:p-8 ${itemIndex >= 2 ? 'hidden sm:flex' : 'flex'
                        }`}
                    >
                      {/* Full-bleed Product Image with GSAP Scroll Parallax */}
                      <div
                        className="product-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform transform-gpu"
                        style={{ backgroundImage: `url('${item.imageUrl}')` }}
                        aria-label={item.name}
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
          <div className="flex flex-row items-stretch h-48 xs:h-56 sm:h-72 md:h-96 lg:h-[480px] xl:h-[520px] w-full overflow-hidden">
            {/* Horizontal Scrolling Cards Track for Row 2 */}
            <div
              ref={row2Ref}
              className="flex flex-row flex-grow overflow-x-hidden scroll-smooth w-full h-full"
            >
              {categoriesData.map((cat) => (
                <div
                  key={`row2-${cat.id}`}
                  className="grid grid-cols-2 sm:grid-cols-4 min-w-full flex-shrink-0 gap-0 h-full"
                >
                  {cat.productsRow2.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={`group relative h-full overflow-hidden bg-neutral-900 cursor-pointer flex-col justify-end p-2 xs:p-3 sm:p-5 md:p-7 lg:p-8 ${itemIndex >= 2 ? 'hidden sm:flex' : 'flex'
                        }`}
                    >
                      {/* Full-bleed Product Image with GSAP Scroll Parallax */}
                      <div
                        className="product-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform transform-gpu"
                        style={{ backgroundImage: `url('${item.imageUrl}')` }}
                        aria-label={item.name}
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
