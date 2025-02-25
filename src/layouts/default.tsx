import { Link } from "@heroui/link";
import { GithubIcon, TwitterIcon, DiscordIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { Logo } from "@/components/icons";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex flex-col items-center justify-center py-3 text-white gap-2">
        <Logo />
        <div className="flex gap-4 mb-3">
          <Link href="/" className="text-default hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-default hover:underline">
            About
          </Link>
          <Link href="/blog" className="text-default hover:underline">
            Blog
          </Link>
          <Link href="/docs" className="text-default hover:underline">
            Docs
          </Link>
        </div>
        <div>
          <div className="flex gap-4">
            <Link href="https://facebook.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={24} />
            </Link>
            <Link href="https://twitter.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              <TwitterIcon size={24} />
            </Link>
            <Link href="https://instagram.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              <DiscordIcon size={24} />
            </Link>
          </div>

        </div>
        <p className="text-sm text-default">&copy; 2023 Novelify. All rights reserved.</p>
      </footer>
    </div>
  );
}
