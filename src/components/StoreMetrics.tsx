"use client";

import { Product, Reservation } from "@/types";
import { TrendingUp, Package, Leaf, Clock } from "lucide-react";

interface StoreMetricsProps {
  products: Product[];
  reservations: Reservation[];
}

export function StoreMetrics({ products, reservations }: StoreMetricsProps) {
  const activeProductsCount = products.filter((p) => p.quantity > 0).length;
  const completedReservations = reservations.filter(
    (r) => r.status === "completed"
  );
  const pendingReservations = reservations.filter(
    (r) => r.status === "pending"
  );

  const revenueRecovered = completedReservations.reduce(
    (acc, r) => acc + r.totalAmount,
    0
  );

  const totalSavedUnits = reservations
    .filter((r) => r.status !== "cancelled")
    .reduce((acc, r) => acc + r.productQuantity, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Metric 1 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500">
            Ofertas Ativas
          </span>
          <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <Package className="w-4 h-4" />
          </span>
        </div>
        <div className="text-2xl font-black text-slate-900">
          {activeProductsCount}
        </div>
        <span className="text-[11px] text-slate-400 block mt-1">
          Itens visíveis no app
        </span>
      </div>

      {/* Metric 2 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500">
            Aguardando Retirada
          </span>
          <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-4 h-4" />
          </span>
        </div>
        <div className="text-2xl font-black text-amber-600">
          {pendingReservations.length}
        </div>
        <span className="text-[11px] text-slate-400 block mt-1">
          Clientes a caminho
        </span>
      </div>

      {/* Metric 3 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500">
            Receita Recuperada
          </span>
          <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="w-4 h-4" />
          </span>
        </div>
        <div className="text-2xl font-black text-emerald-600">
          R$ {revenueRecovered.toFixed(2).replace(".", ",")}
        </div>
        <span className="text-[11px] text-slate-400 block mt-1">
          Recebido no balcão (0% taxa)
        </span>
      </div>

      {/* Metric 4 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500">
            Alimentos Salvos
          </span>
          <span className="p-2 bg-teal-50 text-teal-600 rounded-xl">
            <Leaf className="w-4 h-4" />
          </span>
        </div>
        <div className="text-2xl font-black text-teal-600">
          {totalSavedUnits} un
        </div>
        <span className="text-[11px] text-slate-400 block mt-1">
          Desperdício evitado
        </span>
      </div>
    </div>
  );
}
