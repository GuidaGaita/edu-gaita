# Roadmap de construção: landing page de Eduardo Leopoldino

Escrito em 26/10/2026 e atualizado no mesmo dia, ao fim da construção da entrega 1. Sem prazo fechado. Duas entregas:
a primeira é o MVP publicado no GitHub Pages pro cliente validar; a segunda é a versão completa, com os textos do
currículo, galeria, vídeo (se houver), hospedagem definitiva e domínio próprio.

Cada tarefa tem um "Pronto quando", que é o critério pra marcar a caixa. A spec de referência é
[docs/spec.md](spec.md); os números de seção citados abaixo são dela.

Legenda: `[x]` feito e verificado, `[ ]` a fazer, `[~]` feito mas com verificação pendente.

## Visão geral

| Etapa | O que entrega | Estado |
|---|---|---|
| Fase 0: Fundação | repositório, spec, roadmap, script de fotos, protótipo de cores | feita em 26/10/2026; protótipo aprovado em 26/10/2026 |
| Entrega 1: MVP publicado | hero, serviços, sobre genérico, chamada final, rodapé, botão flutuante, SEO básico, no ar no GitHub Pages | construída e verificada localmente em 26/10/2026; falta publicar (tarefa 1.9) e testar em celular real |
| Entrega 2: Versão completa | textos finais do currículo, galeria, vídeo e depoimentos (se houver), SEO completo, hospedagem definitiva e domínio, entrega ao cliente | a fazer |
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
- [x] Rodar o script para edu-27, edu-32 e edu-40 em todas as larguras (480, 800, 1200, 1600) e nos dois formatos (WebP e AVIF). Feito em 26/10/2026.
- [x] Gerar a imagem de compartilhamento 1200 × 630 a partir de edu-40 (`img/og.jpg`). Feito em 26/10/2026 com `scripts/qa/gerar-imagens.mjs`: nome em cromo à esquerda, gaitas sobre o violão à direita, 114 KB.
- Pronto quando: `img/manifest.json` lista as três fotos (sim), o hero em 1200 px pesa até 250 KB (69 KB em AVIF, 80 KB em WebP) e a imagem OG abre no validador de Open Graph (só dá pra testar com a URL pública: fica pra tarefa 1.9).

### 1.2 Fontes auto-hospedadas
- [x] Baixar Big Shoulders Display e Instrument Sans em WOFF2, subconjunto latino, para `fonts/`. Feito em 26/10/2026 como fonte variável (um arquivo por família: 35 KB e 30 KB), com as licenças OFL e um `fonts/LEIA-ME.md` dizendo como baixar de novo.
- [x] Declarar `@font-face` com `font-display: swap` e `preload` das duas fontes; fontes de reserva do sistema com `size-adjust` medido (Arial Narrow Bold 81,5 %, Impact 93,6 %, Arial Bold 67 %).
- Pronto quando: a página não faz nenhuma requisição a `fonts.googleapis.com` nem `fonts.gstatic.com` (verificado em 26/10/2026: zero requisições externas em cinco larguras) e as fontes somam até 150 KB (65 KB).

### 1.3 Base de estilo
- [x] Tokens CSS em `:root` com os nomes e valores da paleta (spec 7.1) e a escala de tipos (spec 7.2), copiados do protótipo.
- [x] Reset mínimo, largura máxima 1200 px, margens laterais, foco visível (contorno Mel de 2 px, afastamento 3 px), `prefers-reduced-motion`, link "Pular para o conteúdo".
- [x] Componentes: botão de WhatsApp (primário e compacto), botão secundário, sobretítulo, título de seção, linha de serviço com etiqueta "Online".
- Pronto quando: todas as combinações de cor passam no verificador de contraste. Verificado em 26/10/2026 pela auditoria de contraste do Lighthouse na própria página (acessibilidade 100), em vez de uma página de teste separada.

### 1.4 Hero com a assinatura em cromo
- [x] Estrutura em duas colunas no desktop e em coluna única no celular (spec 7.4).
- [x] Nome em duas linhas com o gradiente cromo terminando em âmbar, relevo mínimo e fallback em Cromo sólido.
- [x] Foto edu-27 com `fetchpriority="high"`, `preload` com `imagesrcset`, brilho âmbar atrás e fusão com o fundo pela esquerda e pela base.
- [x] Animação de entrada em sequência, desligada com `prefers-reduced-motion` (verificado: sem animação e sem rolagem suave no modo reduzido). A foto só sobe, sem fade, pra continuar sendo o LCP (spec 7.5).
- Pronto quando: em 390 px, 768 px e 1440 px de largura o nome não quebra em três linhas (verificado em 360, 390, 768, 1024 e 1440: sempre duas linhas), a foto não cobre texto (verificado) e o LCP medido no Lighthouse é a foto, abaixo de 2,5 s (ver 1.10).

### 1.5 Serviços
- [x] Quatro linhas na ordem da spec (aulas, gravações, shows, eventos), com título, texto genérico, etiqueta "Online" nas duas primeiras e botão de WhatsApp com a mensagem daquele serviço (spec 6).
- [x] Hover e foco: fundo Palco, nome em Mel.
- [~] Pronto quando: cada um dos quatro links abre o WhatsApp com a mensagem certa, testado num celular Android e num iPhone. Em 26/10/2026 as nove mensagens foram conferidas no navegador (número e texto batem com a spec, seção 6); o teste em celular real fica pra validação na URL publicada (tarefa 1.9).

### 1.6 Sobre (texto genérico)
- [x] Foto edu-32 em 4:5 e os dois parágrafos genéricos da spec, seção 5, sob o título "Gaita, rock e Brasília".
- Pronto quando: a seção existe e o texto não afirma nada que não esteja confirmado (conferido com a spec, seção 11, em 26/10/2026: só cidade, aulas online e gravações a distância).

### 1.7 Chamada final, rodapé e botão flutuante
- [x] Chamada final com edu-40 escurecida, frase "Vamos colocar gaita nisso?" e botão de WhatsApp.
- [x] Rodapé com "Eduardo Leopoldino · Gaitista · Brasília, DF", número em texto clicável e "© 2026 Eduardo Leopoldino"; comentário no HTML marcando onde entram redes e crédito de fotos.
- [x] Botão flutuante fixo, com área segura do iPhone, que só aparece quando nenhum outro botão de WhatsApp do conteúdo está na tela.
- Pronto quando: o botão flutuante nunca cobre outro botão de WhatsApp (verificado em cinco larguras: escondido no topo, visível no "Sobre", escondido na chamada final) e todos os links do rodapé funcionam.

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
- [x] Testar em 360, 390, 768, 1024 e 1440 px de largura; nada rola na horizontal. Feito em 26/10/2026 com `scripts/qa/qa.mjs` (Edge sem janela): sem rolagem horizontal, sem erro de console, sem requisição que falhe.
- [x] Lighthouse em celular: nota mínima 90 em desempenho, acessibilidade, boas práticas e SEO. Em 26/10/2026, no servidor local: 100, 100, 100 e 100; LCP 1,8 s (elemento: a foto do hero), CLS 0, TBT 30 ms, 253 KB transferidos. Repetir na URL publicada.
- [x] Navegação só por teclado: todo botão e link alcançável, foco visível, ordem lógica. Verificado em 26/10/2026: o primeiro Tab cai no "Pular para o conteúdo" com o contorno Mel; a ordem segue o DOM (barra, hero, quatro serviços, chamada, rodapé, flutuante).
- [x] Leitor de tela: títulos em ordem (H1 nome; H2 serviços com quatro H3; H2 sobre; H2 chamada), `alt` das fotos, rótulos dos botões de WhatsApp começando pelo texto visível e avisando que abrem em nova aba. Conferido pela árvore do DOM e pelo Lighthouse, não com um leitor de tela real.
- [x] Revisão de texto: sem erro de acento, sem afirmação não confirmada. Feita em 26/10/2026.
- [~] Pronto quando: todas as caixas acima marcadas e a URL publicada enviada ao cliente pra validação. Falta a publicação (tarefa 1.9).

## Entrega 2: Versão completa

### 2.1 Textos finais com o currículo
- [ ] Receber o currículo e as respostas das pendências P2 a P6 da spec (redes, fatos da bio, formatos de shows e eventos, vídeo, depoimentos).
- [ ] Reescrever "Sobre" com três ou quatro fatos verificáveis; completar os textos de shows e eventos com os formatos confirmados; revisar o `title` e a `meta description`.
- [ ] Regerar `img/og.jpg` se o texto da imagem mudar (`scripts/qa/gerar-imagens.mjs`).
- [ ] Atualizar a spec: pendências resolvidas viram decisões na seção 12.
- Pronto quando: não sobra nenhum **[A CONFIRMAR]** na página nem na spec.

### 2.2 Galeria
- [ ] Rodar o script para as fotos da galeria (spec, seção 8) e escolher as oito a dez finais.
- [ ] Grade no desktop e faixa com rolagem horizontal no celular, sem lightbox, todas com `loading="lazy"`.
- Pronto quando: a galeria não aumenta o LCP nem o CLS e cada foto tem `alt`.

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
- [ ] Revisar com capturas de tela em celular e desktop: espaçamentos, hover, foco, animação de entrada.
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
- Largura extra de 640 px no script de fotos, pra celulares com tela 2x baixarem menos (o Lighthouse estima 16 a 36 KB por foto).

## Como este roadmap é mantido

- A caixa só é marcada quando o "Pronto quando" da tarefa foi verificado, não quando o código foi escrito.
- Toda decisão nova vai pra seção 12 da spec com a data; toda pendência resolvida sai da seção 11.
- Datas sempre por extenso (dia/mês/ano), nunca "ontem" ou "semana que vem".
