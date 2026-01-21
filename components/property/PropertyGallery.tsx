"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { PropertyImage } from "@/lib/types";

interface PropertyGalleryProps {
  images: PropertyImage[];
  coverImage: PropertyImage;
}

export default function PropertyGallery({ images, coverImage }: PropertyGalleryProps) {
  const allImages = [coverImage, ...images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Navegação por teclado
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, allImages.length]);

  // Swipe gestures para mobile
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    }
  };

  const currentImage = allImages[currentIndex];

  return (
    <>
      <section
        className="relative rounded-3xl overflow-hidden border group"
        style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
      >
        {/* Imagem principal */}
        <button
          onClick={() => setLightboxOpen(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden cursor-zoom-in touch-pan-y"
        >
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 70vw"
            priority
          />
          {/* Overlay no hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-3"
              style={{ background: "rgba(247,246,242,.75)", color: "var(--text)" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </button>

        {/* Navegação */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)", color: "var(--text)" }}
              aria-label="Imagem anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)", color: "var(--text)" }}
              aria-label="Próxima imagem"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full border"
            style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)" }}
          >
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
                  ${currentIndex === index 
                    ? "border-[#C9A24D] scale-110" 
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                  }
                `}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Indicador de posição */}
        {allImages.length > 1 && (
          <div
            className="absolute top-4 right-4 px-3 py-1.5 rounded-full border text-xs"
            style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)", color: "var(--text)" }}
          >
            {currentIndex + 1} / {allImages.length}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center text-white transition-all"
            style={{ borderColor: "rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)" }}
            aria-label="Fechar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              width={currentImage.width}
              height={currentImage.height}
              className="object-contain w-full h-full max-h-[90vh] rounded-lg"
              sizes="100vw"
            />
          </div>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border flex items-center justify-center text-white transition-all"
                style={{ borderColor: "rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)" }}
                aria-label="Imagem anterior"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border flex items-center justify-center text-white transition-all"
                style={{ borderColor: "rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)" }}
                aria-label="Próxima imagem"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

