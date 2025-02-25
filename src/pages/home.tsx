import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import NovelGrid from "@/components/novelGrid";
import NovelSlide from "@/components/novelSlide";

export default function HomePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center">
          <h1 className={title()}>Browse Novels</h1>
        </div>
      </section>

      <section className="px-4 space-y-10">
        <NovelSlide />
        <NovelGrid />
      </section>
    </DefaultLayout>
  );
}
