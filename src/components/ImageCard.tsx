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
      className="h-screen w-full flex flex-col justify-center snap-start px-4 pt-20 pb-4 safe-bottom"
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center min-h-0">
          <picture className="w-full h-full flex items-center justify-center">
            <source media="(min-width: 640px)" srcSet={imageurl} />
            <img
              src={url}
              alt={title}
              className={`max-w-full max-h-full border border-black/30 object-contain transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
            />
          </picture>
        </div>
        
        <div className="mt-4 text-center space-y-2 flex-shrink-0">
          <h2 className="text-2xl font-light">{title}</h2>
          <p className="text-sm text-gray-600">{location} © Simon Ives</p>
          <div className="flex justify-center gap-4 pb-2">
            <a
              href={facebookurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-gray-600 transition-colors"
              title="View on Facebook"
            >
              <span className="sr-only">View on Facebook</span>
              <span className="text-sm">View on</span>
              <Facebook size={16} />
            </a>
            <a
              href={instagramurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-gray-600 transition-colors"
              title="View on Instagram"
            >
              <span className="sr-only">View on Instagram</span>
              <span className="text-sm">View on</span>
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}