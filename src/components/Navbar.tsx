"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, ShoppingBag, Store, Menu, X, ArrowRight } from "lucide-react";
import { LeadCaptureModal } from "./LeadCaptureModal";

export function Navbar() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md sticky top-[37px] z-40 border-b border-slate-100 shadow-sm transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-tight">
                Vence<span className="text-emerald-600">Hoje</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block -mt-0.5">
                Economia Circular
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#como-funciona" className="hover:text-emerald-600 transition">
              Como Funciona
            </a>
            <a href="#benchmark" className="hover:text-emerald-600 transition">
              Diferenciais vs Concorrentes
            </a>
            <a href="#comerciantes" className="hover:text-emerald-600 transition">
              Para Comerciantes
            </a>
            <a href="#mercado" className="hover:text-emerald-600 transition">
              Tamanho do Mercado
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLeadModalOpen(true)}
              className="text-xs font-semibold text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
            >
              Cadastrar Interesse
            </button>

            <Link
              href="/consumidor"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-md shadow-emerald-600/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ver Ofertas Ativas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 bg-white border-b border-slate-200 space-y-2">
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              Como Funciona
            </a>
            <a
              href="#benchmark"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              Diferenciais
            </a>
            <a
              href="#comerciantes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              Para Comerciantes
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/consumidor"
                className="w-full text-center py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
              >
                Abrir Catálogo do Consumidor
              </Link>
              <Link
                href="/lojista"
                className="w-full text-center py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-sm"
              >
                Abrir Painel do Lojista
              </Link>
            </div>
          </div>
        )}
      </header>

      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
      />
    </>
  );
}
