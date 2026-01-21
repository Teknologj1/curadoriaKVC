import { openDB } from "idb";

type Favorite = {
  id: string;
  slug: string;
  title: string;
  headline?: string;
  coverUrl?: string;
  updatedAt?: string;
};

const DB_NAME = "curadoria";
const STORE = "favorites";

async function db() {
  return openDB(DB_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE)) {
        database.createObjectStore(STORE, { keyPath: "id" });
      }
    },
  });
}

export async function listFavorites(): Promise<Favorite[]> {
  const d = await db();
  return (await d.getAll(STORE)) as Favorite[];
}

export async function isFavorite(id: string): Promise<boolean> {
  const d = await db();
  return !!(await d.get(STORE, id));
}

export async function addFavorite(item: Favorite) {
  const d = await db();
  await d.put(STORE, item);
}

export async function removeFavorite(id: string) {
  const d = await db();
  await d.delete(STORE, id);
}
