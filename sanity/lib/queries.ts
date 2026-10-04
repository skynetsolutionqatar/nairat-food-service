import { defineQuery } from 'next-sanity';

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(order asc, _createdAt desc) {
    _id,
    name,
    nameAr,
    "slug": coalesce(slug.current, _id),
    category,
    variety,
    origin,
    temp,
    description,
    descriptionAr,
    image,
    featured,
    order
  }
`);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && category == $category] | order(order asc, _createdAt desc) {
    _id,
    name,
    nameAr,
    "slug": coalesce(slug.current, _id),
    category,
    variety,
    origin,
    temp,
    description,
    descriptionAr,
    image,
    featured,
    order
  }
`);

export const FEATURED_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    name,
    nameAr,
    "slug": coalesce(slug.current, _id),
    category,
    variety,
    origin,
    temp,
    description,
    descriptionAr,
    image,
    featured,
    order
  }
`);

export const PARTNERS_QUERY = defineQuery(`
  *[_type == "partner"] | order(order asc, _createdAt asc) {
    _id,
    name,
    nameAr,
    category,
    description,
    descriptionAr,
    logo,
    featured,
    order
  }
`);

export const FEATURED_PARTNERS_QUERY = defineQuery(`
  *[_type == "partner" && featured == true] | order(order asc, _createdAt asc) {
    _id,
    name,
    nameAr,
    category,
    description,
    descriptionAr,
    logo,
    featured,
    order
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id,
    title,
    titleAr,
    "slug": slug.current,
    tagline,
    taglineAr,
    description,
    descriptionAr,
    features,
    image,
    order
  }
`);

export const QUALITY_CERTS_QUERY = defineQuery(`
  *[_type == "qualityCert"] | order(order asc, _createdAt asc) {
    _id,
    title,
    titleAr,
    subtitle,
    subtitleAr,
    description,
    descriptionAr,
    image,
    order
  }
`);

export const COMPANY_PROFILE_QUERY = defineQuery(`
  *[_type == "companyProfile"][0] {
    _id,
    name,
    legalName,
    establishedYear,
    productLinesCount,
    dailyVolumeTonnes,
    retailBranchesSupplied,
    warehouseArea,
    warehouseLocation,
    fleetVehiclesCount,
    teamSize,
    originCountriesCore,
    originCountriesGlobal,
    certifications,
    certifiedScope,
    phone,
    email,
    address,
    poBox
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage-singleton" || _type == "homePage"][0] {
    _id,
    heroTitleLine1,
    heroTitleLine1Ar,
    heroTitleLine2,
    heroTitleLine2Ar,
    heroSubtitle,
    heroSubtitleAr,
    heroCtaPrimary,
    heroCtaPrimaryAr,
    heroCtaSecondary,
    heroCtaSecondaryAr,
    partnersHeading,
    partnersHeadingAr,
    whoWeAreEyebrow,
    whoWeAreEyebrowAr,
    whoWeAreTitle,
    whoWeAreTitleAr,
    whoWeAreNarrative,
    whoWeAreNarrativeAr,
    whoWeArePillar1Title,
    whoWeArePillar1TitleAr,
    whoWeArePillar1Desc,
    whoWeArePillar1DescAr,
    whoWeArePillar2Title,
    whoWeArePillar2TitleAr,
    whoWeArePillar2Desc,
    whoWeArePillar2DescAr,
    whoWeArePillar3Title,
    whoWeArePillar3TitleAr,
    whoWeArePillar3Desc,
    whoWeArePillar3DescAr,
    strengthsEyebrow,
    strengthsEyebrowAr,
    strengthsTitle,
    strengthsTitleAr,
    strengthsOriginDesc,
    strengthsOriginDescAr,
    strengthsChillerDesc,
    strengthsChillerDescAr,
    strengthsWarehouseDesc,
    strengthsWarehouseDescAr,
    strengthsColdChainDesc,
    strengthsColdChainDescAr,
    strengthsFleetDesc,
    strengthsFleetDescAr,
    servicesEyebrow,
    servicesEyebrowAr,
    servicesTitle,
    servicesTitleAr,
    servicesNarrative,
    servicesNarrativeAr,
    servicesCtaText,
    servicesCtaTextAr,
    productsEyebrow,
    productsEyebrowAr,
    productsTitle,
    productsTitleAr,
    sourcingMapEyebrow,
    sourcingMapEyebrowAr,
    sourcingMapTitle,
    sourcingMapTitleAr,
    qualityEyebrow,
    qualityEyebrowAr,
    qualityTitle,
    qualityTitleAr,
    qualityNarrative,
    qualityNarrativeAr,
    ctaLine1,
    ctaLine1Ar,
    ctaLine2,
    ctaLine2Ar,
    ctaSubtext1,
    ctaSubtext1Ar,
    ctaSubtext2,
    ctaSubtext2Ar,
    ctaHeadline,
    ctaHeadlineAr,
    ctaDescription,
    ctaDescriptionAr,
    ctaButtonText,
    ctaButtonTextAr
  }
`);

export const COMPANY_PAGE_QUERY = defineQuery(`
  *[_id == "companyPage-singleton" || _type == "companyPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    bannerSubtitle,
    bannerSubtitleAr,
    deliveringEyebrow,
    deliveringEyebrowAr,
    deliveringTitle,
    deliveringTitleAr,
    deliveringNarrative,
    deliveringNarrativeAr,
    deliveringCommitmentTitle,
    deliveringCommitmentTitleAr,
    deliveringCommitmentBody,
    deliveringCommitmentBodyAr,
    visionMissionTitle,
    visionMissionTitleAr,
    visionMissionNarrative,
    visionMissionNarrativeAr,
    visionTitle,
    visionTitleAr,
    visionBody,
    visionBodyAr,
    missionTitle,
    missionTitleAr,
    missionBody,
    missionBodyAr,
    sourcingEyebrow,
    sourcingEyebrowAr,
    sourcingHeadline,
    sourcingHeadlineAr,
    sourcingNarrative,
    sourcingNarrativeAr,
    teamEyebrow,
    teamEyebrowAr,
    teamHeadline,
    teamHeadlineAr,
    teamNarrative,
    teamNarrativeAr,
    lookingAheadHeadline,
    lookingAheadHeadlineAr,
    lookingAheadNarrative,
    lookingAheadNarrativeAr
  }
`);

export const QUALITY_PAGE_QUERY = defineQuery(`
  *[_id == "qualityPage-singleton" || _type == "qualityPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    bannerSubtitle,
    bannerSubtitleAr,
    philosophyEyebrow,
    philosophyEyebrowAr,
    philosophyTitle,
    philosophyTitleAr,
    philosophyNarrative,
    philosophyNarrativeAr,
    philosophyPillar1Title,
    philosophyPillar1TitleAr,
    philosophyPillar1Desc,
    philosophyPillar1DescAr,
    philosophyPillar2Title,
    philosophyPillar2TitleAr,
    philosophyPillar2Desc,
    philosophyPillar2DescAr,
    philosophyPillar3Title,
    philosophyPillar3TitleAr,
    philosophyPillar3Desc,
    philosophyPillar3DescAr,
    inspectionEyebrow,
    inspectionEyebrowAr,
    inspectionTitle,
    inspectionTitleAr,
    inspectionPillar1Title,
    inspectionPillar1TitleAr,
    inspectionPillar1Desc,
    inspectionPillar1DescAr,
    inspectionPillar2Title,
    inspectionPillar2TitleAr,
    inspectionPillar2Desc,
    inspectionPillar2DescAr,
    supplyChainEyebrow,
    supplyChainEyebrowAr,
    supplyChainTitle,
    supplyChainTitleAr,
    supplyChainSubtitle,
    supplyChainSubtitleAr
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_id == "servicesPage-singleton" || _type == "servicesPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    bannerSubtitle,
    bannerSubtitleAr,
    overviewHeadline,
    overviewHeadlineAr,
    overviewNarrative,
    overviewNarrativeAr
  }
`);

export const PARTNERS_PAGE_QUERY = defineQuery(`
  *[_id == "partnersPage-singleton" || _type == "partnersPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    bannerSubtitle,
    bannerSubtitleAr,
    retailEyebrow,
    retailEyebrowAr,
    retailTitle,
    retailTitleAr,
    localEyebrow,
    localEyebrowAr,
    localTitle,
    localTitleAr,
    localNarrative,
    localNarrativeAr,
    localTag1,
    localTag1Ar,
    localTag2,
    localTag2Ar,
    localTag3,
    localTag3Ar,
    globalEyebrow,
    globalEyebrowAr,
    globalTitle,
    globalTitleAr,
    globalSubtitle,
    globalSubtitleAr
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage-singleton" || _type == "contactPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    bannerSubtitle,
    bannerSubtitleAr,
    inquiryEyebrow,
    inquiryEyebrowAr,
    inquiryTitle,
    inquiryTitleAr,
    inquirySubtitle,
    inquirySubtitleAr,
    facilityEyebrow,
    facilityEyebrowAr,
    facilityTitle,
    facilityTitleAr,
    facilityOperatingHours,
    facilityOperatingHoursAr
  }
`);

