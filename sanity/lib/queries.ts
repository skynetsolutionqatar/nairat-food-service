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
