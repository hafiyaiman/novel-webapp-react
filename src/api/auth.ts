import { API_BASE_URL, API_TOKEN } from "@/config/config";

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

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
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

        return await response.json();
    } catch (error) {
        console.error("Validate OTP error:", error);
        throw error;
    }
}

