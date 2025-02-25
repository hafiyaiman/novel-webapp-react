import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { StarIcon } from "./icons";
import { FILE_BASE_URL } from "@/config/config";
import { Novel } from "@/models/Novel";

interface NovelDetailProps {
    selectedNovel: Novel | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function NovelDetail({ selectedNovel, isOpen, onOpenChange }: NovelDetailProps) {
    if (!selectedNovel) return null;

    return (
        <Modal
            size="5xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            backdrop="opaque"
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
        >
            <ModalContent className="bg-background/30 rounded-lg backdrop-blur-lg">
                <ModalHeader className="text-white font-bold text-2xl">
                    {selectedNovel.title}
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Image
                            className="w-full h-auto rounded-md"
                            src={`${FILE_BASE_URL}${selectedNovel.cover.formats.thumbnail.url}`}
                            alt={selectedNovel.title}
                        />

                        <div className="flex flex-col gap-2 w-1/2">
                            <ul className="space-y-2">
                                <li className="text-white font-light">
                                    <strong>Author:</strong> {selectedNovel.author}
                                </li>

                                <li className="text-white font-light">
                                    <strong>Publication:</strong>{" "}
                                    {new Date(selectedNovel.publication).toLocaleDateString()}
                                </li>

                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            size={18}
                                            className={
                                                i < Math.floor(selectedNovel.ratings)
                                                    ? "text-yellow-300"
                                                    : "text-gray-400"
                                            }
                                        />
                                    ))}
                                    <span className="text-white font-light">
                                        {selectedNovel.ratings.toFixed(1)}
                                    </span>
                                </div>

                                <li className="text-white font-light flex gap-2 flex-wrap">
                                    {selectedNovel.genre.split(",").map((genre, index) => (
                                        <Chip key={index} className="bg-gray-700 text-white text-xs">
                                            {genre.trim()}
                                        </Chip>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="mt-2 text-white font-light text-justify"
                        style={{ wordBreak: "break-word" }}
                        dangerouslySetInnerHTML={{ __html: selectedNovel.summary }}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
