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
      className="h-screen w-full snap-start flex flex-col items-center justify-center px-4 pt-20"
    >
      <div className="max-w-4xl w-full space-y-4">
        <picture className="relative h-[50vh] md:h-[65vh] w-full flex items-center justify-center">
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
        <div className="text-space-y-2 text-center">
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