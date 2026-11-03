import fs from "node:fs";

const filesToInclude = [
  "package.json",
  "tsconfig.json",
  "next.config.ts",
  "tailwind.config.ts",
  "postcss.config.mjs",
  "src/types/index.ts",
  "src/lib/seed.ts",
  "src/lib/storage.ts",
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/consumidor/page.tsx",
  "src/app/lojista/page.tsx",
  "src/app/reservas/page.tsx",
  "src/components/DemoHeader.tsx",
  "src/components/Navbar.tsx",
  "src/components/Footer.tsx",
  "src/components/LeadCaptureModal.tsx",
  "src/components/ProductCard.tsx",
  "src/components/ProductFilters.tsx",
  "src/components/ReservationModal.tsx",
  "src/components/VoucherCard.tsx",
  "src/components/StoreMetrics.tsx",
  "src/components/NewProductModal.tsx",
];

const files = filesToInclude.map((relPath) => {
  const content = fs.readFileSync(relPath, "utf-8");
  return {
    file: relPath.replace(/\\/g, "/"),
    data: content,
    encoding: "utf-8",
  };
});

fs.writeFileSync("deployment-files.json", JSON.stringify(files));
console.log(`Prepared ${files.length} files. Total JSON size: ${fs.statSync("deployment-files.json").size} bytes.`);
