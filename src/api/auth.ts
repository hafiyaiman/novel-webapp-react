import { API_BASE_URL, API_TOKEN } from "@/config/config";
import { UserRegistration } from "@/models/User";

export async function register(userData: UserRegistration) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.error?.message || "Registration failed");
        }
        return data;
    } catch (error: any) {
        throw new Error(error.message || "An unexpected error occurred");
    }
}

export async function login(email: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify({ identifier: email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.error?.message || "Login failed");
        }
        console.log(data);
        return data;
    } catch (error: any) {
        throw new Error(error.message || "An unexpected error occurred");
    }
}

export async function validateOtp(email: string, code: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/validateOtp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify({ identifier: email, code: code }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.error?.message || "OTP validation failed");
        }

        return data;
    } catch (error: any) {
        console.error("Validate OTP error:", error);
        throw new Error(error.message || "An unexpected error occurred");
    }
}

export async function fetchCountryCode() {
    const LOCAL_STORAGE_KEY = "countryCodes";

    try {
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedData) {
            console.log("Using cached country codes");
            return JSON.parse(cachedData);
        }

        const response = await fetch(`${API_BASE_URL}/countryCode`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`,
            },
        });
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data?.error?.message || "Country code fetch failed");
        }

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data));
        return data.data;
    } catch (error: any) {
        throw new Error(error.message || "An unexpected error occurred");
    }
}
