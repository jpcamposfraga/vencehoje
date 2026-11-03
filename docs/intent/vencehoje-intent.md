# Statement of Intent: VenceHoje

## Alinhamento Consolidado do MVP

- **Outcome:** Uma aplicação web ágil e funcional hospedada na Vercel demonstrando o ciclo completo do negócio ("publicar oferta -> descobrir com transparência de validade -> reservar -> retirar no balcão"), acompanhada de uma Landing Page de validação com captação de leads.
- **User:** Avaliadores/professores da matéria de Empreendedorismo em Informática e as duas pontas do modelo de negócio: consumidores (buscando economia e transparência de validade) e comércios locais (evitando perdas financeiras com produtos perto do vencimento).
- **Why now:** Apresentação acadêmica com necessidade de validar a tese de negócio com um MVP prático, focado ("faca afiada, sem canivete suíço") e sem risco de falha ao vivo no palco.
- **Success:** Conseguir demonstrar ao vivo em menos de 3 minutos a proposta de valor: landing page convincente -> alternar para Lojista e criar uma oferta com validade e desconto -> alternar para Consumidor, filtrar, encontrar o item e gerar o voucher de reserva para retirada no local.
- **Constraint:** Aplicação web responsiva (Next.js 15+ ou Vite/React moderno com Tailwind CSS e deploy Vercel), dados persistidos com `localStorage` e seed de comércios realistas (sem falhas de rede), alternador de perfis em 1 clique (Modo Demo).
- **Out of scope:** Gateway de pagamentos online (Pix/cartão dentro do app — o pagamento é feito na retirada na loja física, alinhado à proposta de "zero taxas bancárias"), app mobile nativo em lojas de aplicativo, e backend com banco de dados externo pago/sujeito a cold start.
