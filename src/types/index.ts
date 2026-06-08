export interface LocalizedString {
    en: string;
    ru: string;
    ky: string;
}

export interface Place {
    id: string;
    name: LocalizedString;
    description: LocalizedString;
    category: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    image_url?: string;
}

export interface Route {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
    difficulty: string;
    duration: string;
    stops: string[]; // Array of IDs
}

export interface Guide {
    id: string;
    name: string;
    age: number;
    specialty: LocalizedString;
    bio: LocalizedString;
    color: string;
    image_url?: string;
}

export interface GuideApplication {
    id: string;
    name: string;
    email: string;
    phone: string;
    experience: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}
