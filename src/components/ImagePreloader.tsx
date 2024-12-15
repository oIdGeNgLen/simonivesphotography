import { useEffect } from 'react';

interface ImagePreloaderProps {
  imageUrl: string;
  mobileImageUrl: string;
}

export default function ImagePreloader({ imageUrl, mobileImageUrl }: ImagePreloaderProps) {
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const urls = isMobile ? [mobileImageUrl] : [imageUrl];

    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrl, mobileImageUrl]);

  return null;
}