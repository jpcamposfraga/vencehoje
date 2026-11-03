export type UserRole = "landing" | "consumer" | "merchant";

export type ProductCategory =
  | "padaria"
  | "hortifruti"
  | "laticinios"
  | "refeicoes"
  | "bebidas"
  | "mercearia";

export interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  neighborhood: string;
  distanceKm: number;
  rating: number;
  logoUrl?: string;
  phone: string;
}

export interface Product {
  id: string;
  storeId: string;
  storeName: string;
  storeAddress: string;
  distanceKm: number;
  name: string;
  category: ProductCategory;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  expirationDate: string; // ISO string or YYYY-MM-DD
  expirationUrgency: "today" | "tomorrow" | "soon";
  pickupWindow: string; // Ex: "Hoje até 19:30" ou "16h às 19h"
  quantity: number;
  unit: string; // "un", "kg", "pacote", "bandeja"
  imageUrl: string;
  description?: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  code: string; // ex: "VH-4821"
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  totalAmount: number;
  storeId: string;
  storeName: string;
  storeAddress: string;
  pickupWindow: string;
  customerName: string;
  reservedAt: string;
  status: "pending" | "completed" | "cancelled";
}

export interface Lead {
  id: string;
  type: "consumer" | "merchant";
  name: string;
  contact: string; // email or whatsapp
  city: string;
  storeName?: string;
  createdAt: string;
}
