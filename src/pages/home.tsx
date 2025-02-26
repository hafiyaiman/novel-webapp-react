import { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import NovelGrid from "@/components/novelGrid";
import NovelSlide from "@/components/novelSlide";
import { novelList } from "@/api/novel";
import { Novel } from "@/models/Novel";
import { Button } from "@heroui/button";

export default function HomePage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchNovels(forceRefresh = false) {
    try {
      setLoading(true);
      const response = await novelList(forceRefresh);
      setNovels(response.data);
    } catch (error) {
      console.error("Error fetching novels:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch novels on mount
  useEffect(() => {
    fetchNovels();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center">
          <h1 className={title()}>Browse Novels</h1>
        </div>
      </section>

      <section className="px-4 space-y-10">
        <NovelSlide />
        <div>
          {/* Refresh Button */}
          <div className="flex justify-end mb-2">
            <Button
              variant="flat"

              isLoading={loading}
              onPress={() => fetchNovels(true)}
            >
              Refresh
            </Button>
          </div>
          <NovelGrid novels={novels} />
        </div>

      </section>
    </DefaultLayout>
  );
}
