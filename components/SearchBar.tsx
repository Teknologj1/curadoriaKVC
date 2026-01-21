"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Property } from "@/lib/types";
import { getAllProperties } from "@/lib/data";
import Link from "next/link";

interface SearchBarProps {
  onResultClick?: () => void;
  placeholder?: string;
}

export function SearchBar({ onResultClick, placeholder = "Buscar imóveis..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const allProperties = useMemo(() => getAllProperties(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return allProperties
      .filter((p) => {
        const searchable = [
          p.editorial.title,
          p.editorial.headline,
          p.editorial.summary,
          p.location.neighborhood,
          p.location.city,
          ...p.editorial.tags,
        ].join(" ").toLowerCase();
        return searchable.includes(lowerQuery);
      })
      .slice(0, 5);
  }, [query, allProperties]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      const result = results[focusedIndex];
      if (result) {
        window.location.href = `/imovel/${result.slug}`;
        onResultClick?.();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 rounded-xl border placeholder-black/40 focus:outline-none transition-all duration-300"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
          style={{ color: "var(--muted)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
            style={{ color: "var(--muted)" }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border backdrop-blur-md overflow-hidden z-50 animate-fade-in"
          style={{ borderColor: "var(--border)", background: "var(--surface2)", boxShadow: "var(--shadow)" }}
        >
          {results.length === 0 ? (
            <div className="p-4 text-center text-sm" style={{ color: "var(--muted)" }}>
              Nenhum imóvel encontrado
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {results.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/imovel/${item.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    onResultClick?.();
                  }}
                  className="block p-4 border-b transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    background: focusedIndex === index ? "var(--surface)" : "transparent",
                  }}
                >
                  <div className="font-semibold mb-1 line-clamp-1" style={{ color: "var(--text)" }}>
                    {item.editorial.title}
                  </div>
                  <div className="text-sm line-clamp-1" style={{ color: "var(--muted)" }}>
                    {item.editorial.headline}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    {item.location.neighborhood} • {item.location.city}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
