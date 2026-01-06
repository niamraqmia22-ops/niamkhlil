
export enum UserRole {
  USER = 'USER',
  OWNER = 'OWNER'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  preferences?: string[];
}

export interface Project {
  id: string;
  ownerId: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  location: string;
  lat: number;
  lng: number;
  services: string[];
  workingHours: string;
  deliveryOption: boolean;
  rating: number;
  reviewsCount: number;
}

export interface Product {
  id: string;
  projectId: string;
  name: string;
  image: string;
  description: string;
  price: number;
  available: boolean;
}

export interface Order {
  id: string;
  userId: string;
  projectId: string;
  items: Product[];
  status: 'PENDING' | 'ACCEPTED' | 'DELIVERING' | 'COMPLETED';
  paymentMethod: 'CASH' | 'SHAM_CASH';
  total: number;
}
