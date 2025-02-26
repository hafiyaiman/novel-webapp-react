import { useState, useEffect } from "react";
import { Novel } from "@/models/Novel";
import { FILE_BASE_URL } from "@/config/config";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { ChevronIcon, HeartFilledIcon, StarIcon } from "./icons";
import { Pagination, PaginationItemRenderProps, PaginationItemType } from "@heroui/pagination";
import { useDisclosure } from "@heroui/modal";
import { getFavoriteNovels, toggleFavorite } from "@/utils/favorites";
import NovelDetail from "./novelDetail";

// Define props interface
interface NovelGridProps {
    novels: Novel[]; // Passed from FavoritesPage
}

export default function NovelGrid({ novels }: NovelGridProps) {
    const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Pagination state
    const [page, setPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8);

    // Manage favorite state
    const [favorites, setFavorites] = useState<number[]>([]);

    // Load favorites from local storage on mount
    useEffect(() => {
        setFavorites(getFavoriteNovels());
    }, []);

    // Handle bookmark (toggle favorite)
    const handleFavoriteToggle = (novelId: number) => {
        const updatedFavorites = toggleFavorite(novelId);
        setFavorites(updatedFavorites);
    };

    // Pagination logic
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNovels = novels.slice(startIndex, endIndex);

    return (
        <>
            {/* Grid of Novels */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {paginatedNovels.map((novel) => (
                    <div
                        key={novel.id}
                        onClick={() => {
                            onOpen();
                            setSelectedNovel(novel);
                        }}
                        className="w-full h-full cursor-pointer"
                    >
                        <Card className="cursor-pointer hover:shadow-lg transition">
                            <Image
                                className="h-full w-full rounded-t-lg transition hover:brightness-75"
                                src={`${FILE_BASE_URL}${novel.cover.formats.small.url}`}
                                alt={novel.title}
                            />

                            <CardHeader className="absolute top-0 right-0">
                                <Chip size="sm" color="secondary" endContent={<StarIcon size={18} />}>
                                    {novel.ratings}
                                </Chip>
                            </CardHeader>

                            <CardFooter className="bg-black/60 text-white border-t border-white/20 py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] backdrop-blur-md shadow-small ml-1 z-10">
                                <div className="flex justify-between w-full items-center">
                                    <div className="w-[calc(100%-2.5rem)]">
                                        <h2 className="text-start text-sm sm:text-md font-semibold truncate">
                                            {novel.title}
                                        </h2>
                                        <p className="text-start text-xs sm:text-sm truncate">
                                            By {novel.author}
                                        </p>
                                    </div>

                                    {/* Like Button */}
                                    <Button
                                        size="sm"
                                        isIconOnly
                                        aria-label="Like"
                                        className={`bg-transparent focus:outline-none hover:bg-primary/10 ${favorites.includes(novel.id) ? "text-red-500" : "text-gray-400"
                                            }`}
                                        onPress={() => {
                                            (event as MouseEvent).stopPropagation();
                                            handleFavoriteToggle(novel.id);
                                        }}
                                    >
                                        <HeartFilledIcon size={20} />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    showControls
                    className="gap-2"
                    page={page}
                    onChange={setPage}
                    radius="full"
                    total={Math.ceil(novels.length / itemsPerPage)}
                    variant="light"
                />
            </div>

            {/* Modal for Novel Details */}
            <NovelDetail selectedNovel={selectedNovel} isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}
