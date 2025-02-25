import { API_BASE_URL, API_TOKEN } from "@/config/config";
import { Novel } from "@/models/Novel";

const LOCAL_STORAGE_KEY = "novelList";

export async function novelList(): Promise<{ data: Novel[] }> {
    try {
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedData) {
            console.log("Using cached data");
            return JSON.parse(cachedData);
        }

        const response = await fetch(`${API_BASE_URL}/fetchNovel`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });

        const data = await response.json();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("Novel List error:", error);
        throw error;
    }
}
