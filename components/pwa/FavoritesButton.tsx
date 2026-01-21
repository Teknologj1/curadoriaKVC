/**
 * FavoritesButton - Botão de salvar/remover favorito
 */

'use client';

import { useState, useEffect } from 'react';
import { saveFavorite, removeFavorite, isFavorite } from '@/lib/pwa/favorites';
import { Property } from '@/lib/types';

interface FavoritesButtonProps {
  property: Property;
  variant?: 'icon' | 'text' | 'both';
  className?: string;
}

export default function FavoritesButton({ 
  property, 
  variant = 'icon',
  className = '' 
}: FavoritesButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, [property.id]);

  async function checkFavorite() {
    const saved = await isFavorite(property.id);
    setIsSaved(saved);
  }

  async function handleToggle() {
    if (loading) return;

    setLoading(true);
    
    try {
      if (isSaved) {
        await removeFavorite(property.id);
        setIsSaved(false);
      } else {
        await saveFavorite(property);
        setIsSaved(true);
        
        // Track event
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'favorite_saved', {
            property_id: property.id
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`favorites-button ${isSaved ? 'saved' : ''} ${className}`}
      aria-label={isSaved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
    >
      {variant === 'icon' || variant === 'both' ? (
        <span className="favorites-icon">
          {isSaved ? '💾' : '💾'}
        </span>
      ) : null}
      {variant === 'text' || variant === 'both' ? (
        <span className="favorites-text">
          {isSaved ? 'Salvo' : 'Salvar'}
        </span>
      ) : null}
    </button>
  );
}

