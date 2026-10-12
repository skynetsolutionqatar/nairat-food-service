export type Locale = 'en' | 'ar';

export interface Dictionary {
  common: {
    brandName: string;
    tagline: string;
    contactUs: string;
    partnerWithUs: string;
    exploreProducts: string;
    learnMore: string;
    viewAll: string;
    allServices: string;
    qualityProcess: string;
    downloadCatalog: string;
    allRightsReserved: string;
    commercialRegistration: string;
    dohaQatar: string;
    workingHours: string;
    workingHoursVal: string;
  };
  nav: {
    home: string;
    company: string;
    products: string;
    services: string;
    quality: string;
    partners: string;
    contact: string;
    categories: {
      vegetables: string;
      fruits: string;
      leafyHerbs: string;
      specialtyGourmet: string;
    };
  };
  footer: {
    companyDescription: string;
    quickLinks: string;
    produceLines: string;
    contactInfo: string;
    privacyPolicy: string;
    termsOfService: string;
    sitemap: string;
    goFreshForFuture: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Val: string;
    stat1Label: string;
    stat2Val: string;
    stat2Label: string;
    stat3Val: string;
    stat3Label: string;
  };
  company: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    infrastructureTitle: string;
    infrastructureDesc: string;
    coldStorageCapacity: string;
    fleetSize: string;
    dailyVolume: string;
  };
  products: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    tabs: {
      all: string;
      vegetables: string;
      fruits: string;
      leafyHerbs: string;
      specialtyGourmet: string;
    };
    specs: {
      origin: string;
      variety: string;
      storageTemp: string;
      availability: string;
    };
  };
  services: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    coldChain: string;
    coldChainDesc: string;
    wholesale: string;
    wholesaleDesc: string;
    logistics: string;
    logisticsDesc: string;
    customPackaging: string;
    customPackagingDesc: string;
  };
  quality: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    traceabilityTitle: string;
    traceabilityDesc: string;
    standardsTitle: string;
    standardsDesc: string;
    certificationsTitle: string;
  };
  partners: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    growersNetwork: string;
    globalOrigins: string;
    regions: {
      middleEast: string;
      europe: string;
      asia: string;
      africa: string;
      americas: string;
    };
  };
  contact: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      departmentLabel: string;
      departments: {
        wholesale: string;
        procurement: string;
        logistics: string;
        general: string;
      };
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      successTitle: string;
      successMsg: string;
      errorMsg: string;
    };
    info: {
      addressTitle: string;
      addressVal: string;
      phoneTitle: string;
      emailTitle: string;
      whatsappTitle: string;
    };
  };
}
