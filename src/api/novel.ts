import { API_BASE_URL, API_TOKEN } from "@/config/config";
import { Novel } from "@/models/Novel";

const LOCAL_STORAGE_KEY = "novelList";

export async function novelList(
    forceRefresh = false,
    searchQuery: string = ""
): Promise<{ data: Novel[] }> {
    try {
        if (!forceRefresh) {
            const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (cachedData) {
                console.log("Using cached data");
                let parsedData = JSON.parse(cachedData);

                // Apply search filter if a query is provided
                if (searchQuery) {
                    parsedData.data = parsedData.data.filter((novel: Novel) =>
                        novel.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                return parsedData;
            }
        }

        console.log("Fetching fresh data from API...");
        const response = await fetch(`${API_BASE_URL}/fetchNovel`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });

        const data = await response.json();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

        // Apply search filter if a query is provided
        if (searchQuery) {
            data.data = data.data.filter((novel: Novel) =>
                novel.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return data;
    } catch (error) {
        console.error("Novel List error:", error);
        throw error;
    }
}
