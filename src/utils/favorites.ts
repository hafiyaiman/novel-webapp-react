export const FAVORITES_KEY = "favorite_novels";

// Get favorites from local storage
export function getFavoriteNovels(): number[] {
    if (typeof window === "undefined") return []; // Ensure it's running in the browser
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

// Save favorites to local storage
export function saveFavoriteNovels(favorites: number[]) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Toggle a novel in favorites
export function toggleFavorite(novelId: number) {
    const favorites = getFavoriteNovels();
    const updatedFavorites = favorites.includes(novelId)
        ? favorites.filter(id => id !== novelId) // Remove if already favorited
        : [...favorites, novelId]; // Add if not favorited

    saveFavoriteNovels(updatedFavorites);
    console.log("Updated favorites:", updatedFavorites);
    return updatedFavorites;
}

// Check if a novel is favorited
export function isFavorite(novelId: number): boolean {
    return getFavoriteNovels().includes(novelId);
}
