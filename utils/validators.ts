import { FILE_VALIDATION } from "./constants";

export const isValidImageType = (fileType: string): boolean => {
    return FILE_VALIDATION.acceptedTypes.includes(fileType);
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    if (!isValidImageType(file.type)) {
        return {
            valid: false,
            error: "Veuillez sélectionner une image PNG ou JPEG",
        };
    }

    return { valid: true };
};

export const isImageData = (content: string): boolean => {
    return content.startsWith("data:image/");
};

export const extractImageIdFromUrl = (content: string): string | null => {
    const urlMatch = content.match(/https?:\/\/[^\s]+\/images\/([^\s]+)/);
    return urlMatch?.[1] || null;
};
