'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/cn';

interface AutoVideoProps {
  readonly src: string;
  readonly className?: string;
}

/** Video decorativo en loop: silenciado, sin controles y pausado con reduced-motion. */
export function AutoVideo({ src, className }: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = videoRef.current;
    if (!video) return;

    const applyPreference = () => {
      if (media.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        void video.play().catch(() => undefined);
      }
    };

    applyPreference();
    media.addEventListener('change', applyPreference);
    return () => media.removeEventListener('change', applyPreference);
  }, []);

  return (
    <video
      ref={videoRef}
      className={cn('size-full object-cover', className)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
