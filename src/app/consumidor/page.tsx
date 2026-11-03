"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { getProducts, getReservations } from "@/lib/storage";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { ReservationModal } from "@/components/ReservationModal";
import {
  ShoppingBag,
  Ticket,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ConsumerCatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [reservationsCount, setReservationsCount] = useState(0);

  const loadData = () => {
    setProducts(getProducts());
    const res = getReservations();
    setReservationsCount(res.filter((r) => r.status === "pending").length);
  };

  useEffect(() => {
    loadData();
    const handler = () => loadData();
    window.addEventListener("vencehoje_change", handler);
    return () => window.removeEventListener("vencehoje_change", handler);
  }, []);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.storeName.toLowerCase().includes(search.toLowerCase());

    const matchesUrgency =
      selectedUrgency === "all" || p.expirationUrgency === selectedUrgency;

    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    return matchesSearch && matchesUrgency && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Consumer Subheader */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Radar de Ofertas Próximas
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                São Paulo, SP • Exibindo comércios locais a até 2 km
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/reservas"
              className="flex items-center gap-2 py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm relative"
            >
              <Ticket className="w-4 h-4 text-emerald-400" />
              <span>Minhas Reservas</span>
              {reservationsCount > 0 && (
                <span className="bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full text-[10px]">
                  {reservationsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Banner de transparência */}
        <div className="bg-emerald-950 text-white rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-800/80 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800/90 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-emerald-200">
                Transparência por Item • Diferencial do Benchmark
              </h3>
              <p className="text-xs text-emerald-300/80 max-w-2xl leading-relaxed mt-0.5">
                Ao contrário de aplicativos com sacolas-surpresa, aqui você vê a foto
                real, quantidade em estoque, validade exata e não paga taxas
                online. Reserve gratuitamente e pague no balcão ao retirar.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          search={search}
          onSearchChange={setSearch}
          selectedUrgency={selectedUrgency}
          onUrgencyChange={setSelectedUrgency}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalCount={filteredProducts.length}
        />

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onReserve={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Nenhuma oferta encontrada
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tente alterar os filtros de validade ou a categoria selecionada.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedUrgency("all");
                setSelectedCategory("all");
              }}
              className="py-2 px-4 bg-slate-900 text-white text-xs font-semibold rounded-xl"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </main>

      {/* Reservation Modal */}
      <ReservationModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
