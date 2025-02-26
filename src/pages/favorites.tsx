import { useState, useEffect } from "react";
import { getFavoriteNovels } from "@/utils/favorites";
import { novelList } from "@/api/novel";
import { Novel } from "@/models/Novel";
import NovelGrid from "@/components/novelGrid";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

export default function FavoritesPage() {
    const [favoriteNovels, setFavoriteNovels] = useState<Novel[]>([]);

    useEffect(() => {
        async function fetchFavorites() {
            const response = await novelList(); // Response contains { data: Novel[] }
            const allNovels = response.data; // Extract the array of novels
            const favoriteIds = getFavoriteNovels();

            const filteredNovels = allNovels.filter((novel) => favoriteIds.includes(novel.id));
            setFavoriteNovels(filteredNovels);
        }


        fetchFavorites();
    }, []);

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center">
                    <h1 className={title()}>My Favorite Novels</h1>
                </div>
            </section>
            <div>

                {favoriteNovels.length === 0 ? (
                    <p>No favorites yet.</p>
                ) : (
                    <NovelGrid novels={favoriteNovels} />
                )}
            </div>
        </DefaultLayout>
    );
}
