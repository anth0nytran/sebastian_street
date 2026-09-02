export interface Review {
    id: number;
    author: string;
    date: string;
    rating: number;
    text: string;
    transaction?: string;
    source?: string;
    tags?: string[];
}

export type LeadInterest = "Selling" | "Buying" | "Both" | "Just curious";

export interface LeadPayload {
    name: string;
    email: string;
    phone: string;
    interest: LeadInterest;
    address?: string;
    city?: string;
    timeframe?: string;
    message?: string;
    leadSource?: string;
}
