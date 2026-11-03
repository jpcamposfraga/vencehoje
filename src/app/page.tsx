"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  TrendingDown,
  Store,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Leaf,
  Users,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

export default function LandingPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadType, setLeadType] = useState<"consumer" | "merchant">("consumer");

  const openLead = (type: "consumer" | "merchant") => {
    setLeadType(type);
    setLeadModalOpen(true);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Economia Circular & Consumo Consciente</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Alimentos de qualidade com{" "}
                  <span className="text-emerald-600 underline decoration-emerald-300 underline-offset-4">
                    até 70% de desconto
                  </span>
                  .
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Encontre produtos próximos da validade em padarias, hortifrútis e
                  supermercados no seu bairro.{" "}
                  <strong>Transparência total por item</strong>: veja exatamente o
                  que está comprando e a data de vencimento antes de reservar.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/consumidor"
                    className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 transition text-sm sm:text-base group"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Explorar Ofertas Disponíveis</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </Link>

                  <button
                    onClick={() => openLead("merchant")}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold py-3.5 px-5 rounded-2xl shadow-sm transition text-sm sm:text-base"
                  >
                    <Store className="w-4 h-4 text-emerald-600" />
                    <span>Sou Comerciante (Cadastrar Loja)</span>
                  </button>
                </div>

                {/* Micro trust indicators */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 max-w-lg">
                  <div>
                    <span className="block text-xl font-extrabold text-slate-900">
                      R$ 0 taxas
                    </span>
                    <span className="text-xs text-slate-500">
                      Pague direto na loja
                    </span>
                  </div>
                  <div>
                    <span className="block text-xl font-extrabold text-emerald-600">
                      100% visível
                    </span>
                    <span className="text-xs text-slate-500">
                      Sem sacola surpresa
                    </span>
                  </div>
                  <div>
                    <span className="block text-xl font-extrabold text-slate-900">
                      Hiperlocal
                    </span>
                    <span className="text-xs text-slate-500">
                      Retirada em minutos
                    </span>
                  </div>
                </div>
              </div>

              {/* Mockup Card Flutuante */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-w-md mx-auto">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-700">
                        Oferta Real no Radar (400m)
                      </span>
                    </div>
                    <span className="text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Vence Hoje
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden mb-4 bg-slate-100 aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"
                      alt="Croissant Francês"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
                      -58% OFF
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">
                      Padaria Bella Vista • Centro
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">
                      Croissant Francês Amanteigado (4 un)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Retirada hoje até 19:30 • Apenas 5 pacotes restantes
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400 line-through block">
                        R$ 24,00
                      </span>
                      <span className="text-2xl font-black text-emerald-600">
                        R$ 9,90
                      </span>
                    </div>
                    <Link
                      href="/consumidor"
                      className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1"
                    >
                      <span>Reservar Agora</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      Transparência de Validade
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Você sabe a data antes de ir
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA (4 PASSOS DO CANVAS) */}
        <section id="como-funciona" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Processo Self-Service
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                Como Funciona o VenceHoje
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Os 4 passos essenciais mapeados em nosso Business Model Canvas:
                simples, rápido e sem complicações.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Passo 1 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 relative">
                <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Lojista Publica a Oferta
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O comerciante insere os itens que estão prestes a vencer com
                  desconto de 40% a 70% e estipula a janela de retirada.
                </p>
              </div>

              {/* Passo 2 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 relative">
                <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Consumidor Encontra
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O cliente abre o app, filtra por itens que vencem &quot;Hoje&quot; ou
                  &quot;Amanhã&quot; e localiza comércios a poucos minutos de distância.
                </p>
              </div>

              {/* Passo 3 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 relative">
                <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Reserva Garantida
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Em 1 clique, o consumidor garante o estoque com um voucher
                  exclusivo (VH-XXXX) sem necessidade de cartão no app.
                </p>
              </div>

              {/* Passo 4 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 relative">
                <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  4
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Retirada no Balcão
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O cliente vai à loja física dentro do horário, apresenta o código
                  e realiza o pagamento diretamente ao estabelecimento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BENCHMARK COMPARATIVO */}
        <section id="benchmark" className="py-20 bg-slate-50 border-t border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">
                Benchmark de Mercado
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                Por que o VenceHoje é diferente?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                O conceito de combater o desperdício já existe; nossa oportunidade é
                executar com muito mais transparência e sem taxas abusivas.
              </p>
            </div>

            <div className="overflow-x-auto shadow-sm rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                    <th className="p-4 font-bold">Critério de Avaliação</th>
                    <th className="p-4 font-bold text-slate-500">Food To Save</th>
                    <th className="p-4 font-bold text-slate-500">SaveFood / B4Waste</th>
                    <th className="p-4 font-bold text-emerald-700 bg-emerald-50/80">
                      VenceHoje (Nossa Proposta)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-semibold text-slate-800">
                      Modelo de Oferta
                    </td>
                    <td className="p-4 text-slate-600">
                      Sacola-surpresa (conteúdo incerto)
                    </td>
                    <td className="p-4 text-slate-600">
                      Produtos individuais com desconto
                    </td>
                    <td className="p-4 font-medium text-emerald-800 bg-emerald-50/50">
                      Produto individual com foto, quantidade e validade exata
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-800">
                      Transparência ao Consumidor
                    </td>
                    <td className="p-4 text-slate-600 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      Baixa (escolhe categoria, não o item)
                    </td>
                    <td className="p-4 text-slate-600">
                      Média / Alta dependendo da loja
                    </td>
                    <td className="p-4 font-medium text-emerald-800 bg-emerald-50/50 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      Alta por desenho (preço, validade e estoque visíveis)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-800">
                      Taxas de Transação no App
                    </td>
                    <td className="p-4 text-slate-600">
                      Comissão alta retida na venda online
                    </td>
                    <td className="p-4 text-slate-600">
                      Taxas sobre gateway de pagamento
                    </td>
                    <td className="p-4 font-medium text-emerald-800 bg-emerald-50/50">
                      <strong>Zero taxas financeiras no app</strong> (paga no balcão)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-800">
                      Geração de Tráfego Presencial
                    </td>
                    <td className="p-4 text-slate-600">
                      Foco em delivery ou retirada impessoal
                    </td>
                    <td className="p-4 text-slate-600">
                      Mista
                    </td>
                    <td className="p-4 font-medium text-emerald-800 bg-emerald-50/50">
                      Foco no fluxo ao vivo de clientes na loja física (cross-selling)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PARA COMERCIANTES (B2B) */}
        <section id="comerciantes" className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Segmento Lojista (B2B)
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
                  Transforme desperdício em nova receita no seu caixa.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  Supermercados, padarias e hortifrútis sofrem perdas constantes
                  com produtos que atingem a data de validade. O VenceHoje conecta
                  seu estoque excedente à vizinhança antes que vire prejuízo.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Fim da perda total do produto
                      </h3>
                      <p className="text-xs text-slate-500">
                        Recupere o custo da mercadoria ao invés de jogar fora.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Aumento do fluxo de clientes no balcão
                      </h3>
                      <p className="text-xs text-slate-500">
                        O cliente que vai retirar a oferta aproveita e compra outros
                        itens pelo preço normal (cross-selling).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Zero risco financeiro e sem comissões abusivas
                      </h3>
                      <p className="text-xs text-slate-500">
                        Sem taxas de cartão ou intermediação dentro do aplicativo no
                        piloto.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/lojista"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition text-sm shadow-md"
                  >
                    <Store className="w-4 h-4 text-emerald-400" />
                    <span>Acessar Painel do Lojista</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Box de métricas do lojista */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />

                <h3 className="text-lg font-bold text-emerald-400 mb-1">
                  Exemplo de Impacto Mensal por Loja
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Estimativa média para uma padaria ou hortifrúti participante
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80">
                    <span className="block text-2xl font-black text-white">
                      R$ 3.400
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Receita recuperada / mês
                    </span>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80">
                    <span className="block text-2xl font-black text-emerald-400">
                      ~180 kg
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Alimentos salvos do lixo
                    </span>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80">
                    <span className="block text-2xl font-black text-amber-400">
                      +120
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Novos clientes no balcão
                    </span>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80">
                    <span className="block text-2xl font-black text-white">
                      R$ 0
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Taxa de adesão no piloto
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openLead("merchant")}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                >
                  Quero Cadastrar Meu Comércio no Piloto
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* DADOS DE MERCADO (TAM / SAM / SOM) */}
        <section id="mercado" className="py-20 bg-slate-50 border-t border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">
                Oportunidade & Viabilidade
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                Tamanho de Mercado (TAM / SAM / SOM)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Dados oficiais apresentados na tese de negócio do projeto para a
                banca de Empreendedorismo em Informática.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  TAM (Mercado Total)
                </span>
                <span className="text-3xl font-black text-slate-900 block mb-2">
                  R$ 850M<span className="text-base text-slate-500 font-normal">/ano</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  603 mil estabelecimentos de varejo alimentar no Brasil (GMV
                  potencial de R$ 5,3 Bi em alimentos passíveis de desconto).
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  SAM (Mercado Endereçável)
                </span>
                <span className="text-3xl font-black text-emerald-600 block mb-2">
                  R$ 135M<span className="text-base text-slate-500 font-normal">/ano</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  90 mil PMEs urbanas situadas em cidades com mais de 100 mil
                  habitantes nas regiões Sul e Sudeste.
                </p>
              </div>

              <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-md border border-emerald-800">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                  SOM (Meta Inicial Piloto)
                </span>
                <span className="text-3xl font-black text-emerald-400 block mb-2">
                  R$ 1,46M<span className="text-base text-emerald-200/80 font-normal">/ano</span>
                </span>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  200 lojas parceiras ativas nos primeiros 18 a 24 meses do
                  projeto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Pronto para ver o MVP funcionando ao vivo?
            </h2>
            <p className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base">
              Alterne entre a experiência do consumidor e o painel do lojista
              utilizando a barra de topo da demonstração.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/consumidor"
                className="py-3 px-6 bg-white hover:bg-slate-100 text-emerald-800 font-bold rounded-xl text-sm transition shadow-lg"
              >
                Abrir Visão do Consumidor
              </Link>
              <Link
                href="/lojista"
                className="py-3 px-6 bg-emerald-950/70 hover:bg-emerald-950 text-white font-bold rounded-xl text-sm transition border border-emerald-400/40"
              >
                Abrir Visão do Lojista
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultType={leadType}
      />
    </>
  );
}
