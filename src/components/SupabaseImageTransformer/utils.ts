import { ImageTransformations, ResponsiveBreakpoint } from './types';

const urlCache = new Map<string, string>();

const getCacheKey = (imageUrl: string, transformations?: ImageTransformations): string => {
  return `${imageUrl}-${JSON.stringify(transformations)}`;
};

export const buildTransformedUrl = (
  imageUrl: string,
  transformations?: ImageTransformations
): string => {
  // Temporarily return the original URL until transformation backend is ready
  return imageUrl;

  /* Commented out until ImgProxy is set up
  if (!transformations || Object.keys(transformations).length === 0) {
    return imageUrl;
  }

  const cacheKey = getCacheKey(imageUrl, transformations);
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey)!;
  }

  try {
    const baseUrl = imageUrl.split('?')[0];
    const params = new URLSearchParams();
    // ... transformation logic ...
    const transformedUrl = `${baseUrl}/transform?${params.toString()}`;
    urlCache.set(cacheKey, transformedUrl);
    return transformedUrl;
  } catch (error) {
    console.error('Error building transformed URL:', error);
    return imageUrl;
  }
  */
};

export const generateSrcSet = (
  imageUrl: string,
  breakpoints: ResponsiveBreakpoint[]
): string => {
  return breakpoints
    .map(bp => `${imageUrl} ${bp.width}w`)
    .join(', ');
};