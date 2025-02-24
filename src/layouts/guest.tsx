import { Navbar } from "@/components/navbar";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "@/components/theme-switch";


export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container mx-auto max-w-xl px-6 flex-grow">
        <div className="flex h-full w-full items-center justify-center">

          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <div className="flex  justify-end">
              <ThemeSwitch />
            </div>
            {children}
          </div>
        </div>
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        {/* <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">HeroUI</p>
        </Link> */}
      </footer>
    </div>
  );
}


