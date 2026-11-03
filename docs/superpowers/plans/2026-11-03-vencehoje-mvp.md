# VenceHoje MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir e hospedar na Vercel o MVP funcional da plataforma web **VenceHoje**, demonstrando o ciclo completo ("publicar oferta com desconto e validade transparente -> descobrir e filtrar -> reservar sem taxa online -> retirar no balcão") e uma Landing Page institucional com captação de leads para apresentação acadêmica de empreendedorismo.

**Architecture:** Aplicação Next.js (App Router) client-first responsiva, estilizada com Tailwind CSS e ícones Lucide. Os dados de produtos, lojas e reservas são gerenciados por uma camada reativa sobre `localStorage` inicializada com sementes realistas (padaria, hortifrúti, supermercado), com um alternador de papéis ("DemoHeader") persistente no topo para troca instantânea entre Landing Page, Consumidor e Lojista sem atrito de autenticação.

**Tech Stack:** Next.js 15+, React 19, TypeScript, Tailwind CSS, Lucide React, Vercel MCP para deployment.

**Spec:** `docs/intent/vencehoje-intent.md`

## Global Constraints

- **Single Device Pitch Readiness:** A demo deve rodar de ponta a ponta sem falhas de rede, sem depender de banco de dados externo ou chaves de API pagas.
- **Transparência de Validade:** Diferencial central do benchmark (vs. Food To Save) onde cada item exibe foto, nome, data/hora de validade, desconto e quantidade exata em estoque antes da reserva.
- **Zero Pagamento Online no App:** Conforme o Value Proposition Canvas ("Sistema sem transações financeiras no app" / "Zero taxas bancárias"), a reserva emite um voucher e o pagamento é realizado presencialmente na retirada.
- **Ponytail Simplicity:** Menor quantidade de código necessário para entregar o valor total; nada de abstrações desnecessárias ou código para o futuro. Atalhos documentados com `shortcut: <limite>, <quando atualizar>`.

## Review Focus

1. **Persistência e Reset:** Ao recarregar a página ou clicar em "Resetar Demo", o estado deve retornar à semente limpa ou manter as alterações locais sem quebrar.
2. **Consistência de Estoque:** Ao reservar um produto, a quantidade disponível deve diminuir imediatamente; quando o estoque chega a zero, o produto deve ser exibido como esgotado.
3. **Ciclo Completo de Reserva:** O voucher emitido na ponta do consumidor deve aparecer na lista de pedidos do lojista e poder ser marcado como "Retirado/Concluído".
4. **Filtro de Urgência de Validade:** Produtos que vencem "Hoje" devem ser filtráveis com 1 clique e receber destaque visual (badge vermelha/laranja de urgência).
5. **Responsividade:** A interface deve ser 100% apresentável tanto na tela cheia de um projetor/notebook quanto na visualização simulada de celular.

---

### Task 1: Scaffolding do Projeto Next.js + Tailwind + Git

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`, `.gitignore`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Modify: `.gitignore`

**Interfaces:**
- Produces: Estrutura funcional do Next.js pronta para compilação (`npm run build`) e execução local (`npm run dev`).

- [ ] **Step 1: Inicializar repositório Git e criar projeto Next.js com Tailwind CSS**
Inicializar Git local (`git init`), scaffold do Next.js com App Router, TypeScript, Tailwind CSS e Lucide Icons (`npm install next react react-dom lucide-react clsx tailwind-merge`).

- [ ] **Step 2: Verificar compilação inicial**
Executar: `npx next build`
Resultado esperado: Build gerado com sucesso sem erros de TypeScript ou lint.

- [ ] **Step 3: Commit**
```bash
git add .
git commit -m "feat: scaffold next.js project with tailwind and git"
```

---

### Task 2: Modelo de Dados, Seed Realista e Camada de Armazenamento

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/storage.ts`
- Create: `src/lib/seed.ts`
- Create: `src/lib/__tests__/storage.test.ts` (ou script de validação)

**Interfaces:**
- Produces:
  - Tipos: `Product`, `Store`, `Reservation`, `Lead`, `UserRole`
  - Funções: `getProducts()`, `getProductById(id)`, `createProduct(product)`, `createReservation(productId, consumerName)`, `completeReservation(reservationId)`, `resetDemoData()`, `saveLead(lead)`

- [ ] **Step 1: Definir os tipos TypeScript em `src/types/index.ts`**
Contratos para `Store` (id, name, category, address, distance, rating), `Product` (id, storeId, name, category, originalPrice, discountedPrice, expirationDate, expirationUrgency, quantity, unit, imageUrl, pickupWindow), `Reservation` (id, code, productId, storeId, customerName, reservedAt, status: 'pending' | 'completed' | 'cancelled', totalAmount), e `Lead` (id, type: 'consumer' | 'merchant', name, contact, city).

- [ ] **Step 2: Criar semente realista em `src/lib/seed.ts`**
Lojas locais (ex: "Padaria Bella Vista", "Hortifrúti Pomar Verde", "Supermercado Bom Preço", "Empório da Vila") e produtos variados com vencimento para hoje e amanhã (ex: Pão Francês artesanal, Iogurte Natural, Morangos frescos, Queijo Minas, Salada pronta).

- [ ] **Step 3: Implementar `src/lib/storage.ts` com reatividade e suporte a SSR**
Manipulação segura de `localStorage` com fallback em memória caso esteja rodando no servidor, eventos de atualização customizados (`storage` event) para sincronização reativa entre componentes e função `resetDemoData()`.

- [ ] **Step 4: Criar script de teste / validação dos métodos de armazenamento**
Criar e rodar teste validando criação de produto, reserva com baixa de estoque, conclusão de reserva e reset.

- [ ] **Step 5: Commit**
```bash
git add src/types src/lib
git commit -m "feat: add data models, realistic seed and storage service"
```

---

### Task 3: Barra Demo Fixa e Landing Page Institucional de Validação

**Files:**
- Create: `src/components/DemoHeader.tsx`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/app/page.tsx` (Landing Page)
- Create: `src/components/LeadCaptureModal.tsx`

**Interfaces:**
- Consumes: `resetDemoData()`, `saveLead()` de `src/lib/storage.ts`
- Produces:
  - Componente `<DemoHeader />` global com switch de papéis (Landing Page, Consumidor, Lojista) e botão de reset.
  - Landing page com Hero, Proposta de Valor B2C/B2B, Tabela Comparativa de Benchmark (destacando por que somos melhores que sacola surpresa), Métricas de Mercado e CTA de captação de leads com feedback imediato.

- [ ] **Step 1: Criar o componente `DemoHeader`**
Barra de topo persistente e estilizada em destaque (modo pitch): indicador de papel ativo, botões diretos para alternar para Consumidor e Lojista, e botão "Resetar Demo" com toast de confirmação.

- [ ] **Step 2: Construir a Landing Page em `src/app/page.tsx`**
Seções:
- Hero: "Alimentos de qualidade com até 70% de desconto. Salve comida, economize dinheiro."
- Como Funciona: 4 passos (Lojista anuncia -> Você descobre com transparência de validade -> Reserva sem taxa -> Retira no balcão).
- Benchmark Interativo: Comparativo claro ("VenceHoje vs Sacolas Surpresa do Food To Save vs Comércio Tradicional").
- Para Comerciantes: "Transforme perda de validade em faturamento sem taxas de intermediação".
- Modal de Captação de Leads: Permite cadastrar interesse (lojista ou consumidor) e salva no storage.

- [ ] **Step 3: Verificar renderização e responsividade da Landing Page**
Rodar build e verificar carregamento visual limpo e sem erros.

- [ ] **Step 4: Commit**
```bash
git add src/components src/app
git commit -m "feat: add demo header and high-converting landing page"
```

---

### Task 4: Visão do Consumidor — Catálogo, Filtros e Fluxo de Reserva

**Files:**
- Create: `src/app/consumidor/page.tsx`
- Create: `src/components/ProductCard.tsx`
- Create: `src/components/ProductFilters.tsx`
- Create: `src/components/ReservationModal.tsx`
- Create: `src/app/reservas/page.tsx`
- Create: `src/components/VoucherCard.tsx`

**Interfaces:**
- Consumes: `getProducts()`, `createReservation()`, `getReservations()`
- Produces:
  - Página `/consumidor` com catálogo dinâmico de produtos com badge de validade urgente, distância, preço de/por.
  - Filtros instantâneos por Categoria (Padaria, Hortifrúti, Laticínios, etc.) e Urgência ("Vence Hoje", "Vence Amanhã").
  - Busca por texto em tempo real.
  - Modal de reserva direta com confirmação do nome do cliente, instruções de retirada e pagamento no local.
  - Tela `/reservas` exibindo vouchers gerados com QR Code simulado e código de 4 dígitos para apresentar no balcão.

- [ ] **Step 1: Criar componentes `ProductCard` e `ProductFilters`**
Card com visual atraente, badges de vencimento (laranja/vermelha), tags de distância, cálculo percentual de desconto e botão "Reservar".

- [ ] **Step 2: Implementar página `/consumidor` com busca e filtros**
Montar a vitrine com contadores ("X ofertas disponíveis próximas a você"), busca em tempo real e ordenação por maior desconto ou urgência de vencimento.

- [ ] **Step 3: Implementar `ReservationModal` e geração de voucher**
Fluxo de reserva em 1 clique: pede apenas o nome do consumidor, reduz o estoque do produto e gera o código de reserva com link para ver o voucher.

- [ ] **Step 4: Implementar tela `/reservas` com `VoucherCard`**
Exibe os vouchers ativos do consumidor com endereço da loja, horário limite de retirada e status.

- [ ] **Step 5: Verificar funcionamento do fluxo do consumidor**
Testar filtragem, busca e reserva de um item com atualização instantânea do estoque.

- [ ] **Step 6: Commit**
```bash
git add src/app/consumidor src/app/reservas src/components
git commit -m "feat: add consumer catalog, dynamic filters, reservation modal and vouchers"
```

---

### Task 5: Visão do Lojista — Painel de Gestão e Conferência de Vouchers

**Files:**
- Create: `src/app/lojista/page.tsx`
- Create: `src/components/NewProductModal.tsx`
- Create: `src/components/StoreMetrics.tsx`
- Create: `src/components/OrderValidationCard.tsx`

**Interfaces:**
- Consumes: `getProducts()`, `createProduct()`, `getReservations()`, `completeReservation()`
- Produces:
  - Página `/lojista` com seletor da loja (ex: "Padaria Bella Vista") e métricas de impacto (Itens Ativos, Receita Salva em R$, Alimentos Desperdiçados Evitados).
  - Formulário modal para publicar nova oferta com cálculo automático de desconto e janela de retirada.
  - Aba de conferência de reservas com validação de código de voucher e botão "Confirmar Entrega".

- [ ] **Step 1: Criar componente de métricas do lojista (`StoreMetrics`)**
Cards com métricas calculadas em tempo real a partir das ofertas e reservas da loja.

- [ ] **Step 2: Criar formulário modal de nova oferta (`NewProductModal`)**
Campos: Nome do produto, categoria, preço original, preço promocional, data de validade, quantidade em estoque e horário limite de retirada. Ao salvar, produto passa a constar no catálogo imediatamente.

- [ ] **Step 3: Implementar lista e validação de reservas recebidas**
Visualização de pedidos pendentes com código do voucher e botão de baixa ("Marcar como Entregue"), concluindo a reserva.

- [ ] **Step 4: Montar a página completa `/lojista`**
Organização em abas: "Ofertas Ativas" e "Reservas / Retiradas".

- [ ] **Step 5: Testar integração cruzada Lojista <-> Consumidor**
Cadastrar um novo produto no painel do Lojista, alternar para o Consumidor, reservar o produto, voltar para o Lojista e dar baixa no voucher.

- [ ] **Step 6: Commit**
```bash
git add src/app/lojista src/components
git commit -m "feat: add merchant dashboard, new product creation and voucher validation"
```

---

### Task 6: Validação de Qualidade, Estilos e Verificação End-to-End

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/lib/__tests__/e2e-flow.test.ts` (ou script node de auto-verificação)

**Interfaces:**
- Valida: Toda a jornada do usuário e compilação de produção sem erros.

- [ ] **Step 1: Executar script de teste automatizado de integridade**
Rodar script de validação das regras de negócio (baixa de estoque, validade, voucher de reserva e métricas).

- [ ] **Step 2: Executar build de produção do Next.js**
Executar: `npx next build`
Resultado esperado: Build 100% verde sem warnings ou erros de tipos.

- [ ] **Step 3: Commit**
```bash
git add .
git commit -m "test: verify complete business loop and production build"
```

---

### Task 7: Deploy na Vercel via MCP Vercel e Entrega

**Files:**
- Modify: `README.md` (instruções completas da apresentação, guia do pitch em 3 minutos e link do deploy)

**Interfaces:**
- Produces: Aplicação online e acessível publicamente na Vercel com link pronto para a aula.

- [ ] **Step 1: Preparar repositório e deploy na Vercel**
Usar ferramentas do MCP da Vercel para criar o projeto e realizar o deployment da aplicação.

- [ ] **Step 2: Verificar a URL pública na Vercel**
Testar requisição na URL gerada para garantir status 200 e carregamento correto da página inicial.

- [ ] **Step 3: Documentar guia de apresentação no README.md**
Roteiro do pitch em 3 minutos para a matéria de Empreendedorismo, demonstrando cada diferencial do Canvas.

- [ ] **Step 4: Commit final**
```bash
git add README.md
git commit -m "docs: add presentation pitch guide and deployment link"
```
