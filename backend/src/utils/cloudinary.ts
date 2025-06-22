import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with credentials
export const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(config);

export const uploadToCloudinary = async (
    filePath: string,
    folder: string = "generations"
): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            format: "png",
            transformation: [{ quality: "auto:best" }],
        });

        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};

export const uploadBase64ToCloudinary = async (
    base64Data: string,
    folder: string = "generations"
): Promise<string> => {
    try {
        // Add data:image/png;base64, prefix if not present
        const base64WithPrefix = base64Data.startsWith("data:")
            ? base64Data
            : `data:image/png;base64,${base64Data}`;

        const result = await cloudinary.uploader.upload(base64WithPrefix, {
            folder: folder,
            format: "png",
            transformation: [{ quality: "auto:best" }],
        });

        return result.secure_url;
    } catch (error) {
        console.error("Error uploading base64 to Cloudinary:", error);
        throw error;
    }
};
