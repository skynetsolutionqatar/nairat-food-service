import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

const token = process.env.SANITY_API_READ_TOKEN || undefined;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: token ? false : useCdn,
  perspective: 'published',
  token,
  stega: false,
});
