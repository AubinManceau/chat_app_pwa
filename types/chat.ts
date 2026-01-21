export interface Message {
    id?: string; // Local ID for pending messages
    content: string;
    pseudo: string | null;
    userId?: string;
    categorie?: 'MESSAGE' | 'INFO' | 'NEW_IMAGE';
    dateEmis?: string | null;
    imageId?: string;
    imageData?: string;
    status?: 'sent' | 'pending' | 'sending' | 'failed';
    localTimestamp?: number;
}

export interface CameraViewProps {
    onPhotoTaken: (photoData: string) => void;
    onClose: () => void;
}

export interface MessageBubbleProps {
    message: Message;
    isOwnMessage: boolean;
    onImageClick: (imageData: string) => void;
    isPending?: boolean;
    isFailed?: boolean;
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

export interface ClientData {
    pseudo: string;
    roomName: string;
    id: string;
    initiator?: boolean;
}

export interface RoomData {
    clients: Record<string, ClientData>;
}
