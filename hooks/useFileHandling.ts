"use client";

import { useState, useCallback } from "react";
import { validateImageFile } from "@/utils/validators";

export const useFileHandling = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const validation = validateImageFile(file);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result as string);
        };
        reader.readAsDataURL(file);

        event.target.value = '';
    }, []);

    const clearFile = useCallback(() => {
        setSelectedFile(null);
    }, []);

    return {
        selectedFile,
        handleFileSelect,
        clearFile,
        setSelectedFile,
    };
};
