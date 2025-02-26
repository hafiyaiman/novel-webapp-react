import { useState, useEffect } from "react";
import { Novel } from "@/models/Novel";
import { novelList } from "@/api/novel";
import { Image } from "@heroui/image";
import { ChevronIcon } from "./icons";
import { FILE_BASE_URL } from "@/config/config";
import { Card, CardFooter } from "@heroui/card";

export default function NovelStackedCarousel() {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        novelList().then((data) => {
            const sortedNovels = data.data
                .sort((a, b) =>
                    b.ratings - a.ratings || a.publication.localeCompare(b.publication)
                )
                .slice(0, 5);
            setNovels(sortedNovels);
        });

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % novels.length);
        }, 3000);

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, [novels.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % novels.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + novels.length) % novels.length);
    };

    return (
        <div
            className="sm:flex flex-row sm:justify-between text-center items-center w-full h-auto bg-no-repeat bg-cover bg-center rounded-2xl p-6"
            style={{
                backgroundImage: `url('/img/bg-library.png')`
            }}
        >
            <div className="sm:text-start ">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 sm:mb-0 text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Trending Now: </span>
                    <span className="font-bold"> Must-Read Novels</span>
                </h1>
                <p>
                    These books are taking the literary world by storm! Stay ahead of the trend and explore the most captivating stories of the moment.
                </p>
            </div>


            {/* Stacked Card */}
            <div className="relative w-full max-w-xs sm:max-w-md h-96 flex items-center justify-center mx-auto sm:mx-0">
                {novels.map((novel, index) => {
                    const position = (index - currentIndex + novels.length) % novels.length;

                    let translateX = 0;
                    let scale = 1;
                    let zIndex = 10 - position;
                    let opacity = 1;

                    const isMobile = screenWidth < 640; // Check if mobile (sm breakpoint in Tailwind)
                    const offset = isMobile ? 60 : 100;
                    const scaleFactor = isMobile ? 0.75 : 0.9;

                    if (position === 1) {
                        translateX = offset;
                        scale = scaleFactor;
                        zIndex = 9;
                    } else if (position === novels.length - 1) {
                        translateX = -offset;
                        scale = scaleFactor;
                        zIndex = 9;
                    } else if (position > 1) {
                        translateX = 0;
                        scale = 0.8;
                        opacity = 0;
                    }

                    return (
                        <Card
                            key={novel.id}
                            className="absolute w-4/5 sm:w-3/5 flex flex-col items-center justify-center rounded-xl shadow-xl overflow-hidden transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(${translateX}px) scale(${scale * 0.65})`,
                                opacity,
                                zIndex,
                            }}
                        >
                            <div
                                className="absolute top-2 left-2 w-12 h-12 flex items-center justify-center text-md font-bold text-white bg-red-500 rounded-full shadow-md"
                                style={{
                                    zIndex: 11,
                                }}
                            >
                                # {index + 1}
                            </div>

                            <Image
                                src={novel.cover?.formats?.small?.url ? `${FILE_BASE_URL}${novel.cover.formats.small.url}` : "/img/img-placeholder.png"}
                                alt={novel.title}
                                className="object-cover rounded-lg w-full h-full"
                            />

                            {position === 0 && (
                                <CardFooter className="bg-transparent bg-opacity-0 text-xl text-center justify-center font-semibold">
                                    {novel.title}
                                </CardFooter>
                            )}
                        </Card>
                    );
                })}

                {/* Navigation Buttons  */}
                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-background shadow-md sm:left-6"
                    onClick={prevSlide}
                >
                    <ChevronIcon className="w-6 h-6" />
                </button>

                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-background shadow-md sm:right-6"
                    onClick={nextSlide}
                >
                    <ChevronIcon className="w-6 h-6 rotate-180" />
                </button>
            </div>
        </div>
    );
}
