import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { useEffect } from "react";
import { SearchIcon } from "./icons";

const SearchComponent = () => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                console.log("Search shortcut (Cmd/Ctrl + K) pressed!");
                event.preventDefault(); // Prevent default browser behavior
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <Input
            variant="bordered"
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    );
};

export default SearchComponent;
