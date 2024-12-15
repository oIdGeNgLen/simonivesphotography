import React from 'react';
import ImageCard from './ImageCard';
import LoadingSpinner from './LoadingSpinner';
import { useImages } from '../hooks/useImages';

export default function Gallery() {
  const { images, loading, error, loadMoreImages, hasMore } = useImages();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-64px)] mt-16 overflow-y-auto snap-y snap-mandatory">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          {...image}
          isLast={index === images.length - 1 && hasMore}
          onInView={loadMoreImages}
        />
      ))}
    </main>
  );
}