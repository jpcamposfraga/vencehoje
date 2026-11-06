"use client";

import { useState } from "react";
import { Store, ProductCategory, Product } from "@/types";
import { X, Plus } from "lucide-react";
import { createProduct } from "@/lib/storage";

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStore: Store;
  onProductCreated?: (product: Product) => void;
}

const PRESET_IMAGES = [
  {
    name: "Carnes / Açougue",
    url: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Frango / Aves",
    url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Queijos / Frios",
    url: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Rotisseria / Assados",
    url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Hortifrúti / Frutas",
    url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Laticínios / Iogurte",
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
  },
];

export function NewProductModal({
  isOpen,
  onClose,
  activeStore,
  onProductCreated,
}: NewProductModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("acougue");
  const [originalPrice, setOriginalPrice] = useState("45.00");
  const [discountedPrice, setDiscountedPrice] = useState("19.90");
  const [expirationUrgency, setExpirationUrgency] = useState<
    "today" | "tomorrow"
  >("today");
  const [pickupWindow, setPickupWindow] = useState("Hoje até 20:00");
  const [quantity, setQuantity] = useState("5");
  const [unit, setUnit] = useState("pacote");
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const origNum = parseFloat(originalPrice) || 0;
  const discNum = parseFloat(discountedPrice) || 0;
  const discountPercent =
    origNum > 0 && discNum < origNum
      ? Math.round(((origNum - discNum) / origNum) * 100)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || origNum <= 0 || discNum <= 0) return;

    const newProd = createProduct({
      storeId: activeStore.id,
      storeName: activeStore.name,
      storeAddress: activeStore.address,
      distanceKm: activeStore.distanceKm,
      name: name.trim(),
      category,
      originalPrice: origNum,
      discountedPrice: discNum,
      discountPercent,
      expirationDate: expirationUrgency === "today" ? "Hoje" : "Amanhã",
      expirationUrgency,
      pickupWindow: pickupWindow.trim(),
      quantity: parseInt(quantity) || 1,
      unit,
      imageUrl,
      description: description.trim() || undefined,
    });

    if (onProductCreated) onProductCreated(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <Plus className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                Publicar Lote com Vencimento Próximo
              </h2>
              <p className="text-[11px] text-slate-500">
                Supermercado: {activeStore.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nome do Produto / Lote no Supermercado
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Picanha Fatiada à Vácuo Resfriada (800g)"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Setor / Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="acougue">🥩 Açougue & Carnes</option>
                <option value="laticinios">🧀 Frios & Laticínios</option>
                <option value="padaria">🥖 Padaria & Rotisseria</option>
                <option value="hortifruti">🍎 Hortifrúti</option>
                <option value="refeicoes">🍲 Pratos Prontos</option>
                <option value="bebidas">🥤 Bebidas</option>
                <option value="mercearia">📦 Mercearia & Secos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Urgência de Validade
              </label>
              <select
                value={expirationUrgency}
                onChange={(e) => {
                  const val = e.target.value as "today" | "tomorrow";
                  setExpirationUrgency(val);
                  setPickupWindow(
                    val === "today" ? "Hoje até 20:00" : "Até amanhã às 14:00"
                  );
                }}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="today">🚨 Vence Hoje</option>
                <option value="tomorrow">⏳ Vence Amanhã</option>
              </select>
            </div>
          </div>

          {/* Preços e Desconto */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 items-end">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Preço de Gôndola (R$)
              </label>
              <input
                type="number"
                step="0.10"
                required
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Preço VenceHoje (R$)
              </label>
              <input
                type="number"
                step="0.10"
                required
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
              />
            </div>

            <div className="col-span-2 sm:col-span-1 text-center bg-white p-2 rounded-xl border border-slate-200">
              <span className="block text-[10px] text-slate-400 uppercase font-bold">
                Desconto
              </span>
              <span className="text-base font-black text-emerald-600">
                {discountPercent}% OFF
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Horário Limite para Retirada
              </label>
              <input
                type="text"
                required
                value={pickupWindow}
                onChange={(e) => setPickupWindow(e.target.value)}
                placeholder="Ex: Hoje até 20:00"
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estoque
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unidade
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full text-xs sm:text-sm px-2 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="pacote">pct</option>
                  <option value="bandeja">bdj</option>
                  <option value="un">un</option>
                  <option value="kg">kg</option>
                  <option value="pack">pack</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Preset Images */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Foto Representativa do Setor (Demo Rápida)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.name}
                  onClick={() => setImageUrl(img.url)}
                  className={`p-1.5 rounded-xl border text-left flex items-center gap-1.5 transition ${
                    imageUrl === img.url
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="text-[10px] truncate">{img.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Oferta no Catálogo do Supermercado</span>
          </button>
        </form>
      </div>
    </div>
  );
}
