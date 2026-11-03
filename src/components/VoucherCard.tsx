"use client";

import { Reservation } from "@/types";
import {
  Clock,
  MapPin,
  Store,
  CheckCircle2,
  AlertCircle,
  QrCode,
  X,
} from "lucide-react";
import { cancelReservation } from "@/lib/storage";

interface VoucherCardProps {
  reservation: Reservation;
  onStatusChange?: () => void;
}

export function VoucherCard({ reservation, onStatusChange }: VoucherCardProps) {
  const handleCancel = () => {
    if (confirm("Deseja realmente cancelar esta reserva? O item retornará ao estoque.")) {
      cancelReservation(reservation.id);
      if (onStatusChange) onStatusChange();
    }
  };

  const isPending = reservation.status === "pending";
  const isCompleted = reservation.status === "completed";

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
      {/* Top Banner with Code */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block -mb-0.5">
              Código de Retirada
            </span>
            <span className="font-mono font-black text-lg text-emerald-400 tracking-wider">
              {reservation.code}
            </span>
          </div>
        </div>

        <div>
          {isPending && (
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Aguardando Retirada
            </span>
          )}
          {isCompleted && (
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Retirado na Loja
            </span>
          )}
          {reservation.status === "cancelled" && (
            <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[11px] font-bold rounded-full">
              Cancelado
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 space-y-3">
        <div>
          <span className="text-xs font-semibold text-emerald-700 block mb-0.5">
            {reservation.storeName}
          </span>
          <h4 className="font-bold text-slate-900 text-base leading-snug">
            {reservation.productQuantity}x {reservation.productName}
          </h4>
        </div>

        <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>
              <strong>Retirada:</strong> {reservation.pickupWindow}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{reservation.storeAddress}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Valor a Pagar no Caixa
            </span>
            <span className="text-base font-black text-slate-900">
              R$ {reservation.totalAmount.toFixed(2).replace(".", ",")}
            </span>
          </div>

          {isPending && (
            <button
              onClick={handleCancel}
              className="text-xs text-slate-400 hover:text-rose-600 font-medium px-2 py-1 rounded hover:bg-rose-50 transition"
            >
              Cancelar Reserva
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
