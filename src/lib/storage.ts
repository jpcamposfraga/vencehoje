import { Product, Store, Reservation, Lead } from "@/types";
import { INITIAL_PRODUCTS, INITIAL_STORES, INITIAL_RESERVATIONS } from "./seed";

const KEYS = {
  PRODUCTS: "vencehoje_products_v1",
  STORES: "vencehoje_stores_v1",
  RESERVATIONS: "vencehoje_reservations_v1",
  LEADS: "vencehoje_leads_v1",
};

// shortcut: using in-memory state during SSR, synced to localStorage on client
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];
let memoryStores: Store[] = [...INITIAL_STORES];
let memoryReservations: Reservation[] = [...INITIAL_RESERVATIONS];
let memoryLeads: Lead[] = [];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function notifyChange(): void {
  if (isBrowser()) {
    window.dispatchEvent(new CustomEvent("vencehoje_change"));
  }
}

function getStored<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to write to localStorage", err);
  }
}

// Stores
export function getStores(): Store[] {
  if (!isBrowser()) return memoryStores;
  return getStored<Store[]>(KEYS.STORES, INITIAL_STORES);
}

export function getStoreById(id: string): Store | undefined {
  return getStores().find((s) => s.id === id);
}

// Products
export function getProducts(): Product[] {
  if (!isBrowser()) return memoryProducts;
  return getStored<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function createProduct(
  data: Omit<Product, "id" | "createdAt">
): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...data,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newProduct, ...products];
  setStored(KEYS.PRODUCTS, updated);
  memoryProducts = updated;
  notifyChange();
  return newProduct;
}

export function updateProduct(
  id: string,
  updates: Partial<Product>
): Product | null {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updatedItem = { ...products[idx], ...updates };
  products[idx] = updatedItem;
  setStored(KEYS.PRODUCTS, products);
  memoryProducts = products;
  notifyChange();
  return updatedItem;
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  setStored(KEYS.PRODUCTS, filtered);
  memoryProducts = filtered;
  notifyChange();
  return true;
}

// Reservations
export function getReservations(): Reservation[] {
  if (!isBrowser()) return memoryReservations;
  return getStored<Reservation[]>(KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
}

export function getReservationByCode(code: string): Reservation | undefined {
  return getReservations().find(
    (r) => r.code.toUpperCase() === code.trim().toUpperCase()
  );
}

export function getReservationsByStore(storeId: string): Reservation[] {
  return getReservations().filter((r) => r.storeId === storeId);
}

export function createReservation(
  productId: string,
  customerName: string,
  quantity = 1
): { success: boolean; reservation?: Reservation; error?: string } {
  const product = getProductById(productId);
  if (!product) return { success: false, error: "Produto não encontrado." };
  if (product.quantity < quantity) {
    return { success: false, error: "Estoque insuficiente." };
  }

  // Baixa no estoque
  updateProduct(productId, { quantity: product.quantity - quantity });

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const code = `VH-${randomDigits}`;

  const reservation: Reservation = {
    id: `res-${Date.now()}`,
    code,
    productId: product.id,
    productName: product.name,
    productPrice: product.discountedPrice,
    productQuantity: quantity,
    totalAmount: +(product.discountedPrice * quantity).toFixed(2),
    storeId: product.storeId,
    storeName: product.storeName,
    storeAddress: product.storeAddress,
    pickupWindow: product.pickupWindow,
    customerName: customerName.trim(),
    reservedAt: new Date().toISOString(),
    status: "pending",
  };

  const reservations = getReservations();
  const updated = [reservation, ...reservations];
  setStored(KEYS.RESERVATIONS, updated);
  memoryReservations = updated;
  notifyChange();
  return { success: true, reservation };
}

export function completeReservation(id: string): boolean {
  const reservations = getReservations();
  const item = reservations.find((r) => r.id === id);
  if (!item) return false;
  item.status = "completed";
  setStored(KEYS.RESERVATIONS, reservations);
  memoryReservations = reservations;
  notifyChange();
  return true;
}

export function cancelReservation(id: string): boolean {
  const reservations = getReservations();
  const item = reservations.find((r) => r.id === id);
  if (!item || item.status === "cancelled") return false;

  item.status = "cancelled";
  // Devolve estoque
  const product = getProductById(item.productId);
  if (product) {
    updateProduct(product.id, {
      quantity: product.quantity + item.productQuantity,
    });
  }

  setStored(KEYS.RESERVATIONS, reservations);
  memoryReservations = reservations;
  notifyChange();
  return true;
}

// Leads
export function saveLead(
  data: Omit<Lead, "id" | "createdAt">
): Lead {
  const leads = isBrowser() ? getStored<Lead[]>(KEYS.LEADS, []) : memoryLeads;
  const newLead: Lead = {
    ...data,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newLead, ...leads];
  setStored(KEYS.LEADS, updated);
  memoryLeads = updated;
  notifyChange();
  return newLead;
}

export function getLeads(): Lead[] {
  if (!isBrowser()) return memoryLeads;
  return getStored<Lead[]>(KEYS.LEADS, []);
}

// Reset da Demo
export function resetDemoData(): void {
  if (!isBrowser()) return;
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(KEYS.STORES, JSON.stringify(INITIAL_STORES));
  localStorage.setItem(
    KEYS.RESERVATIONS,
    JSON.stringify(INITIAL_RESERVATIONS)
  );
  localStorage.removeItem(KEYS.LEADS);
  notifyChange();
}
