import { useState, useEffect } from "react";
import { novelList } from "@/api/novel";
import { Novel } from "@/models/Novel";
import { FILE_BASE_URL } from "@/config/config";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Image } from "@heroui/image";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { ChevronIcon, HeartFilledIcon, StarIcon } from "./icons";
import { Pagination, PaginationItemRenderProps, PaginationItemType } from "@heroui/pagination";
import { cn } from "@heroui/theme";
import NovelDetail from "./novelDetail";



export default function NovelGrid() {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
    const [page, setPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8); // Increased for better user experience
    const [heartClicked, setHeartClicked] = useState<{ [id: number]: boolean }>({});
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        async function fetchNovels() {
            try {
                const response = await novelList();
                setNovels(response.data);
            } catch (error) {
                console.error("Error fetching novels:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNovels();
    }, []);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const renderItem = ({
        ref,
        key,
        value,
        isActive,
        onNext,
        onPrevious,
        setPage: paginationSetPage,
        className,
    }: PaginationItemRenderProps) => {
        if (value === PaginationItemType.NEXT) {
            return (
                <button
                    key={key}
                    className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
                    onClick={onNext}
                >
                    <ChevronIcon className="rotate-180" />
                </button>
            );
        }

        if (value === PaginationItemType.PREV) {
            return (
                <button
                    key={key}
                    className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
                    onClick={onPrevious}
                >
                    <ChevronIcon />
                </button>
            );
        }

        if (value === PaginationItemType.DOTS) {
            return (
                <button key={key} className={className}>
                    ...
                </button>
            );
        }

        return (
            <button
                key={key}
                ref={ref}
                className={cn(
                    className,
                    isActive &&
                    "text-white bg-gradient-to-br from-primary to-pink-600 font-bold"
                )}
                onClick={() => {
                    paginationSetPage(value);
                    handlePageChange(value);
                }}
            >
                {value}
            </button>
        );
    };

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-80 sm:h-[22rem] lg:h-[26rem] w-full rounded-lg"
                    />
                ))}
            </div>
        );
    }

    if (novels.length === 0) {
        return <p className="text-center py-8">No novels available.</p>;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNovels = novels.slice(startIndex, endIndex);

    return (
        <>
            {/* Grid of Novels */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:px-4">
                {paginatedNovels.map((novel) => (
                    <div
                        key={novel.id}
                        onClick={() => {
                            console.log("Card clicked");
                            onOpen();
                            setSelectedNovel(novel);
                        }}
                        className="w-full h-full cursor-pointer"
                    >
                        <Card
                            className="cursor-pointer hover:shadow-lg transition"
                        >
                            <Image
                                className="h-full w-full rounded-t-lg transition hover:brightness-75"
                                src={`${FILE_BASE_URL}${novel.cover.formats.small.url}`}
                                alt={novel.title}
                            />

                            <CardHeader className="absolute top-0 right-0">
                                <Chip
                                    size={window.innerWidth < 640 ? "sm" : undefined}
                                    color="secondary"
                                    endContent={<StarIcon size={18} />}
                                >
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
                                    <Button
                                        key={novel.id}
                                        size="sm"
                                        isIconOnly
                                        aria-label="Like"
                                        className={`bg-transparent focus:outline-none hover:bg-primary/10 ${heartClicked[novel.id] ? "text-red-500" : "text-gray-400"}`}
                                        onPress={() => {
                                            setHeartClicked((prevState) => ({
                                                ...prevState,
                                                [novel.id]: !prevState[novel.id],
                                            }))
                                        }}
                                    >
                                        <HeartFilledIcon size={20} />
                                    </Button>
                                </div>

                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div >

            {/* Pagination */}
            < div className="flex justify-center mt-6" >
                <Pagination
                    disableCursorAnimation
                    showControls
                    className="gap-2"
                    page={page}
                    onChange={handlePageChange}
                    radius="full"
                    renderItem={renderItem}
                    total={Math.ceil(novels.length / itemsPerPage)}
                    variant="light"
                />
            </div >

            {/* Modal for Novel Details */}
            <NovelDetail
                selectedNovel={selectedNovel}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
}

