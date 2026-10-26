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
    deliveringImage,
    deliveringBadgeEst,
    deliveringBadgeEstAr,
    deliveringBadgeLocation,
    deliveringBadgeLocationAr,
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
    ceoEyebrow,
    ceoEyebrowAr,
    ceoHeading,
    ceoHeadingAr,
    ceoName,
    ceoNameAr,
    ceoTitle,
    ceoTitleAr,
    ceoQuote,
    ceoQuoteAr,
    ceoMessage,
    ceoMessageAr,
    ceoImage,
    infraTitle,
    infraTitleAr,
    infraNarrative,
    infraNarrativeAr,
    infraImage,
    infraHubBadgeTitle,
    infraHubBadgeTitleAr,
    infraHubBadgeDesc,
    infraHubBadgeDescAr,
    sourcingEyebrow,
    sourcingEyebrowAr,
    sourcingHeadline,
    sourcingHeadlineAr,
    sourcingNarrative,
    sourcingNarrativeAr,
    sourcingCard1Badge,
    sourcingCard1BadgeAr,
    sourcingCard1Title,
    sourcingCard1TitleAr,
    sourcingCard1Desc,
    sourcingCard1DescAr,
    sourcingCard2Badge,
    sourcingCard2BadgeAr,
    sourcingCard2Title,
    sourcingCard2TitleAr,
    sourcingCard2Desc,
    sourcingCard2DescAr,
    teamEyebrow,
    teamEyebrowAr,
    teamHeadline,
    teamHeadlineAr,
    teamNarrative,
    teamNarrativeAr,
    teamImage,
    qualityEyebrow,
    qualityEyebrowAr,
    qualityTitle,
    qualityTitleAr,
    qualityNarrative,
    qualityNarrativeAr,
    qualityImage,
    qualityBadgeText,
    qualityBadgeTextAr,
    qualityBadgeSubtext,
    qualityBadgeSubtextAr,
    lookingAheadEyebrow,
    lookingAheadEyebrowAr,
    lookingAheadHeadline,
    lookingAheadHeadlineAr,
    lookingAheadNarrative,
    lookingAheadNarrativeAr,
    lookingAheadAmbitionLabel,
    lookingAheadAmbitionLabelAr,
    lookingAheadAmbitionQuote,
    lookingAheadAmbitionQuoteAr,
    lookingAheadImage,
    lookingAheadBadgeText,
    lookingAheadBadgeTextAr,
    lookingAheadBadgeSubtext,
    lookingAheadBadgeSubtextAr
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
    sourcingCardImage,
    sourcingCardTitle,
    sourcingCardTitleAr,
    sourcingCardDesc,
    sourcingCardDescAr,
    foodSafetyEyebrow,
    foodSafetyEyebrowAr,
    foodSafetyTitle,
    foodSafetyTitleAr,
    foodSafetyNarrative,
    foodSafetyNarrativeAr,
    foodSafetyCtaText,
    foodSafetyCtaTextAr,
    inspectionEyebrow,
    inspectionEyebrowAr,
    inspectionTitle,
    inspectionTitleAr,
    inspectionImage,
    inspectionBadgeTitle,
    inspectionBadgeTitleAr,
    inspectionBadgeDesc,
    inspectionBadgeDescAr,
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
    supplyChainSubtitleAr,
    supplyChainSteps
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_id == "servicesPage-singleton" || _type == "servicesPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    bannerSubtitle,
    bannerSubtitleAr
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
    retailPartners[] {
      _key,
      name,
      nameAr,
      category,
      logo
    },
    localEyebrow,
    localEyebrowAr,
    localTitle,
    localTitleAr,
    localNarrative,
    localNarrativeAr,
    localPartnerImage,
    localBadge,
    localBadgeAr,
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
    globalSubtitleAr,
    globalCountries[] {
      _key,
      name,
      nameAr,
      crops,
      cropsAr,
      flag
    }
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
    addressLabel,
    addressLabelAr,
    addressText,
    addressTextAr,
    crNumber,
    crNumberAr,
    emailLabel,
    emailLabelAr,
    emailAddress,
    callLabel,
    callLabelAr,
    phoneTel,
    phoneMobile,
    phoneWhatsApp,
    formSubmitText,
    formSubmitTextAr,
    formSuccessMessage,
    formSuccessMessageAr,
    facilityEyebrow,
    facilityEyebrowAr,
    facilityTitle,
    facilityTitleAr,
    badgeLocationLabel,
    badgeLocationLabelAr,
    badgeLocationValue,
    badgeLocationValueAr,
    badgeCapacityLabel,
    badgeCapacityLabelAr,
    badgeCapacityValue,
    badgeCapacityValueAr,
    badgeOperationsLabel,
    badgeOperationsLabelAr,
    badgeOperationsValue,
    badgeOperationsValueAr,
    badgeComplianceLabel,
    badgeComplianceLabelAr,
    badgeComplianceValue,
    badgeComplianceValueAr,
    googleMapsEmbedUrl,
    directionsUrl,
    facilityCardTitle,
    facilityCardTitleAr,
    facilityCardAddress,
    facilityCardAddressAr
  }
`);

export const PRODUCTS_PAGE_QUERY = defineQuery(`
  *[_id == "productsPage-singleton" || _type == "productsPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    bannerSubtitle,
    bannerSubtitleAr,
    categorySections[] {
      _key,
      slug,
      title,
      titleAr,
      subtitle,
      subtitleAr,
      description,
      descriptionAr,
      badge,
      badgeAr,
      heroImage
    },
    vegTitle,
    vegTitleAr,
    vegSubtitle,
    vegSubtitleAr,
    vegDescription,
    vegDescriptionAr,
    fruitsTitle,
    fruitsTitleAr,
    fruitsSubtitle,
    fruitsSubtitleAr,
    fruitsDescription,
    fruitsDescriptionAr,
    leafyTitle,
    leafyTitleAr,
    leafySubtitle,
    leafySubtitleAr,
    leafyDescription,
    leafyDescriptionAr,
    specialtyTitle,
    specialtyTitleAr,
    specialtySubtitle,
    specialtySubtitleAr,
    specialtyDescription,
    specialtyDescriptionAr
  }
`);

export const CATEGORY_PAGE_QUERY = defineQuery(`
  *[_id == $id || (_type == "categoryPage" && category == $slug)][0] {
    _id,
    category,
    title,
    titleAr,
    subtitle,
    subtitleAr,
    badge,
    badgeAr,
    bannerImage
  }
`);

export const PRIVACY_PAGE_QUERY = defineQuery(`
  *[_id == "privacyPage-singleton" || _type == "privacyPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    badge,
    badgeAr,
    title,
    titleAr,
    lastUpdated,
    lastUpdatedAr,
    sections[] {
      _key,
      title,
      titleAr,
      body,
      bodyAr,
      bulletPoints[] {
        _key,
        text,
        textAr
      }
    }
  }
`);

export const TERMS_PAGE_QUERY = defineQuery(`
  *[_id == "termsPage-singleton" || _type == "termsPage"][0] {
    _id,
    bannerTitle,
    bannerTitleAr,
    badge,
    badgeAr,
    title,
    titleAr,
    lastUpdated,
    lastUpdatedAr,
    sections[] {
      _key,
      title,
      titleAr,
      body,
      bodyAr,
      bulletPoints[] {
        _key,
        text,
        textAr
      }
    }
  }
`);




