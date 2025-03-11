import { FC } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy'
}) => {
  // Get file extension and base name
  const ext = src.split('.').pop() || '';
  const basePath = src.replace(`.${ext}`, '');

  return (
    <picture>
      {/* AVIF format */}
      <source
        srcSet={`${basePath}.avif`}
        type="image/avif"
      />
      {/* WebP format */}
      <source
        srcSet={`${basePath}.webp`}
        type="image/webp"
      />
      {/* Original format as fallback */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
      />
    </picture>
  );
};

export default OptimizedImage; 