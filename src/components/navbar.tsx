import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { Avatar } from "@heroui/avatar";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { Logo } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { novelList } from "@/api/novel";
import { Novel } from "@/models/Novel";
import NovelDetail from "./novelDetail";
import { Image } from "@heroui/image";
import { FILE_BASE_URL } from "@/config/config";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Divider } from "@heroui/divider";

export const Navbar = () => {
  const { logout, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Novel[]>([]);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "k") {
        setShowSearch(true);
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setIsSearching(true);
      try {
        const response = await novelList(false, query); // Fetch novels based on search query
        setSearchResults(response.data as Novel[]);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleNovelClick = (item: Novel | { label: string; href: string }) => {
    if ("id" in item) {
      setSelectedNovel(item);
      setIsOpen(true);
    } else {
      navigate(item.href);
    }
  };

  return (
    <>
      <HeroUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" color="foreground" href="/">
              <Logo />
              <p className="font-bold text-inherit">NOVELIFY</p>
            </Link>
          </NavbarBrand>
          <div className="hidden sm:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
          {!isLoading ? (
            isAuthenticated ? (
              <>
                {!showSearch && (
                  <NavbarItem className="hidden sm:flex">
                    <Input
                      variant="bordered"
                      aria-label="Search"
                      classNames={{
                        inputWrapper: "bg-default-100",
                        input: "text-sm",
                      }}
                      endContent={<Kbd className="hidden lg:inline-block" keys={["alt"]}>K</Kbd>}
                      labelPlacement="outside"
                      placeholder="Search..."
                      startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
                      type="search"
                      onFocus={() => setShowSearch(true)}
                    />
                  </NavbarItem>
                )}
                <Popover showArrow placement="bottom">
                  <PopoverTrigger>
                    <Avatar isBordered className="cursor-pointer"></Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="py-4 px-4 rounded-lg bg-opacity-30 backdrop-filter backdrop-blur-lg border border-transparent shadow-md">
                    <div className="flex-col items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-default-800 font-semibold">{user?.firstName} {user?.lastName}</div>
                      </div>
                      <div className="text-tiny text-default-500">{user?.email}</div>
                    </div>
                    <Divider className="my-2" />

                    <Button
                      color="danger"
                      variant="flat"
                      onPress={handleLogout}
                      className="w-full"
                    >
                      Logout
                    </Button>

                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <NavbarItem className="hidden sm:flex gap-2">
                <Link href="/signin">
                  <Button color="primary" variant="bordered">
                    Login
                  </Button>
                </Link>
              </NavbarItem>
            )
          ) : (
            <NavbarItem className="hidden sm:flex">
              <p className="text-sm text-gray-500">Loading...</p>
            </NavbarItem>
          )}
        </NavbarContent>


        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Small Navbar Menu */}
        <NavbarMenu >
          <div className="mx-4 mt-2 flex-col gap-2 flex">
            <div className="sm:hidden">
              <Input
                variant="bordered"
                aria-label="Search"
                classNames={{
                  inputWrapper: "bg-default-100",
                  input: "text-sm",
                }}
                labelPlacement="outside"
                placeholder="Search..."
                startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
                type="search"
                onClick={() => !showSearch && setShowSearch(true)} // ✅ Fix: Prevent unwanted reopening
              />
            </div>

            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                {item.label === "Logout" ? (
                  <Button color="danger" onPress={handleLogout}>Logout</Button>
                ) : (
                  <Link
                    color={index === 2 ? "danger" : index === siteConfig.navMenuItems.length - 1 ? "danger" : "foreground"}
                    href={item.href}
                    size="lg"
                    onPress={() => handleNovelClick(item)}
                  >
                    {item.label}
                  </Link>
                )}
              </NavbarMenuItem>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 flex items-center my-4 px-6">
            <Avatar size="sm" isBordered className="cursor-pointer mx-4" ></Avatar>
            <div className="flex-col items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-default-800 font-semibold">{user?.firstName} {user?.lastName}</div>
              </div>
              <div className="text-tiny text-default-500">{user?.email}</div>
            </div>
          </div>
        </NavbarMenu>
      </HeroUINavbar>

      {/* Search Modal */}
      <Modal
        isOpen={showSearch}
        onOpenChange={(open) => setShowSearch(open)}
        size="lg"
        backdrop="blur"
        closeButton
      >
        <ModalContent>
          <ModalHeader>Search Novels</ModalHeader>
          <ModalBody>
            <Input
              variant="bordered"
              aria-label="Search"
              placeholder="Search novels..."
              startContent={<SearchIcon className="text-base text-default-400" />}
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
            {/* Display search results */}
            {isSearching ? (
              <p className="text-sm text-gray-500 mt-2">Searching...</p>
            ) : searchResults.length > 0 ? (
              <ul className="mt-3">
                {searchResults.map((novel) => (
                  <li key={novel.id} className="py-1 border-b">
                    <Link
                      className="text-primary cursor-pointer"
                      onPress={() => {
                        handleNovelClick(novel);
                        setShowSearch(false);
                      }}
                    >
                      <Image
                        src={
                          novel.cover?.formats?.thumbnail?.url
                            ? `${FILE_BASE_URL}${novel.cover.formats.small.url}`
                            : "/img/img-placeholder.png"
                        }
                        alt={novel.title}
                        className="w-12 h-16 mr-2"
                      />
                      {novel.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : searchQuery.length > 0 ? (
              <p className="text-sm text-gray-500 mt-2">No results found</p>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>


      {/* Modal for Novel Details */}
      <NovelDetail selectedNovel={selectedNovel} isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
