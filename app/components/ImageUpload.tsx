/**
 * A reusable image upload component that handles:
 * - Image selection from device library
 * - Uploading selected image to Cloudinary
 * - Displaying upload progress and the uploaded image
 * - Notifying parent components of successful uploads
 */
import { uploadToCloudinary } from "@/utils/cloudinary";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import { UploadIcon } from "./icons/UploadIcon";

type Props = {
    imageWidth: number;
    imageHeight: number;
    /** Callback function called with the Cloudinary URL when upload succeeds */
    onImageUploaded: (url: string) => void;
};

export default function ImageUpload({
    imageWidth,
    imageHeight,
    onImageUploaded,
}: Props) {
    // Track the upload progress state
    const [isUploading, setIsUploading] = useState(false);
    // Store the uploaded image URL for display
    const [userImage, setUserImage] = useState<string | null>(null);

    /**
     * Handles the image selection and upload process:
     * 1. Opens device image picker
     * 2. If image selected, uploads it to Cloudinary
     * 3. Updates local state and notifies parent on success
     */
    const pickUserImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            try {
                setIsUploading(true);

                const cloudinaryUrl = await uploadToCloudinary(uri, "uploads");

                setUserImage(cloudinaryUrl);

                // Notify parent component of successful upload and pass the URL
                onImageUploaded(cloudinaryUrl);
            } catch (error) {
                Alert.alert(
                    "Error",
                    "Failed to upload image. Please check your internet connection and try again."
                );
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <TouchableOpacity
            className="rounded-2xl bg-gray-100 border border-gray-300 justify-center items-center mb-2.5 flex flex-col gap-2"
            style={{ width: imageWidth, height: imageHeight }}
            onPress={pickUserImage}
        >
            {/* Show loading spinner while uploading, otherwise show upload UI */}
            {isUploading ? (
                <ActivityIndicator size="small" color="gray" />
            ) : (
                <>
                    <UploadIcon color="gray" />

                    <Text className="text-gray-500 text-lg font-semibold">
                        Tap to upload
                    </Text>
                </>
            )}

            {/* Display the uploaded image if one exists */}
            {userImage && (
                <Image
                    source={{ uri: userImage }}
                    style={{ width: imageWidth, height: imageHeight }}
                />
            )}
        </TouchableOpacity>
    );
}
