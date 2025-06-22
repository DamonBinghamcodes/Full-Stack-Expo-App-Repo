import { API_URL } from "@/config/api";

export const listCloudinaryImages = async (folder: string) => {
    try {
        console.log("Fetching images from folder:", folder);
        const response = await fetch(`${API_URL}/api/styles`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to fetch style images:", errorText);
            throw new Error(`Failed to fetch style images: ${errorText}`);
        }

        const data = await response.json();
        console.log("Received images:", data);
        return data;
    } catch (error) {
        console.error("Error fetching Cloudinary images:", error);
        return [];
    }
};
