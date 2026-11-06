"use client";

import { useState, useEffect } from "react";
import { Store, Product, Reservation } from "@/types";
import {
  getStores,
  getProducts,
  getReservationsByStore,
  deleteProduct,
  completeReservation,
  getReservationByCode,
} from "@/lib/storage";
import { StoreMetrics } from "@/components/StoreMetrics";
import { NewProductModal } from "@/components/NewProductModal";
import {
  Store as StoreIcon,
  Plus,
  Clock,
  CheckCircle2,
  Package,
  Trash2,
  QrCode,
  Check,
} from "lucide-react";

export default function MerchantDashboardPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [activeStoreId, setActiveStoreId] = useState<string>("store-1");
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"reservations" | "products">(
    "reservations"
  );
  const [quickCode, setQuickCode] = useState("");
  const [quickMessage, setQuickMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadData = () => {
    const s = getStores();
    setStores(s);
    if (!activeStoreId && s.length > 0) {
      setActiveStoreId(s[0].id);
    }
    const allProds = getProducts();
    setProducts(allProds.filter((p) => p.storeId === activeStoreId));
    setReservations(getReservationsByStore(activeStoreId));
  };

  useEffect(() => {
    loadData();
    const handler = () => loadData();
    window.addEventListener("vencehoje_change", handler);
    return () => window.removeEventListener("vencehoje_change", handler);
  }, [activeStoreId]);

  const activeStore = stores.find((s) => s.id === activeStoreId) || stores[0];

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Remover "${name}" das ofertas ativas?`)) {
      deleteProduct(id);
    }
  };

  const handleCompleteReservation = (id: string) => {
    completeReservation(id);
  };

  const handleQuickValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCode.trim()) return;

    let searchCode = quickCode.trim().toUpperCase();
    if (!searchCode.startsWith("VH-")) {
      searchCode = `VH-${searchCode}`;
    }

    const res = getReservationByCode(searchCode);
    if (!res) {
      setQuickMessage({
        type: "error",
        text: `Voucher "${searchCode}" não encontrado.`,
      });
      return;
    }

    if (res.storeId !== activeStoreId) {
      setQuickMessage({
        type: "error",
        text: `Este voucher pertence a outro supermercado (${res.storeName}).`,
      });
      return;
    }

    if (res.status === "completed") {
      setQuickMessage({
        type: "error",
        text: `Voucher ${searchCode} já foi retirado anteriormente.`,
      });
      return;
    }

    completeReservation(res.id);
    setQuickCode("");
    setQuickMessage({
      type: "success",
      text: `Sucesso! Reserva ${searchCode} (${res.customerName} - R$ ${res.totalAmount.toFixed(
        2
      )}) validada e concluída no caixa.`,
    });
  };

  if (!activeStore) return null;

  const pendingReservations = reservations.filter((r) => r.status === "pending");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Merchant Top Header */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <StoreIcon className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Painel do Supermercado
                </h1>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Prevenção de Perdas B2B
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeStore.address} • {activeStore.category}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Store Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 px-2">
                Unidade:
              </span>
              <select
                value={activeStoreId}
                onChange={(e) => setActiveStoreId(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setNewModalOpen(true)}
              className="flex items-center gap-1.5 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-emerald-600/20 ml-auto md:ml-0"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Lote Excedente</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Metrics */}
        <StoreMetrics products={products} reservations={reservations} />

        {/* Quick voucher validation at counter */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 mb-8 border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                <QrCode className="w-4 h-4" />
                <span>Validação Rápida no Caixa / Balcão SAC</span>
              </div>
              <h2 className="text-base font-bold text-white mt-1">
                Cliente apresentou o voucher VenceHoje no caixa?
              </h2>
              <p className="text-xs text-slate-400">
                Digite o código (ex: 7821 ou VH-7821) para registrar a baixa e
                receber o pagamento direto no caixa.
              </p>
            </div>

            <form
              onSubmit={handleQuickValidate}
              className="flex items-center gap-2 max-w-sm w-full"
            >
              <input
                type="text"
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value)}
                placeholder="Código (ex: VH-7821)"
                className="flex-1 text-sm uppercase px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
              <button
                type="submit"
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shrink-0"
              >
                Validar
              </button>
            </form>
          </div>

          {quickMessage && (
            <div
              className={`mt-3 p-3 rounded-xl text-xs font-medium flex items-center justify-between ${
                quickMessage.type === "success"
                  ? "bg-emerald-950/80 text-emerald-200 border border-emerald-800"
                  : "bg-rose-950/80 text-rose-200 border border-rose-800"
              }`}
            >
              <span>{quickMessage.text}</span>
              <button
                onClick={() => setQuickMessage(null)}
                className="text-xs opacity-75 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition ${
              activeTab === "reservations"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Vouchers & Reservas</span>
            {pendingReservations.length > 0 && (
              <span className="bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                {pendingReservations.length} aguardando
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition ${
              activeTab === "products"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Lotes Ativos na Loja ({products.length})</span>
          </button>
        </div>

        {/* Content Tab 1: Reservations */}
        {activeTab === "reservations" && (
          <div className="space-y-4">
            {reservations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {res.code}
                      </span>
                      {res.status === "pending" ? (
                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Aguardando Retirada
                        </span>
                      ) : res.status === "completed" ? (
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Entregue / Concluído
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[11px] font-bold rounded-full">
                          Cancelado
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {res.productQuantity}x {res.productName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Cliente: <strong>{res.customerName}</strong> • Janela:{" "}
                        {res.pickupWindow}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Cobrar no Caixa
                        </span>
                        <span className="text-base font-black text-emerald-600">
                          R$ {res.totalAmount.toFixed(2).replace(".", ",")}
                        </span>
                      </div>

                      {res.status === "pending" && (
                        <button
                          onClick={() => handleCompleteReservation(res.id)}
                          className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Confirmar Retirada</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
                <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Nenhuma reserva recebida ainda
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Assim que um consumidor reservar um lote no app, o voucher
                  aparecerá aqui para conferência no caixa.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Content Tab 2: Products */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex items-start gap-3"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">
                          {prod.category}
                        </span>
                        <button
                          onClick={() =>
                            handleDeleteProduct(prod.id, prod.name)
                          }
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remover produto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {prod.name}
                      </h4>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs text-slate-400 line-through">
                          R$ {prod.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm font-black text-emerald-600">
                          R$ {prod.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded">
                          -{prod.discountPercent}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                        <span>
                          Estoque: <strong>{prod.quantity} {prod.unit}</strong>
                        </span>
                        <span className="text-rose-600 font-medium">
                          {prod.pickupWindow}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
                <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Nenhum produto cadastrado para esta unidade
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Clique no botão abaixo para adicionar lotes de açougue, frios ou hortifrúti.
                </p>
                <button
                  onClick={() => setNewModalOpen(true)}
                  className="py-2 px-4 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Adicionar Primeira Oferta
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* New Product Modal */}
      <NewProductModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        activeStore={activeStore}
        onProductCreated={loadData}
      />
    </div>
  );
}
