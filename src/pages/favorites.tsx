import { useState, useEffect } from "react";
import { getFavoriteNovels } from "@/utils/favorites";
import { novelList } from "@/api/novel";
import { Novel } from "@/models/Novel";
import NovelGrid from "@/components/novelGrid";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

export default function FavoritesPage() {
    const [favoriteNovels, setFavoriteNovels] = useState<Novel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    async function fetchFavorites() {
        setLoading(true);
        try {
            const response = await novelList();
            const allNovels = response.data;
            const favoriteIds = getFavoriteNovels();

            const filteredNovels = allNovels.filter((novel) => favoriteIds.includes(novel.id));
            setFavoriteNovels(filteredNovels);
        } catch (error) {
            console.error("Error fetching novels:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
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
                    <div className="flex items-center justify-center">
                        <p>No favorites yet.</p>

                    </div>
                ) : (
                    <NovelGrid novels={favoriteNovels} fetchNovels={fetchFavorites} loading={loading} />
                )}
            </div>
        </DefaultLayout>
    );
}
