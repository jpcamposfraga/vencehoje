"use client";

import { ProductCategory } from "@/types";
import { Search, Flame } from "lucide-react";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedUrgency: string;
  onUrgencyChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  totalCount: number;
}

const CATEGORIES: { id: ProductCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "Todas", icon: "✨" },
  { id: "acougue", label: "Açougue & Carnes", icon: "🥩" },
  { id: "laticinios", label: "Frios & Laticínios", icon: "🧀" },
  { id: "padaria", label: "Padaria & Rotisseria", icon: "🥖" },
  { id: "hortifruti", label: "Hortifrúti", icon: "🍎" },
  { id: "refeicoes", label: "Pratos Prontos", icon: "🍲" },
  { id: "bebidas", label: "Bebidas", icon: "🥤" },
];

export function ProductFilters({
  search,
  onSearchChange,
  selectedUrgency,
  onUrgencyChange,
  selectedCategory,
  onCategoryChange,
  totalCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Search & Urgency bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por picanha, queijo, frango, hortifrúti, supermercado..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* Urgency tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto shrink-0">
          <button
            onClick={() => onUrgencyChange("all")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
              selectedUrgency === "all"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Todas Validades
          </button>
          <button
            onClick={() => onUrgencyChange("today")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1 whitespace-nowrap ${
              selectedUrgency === "today"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-rose-700 hover:bg-rose-100/50"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Vence Hoje
          </button>
          <button
            onClick={() => onUrgencyChange("tomorrow")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
              selectedUrgency === "tomorrow"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-amber-800 hover:bg-amber-100/50"
            }`}
          >
            Vence Amanhã
          </button>
        </div>
      </div>

      {/* Categories chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition ${
              selectedCategory === cat.id
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}

        <div className="ml-auto text-xs font-bold text-slate-400 shrink-0 pl-2">
          {totalCount} {totalCount === 1 ? "oferta" : "ofertas"}
        </div>
      </div>
    </div>
  );
}
