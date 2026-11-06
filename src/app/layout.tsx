import type { Metadata } from "next";
import "./globals.css";
import { DemoHeader } from "@/components/DemoHeader";

export const metadata: Metadata = {
  title: "VenceHoje | Alimentos de Supermercado com até 70% OFF e Validade Transparente",
  description: "Conectando redes e supermercados regionais a consumidores que buscam cortes nobres, frios e laticínios com economia real e combate ao desperdício.",
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
