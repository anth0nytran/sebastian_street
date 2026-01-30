import { Sale, ServiceArea } from './types';
import sold4Months from './assets/sold_4_months.jpg';
import sold8Months from './assets/sold_8_months.jpg';
import sold12Months from './assets/sold_12_months.jpg';
import sold12MonthsChino from './assets/sold_12_months_chino.jpg';
import whittierImg from './assets/whiter.jpeg';
import tustinImg from './assets/tustin.jpeg';

export const AGENT_NAME = "Sebastian Street";
export const BROKERAGE = "eHomes | The Toro Group";
export const PHONE = "(626) 632-2559";
export const EMAIL = "sebastian@diamondstreetrealty.com";
export const ADDRESS = "11760 Central Ave Suite 125, Chino, CA 91710";
export const EXPERIENCE_YEARS = 3;

/** URL for "Book a Strategy Call" buttons/links (Calendly) */
export const BOOK_STRATEGY_CALL_URL = "https://calendly.com/sebastian-diamondstreetrealty/new-meeting";
export const CALHFA_DREAM_URL = "https://www.calhfa.ca.gov/dream/";

export const SALES: Sale[] = [
  {
    id: 101, // New SALE
    address: "6226 Washington Ave",
    city: "Whittier",
    zip: "90601",
    price: 865000,
    formattedPrice: "$865,000",
    beds: 2,
    baths: 2,
    sqft: 1713,
    date: "Sold 9 days ago",
    represented: "Buyer",
    image: whittierImg
  },
  {
    id: 102, // New SALE
    address: "1777 Mitchell Ave APT 29",
    city: "Tustin",
    zip: "92780",
    price: 685000,
    formattedPrice: "$685,000",
    beds: 5,
    baths: 3,
    sqft: 1472,
    date: "Sold 18 days ago",
    represented: "Buyer",
    image: tustinImg
  },
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
    image: sold4Months
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
    image: sold8Months
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
    image: sold12Months
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
    image: sold12MonthsChino
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