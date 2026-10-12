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
  figure: (profile: CompanyProfile) => Localized;
  title: Localized;
  highlight: Localized;
  description: (content?: HomePageContent) => Localized;
}

export const strengthDefinitions: StrengthDefinition[] = [
  {
    id: 'chiller-rooms',
    icon: Refrigerator,
    figure: () => ({ en: '20', ar: '20' }),
    title: { en: 'Dedicated Chiller Rooms', ar: 'غرف تبريد مخصصة' },
    highlight: { en: 'Dedicated', ar: 'مخصصة' },
    description: (content) => ({
      en: content?.strengthsChillerDesc || 'Temperature zones configured for every variety.',
      ar: content?.strengthsChillerDescAr || 'نطاقات حرارة مضبوطة لكل صنف.',
    }),
  },
  {
    id: 'warehouse',
    icon: Warehouse,
    figure: (profile) => {
      const area = profile.warehouseArea || '5,000 m²';
      return { en: area, ar: area.replace(/m²/, 'م²') };
    },
    title: { en: 'Cold-Chain Warehouse', ar: 'مستودع سلسلة التبريد' },
    highlight: { en: 'Warehouse', ar: 'مستودع' },
    description: (content) => ({
      en: content?.strengthsWarehouseDesc || 'Quality control from intake to dispatch.',
      ar: content?.strengthsWarehouseDescAr || 'مراقبة الجودة من الاستلام حتى الإرسال.',
    }),
  },
  {
    id: 'fleet',
    icon: Truck,
    figure: (profile) => {
      const vehicles = profile.fleetVehiclesCount || '40';
      return { en: vehicles, ar: vehicles };
    },
    title: { en: 'Refrigerated Vehicles', ar: 'مركبات مبردة' },
    highlight: { en: 'Refrigerated', ar: 'مبردة' },
    description: (content) => ({
      en: content?.strengthsFleetDesc || 'A temperature-controlled fleet on precise schedules.',
      ar: content?.strengthsFleetDescAr || 'أسطول مضبوط الحرارة وفق جداول دقيقة.',
    }),
  },
  {
    id: 'sourced-origin',
    icon: Globe,
    figure: () => ({ en: 'Origin', ar: 'المنشأ' }),
    title: { en: 'Sourced at Origin', ar: 'التوريد من المنشأ' },
    highlight: { en: 'Origin', ar: 'المنشأ' },
    description: (content) => ({
      en: content?.strengthsOriginDesc || 'Direct partnerships with certified international growers.',
      ar: content?.strengthsOriginDescAr || 'شراكات مباشرة مع مزارعين دوليين معتمدين.',
    }),
  },
];
