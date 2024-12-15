import React, { useState, useEffect } from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { getImageUrl, isImageCached } from '../utils/imageLoader';
import type { Image } from '../types';

interface ImageCardProps extends Image {
  onInView?: () => void;
  isLast?: boolean;
}

export default function ImageCard({
  imageurl,
  mobileimageurl,
  title,
  location,
  facebookurl,
  instagramurl,
  onInView,
  isLast,
}: ImageCardProps) {
  const url = getImageUrl({ imageurl, mobileimageurl } as Image);
  const [isLoaded, setIsLoaded] = useState(isImageCached(url));
  
  const { targetRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    onIntersect: isLast ? onInView : undefined
  });

  useEffect(() => {
    if (isImageCached(url)) {
      setIsLoaded(true);
    }
  }, [url]);

  return (
    <section 
      ref={targetRef as React.RefObject<HTMLElement>}
      className="h-screen min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 pt-16 sm:pt-20 snap-start"
    >
      <div className="max-w-3xl w-full flex flex-col items-center">
        <picture className="mb-4 sm:mb-6 relative">
          <source media="(min-width: 640px)" srcSet={imageurl} />
          <img
            src={url}
            alt={title}
            className={`max-w-full border border-black/30 object-contain max-h-[calc(60vh-64px)] sm:max-h-[calc(70vh-64px)] transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </picture>
        <div className="text-center space-y-1.5 sm:space-y-2">
          <h2 className="text-xl sm:text-2xl font-light">{title}</h2>
          <p className="text-xs sm:text-sm text-gray-600">{location} © Simon Ives</p>
          <div className="flex justify-center gap-3 sm:gap-4">
            <a
              href={facebookurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:text-gray-600 transition-colors"
              title="View on Facebook"
            >
              <span className="sr-only">View on Facebook</span>
              <span>View on</span>
              <Facebook size={14} className="sm:w-4 sm:h-4" />
            </a>
            <a
              href={instagramurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:text-gray-600 transition-colors"
              title="View on Instagram"
            >
              <span className="sr-only">View on Instagram</span>
              <span>View on</span>
              <Instagram size={14} className="sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}