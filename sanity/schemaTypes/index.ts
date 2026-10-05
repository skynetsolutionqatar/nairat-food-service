import { type SchemaTypeDefinition } from 'sanity';
import { product } from './documents/product';
import { partner } from './documents/partner';
import { service } from './documents/service';
import { qualityCert } from './documents/qualityCert';
import { companyProfile } from './documents/companyProfile';
import { homePage } from './pages/homePage';
import { companyPage } from './pages/companyPage';
import { qualityPage } from './pages/qualityPage';
import { servicesPage } from './pages/servicesPage';
import { partnersPage } from './pages/partnersPage';
import { contactPage } from './pages/contactPage';
import { productsPage } from './pages/productsPage';
import { categoryPage } from './pages/categoryPage';
import { privacyPage } from './pages/privacyPage';
import { termsPage } from './pages/termsPage';

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  partner,
  service,
  qualityCert,
  companyProfile,
  homePage,
  companyPage,
  productsPage,
  categoryPage,
  qualityPage,
  servicesPage,
  partnersPage,
  contactPage,
  privacyPage,
  termsPage,
];
