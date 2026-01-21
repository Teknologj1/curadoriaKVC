"use client";

import { useEffect, useState } from "react";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites";
// Favorite type is defined inline
type Favorite = {
  id: string;
  slug: string;
  title: string;
  headline?: string;
  coverUrl?: string;
  updatedAt?: string;
};

interface SaveButtonProps {
  id: string;
  slug: string;
  title: string;
  headline?: string;
  coverUrl?: string;
  updatedAt?: string;
  variant?: "icon" | "text" | "both";
  className?: string;
}

export function SaveButton({
  id,
  slug,
  title,
  headline,
  coverUrl,
  updatedAt,
  variant = "icon",
  className = "",
}: SaveButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isFavorite(id).then(setSaved);
  }, [id]);

  async function toggle() {
    if (loading) return;
    
    setLoading(true);
    
    try {
      if (saved) {
        await removeFavorite(id);
        setSaved(false);
        
        // Track event
        if (typeof (window as any).gtag !== "undefined") {
          (window as any).gtag("event", "favorite_removed", {
            property_id: id,
          });
        }
      } else {
        const favorite: Omit<Favorite, "savedAt"> = {
          id,
          slug,
          title,
          headline,
          coverUrl,
          updatedAt,
        };
        await addFavorite(favorite);
        setSaved(true);
        
        // Track event
        if (typeof (window as any).gtag !== "undefined") {
          (window as any).gtag("event", "favorite_saved", {
            property_id: id,
          });
        }
        
        // Incrementar contador para trigger de instalação
        const favoriteCount = parseInt(
          localStorage.getItem("favorite_count") || "0"
        );
        localStorage.setItem("favorite_count", (favoriteCount + 1).toString());
      }
    } catch (error) {
      console.error("Erro ao salvar favorito:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`save-button ${saved ? "saved" : ""} ${className}`}
      aria-label={saved ? "Remover dos favoritos" : "Salvar nos favoritos"}
    >
      {variant === "icon" || variant === "both" ? (
        <span className="save-icon">{saved ? "💾" : "💾"}</span>
      ) : null}
      {variant === "text" || variant === "both" ? (
        <span className="save-text">{saved ? "Salvo" : "Salvar"}</span>
      ) : null}
    </button>
  );
}

