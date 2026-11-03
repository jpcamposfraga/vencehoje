# VenceHoje 🥗🥖

> **MVP Funcional e Plataforma Web de Economia Circular para a Matéria de Empreendedorismo em Informática (EMI)**  
> *Transformando alimentos próximos do vencimento em economia real para o consumidor e nova receita para o comércio local.*

---

## 📌 Visão Geral do Negócio

No Brasil, são desperdiçadas aproximadamente **20 milhões de toneladas de alimentos por ano** (PNUMA/UNEP). Ao mesmo tempo, pequenos e médios varejistas (padarias, hortifrútis, empórios e supermercados) amargam prejuízos diários com mercadorias válidas que atingem a data de validade na prateleira sem serem vendidas.

O **VenceHoje** é uma plataforma hiperlocal que conecta estabelecimentos comerciais a consumidores vizinhos, oferecendo:
1. **Transparência Total (Diferencial vs Food To Save):** O consumidor sabe exatamente qual produto está comprando, a data/hora exata de vencimento e a quantidade disponível — sem sacolas-surpresa.
2. **Zero Taxas Financeiras no App:** Pagamento realizado presencialmente na retirada no balcão, eliminando atrito bancário para o lojista e incentivando o fluxo físico na loja (*cross-selling*).
3. **Reserva Garantida em 1 Clique:** Emissão de voucher alfanumérico e QR Code exclusivo para conferência rápida no caixa.

---

## 🎯 Benchmark de Mercado

| Critério | Food To Save | SaveFood / B4Waste | **VenceHoje (Nossa Proposta)** |
| :--- | :--- | :--- | :--- |
| **Modelo de Oferta** | Sacolas-surpresa (conteúdo incerto) | Produtos individuais com desconto | **Produto individual com foto, quantidade e validade exata** |
| **Transparência** | Baixa (escolhe categoria, não o item) | Média / Alta dependendo da loja | **Alta por desenho (preço, validade e estoque visíveis)** |
| **Taxas no App** | Comissões retidas em gateway online | Taxas financeiras de intermediação | **Zero taxas bancárias no app (paga na loja)** |
| **Tráfego Presencial** | Foco em delivery / retirada impessoal | Mista | **Foco no fluxo de clientes no balcão (cross-selling)** |

---

## 📊 Oportunidade e Mercado (TAM / SAM / SOM)

- **TAM (Mercado Total):** **R$ 850M/ano** (603 mil estabelecimentos de varejo alimentar no Brasil; GMV potencial de R$ 5,3 Bi).
- **SAM (Mercado Endereçável):** **R$ 135M/ano** (90 mil PMEs urbanas em cidades > 100k habitantes nas regiões Sul e Sudeste).
- **SOM (Meta Inicial Piloto):** **R$ 1,46M/ano** (meta de 200 lojas parceiras ativas nos primeiros 18 a 24 meses).

---

## ⏱️ Roteiro do Pitch de 3 Minutos (Para a Apresentação)

### Minuto 0:00 – 0:45 | O Problema & A Dor Real
- **Fala:** *"Boa tarde a todos e aos professores. Vocês sabiam que mais de 20 milhões de toneladas de comida vão para o lixo todo ano no Brasil? Do lado do comerciante de bairro — a padaria da esquina, o hortifrúti da rua — o lojista tem prejuízo diário descartando itens 100% próprios para consumo simplesmente porque a data de validade vence hoje ou amanhã."*
- **Ação:** Projetar a Landing Page do VenceHoje na seção inicial.

### Minuto 0:45 – 1:30 | A Solução VenceHoje & Nosso Diferencial
- **Fala:** *"Para resolver isso criamos o VenceHoje. Diferente de concorrentes como o Food To Save, onde você compra uma 'sacola surpresa' sem saber o que tem dentro, no VenceHoje há transparência cirúrgica: você vê a foto do item, a data e hora limite de retirada e o desconto real de 50% a 70%. Além disso, não cobramos taxas financeiras do comerciante no app: o cliente reserva online gratuitamente e paga direto no caixa da loja, gerando tráfego físico no balcão."*
- **Ação:** Rolar rapidamente pela Landing Page mostrando a tabela de Benchmark e os 4 passos do Canvas.

### Minuto 1:30 – 2:30 | Demonstração Prática ao Vivo (O Ciclo Completo)
- **Passo 1 (Lojista):** Clique no botão **"Lojista"** no topo. Mostre o painel da *Padaria Bella Vista*. Clique em **"Publicar Oferta"**, escolha um item (ex: Bolo artesanal ou Croissant), defina validade para *Hoje* e clique em salvar.
- **Passo 2 (Consumidor):** Clique no botão **"Consumidor"** no topo. Mostre o Radar de Ofertas. Filtre por *"Vence Hoje"*. Localize a oferta recém-criada. Clique em **"Reservar"**, confirme o nome e gere o **Voucher** com código exclusivo (ex: `VH-4821`).
- **Passo 3 (Baixa no Balcão):** Volte para a aba **"Lojista"**. Mostre a nova reserva aparecendo na lista e use o campo **"Validação Rápida no Caixa"** digitando o código do voucher para dar baixa e somar à receita recuperada!

### Minuto 2:30 – 3:00 | Modelo de Negócios & Fechamento
- **Fala:** *"Nosso modelo de receita pós-piloto baseia-se em assinaturas B2B para lojistas que desejam destaque e relatórios preditivos de perdas de estoque. Com um mercado endereçável de 90 mil PMEs e meta de 200 lojas no piloto, o VenceHoje transforma desperdício em lucro e sustentabilidade. Muito obrigado!"*

---

## 🚀 Links da Aplicação no Ar

- **Produção (Vercel):** [https://vencehoje.vercel.app](https://vencehoje.vercel.app)
- **Repositório GitHub:** [https://github.com/jpcamposfraga/vencehoje](https://github.com/jpcamposfraga/vencehoje)

---

## 🛠️ Tecnologias Utilizadas

- **Frontend & Framework:** [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Persistência de Dados:** Camada reativa sobre `localStorage` com suporte a SSR e sementes iniciais realistas
- **Deploy:** [Vercel](https://vercel.com/)

---

## 🚀 Como Executar Localmente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse: [http://localhost:3000](http://localhost:3000)

3. **Executar os testes automatizados do fluxo comercial:**
   ```bash
   npm test
   ```

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```
