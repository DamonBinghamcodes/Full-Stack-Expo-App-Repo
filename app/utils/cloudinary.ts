import { Platform } from "react-native";

export const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_URL!;
// Use a specific preset configured for PNG conversion and compression
export const UPLOAD_PRESET = "image_preset";

export const uploadToCloudinary = async (uri: string, folder: string) => {
    try {
        // On iOS, we need to prepend 'file://' to the URI
        const fileUri =
            Platform.OS === "ios" ? uri.replace("file://", "") : uri;

        const timestamp = new Date().getTime();
        const formData = new FormData();
        formData.append("file", {
            uri: fileUri,
            type: "image/*",
            name: `upload_${timestamp}.jpg`, // Add timestamp to ensure uniqueness
        } as any);

        // Use upload preset that's configured to:
        // 1. Convert to PNG
        // 2. Compress and optimize the image
        // 3. Set quality and size limits
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", folder);

        const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Cloudinary error details:", errorData);
            throw new Error(
                `Upload failed: ${errorData.error?.message || response.status}`
            );
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
