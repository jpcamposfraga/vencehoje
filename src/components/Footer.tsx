import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">
                Vence<span className="text-emerald-400">Hoje</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-4">
              Plataforma hiperlocal contra o desperdício de alimentos. Conectamos
              comércios locais a consumidores conscientes com até 70% de desconto
              e transparência total de validade.
            </p>
            <p className="text-[11px] text-slate-500">
              Projeto desenvolvido para a matéria de Empreendedorismo em Informática (EMI).
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Navegação Rápida</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  Página Inicial (Landing Page)
                </Link>
              </li>
              <li>
                <Link href="/consumidor" className="hover:text-emerald-400 transition">
                  Vitrine de Ofertas (Consumidor)
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="hover:text-emerald-400 transition">
                  Minhas Reservas / Vouchers
                </Link>
              </li>
              <li>
                <Link href="/lojista" className="hover:text-emerald-400 transition">
                  Painel do Lojista Parceiro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Metodologia MVP</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed mb-2">
              Seguindo a cartilha de Validação & MVP Lean (49 Educação / Ash Maurya): foco na faca afiada (proposta de valor real) e zero taxas de intermediação bancária.
            </p>
            <span className="inline-block px-2.5 py-1 bg-slate-800 text-emerald-400 rounded-md font-mono text-[10px]">
              VenceHoje v1.0 • Piloto Web
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 VenceHoje — Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> para o combate ao desperdício alimentar.
          </p>
        </div>
      </div>
    </footer>
  );
}
