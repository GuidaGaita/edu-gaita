# Roadmap de construção: landing page de Eduardo Leopoldino

Escrito em 26/10/2026 e atualizado em 27/10/2026, quando a entrega 1 ganhou a versão rock (fotos de fundo, cartões de
serviço e animações, no modelo do site GuidaGaita). Sem prazo fechado. Duas entregas: a primeira é o MVP publicado no
GitHub Pages pro cliente validar; a segunda é a versão completa, com os textos do currículo, vídeo (se houver),
hospedagem definitiva e domínio próprio.

Cada tarefa tem um "Pronto quando", que é o critério pra marcar a caixa. A spec de referência é
[docs/spec.md](spec.md); os números de seção citados abaixo são dela.

Legenda: `[x]` feito e verificado, `[ ]` a fazer, `[~]` feito mas com verificação pendente.

## Visão geral

| Etapa | O que entrega | Estado |
|---|---|---|
| Fase 0: Fundação | repositório, spec, roadmap, script de fotos, protótipo de cores | feita em 26/10/2026; protótipo aprovado em 26/10/2026 |
| Entrega 1: MVP publicado | hero, faixa rolante, cartões de serviço, sobre, galeria, chamada final, rodapé, botão flutuante, SEO básico, no ar no GitHub Pages | construída em 26/10/2026, refeita na versão rock em 27/10/2026 e verificada localmente; falta publicar (tarefa 1.9) e testar em celular real |
| Entrega 2: Versão completa | textos finais do currículo, vídeo e depoimentos (se houver), SEO completo, hospedagem definitiva e domínio, entrega ao cliente | a fazer |
| Backlog | o que só entra se o cliente pedir | sem data |

## Fase 0: Fundação (26/10/2026)

- [x] 0.1 Repositório git iniciado na pasta do projeto, com `.gitignore` e `README.md`.
- [x] 0.2 Spec escrita (`docs/spec.md`), com decisões e pendências registradas.
- [x] 0.3 Roadmap escrito (este arquivo).
- [x] 0.4 Script `scripts/otimizar_fotos.py` criado e rodado para as três fotos do protótipo (edu-27, edu-32, edu-40), em WebP e AVIF, larguras 480 a 1600.
- [x] 0.5 Protótipo em `prototipo/index.html` com paleta, tipografia, botões, as quatro linhas de serviço, hero com o nome em cromo, prévia do "Sobre" e a chamada final.
- [x] 0.6 Validar o protótipo com o cliente e anotar ajustes na spec (seção 7) antes de começar a entrega 1.
  Feito em 26/10/2026: protótipo aprovado por quem contratou, sem ajustes na seção 7 (spec, seção 12). Junto vieram três fatos novos, já na spec: cidade Brasília, DF; aulas só online; gravações só a distância.

## Entrega 1: MVP publicado

### 1.1 Fotos otimizadas do MVP
- [x] Rodar o script para as fotos da página em todas as larguras (480, 800, 1200, 1600) e nos dois formatos (WebP e AVIF). Em 26/10/2026: edu-27, edu-32, edu-40. Em 27/10/2026: edu-24, edu-33, edu-38, edu-39 (fundos, com `--qualidade webp=58,avif=40`) e edu-22, edu-11, edu-36, edu-2 (galeria). O `img/manifest.json` lista as onze.
- [x] Gerar a imagem de compartilhamento 1200 × 630 a partir de edu-40 (`img/og.jpg`). Feito em 26/10/2026 com `scripts/qa/gerar-imagens.mjs`: nome em cromo à esquerda, gaitas sobre o violão à direita, 114 KB.
- Pronto quando: o manifest lista as fotos usadas (sim), o hero em 800 px pesa até 250 KB (36 KB em AVIF, 66 KB em WebP) e a imagem OG abre no validador de Open Graph (só dá pra testar com a URL pública: fica pra tarefa 1.9).

### 1.2 Fontes auto-hospedadas
- [x] Baixar Big Shoulders Display e Instrument Sans em WOFF2, subconjunto latino, para `fonts/`. Feito em 26/10/2026 como fonte variável (um arquivo por família: 35 KB e 30 KB), com as licenças OFL e um `fonts/LEIA-ME.md` dizendo como baixar de novo.
- [x] Declarar `@font-face` com `font-display: swap` e `preload` das duas fontes; fontes de reserva do sistema com `size-adjust` medido (Arial Narrow Bold 81,5 %, Impact 93,6 %, Arial Bold 67 %).
- Pronto quando: a página não faz nenhuma requisição a `fonts.googleapis.com` nem `fonts.gstatic.com` (verificado em 27/10/2026: zero requisições externas em cinco larguras) e as fontes somam até 150 KB (65 KB).

### 1.3 Base de estilo
- [x] Tokens CSS em `:root` com os nomes e valores da paleta (spec 7.1) e a escala de tipos (spec 7.2).
- [x] Reset mínimo, largura máxima 1200 px, margens laterais, foco visível (contorno Mel de 2 px, afastamento 3 px), `prefers-reduced-motion`, link "Pular para o conteúdo".
- [x] Componentes: botão de WhatsApp (primário, compacto, bloco e grande), botão secundário, sobretítulo, título de seção, cartão de serviço, moldura, fichas.
- Pronto quando: todas as combinações de cor passam no verificador de contraste. Verificado em 27/10/2026 pela auditoria de contraste do Lighthouse na própria página (acessibilidade 100).

### 1.4 Hero com a assinatura em cromo
- [x] Foto edu-24 cobrindo a seção atrás do véu, com `fetchpriority="high"` e `preload` com `imagesrcset`; luzes de palco e faíscas em canvas (spec 7.4, versão de 27/10/2026).
- [x] Nome em duas linhas com o gradiente cromo terminando em âmbar, relevo mínimo e fallback em Cromo sólido; entra como carimbo.
- [x] Sobretítulo com equalizador, frase palavra por palavra, botões em sequência; tudo desligado com `prefers-reduced-motion` (verificado: sem animação, sem rolagem suave, faíscas e luzes escondidas, nada fica oculto).
- Pronto quando: em 390 px, 768 px e 1440 px de largura o nome não quebra em três linhas (verificado em 360, 390, 768, 1024 e 1440: sempre duas linhas) e o LCP medido no Lighthouse é a foto, abaixo de 2,5 s (2,1 s em 27/10/2026, ver 1.10).

### 1.5 Serviços
- [x] Quatro cartões na ordem da spec (aulas, gravações, shows, eventos), com etiqueta de formato, título, texto, três marcas e botão de WhatsApp com a mensagem daquele serviço (spec 4 e 6). Cartão de aulas com o selo "Comece por aqui".
- [x] Hover: cartão sobe, borda em Mel, título em Mel; fita de cromo e mel correndo no topo.
- [~] Pronto quando: cada um dos quatro links abre o WhatsApp com a mensagem certa, testado num celular Android e num iPhone. Em 27/10/2026 as nove mensagens foram conferidas no navegador (número e texto batem com a spec, seção 6); o teste em celular real fica pra validação na URL publicada (tarefa 1.9).

### 1.6 Sobre (texto genérico)
- [x] Foto edu-32 na moldura inclinada, os dois parágrafos genéricos da spec (seção 5), fichas e botão "Ver serviços", sob o título "Gaita, rock e Brasília"; fundo com a foto edu-27.
- Pronto quando: a seção existe e o texto não afirma nada que não esteja confirmado (conferido com a spec, seção 11: só cidade, aulas online e gravações a distância).

### 1.7 Chamada final, rodapé e botão flutuante
- [x] Chamada final com edu-38 escurecida, sobretítulo "O bis", frase "Vamos colocar gaita nisso?" palavra por palavra e botão grande de WhatsApp.
- [x] Rodapé com "Eduardo Leopoldino · Gaitista · Brasília, DF", número em texto clicável, "© 2026 Eduardo Leopoldino" e a foto edu-39 bem apagada ao fundo; comentário no HTML marcando onde entram redes e crédito de fotos.
- [x] Botão flutuante fixo, com área segura do iPhone, que só aparece quando nenhum outro botão de WhatsApp do conteúdo está na tela.
- Pronto quando: o botão flutuante nunca cobre outro botão de WhatsApp (verificado em cinco larguras) e todos os links do rodapé funcionam.

### 1.8 SEO básico e metadados
- [x] `title`, `meta description` (147 caracteres), `canonical`, `lang="pt-BR"`, Open Graph e Twitter Card com `img/og.jpg`, com a URL prevista do GitHub Pages (spec, seção 9).
- [x] Favicon SVG (letra E estampada em cromo), PNG 32, 192 e 512, `apple-touch-icon`, `site.webmanifest`.
- [x] `robots.txt` e `sitemap.xml`.
- [~] Pronto quando: a prévia de compartilhamento no WhatsApp mostra título, descrição e a imagem. Só dá pra testar com a URL pública (tarefa 1.9).

### 1.9 Publicação no GitHub Pages (a configurar junto com quem contratou, pedido de 26/10/2026)
- [ ] Criar o repositório no GitHub (conta já autenticada na máquina: GuidaGaita; nome sugerido `edu-gaita`) e enviar o branch `main`. Num plano gratuito o Pages exige repositório público.
- [ ] Ativar o Pages em Settings, Pages, "Deploy from a branch", branch `main`, pasta `/ (root)`. O `.nojekyll` já está na raiz.
- [ ] Confirmar a URL publicada. Se for diferente de `https://guidagaita.github.io/edu-gaita/`, corrigir `canonical`, `og:url`, `og:image` (em `index.html`), `robots.txt` e `sitemap.xml`.
- [ ] Testar a prévia de compartilhamento mandando a URL num chat do WhatsApp; testar os nove botões num Android e num iPhone.
- Pronto quando: a URL abre a página em celular e desktop, a prévia do WhatsApp mostra título, descrição e imagem, e os botões abrem a conversa com a mensagem certa.

### 1.10 Qualidade da entrega 1
- [x] Testar em 360, 390, 768, 1024 e 1440 px de largura; nada rola na horizontal. Refeito em 27/10/2026 com `scripts/qa/qa.mjs` (Edge sem janela): sem rolagem horizontal, sem erro de console, sem requisição que falhe, nenhum bloco de revelação fica escondido depois de rolar a página e a galeria.
- [x] Lighthouse em celular: nota mínima 90 em desempenho, acessibilidade, boas práticas e SEO. Em 27/10/2026, no servidor local: 99, 100, 100 e 100; LCP 2,1 s (elemento: a foto do hero), CLS 0, TBT 80 ms, 318 KB na primeira carga. Transferência medida no QA: 164 KB ao abrir e 414 KB depois de rolar tudo, no celular de 390 px; 304 KB e 685 KB no desktop de 1440 px. Repetir na URL publicada.
- [x] Navegação só por teclado: todo botão e link alcançável, foco visível, ordem lógica. Verificado em 27/10/2026: o primeiro Tab cai no "Pular para o conteúdo" com o contorno Mel; a ordem segue o DOM (barra, hero, quatro cartões, sobre, chamada, rodapé, flutuante).
- [x] Leitor de tela: títulos em ordem (H1 nome; H2 serviços com quatro H3; H2 sobre; H2 galeria; H2 chamada), `alt` das fotos das molduras, fundos e faixa rolante escondidos com `aria-hidden`, rótulos dos botões de WhatsApp começando pelo texto visível e avisando que abrem em nova aba. Conferido pela árvore do DOM e pelo Lighthouse, não com um leitor de tela real.
- [x] Revisão de texto: sem erro de acento, sem afirmação não confirmada. Refeita em 27/10/2026 com os textos dos cartões, das fichas e da galeria.
- [~] Pronto quando: todas as caixas acima marcadas e a URL publicada enviada ao cliente pra validação. Falta a publicação (tarefa 1.9).

### 1.11 Versão rock (pedido de 27/10/2026: "tá genérico, queria rock n roll")
Modelo: o site GuidaGaita, de quem contratou (pasta `landing-page-vendas`, decisão registrada na spec, seção 12).
- [x] Foto do ensaio atrás de cada seção, com véu, "foto que revela" e deriva ao rolar (spec 7.4): hero edu-24, serviços edu-33, sobre edu-27, chamada final edu-38, rodapé edu-39.
- [x] Serviços em cartões no modelo dos cartões de oferta: fita animada, selo, etiqueta, marcas, botão em bloco (spec 4 e 7.4).
- [x] Vocabulário de revelação ao rolar (padrão, palavras, carimbo, cortina, de lado, lista que se marca), faixa rolante, grão e vinheta, faíscas e luzes de palco no hero, equalizador, reflexo nos botões (spec 7.5).
- [x] Galeria com quatro fotos em molduras inclinadas (adiantada da entrega 2).
- [x] Fundos comprimidos mais forte (`--qualidade webp=58,avif=40`) pra o LCP voltar pra baixo de 2,5 s: antes 2,8 s com a foto do hero a 87 KB, depois 2,1 s com 36 KB.
- Pronto quando: a bateria da tarefa 1.10 passa de novo (passou em 27/10/2026) e quem contratou aprova as capturas de `docs/capturas/` (entrega1-desktop.jpg e entrega1-celular.jpg, refeitas em 27/10/2026).

## Entrega 2: Versão completa

### 2.1 Textos finais com o currículo
- [ ] Receber o currículo e as respostas das pendências P2 a P6 da spec (redes, fatos da bio, formatos de shows e eventos, vídeo, depoimentos).
- [ ] Reescrever "Sobre" com três ou quatro fatos verificáveis e trocar as fichas pelos fatos; completar os cartões de shows e eventos com os formatos confirmados; revisar o `title` e a `meta description`.
- [ ] Regerar `img/og.jpg` se o texto da imagem mudar (`scripts/qa/gerar-imagens.mjs`).
- [ ] Atualizar a spec: pendências resolvidas viram decisões na seção 12.
- Pronto quando: não sobra nenhum **[A CONFIRMAR]** na página nem na spec.

### 2.2 Galeria
- [x] Entrou na entrega 1 em 27/10/2026, com quatro fotos (edu-22, edu-11, edu-36, edu-2), grade no desktop e faixa com rolagem horizontal no celular, todas com `loading="lazy"` e `alt`.
- [ ] Se o cliente quiser mais fotos, escolher até dez entre as da spec (seção 8) e rodar o script pra elas.
- Pronto quando: a galeria não aumenta o LCP nem o CLS (verificado em 27/10/2026: LCP continua a foto do hero, CLS 0).

### 2.3 Vídeo (só se o cliente tiver)
- [ ] Incorporar um vídeo do YouTube com fachada leve: a capa carrega como imagem e o player só entra ao clicar.
- Pronto quando: sem clique, a página não faz nenhuma requisição ao YouTube.

### 2.4 Depoimentos (só se forem reais e autorizados)
- [ ] Dois ou três depoimentos curtos com nome e contexto (aluno, noivo, produtor).
- Pronto quando: o cliente confirmou por escrito a autorização de cada pessoa citada.

### 2.5 SEO completo
- [ ] JSON-LD de `Person` com `jobTitle`, `telephone`, `sameAs` e cidade.
- [ ] Texto da página com a cidade nos lugares naturais (hero, sobre, rodapé), sem repetição forçada.
- Pronto quando: o teste de dados estruturados do Google não acusa erro.

### 2.6 Hospedagem definitiva e domínio próprio
- [ ] Decidir com o cliente: GitHub Pages com domínio próprio ou Vercel (spec, seção 11, pendência P7). Se for Vercel, voltam os cabeçalhos de cache longo e de segurança da spec antiga (`vercel.json`).
- [ ] Cliente registra o domínio (sugestão: `.com.br` pelo registro.br) ou aponta um que já tenha.
- [ ] DNS apontado, HTTPS ativo, redirecionamento de `www` pra raiz (ou o contrário, uma só forma).
- [ ] `canonical`, `og:url`, `og:image`, `robots.txt` e `sitemap.xml` atualizados pro domínio final.
- Pronto quando: o domínio abre com cadeado e a URL do GitHub Pages redireciona pra ele (ou é desligada).

### 2.7 Refinamento visual
- [ ] Revisar com capturas de tela em celular e desktop: espaçamentos, hover, foco, animações.
- [ ] Aplicar a regra "tira um acessório": cortar qualquer enfeite que não sirva ao objetivo da página.
- Pronto quando: quem contratou aprova as capturas e a spec, seção 7, bate com o que está no ar.

### 2.8 Qualidade final e entrega
- [ ] Repetir a bateria da tarefa 1.10 no domínio final, mais o teste em celular real da tarefa 1.5.
- [ ] Escrever no `README.md` como trocar um texto, uma foto e o número de WhatsApp, pra manutenção futura.
- [ ] Entregar ao cliente: URL final, acesso ao repositório (se ele quiser) e esse guia.
- Pronto quando: cliente confirma que recebeu e que o WhatsApp está recebendo as mensagens com o texto certo.

## Backlog (só se o cliente pedir)

- Evento de clique nos botões de WhatsApp (medição), com aviso de cookies se a ferramenta exigir (pendência P8 da spec).
- Faixa com últimos posts do Instagram.
- Versão em inglês.
- Página de agenda de shows.
- Player de áudio próprio com trechos de gravações.
- Largura extra de 640 px no script de fotos, pra celulares com tela 2x baixarem menos.

## Como este roadmap é mantido

- A caixa só é marcada quando o "Pronto quando" da tarefa foi verificado, não quando o código foi escrito.
- Toda decisão nova vai pra seção 12 da spec com a data; toda pendência resolvida sai da seção 11.
- Datas sempre por extenso (dia/mês/ano), nunca "ontem" ou "semana que vem".
