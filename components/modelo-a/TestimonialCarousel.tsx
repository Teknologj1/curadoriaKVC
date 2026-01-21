"use client";

import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Compra segura, sem pressão e com muita clareza. A curadoria realmente faz diferença.",
    author: "Carlos",
    role: "empresário",
  },
  {
    text: "Foi mais consultoria do que venda. Entenderam exatamente o que eu precisava.",
    author: "Mariana",
    role: "médica",
  },
  {
    text: "Decisão tranquila, sem arrependimentos. O processo foi transparente do início ao fim.",
    author: "Roberto",
    role: "investidor",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section 
      className="py-12 md:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative">
          {/* Carousel */}
          <div
            className="overflow-hidden rounded-3xl border backdrop-blur-sm p-8 md:p-12"
            style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
          >
            <div className="relative h-48 md:h-64">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`
                    absolute inset-0 transition-all duration-700 ease-in-out
                    ${index === currentIndex 
                      ? "opacity-100 translate-x-0" 
                      : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                    }
                  `}
                >
                  <blockquote className="h-full flex flex-col justify-center">
                    <p className="text-lg md:text-2xl font-serif font-light leading-relaxed mb-6">
                      "{testimonial.text}"
                    </p>
                    <footer className="flex items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                        style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)", color: "var(--accent)" }}
                      >
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        {testimonial.role && (
                          <div className="text-sm" style={{ color: "var(--muted)" }}>{testimonial.role}</div>
                        )}
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)", color: "var(--text)" }}
            aria-label="Depoimento anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentIndex + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{ borderColor: "var(--border)", background: "rgba(247,246,242,.75)", color: "var(--text)" }}
            aria-label="Próximo depoimento"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8" : ""}`}
                style={{
                  background: index === currentIndex ? "var(--accent)" : "color-mix(in srgb, var(--text) 20%, transparent)",
                }}
                aria-label={`Depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


