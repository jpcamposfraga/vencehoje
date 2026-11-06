"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Store, ShoppingBag, Globe, RotateCcw, Check, Sparkles } from "lucide-react";
import { resetDemoData, getReservations } from "@/lib/storage";

export function DemoHeader() {
  const pathname = usePathname();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const updateCounts = () => {
    const res = getReservations();
    setPendingCount(res.filter((r) => r.status === "pending").length);
  };

  useEffect(() => {
    updateCounts();
    const handler = () => updateCounts();
    window.addEventListener("vencehoje_change", handler);
    return () => window.removeEventListener("vencehoje_change", handler);
  }, []);

  const handleReset = () => {
    resetDemoData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <aside aria-label="Controles da Apresentação" className="bg-slate-900 text-white border-b border-slate-800 text-xs px-3 py-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 animate-pulse" />
            Modo Pitch EMI
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Demonstração ao vivo para Empreendedorismo • Supermercados Regionais
          </span>
        </div>

        <nav aria-label="Navegação da Demonstração" className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition ${
              pathname === "/"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </Link>

          <Link
            href="/consumidor"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition relative ${
              pathname.startsWith("/consumidor")
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Consumidor</span>
          </Link>

          <Link
            href="/lojista"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition relative ${
              pathname.startsWith("/lojista")
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Supermercado</span>
            {pendingCount > 0 && (
              <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {pendingCount}
              </span>
            )}
          </Link>

          <button
            onClick={handleReset}
            title="Restaura os dados originais da demo"
            className="flex items-center gap-1 ml-2 px-2 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition"
          >
            {resetSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Resetado!</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3 h-3 text-slate-400" />
                <span className="hidden md:inline">Resetar Demo</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </aside>
  );
}
