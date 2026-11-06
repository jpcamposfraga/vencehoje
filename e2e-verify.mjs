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

console.log("=== VENCEHOJE E2E SUPERMARKET BUSINESS FLOW TEST ===");

// 1. Initial State
resetDemoData();
const initialProducts = getProducts();
console.log(`[1] Initial supermarket products loaded: ${initialProducts.length}`);
assert.ok(initialProducts.length >= 8, "Must have initial catalog");

// 2. Supermarket Loss Prevention posts new surplus item
console.log("[2] Supermarket 'Supermercado CompreBem' (store-1) posts a new meat surplus item...");
const newProduct = createProduct({
  storeId: "store-1",
  storeName: "Supermercado CompreBem (Loja Jardins)",
  storeAddress: "Av. Paulista, 1420",
  distanceKm: 0.5,
  name: "Alcatra Bovina Especial Fatiada (900g)",
  category: "acougue",
  originalPrice: 48.0,
  discountedPrice: 19.9,
  discountPercent: 58,
  expirationDate: "Hoje",
  expirationUrgency: "today",
  pickupWindow: "Hoje até 20:30",
  quantity: 5,
  unit: "pacote",
  imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?w=600",
});
assert.ok(newProduct.id, "Product should have an id");
assert.strictEqual(newProduct.quantity, 5, "Quantity should be 5");
console.log(`    ✓ Product published: "${newProduct.name}" (ID: ${newProduct.id})`);

// 3. Consumer discovers and reserves the item
console.log("[3] Consumer 'Mariana Souza' reserves 2 packages of the meat item...");
const reserveResult = createReservation(newProduct.id, "Mariana Souza", 2);
assert.strictEqual(reserveResult.success, true, "Reservation must succeed");
const voucher = reserveResult.reservation;
assert.ok(voucher, "Reservation voucher must exist");
console.log(`    ✓ Voucher generated: ${voucher.code} (Total: R$ ${voucher.totalAmount})`);

// Check stock decrement
const updatedProduct = getProductById(newProduct.id);
assert.strictEqual(updatedProduct.quantity, 3, "Stock must decrement from 5 to 3");
console.log(`    ✓ Product stock decremented correctly to ${updatedProduct.quantity}`);

// 4. Supermarket views reservation in store dashboard
console.log("[4] Supermarket checks pending reservations in store-1...");
const storeOrders = getReservationsByStore("store-1");
const foundOrder = storeOrders.find((r) => r.id === voucher.id);
assert.ok(foundOrder, "Order must be visible in supermarket dashboard");
assert.strictEqual(foundOrder.status, "pending", "Order must be pending pickup");
console.log(`    ✓ Supermarket found order ${foundOrder.code} for customer "${foundOrder.customerName}"`);

// 5. Customer arrives at supermarket, presents voucher code at checkout
console.log("[5] Customer presents voucher at checkout. Cashier validates...");
const validatedOrder = getReservationByCode(voucher.code);
assert.ok(validatedOrder, "Cashier must find order by code");
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

console.log("\n>>> ALL SUPERMARKET E2E BUSINESS CHECKS PASSED PERFECTLY! <<<");
