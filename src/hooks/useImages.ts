import { useState, useEffect, useCallback, useRef } from 'react';
import type { Image } from '../types';
import { fetchImages } from '../services/api';
import { preloadImages } from '../utils/imageLoader';

const INITIAL_LOAD_COUNT = 4;
const BATCH_SIZE = 4;

export function useImages() {
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLoadingMore = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function loadInitialImages() {
      try {
        const data = await fetchImages();
        
        if (!mounted) return;
        
        if (!data || data.length === 0) {
          setError('No images available');
          return;
        }

        setAllImages(data);
        
        const initialBatch = data.slice(0, INITIAL_LOAD_COUNT);
        setVisibleImages(initialBatch);
        setCurrentIndex(INITIAL_LOAD_COUNT);

        // Preload next batch
        if (data.length > INITIAL_LOAD_COUNT) {
          const nextBatch = data.slice(INITIAL_LOAD_COUNT, INITIAL_LOAD_COUNT + BATCH_SIZE);
          preloadImages(nextBatch);
        }
      } catch (err) {
        if (!mounted) return;
        console.error('Error loading images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadInitialImages();

    return () => {
      mounted = false;
    };
  }, []);

  const loadMoreImages = useCallback(() => {
    if (isLoadingMore.current || currentIndex >= allImages.length) return;

    isLoadingMore.current = true;
    
    try {
      const nextBatchStart = currentIndex;
      const nextBatchEnd = Math.min(nextBatchStart + BATCH_SIZE, allImages.length);
      const nextBatch = allImages.slice(nextBatchStart, nextBatchEnd);
      
      setVisibleImages(prev => [...prev, ...nextBatch]);
      setCurrentIndex(nextBatchEnd);

      // Preload next batch if available
      if (nextBatchEnd < allImages.length) {
        const preloadStart = nextBatchEnd;
        const preloadEnd = Math.min(preloadStart + BATCH_SIZE, allImages.length);
        const preloadBatch = allImages.slice(preloadStart, preloadEnd);
        preloadImages(preloadBatch);
      }
    } finally {
      isLoadingMore.current = false;
    }
  }, [allImages, currentIndex]);

  return {
    images: visibleImages,
    loading,
    error,
    loadMoreImages,
    hasMore: currentIndex < allImages.length
  };
}