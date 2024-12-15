import type { Image } from '../types';

const imageCache = new Set<string>();

export function getImageUrl(image: Image): string {
  return window.innerWidth < 640 ? image.mobileimageurl : image.imageurl;
}

export function preloadImages(images: Image[]): void {
  images.forEach(image => {
    const url = getImageUrl(image);
    if (imageCache.has(url)) return;
    
    const img = new Image();
    img.onload = () => imageCache.add(url);
    img.src = url;
  });
}

export function isImageCached(url: string): boolean {
  return imageCache.has(url);
}