"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, Reservation } from "@/types";
import {
  X,
  Store,
  Clock,
  MapPin,
  CheckCircle2,
  QrCode,
  ShieldAlert,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { createReservation } from "@/lib/storage";

interface ReservationModalProps {
  product: Product | null;
  onClose: () => void;
  onReserved?: (reservation: Reservation) => void;
}

export function ReservationModal({
  product,
  onClose,
  onReserved,
}: ReservationModalProps) {
  const [customerName, setCustomerName] = useState("João Silva (Apresentação)");
  const [quantity, setQuantity] = useState(1);
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = createReservation(product.id, customerName, quantity);
    if (!result.success || !result.reservation) {
      setError(result.error || "Não foi possível concluir a reserva.");
      return;
    }

    setCreatedReservation(result.reservation);
    if (onReserved) {
      onReserved(result.reservation);
    }
  };

  const handleClose = () => {
    setCreatedReservation(null);
    setQuantity(1);
    setError(null);
    onClose();
  };

  const total = +(product.discountedPrice * quantity).toFixed(2);
  const savings = +(
    (product.originalPrice - product.discountedPrice) *
    quantity
  ).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base">
              {createdReservation ? "Voucher de Reserva Emitido!" : "Confirmar Reserva de Oferta"}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {createdReservation ? (
            /* SUCCESS VOUCHER VIEW */
            <div className="text-center py-2 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Reserva Garantida no Balcão
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Apresente este código ao retirar:
                </h3>
              </div>

              {/* Voucher Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-inner border border-slate-800 space-y-3">
                <div className="text-3xl font-mono font-black tracking-widest text-emerald-400">
                  {createdReservation.code}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Código de Retirada Rápida</span>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-left grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">
                      Estabelecimento
                    </span>
                    <strong className="text-white">
                      {createdReservation.storeName}
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">
                      Horário Limite
                    </span>
                    <strong className="text-amber-300">
                      {createdReservation.pickupWindow}
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">
                      Valor a Pagar no Caixa
                    </span>
                    <strong className="text-emerald-400 text-sm">
                      R$ {createdReservation.totalAmount.toFixed(2).replace(".", ",")}
                    </strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">
                      Cliente
                    </span>
                    <strong className="text-white">
                      {createdReservation.customerName}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs text-left">
                <strong>Atenção:</strong> O pagamento é feito diretamente no balcão
                ao retirar o pedido. Não houve cobrança no app.
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/reservas"
                  onClick={handleClose}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Ver Meus Vouchers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                >
                  Continuar Explorando
                </button>
              </div>
            </div>
          ) : (
            /* RESERVATION FORM */
            <form onSubmit={handleConfirm} className="space-y-4">
              {/* Product preview */}
              <div className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide block truncate">
                    {product.storeName}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-rose-500" />
                      {product.pickupWindow}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-sm font-black text-emerald-600">
                      R$ {product.discountedPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Quantidade a reservar (Máx: {product.quantity} {product.unit})
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-slate-900 bg-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(Math.min(product.quantity, quantity + 1))
                      }
                      disabled={quantity >= product.quantity}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">
                    {product.unit}
                  </span>
                </div>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome para Identificação no Balcão
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Retirada Info */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Local de Retirada:</span>
                </div>
                <p className="pl-5 text-slate-600">
                  {product.storeAddress} ({product.distanceKm} km de distância)
                </p>
              </div>

              {/* Financial summary */}
              <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-3.5 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-emerald-700">
                  <span>Sua Economia:</span>
                  <span>R$ {savings.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-emerald-200/60">
                  <span>Total a Pagar na Retirada:</span>
                  <span className="text-emerald-700">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                  {error}
                </div>
              )}

              {/* CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
              >
                <span>Confirmar Reserva Gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Pagamento realizado apenas presencialmente no caixa da loja.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
