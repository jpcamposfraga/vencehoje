import type { Metadata } from "next";
import "./globals.css";
import { DemoHeader } from "@/components/DemoHeader";

export const metadata: Metadata = {
  title: "VenceHoje | Alimentos com até 70% OFF e Validade Transparente",
  description: "Conectando padarias, hortifrútis e supermercados a pessoas que buscam economia e consumo consciente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <DemoHeader />
        {children}
      </body>
    </html>
  );
}
