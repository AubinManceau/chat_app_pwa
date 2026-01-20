export interface Message {
    content: string;
    pseudo: string | null;
    userId?: string;
    categorie?: 'MESSAGE' | 'INFO' | 'NEW_IMAGE';
    dateEmis?: string | null;
    imageId?: string;
    imageData?: string;
    pending?: boolean;
    tempId?: string;
}

export interface CameraViewProps {
    onPhotoTaken: (photoData: string) => void;
    onClose: () => void;
}

export interface MessageBubbleProps {
    message: Message;
    isOwnMessage: boolean;
    onImageClick: (imageData: string) => void;
}

export interface ImagePreviewProps {
    imageData: string;
    onDelete: () => void;
}

export interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPhoto: (photoData: string) => void;
}

export interface ImageViewerProps {
    imageData: string | null;
    onClose: () => void;
}
