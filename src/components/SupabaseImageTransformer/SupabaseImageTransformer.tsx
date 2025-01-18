import React, { useState, useEffect, useRef } from 'react';
import { ImageIcon } from 'lucide-react';
import { SupabaseImageTransformerProps } from './types';
import { buildTransformedUrl, generateSrcSet } from './utils';

export const SupabaseImageTransformer: React.FC<SupabaseImageTransformerProps> = ({
  imageUrl,
  transformations,
  responsive,
  fallbackImage,
  alt = 'Transformed image',
  blurHash,
  lazy = true,
  preload = false,
  className = '',
  ...props
}) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const transformedUrl = buildTransformedUrl(imageUrl, transformations);
  const srcSet = responsive ? generateSrcSet(imageUrl, responsive) : undefined;

  useEffect(() => {
    if (lazy && typeof IntersectionObserver !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }

      return () => {
        observerRef.current?.disconnect();
      };
    }
  }, [lazy]);

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gray-100 rounded-lg">
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
      {isInView && (
        <img
          ref={imgRef}
          src={error ? fallbackImage || imageUrl : transformedUrl}
          srcSet={srcSet}
          sizes={responsive ? '100vw' : undefined}
          alt={alt}
          className={`max-w-full ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 ${className}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          {...props}
        />
      )}
    </div>
  );
};