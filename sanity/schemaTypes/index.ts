import { type SchemaTypeDefinition } from 'sanity';
import { product } from './documents/product';
import { partner } from './documents/partner';
import { service } from './documents/service';
import { qualityCert } from './documents/qualityCert';
import { companyProfile } from './documents/companyProfile';

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  partner,
  service,
  qualityCert,
  companyProfile,
];
