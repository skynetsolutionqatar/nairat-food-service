import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './sanity/env';

import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio',
  name: 'nairat-food-services',
  title: 'Nairat Food Services Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
