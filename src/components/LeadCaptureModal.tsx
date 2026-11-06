"use client";

import { useState } from "react";
import { X, CheckCircle2, Store, HeartHandshake, Sparkles } from "lucide-react";
import { saveLead } from "@/lib/storage";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "consumer" | "merchant";
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  defaultType = "consumer",
}: LeadCaptureModalProps) {
  const [type, setType] = useState<"consumer" | "merchant">(defaultType);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("São Paulo - SP");
  const [storeName, setStoreName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    saveLead({
      type,
      name: name.trim(),
      contact: contact.trim(),
      city: city.trim(),
      storeName: type === "merchant" ? storeName.trim() : undefined,
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setContact("");
    setStoreName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Inscrição Confirmada!
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Obrigado pelo interesse no <strong>VenceHoje</strong>. Nossa equipe
                entrará em contato para ativar o piloto da sua unidade / região.
              </p>
              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md"
              >
                Continuar Navegando
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  Validação de Demanda (MVP)
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Faça parte da nossa lista prioritária
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Valide conosco o piloto da sua região e receba alertas antecipados.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tipo de Lead */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setType("consumer")}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                      type === "consumer"
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    Consumidor
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("merchant")}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                      type === "merchant"
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    Supermercadista
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {type === "merchant" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nome da Rede / Supermercado
                    </label>
                    <input
                      type="text"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Ex: Supermercados CompreBem (Loja Jardins)..."
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp ou E-mail para Contato
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="(11) 99999-9999 ou contato@comprebem.com.br"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cidade / Bairro
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md text-sm mt-2"
                >
                  {type === "merchant"
                    ? "Cadastrar Rede no Piloto de Supermercados"
                    : "Quero Receber Ofertas com Desconto"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
