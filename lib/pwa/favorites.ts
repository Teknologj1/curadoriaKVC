/**
 * Favoritos - IndexedDB
 * Sistema de salvamento de imóveis para visualização offline
 */

import { Property } from '@/lib/types';

const DB_NAME = 'kvccuradoria';
const DB_VERSION = 1;
const STORE_NAME = 'favorites';

interface FavoriteProperty extends Property {
  savedAt: string;
  lastViewed?: string;
}

// ============================================
// INICIALIZAÇÃO DO BANCO
// ============================================

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('savedAt', 'savedAt', { unique: false });
        store.createIndex('lastViewed', 'lastViewed', { unique: false });
      }
    };
  });
}

// ============================================
// OPERAÇÕES CRUD
// ============================================

/**
 * Salvar imóvel nos favoritos
 */
export async function saveFavorite(property: Property): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const favoriteProperty: FavoriteProperty = {
      ...property,
      savedAt: new Date().toISOString(),
      lastViewed: new Date().toISOString()
    };

    await store.put(favoriteProperty);
    console.log('[Favorites] Imóvel salvo:', property.id);
  } catch (error) {
    console.error('[Favorites] Erro ao salvar:', error);
    throw error;
  }
}

/**
 * Remover imóvel dos favoritos
 */
export async function removeFavorite(propertyId: string): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await store.delete(propertyId);
    console.log('[Favorites] Imóvel removido:', propertyId);
  } catch (error) {
    console.error('[Favorites] Erro ao remover:', error);
    throw error;
  }
}

/**
 * Verificar se imóvel está salvo
 */
export async function isFavorite(propertyId: string): Promise<boolean> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get(propertyId);
    return new Promise((resolve) => {
      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => resolve(false);
    });
  } catch (error) {
    console.error('[Favorites] Erro ao verificar:', error);
    return false;
  }
}

/**
 * Listar todos os favoritos
 */
export async function getFavorites(): Promise<FavoriteProperty[]> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      
      request.onsuccess = () => {
        const favorites = request.result || [];
        // Ordenar por data de salvamento (mais recente primeiro)
        favorites.sort((a, b) => 
          new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        );
        resolve(favorites);
      };
      
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('[Favorites] Erro ao listar:', error);
    return [];
  }
}

/**
 * Atualizar última visualização
 */
export async function updateLastViewed(propertyId: string): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get(propertyId);
    request.onsuccess = () => {
      const favorite = request.result;
      if (favorite) {
        favorite.lastViewed = new Date().toISOString();
        store.put(favorite);
      }
    };
  } catch (error) {
    console.error('[Favorites] Erro ao atualizar:', error);
  }
}

/**
 * Limpar todos os favoritos
 */
export async function clearFavorites(): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await store.clear();
    console.log('[Favorites] Todos os favoritos removidos');
  } catch (error) {
    console.error('[Favorites] Erro ao limpar:', error);
    throw error;
  }
}

/**
 * Contar favoritos
 */
export async function getFavoritesCount(): Promise<number> {
  try {
    const favorites = await getFavorites();
    return favorites.length;
  } catch (error) {
    console.error('[Favorites] Erro ao contar:', error);
    return 0;
  }
}

// ============================================
// SINCRONIZAÇÃO (quando voltar online)
// ============================================

/**
 * Sincronizar favoritos com servidor
 */
export async function syncFavorites(): Promise<void> {
  if (!navigator.onLine) {
    console.log('[Favorites] Offline - sincronização adiada');
    return;
  }

  try {
    const favorites = await getFavorites();
    
    // Enviar para servidor
    const response = await fetch('/api/favorites/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorites })
    });

    if (response.ok) {
      console.log('[Favorites] Sincronização concluída');
    }
  } catch (error) {
    console.error('[Favorites] Erro na sincronização:', error);
  }
}

// Registrar sync quando voltar online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    syncFavorites();
  });
}

