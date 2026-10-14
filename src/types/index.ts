export type MenuCategory =
  | 'Hot Coffee'
  | 'Cold Coffee'
  | 'Cappuccino & Latte'
  | 'Tea & Refreshments'
  | 'Burgers & Sandwiches'
  | 'Cakes & Desserts'
  | 'Snacks & Fast Food';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // in Bangladeshi Taka (৳)
  description: string;
  image: string;
  tags?: string[];
  isSignature?: boolean;
  isPopular?: boolean;
  calories?: string;
}

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  sugarLevel?: 'No Sugar' | 'Half Sugar' | 'Normal' | 'Extra Sweet';
  milkChoice?: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'None (Black)';
  specialInstructions?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  verifiedVisit?: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  offerPrice: number;
  code: string;
  badge: string;
  description: string;
  validUntil: string;
  image: string;
}

export interface TableReservation {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  createdAt: string;
}
