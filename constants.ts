import { Sale, ServiceArea } from './types';

export const AGENT_NAME = "Sebastian Street";
export const BROKERAGE = "eHomes | The Toro Group";
export const PHONE = "(626) 632-2559";
export const EMAIL = "sebastian@diamondstreetrealty.com";
export const ADDRESS = "11760 Central Ave Suite 125, Chino, CA 91710";
export const EXPERIENCE_YEARS = 3;

export const SALES: Sale[] = [
  {
    id: 1,
    address: "2823 E Schumacher Paseo",
    city: "Ontario",
    zip: "91762",
    price: 628000,
    formattedPrice: "$628,000",
    beds: 3,
    baths: 3,
    sqft: 1593,
    date: "Sold 3 months ago",
    represented: "Buyer",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    address: "8872 Maple Ave UNIT J",
    city: "Montclair",
    zip: "91763",
    price: 485000,
    formattedPrice: "$485,000",
    beds: 1,
    baths: 2,
    sqft: 1126,
    date: "Sold 8 months ago",
    represented: "Buyer",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    address: "20701 Beach Blvd SPACE 82",
    city: "Huntington Beach",
    zip: "92648",
    price: 275000,
    formattedPrice: "$275,000",
    beds: 3,
    baths: 2,
    sqft: 1566,
    date: "Sold 1 year ago",
    represented: "Buyer",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    address: "4400 Philadelphia St SPACE 216",
    city: "Chino",
    zip: "91710",
    price: 245000,
    formattedPrice: "$245,000",
    beds: 2,
    baths: 2,
    sqft: 1248,
    date: "Sold 1 year ago",
    represented: "Buyer",
    image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    address: "15318 Cajon St",
    city: "Hesperia",
    zip: "92345",
    price: 500000,
    formattedPrice: "$500,000",
    beds: 4,
    baths: 3,
    sqft: 2246,
    date: "Sold 2 years ago",
    represented: "Buyer",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80"
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { name: "Chino", state: "CA" },
  { name: "Chino Hills", state: "CA" },
  { name: "Ontario", state: "CA" },
  { name: "Huntington Beach", state: "CA" },
  { name: "Montclair", state: "CA" },
  { name: "Hesperia", state: "CA" },
  { name: "Baldwin Park", state: "CA" },
  { name: "West Covina", state: "CA" },
  { name: "Pomona", state: "CA" },
  { name: "Covina", state: "CA" },
  { name: "Duarte", state: "CA" },
  { name: "Claremont", state: "CA" },
  { name: "San Dimas", state: "CA" },
  { name: "Costa Mesa", state: "CA" },
  { name: "La Verne", state: "CA" },
  { name: "Long Beach", state: "CA" },
  { name: "Los Angeles", state: "CA" },
  { name: "Alhambra", state: "CA" }
];