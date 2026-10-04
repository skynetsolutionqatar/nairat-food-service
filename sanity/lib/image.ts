import { createImageUrlBuilder } from '@sanity/image-url';
import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (source.asset?._ref || source.asset?.url) {
    return imageBuilder.image(source).auto('format').fit('max').url();
  }
  return '';
}
