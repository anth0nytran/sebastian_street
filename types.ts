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

export interface Sale {
  id: number;
  address: string;
  city: string;
  zip: string;
  price: number;
  formattedPrice: string;
  beds: number;
  baths: number;
  sqft: number;
  date: string;
  represented: 'Buyer' | 'Seller';
  image: string;
}

export interface ServiceArea {
  name: string;
  state: string;
}

export type LeadInterest = 'Selling' | 'Buying' | 'Both' | 'Just curious';

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
