import assert from "node:assert";
import { INITIAL_PRODUCTS, INITIAL_STORES, INITIAL_RESERVATIONS } from "./src/lib/seed.js";

// Mock localStorage for node environment
const storageMock = {};
global.localStorage = {
  getItem: (key) => storageMock[key] || null,
  setItem: (key, val) => {
    storageMock[key] = String(val);
  },
  removeItem: (key) => {
    delete storageMock[key];
  },
};
global.window = {
  dispatchEvent: () => {},
};
global.CustomEvent = class {};

// Dynamic import of storage
const {
  getProducts,
  getProductById,
  createProduct,
  createReservation,
  completeReservation,
  resetDemoData,
} = await import("./src/lib/storage.js");

console.log("Checking storage service in simulated browser...");

// 1. Initial seed check
const prods = getProducts();
assert.strictEqual(prods.length, INITIAL_PRODUCTS.length, "Products count should match seed");
console.log("✓ Initial products loaded:", prods.length);

// 2. Reservation test
const targetProduct = prods[0];
const initialQty = targetProduct.quantity;
const resResult = createReservation(targetProduct.id, "Teste Apresentação", 1);
assert.strictEqual(resResult.success, true, "Reservation should succeed");
assert.ok(resResult.reservation?.code.startsWith("VH-"), "Reservation code must start with VH-");

const afterProd = getProductById(targetProduct.id);
assert.strictEqual(afterProd.quantity, initialQty - 1, "Quantity should be decremented by 1");
console.log("✓ Reservation created with code:", resResult.reservation.code, "and stock decremented");

// 3. Complete reservation
const completeResult = completeReservation(resResult.reservation.id);
assert.strictEqual(completeResult, true, "Should complete reservation");
console.log("✓ Reservation completed successfully");

// 4. Create new product (merchant flow)
const newProd = createProduct({
  storeId: "store-1",
  storeName: "Padaria Bella Vista",
  storeAddress: "Rua das Flores, 142",
  distanceKm: 0.4,
  name: "Bolo de Cenoura com Chocolate",
  category: "padaria",
  originalPrice: 30,
  discountedPrice: 12,
  discountPercent: 60,
  expirationDate: "Hoje",
  expirationUrgency: "today",
  pickupWindow: "Hoje até 20:00",
  quantity: 3,
  unit: "un",
  imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
});
assert.ok(newProd.id, "New product must have an ID");
assert.strictEqual(getProducts().length, prods.length + 1, "Products length should increase");
console.log("✓ New product created by merchant:", newProd.name);

// 5. Reset demo
resetDemoData();
assert.strictEqual(getProducts().length, INITIAL_PRODUCTS.length, "Products reset to initial");
console.log("✓ Reset demo data restored original seed");

console.log("\nALL STORAGE TESTS PASSED!");
