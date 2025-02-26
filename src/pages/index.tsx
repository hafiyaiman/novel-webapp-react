import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[calc(100vh-14rem)]">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Discover&nbsp;</span>
          <span className={title({ color: "violet" })}>captivating&nbsp;</span>
          <br />
          <span className={title()}>stories that spark your imagination.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Explore trending novels, hidden gems, and timeless classics—all in one place.
          </div>
        </div>

        <div className="flex gap-3 text-white">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/home"
          >
            Browse Novels
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="#"
          >
            Explore Genres
          </Link>
        </div>

      </section>
    </DefaultLayout>
  );
}
