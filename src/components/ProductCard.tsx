"use client";

import { Product } from "@/types";
import { Clock, MapPin, Store, Check, AlertCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onReserve: (product: Product) => void;
}

export function ProductCard({ product, onReserve }: ProductCardProps) {
  const isOutOfStock = product.quantity <= 0;

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group">
      {/* Image & Discount */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition duration-300 ${
            isOutOfStock ? "grayscale opacity-60" : ""
          }`}
        />

        {/* Discount Badge */}
        <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
          -{product.discountPercent}% OFF
        </div>

        {/* Expiration Urgency Badge */}
        <div className="absolute bottom-2.5 left-2.5">
          {product.expirationUrgency === "today" ? (
            <span className="inline-flex items-center gap-1 bg-rose-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md animate-pulse">
              <Clock className="w-3 h-3" />
              Vence Hoje ({product.pickupWindow})
            </span>
          ) : product.expirationUrgency === "tomorrow" ? (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              <Clock className="w-3 h-3" />
              Vence Amanhã
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-slate-800 text-white font-semibold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              <Clock className="w-3 h-3" />
              Vencimento Próximo
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Store Info */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
            <span className="flex items-center gap-1 font-semibold text-slate-700 truncate max-w-[180px]">
              <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              {product.storeName}
            </span>
            <span className="flex items-center gap-0.5 text-emerald-700 font-medium shrink-0">
              <MapPin className="w-3 h-3" />
              {product.distanceKm} km
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[11px] text-slate-400 line-through block leading-none mb-0.5">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-lg font-black text-emerald-600 leading-none">
              R$ {product.discountedPrice.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
              {isOutOfStock ? (
                <span className="text-rose-600 font-bold">Esgotado</span>
              ) : (
                `Resta ${product.quantity} ${product.unit}`
              )}
            </span>
          </div>

          <button
            onClick={() => onReserve(product)}
            disabled={isOutOfStock}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1 ${
              isOutOfStock
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
            }`}
          >
            {isOutOfStock ? (
              "Indisponível"
            ) : (
              <>
                <span>Reservar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
