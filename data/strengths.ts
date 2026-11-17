import type { LucideIcon } from 'lucide-react';
import { Globe, Refrigerator, Truck, Warehouse } from 'lucide-react';
import type { CompanyProfile } from '@/lib/config/company';
import type { HomePageContent } from '@/sanity/lib/data';

interface Localized {
  en: string;
  ar: string;
}

export interface StrengthDefinition {
  id: string;
  icon: LucideIcon;
  figure: (profile: CompanyProfile, content?: HomePageContent) => Localized;
  title: (content?: HomePageContent) => Localized;
  highlight: (content?: HomePageContent) => Localized;
  description: Localized;
}

export const strengthDefinitions: StrengthDefinition[] = [
  {
    id: 'chiller-rooms',
    icon: Refrigerator,
    figure: (_profile, content) => ({
      en: content?.strengthsChillerFigure || '20',
      ar: content?.strengthsChillerFigureAr || '20',
    }),
    title: (content) => ({
      en: content?.strengthsChillerTitle || 'Dedicated Chiller Rooms',
      ar: content?.strengthsChillerTitleAr || 'غرف تبريد مخصصة',
    }),
    highlight: (content) => ({
      en: content?.strengthsChillerHighlight || 'Dedicated',
      ar: content?.strengthsChillerHighlightAr || 'مخصصة',
    }),
    description: { en: 'Temperature zones configured for every variety.', ar: 'نطاقات حرارة مضبوطة لكل صنف.' },
  },
  {
    id: 'warehouse',
    icon: Warehouse,
    figure: (profile, content) => {
      const area = profile.warehouseArea || '5,000 m²';
      return {
        en: content?.strengthsWarehouseFigure || area,
        ar: content?.strengthsWarehouseFigureAr || area.replace(/m²/, 'م²'),
      };
    },
    title: (content) => ({
      en: content?.strengthsWarehouseTitle || 'Cold-Chain Warehouse',
      ar: content?.strengthsWarehouseTitleAr || 'مستودع سلسلة التبريد',
    }),
    highlight: (content) => ({
      en: content?.strengthsWarehouseHighlight || 'Warehouse',
      ar: content?.strengthsWarehouseHighlightAr || 'مستودع',
    }),
    description: { en: 'Quality control from intake to dispatch.', ar: 'مراقبة الجودة من الاستلام حتى الإرسال.' },
  },
  {
    id: 'fleet',
    icon: Truck,
    figure: (profile, content) => {
      const vehicles = profile.fleetVehiclesCount || '40';
      return {
        en: content?.strengthsFleetFigure || vehicles,
        ar: content?.strengthsFleetFigureAr || vehicles,
      };
    },
    title: (content) => ({
      en: content?.strengthsFleetTitle || 'Refrigerated Vehicles',
      ar: content?.strengthsFleetTitleAr || 'مركبات مبردة',
    }),
    highlight: (content) => ({
      en: content?.strengthsFleetHighlight || 'Refrigerated',
      ar: content?.strengthsFleetHighlightAr || 'مبردة',
    }),
    description: { en: 'A temperature-controlled fleet on precise schedules.', ar: 'أسطول مضبوط الحرارة وفق جداول دقيقة.' },
  },
  {
    id: 'sourced-origin',
    icon: Globe,
    figure: (_profile, content) => ({
      en: content?.strengthsOriginFigure || 'Origin',
      ar: content?.strengthsOriginFigureAr || 'المنشأ',
    }),
    title: (content) => ({
      en: content?.strengthsOriginTitle || 'Sourced at Origin',
      ar: content?.strengthsOriginTitleAr || 'التوريد من المنشأ',
    }),
    highlight: (content) => ({
      en: content?.strengthsOriginHighlight || 'Origin',
      ar: content?.strengthsOriginHighlightAr || 'المنشأ',
    }),
    description: { en: 'Direct partnerships with certified international growers.', ar: 'شراكات مباشرة مع مزارعين دوليين معتمدين.' },
  },
];
