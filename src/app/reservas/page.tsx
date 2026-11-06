"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Reservation } from "@/types";
import { getReservations } from "@/lib/storage";
import { VoucherCard } from "@/components/VoucherCard";
import { Ticket, ArrowLeft, ShoppingBag } from "lucide-react";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const loadData = () => {
    setReservations(getReservations());
  };

  useEffect(() => {
    loadData();
    const handler = () => loadData();
    window.addEventListener("vencehoje_change", handler);
    return () => window.removeEventListener("vencehoje_change", handler);
  }, []);

  const filtered = reservations.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/consumidor"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Voltar ao Catálogo"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Ticket className="w-4 h-4" />
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Minhas Reservas & Vouchers
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Apresente o código de 4 dígitos no caixa do supermercado para pagar e retirar
              </p>
            </div>
          </div>

          <Link
            href="/consumidor"
            className="flex items-center gap-1.5 py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Mais Ofertas</span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Todas ({reservations.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === "pending"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Aguardando Retirada (
            {reservations.filter((r) => r.status === "pending").length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === "completed"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Retiradas Realizadas (
            {reservations.filter((r) => r.status === "completed").length})
          </button>
        </div>

        {/* Vouchers Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((reservation) => (
              <VoucherCard
                key={reservation.id}
                reservation={reservation}
                onStatusChange={loadData}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Nenhuma reserva encontrada
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Você ainda não possui vouchers com o filtro selecionado.
            </p>
            <Link
              href="/consumidor"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              Explorar Ofertas no Radar
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
