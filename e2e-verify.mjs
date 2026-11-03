import assert from "node:assert";

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

const {
  getProducts,
  getProductById,
  createProduct,
  createReservation,
  getReservationsByStore,
  completeReservation,
  getReservationByCode,
  resetDemoData,
} = await import("./src/lib/storage.js");

console.log("=== VENCEHOJE E2E BUSINESS FLOW TEST ===");

// 1. Initial State
resetDemoData();
const initialProducts = getProducts();
console.log(`[1] Initial products loaded: ${initialProducts.length}`);
assert.ok(initialProducts.length >= 8, "Must have initial catalog");

// 2. Merchant posts new surplus item
console.log("[2] Merchant 'Padaria Bella Vista' (store-1) posts a new near-expiration item...");
const newProduct = createProduct({
  storeId: "store-1",
  storeName: "Padaria Bella Vista",
  storeAddress: "Rua das Flores, 142",
  distanceKm: 0.4,
  name: "Bolo de Cenoura com Cobertura Belga",
  category: "padaria",
  originalPrice: 28.0,
  discountedPrice: 11.2,
  discountPercent: 60,
  expirationDate: "Hoje",
  expirationUrgency: "today",
  pickupWindow: "Hoje até 20:30",
  quantity: 5,
  unit: "un",
  imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
});
assert.ok(newProduct.id, "Product should have an id");
assert.strictEqual(newProduct.quantity, 5, "Quantity should be 5");
console.log(`    ✓ Product published: "${newProduct.name}" (ID: ${newProduct.id})`);

// 3. Consumer discovers and reserves the item
console.log("[3] Consumer 'João Silva' reserves 2 units of the product...");
const reserveResult = createReservation(newProduct.id, "João Silva", 2);
assert.strictEqual(reserveResult.success, true, "Reservation must succeed");
const voucher = reserveResult.reservation;
assert.ok(voucher, "Reservation voucher must exist");
console.log(`    ✓ Voucher generated: ${voucher.code} (Total: R$ ${voucher.totalAmount})`);

// Check stock decrement
const updatedProduct = getProductById(newProduct.id);
assert.strictEqual(updatedProduct.quantity, 3, "Stock must decrement from 5 to 3");
console.log(`    ✓ Product stock decremented correctly to ${updatedProduct.quantity}`);

// 4. Merchant views reservation in store dashboard
console.log("[4] Merchant checks pending orders in store-1...");
const storeOrders = getReservationsByStore("store-1");
const foundOrder = storeOrders.find((r) => r.id === voucher.id);
assert.ok(foundOrder, "Order must be visible in merchant dashboard");
assert.strictEqual(foundOrder.status, "pending", "Order must be pending pickup");
console.log(`    ✓ Merchant found order ${foundOrder.code} for customer "${foundOrder.customerName}"`);

// 5. Customer arrives at store, presents voucher code
console.log("[5] Customer presents voucher at checkout. Merchant validates...");
const validatedOrder = getReservationByCode(voucher.code);
assert.ok(validatedOrder, "Merchant must find order by code");
const completeSuccess = completeReservation(validatedOrder.id);
assert.strictEqual(completeSuccess, true, "Completion must succeed");

const completedOrder = getReservationByCode(voucher.code);
assert.strictEqual(completedOrder.status, "completed", "Status must now be completed");
console.log(`    ✓ Order ${voucher.code} successfully marked as completed! Customer pays at register.`);

// 6. Reset demo verification
console.log("[6] Testing demo data reset...");
resetDemoData();
const afterResetProducts = getProducts();
assert.strictEqual(afterResetProducts.length, initialProducts.length, "Products restored to initial count");
console.log("    ✓ Reset successfully restored clean demo state.");

console.log("\n>>> ALL E2E BUSINESS CHECKS PASSED PERFECTLY! <<<");
