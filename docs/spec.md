# Especificação: landing page de Eduardo Leopoldino, gaitista

Versão 0.2, escrita em 26/10/2026 e revisada no mesmo dia, depois da aprovação do protótipo. Status: aprovada em
conversa com quem contratou o projeto; entrega 1 construída, aguardando publicação.
Os textos da página ficam genéricos até chegar o currículo do cliente (ver seção 11, Premissas e pendências).
Fatos confirmados em 26/10/2026: o cliente é de Brasília, DF; as aulas são só online; as gravações são só a distância.

## 1. Resumo

Página única (landing page), em português do Brasil, para Eduardo Leopoldino, gaitista com foco em gaita rock.
A página tem um trabalho só: fazer quem chega mandar mensagem no WhatsApp pedindo um dos quatro serviços.
Sem formulário, sem CMS, sem blog, sem área de login.

## 2. Objetivo e como medir

- Objetivo: cliques nos botões de WhatsApp. Cada botão abre uma conversa com mensagem pré-preenchida que
  identifica o serviço, então o cliente sabe de onde veio o contato sem nenhuma ferramenta extra.
- Medição no lançamento: nenhuma. Sem analytics, sem cookies, sem script de terceiros.
- Depois, se o cliente quiser números: um evento de clique por botão (ver pendências). Só aí entra aviso de cookies, se a ferramenta exigir.

## 3. Público

| Quem chega | O que precisa ver pra mandar mensagem | Serviço |
|---|---|---|
| Quem quer aprender gaita: adulto começando do zero ou quem já toca e quer evoluir | que vai ser bem ensinado, em que formato, e que é fácil começar | Aulas particulares |
| Artistas, bandas e produtores que querem gaita numa música | o som dele e a garantia de que entrega a gravação pronta | Gravações |
| Bares, festivais, bandas e produtores de show | repertório, energia de palco, como contratar | Shows |
| Quem organiza casamento, aniversário ou evento corporativo | que a música ao vivo funciona na festa e como contratar | Eventos particulares |

## 4. Serviços: ordem e textos

Ordem fixa, decidida em 26/10/2026 por prioridade comercial: aulas primeiro, gravações em segundo, shows em terceiro, eventos particulares por último.

Os textos abaixo são a versão genérica. Tudo marcado com **[A CONFIRMAR]** depende do currículo e das respostas do cliente; nada que não esteja confirmado pode virar afirmação na página.

### 4.1 Aulas particulares

- Título: **Aulas particulares**
- Formato: só online (confirmado em 26/10/2026). A linha leva a etiqueta "Online" ao lado do título.
- Texto: "Para começar do zero ou destravar o que você já toca. Aula online, ao vivo, de onde você estiver."
- **[A CONFIRMAR]**: se ensina cromática, público (adultos, crianças), duração e frequência, plataforma da videochamada.
- Botão: "Quero fazer aula", abre o WhatsApp com a mensagem de aulas (seção 6).

### 4.2 Gravações

- Título: **Gravações**
- Formato: só a distância (confirmado em 26/10/2026): quem contrata manda a guia, ele grava e devolve os takes. A linha leva a etiqueta "Online".
- Texto: "Gaita na sua música: solos, bases e arranjos gravados a distância. Você manda a guia, recebe os takes."
- **[A CONFIRMAR]**: prazo típico; formatos de entrega (WAV, stems); se cobra por música ou por take.
- Botão: "Quero gaita na minha música", abre o WhatsApp com a mensagem de gravações.

### 4.3 Shows

- Título: **Shows**
- Texto: "Repertório de rock e blues para bares, festivais e bandas que querem gaita no palco."
- **[A CONFIRMAR]**: formatos (solo, com banda própria, como convidado), estrutura necessária, raio de deslocamento a partir de Brasília.
- Botão: "Quero contratar um show", abre o WhatsApp com a mensagem de shows.

### 4.4 Eventos particulares

- Título: **Eventos particulares**
- Texto: "Música ao vivo com gaita para casamentos, aniversários e eventos corporativos."
- **[A CONFIRMAR]**: formatos (solo, duo, com violão), duração dos sets, se toca repertório pedido pelo contratante.
- Botão: "Quero gaita no meu evento", abre o WhatsApp com a mensagem de eventos.

Regras dos textos de serviço: uma frase de efeito e, no máximo, uma de detalhe. Sem preço na página (decisão de 26/10/2026). Sem ícone genérico ao lado de cada serviço. Sem numeração 01/02/03: a ordem é prioridade comercial, não uma sequência de passos. A etiqueta "Online" (texto pequeno em Mel, com borda de 1 px, cantos de 4 px) só aparece nos serviços que acontecem a distância; onde não há etiqueta, o serviço é ao vivo. Sem etiqueta "Presencial" nem "Ao vivo", pra não virar enfeite (decisão de 26/10/2026).

## 5. Estrutura da página

Uma página, rolagem vertical, nesta ordem:

| # | Seção | O que tem | Entrega |
|---|---|---|---|
| 0 | Barra superior | Nome em texto, à esquerda; botão compacto "WhatsApp", à direita. Fica fixa no topo e some ao rolar pra baixo, volta ao rolar pra cima. | 1 |
| 1 | Hero | Sobretítulo "Gaitista de rock · Brasília, DF", nome em cromo (assinatura visual), uma frase de posicionamento, botão primário de WhatsApp e botão secundário "Ver serviços". Foto edu-27 à direita com brilho âmbar atrás. | 1 |
| 2 | Serviços | Sobretítulo "Serviços", título "O que a gaita pode fazer pelo seu projeto", linha de apoio "Escolhe o que você precisa e chama no WhatsApp. A conversa já começa com o assunto certo." Os quatro serviços da seção 4, em linhas (não em cards), cada um com seu botão de WhatsApp. | 1 |
| 3 | Sobre | Sobretítulo "Sobre", título "Gaita, rock e Brasília", foto edu-32 e texto curto de apresentação. Genérico na entrega 1, com fatos do currículo na entrega 2. | 1 (texto genérico), 2 (texto final) |
| 4 | Galeria | Oito a dez fotos do ensaio, em grade no desktop e faixa com rolagem horizontal no celular. Sem lightbox. | 2 |
| 5 | Vídeo | Um vídeo do YouTube incorporado com fachada leve (carrega o player só ao clicar). Só entra se o cliente tiver vídeo. | 2 |
| 6 | Depoimentos | Dois ou três depoimentos curtos, só se forem reais e autorizados. | 2 |
| 7 | Chamada final | Fundo com a foto edu-40 (gaitas sobre o violão) escurecida; frase "Vamos colocar gaita nisso?" e botão de WhatsApp. | 1 |
| 8 | Rodapé | "Eduardo Leopoldino · Gaitista · Brasília, DF", número de WhatsApp em texto clicável, redes sociais **[A CONFIRMAR]**, crédito de fotos **[A CONFIRMAR]**, "© 2026 Eduardo Leopoldino". | 1 |
| F | Botão flutuante | Botão de WhatsApp fixo no canto inferior direito, visível sempre que nenhum outro botão de WhatsApp do conteúdo está na tela (seção 6). | 1 |

Sobretítulo do hero: "Gaitista de rock · Brasília, DF" (cidade confirmada em 26/10/2026).

Frase de posicionamento do hero: "Aulas online, gravações a distância, shows e eventos particulares. Gaita com a energia do rock." A frase diz logo que aulas e gravações não dependem da cidade de quem lê.

Texto genérico do "Sobre" (entrega 1): "Eduardo Leopoldino é gaitista com foco em rock, de Brasília, DF. Toca gaita diatônica e cromática, dá aulas, grava para outros artistas e leva a gaita para palcos e eventos." Segundo parágrafo: "As aulas e as gravações acontecem online, para qualquer cidade. Shows e eventos, ao vivo." Na entrega 2 esse parágrafo é trocado por três ou quatro fatos verificáveis do currículo: anos tocando, com quem tocou ou gravou, formação.

Voz dos textos: informal, direta, sem gíria forçada e sem superlativos ("o melhor", "único"). Verbo no imperativo nos botões, dizendo o que acontece ("Chamar no WhatsApp", nunca "Enviar"). Sempre o mesmo nome pra mesma ação em toda a página.

## 6. WhatsApp

- Número: +55 61 98108-0310.
- Link base: `https://wa.me/5561981080310`.
- Todo botão abre em nova aba (`target="_blank" rel="noopener"`), com `aria-label` dizendo "Abrir conversa no WhatsApp sobre aulas" e assim por diante.

Mensagens pré-preenchidas (vão no parâmetro `text`, codificadas pra URL):

| Botão | Mensagem |
|---|---|
| Barra superior, hero, chamada final, botão flutuante | Oi, Eduardo! Vi seu site e quero saber mais sobre o seu trabalho com gaita. |
| Aulas particulares | Oi, Eduardo! Quero saber mais sobre as aulas particulares de gaita. |
| Gravações | Oi, Eduardo! Quero saber sobre gravação de gaita para um projeto. |
| Shows | Oi, Eduardo! Quero saber sobre contratar um show. |
| Eventos particulares | Oi, Eduardo! Quero saber sobre gaita ao vivo em um evento particular. |

Exemplo de link completo (aulas):
`https://wa.me/5561981080310?text=Oi%2C%20Eduardo!%20Quero%20saber%20mais%20sobre%20as%20aulas%20particulares%20de%20gaita.`

Botão flutuante: 56 px de altura, fundo verde WhatsApp (#25D366), ícone oficial do WhatsApp e, no desktop, o texto "Chamar no WhatsApp"; no celular só o ícone. É o único botão com cantos totalmente arredondados, pra ser reconhecido como o balão de WhatsApp que as pessoas já conhecem. Respeita a área segura do iPhone (`env(safe-area-inset-bottom)`). Não cobre nenhum outro botão de WhatsApp: com JS, ele só aparece quando nenhum botão de WhatsApp do conteúdo (hero, serviços, chamada final) está na tela; sem JS, fica sempre visível. Regra ampliada em 26/10/2026, na construção, pra valer também nas linhas de serviço.

## 7. Direção visual: "Cromo e mel sobre veludo"

Tudo sai do que está nas fotos do ensaio: o azul-escuro da camisa de veludo cotelê, o cromo das gaitas, a madeira cor de mel do violão e a luz dourada de fim de tarde. Tema escuro, único (sem versão clara).

### 7.1 Paleta

| Nome | Hex | Uso |
|---|---|---|
| Veludo | `#14171D` | fundo da página. Azul-escuro do cotelê; nunca preto puro |
| Palco | `#1F232B` | superfícies elevadas: barra superior, linhas de serviço em hover, caixas |
| Mel | `#E39A3A` | acento: sobretítulos, brilho atrás da foto do hero, botão secundário, foco de teclado |
| Mel queimado | `#B8701A` | hover e sombra do acento |
| Cromo | `#D7DADE` | títulos; a versão em gradiente (`#F7F8F9` em cima, `#A3A9AF` no meio, `#E39A3A` na base) é só pro nome no hero |
| Creme | `#ECE6DA` | texto corrido. Branco da camiseta, levemente quente |
| Cinza-cromo | `#8E949A` | texto secundário, legendas, bordas |
| WhatsApp | `#25D366` com texto `#0B1A10` | só nos botões de WhatsApp. É o único verde de interface da página, pra o botão ser inconfundível |

Contraste (WCAG 2.2 AA, mínimo 4,5:1 em texto normal): Creme sobre Veludo ≈ 14:1; Cromo sobre Veludo ≈ 12,8:1; Cinza-cromo sobre Veludo ≈ 5,8:1; Mel sobre Veludo ≈ 7,6:1; texto `#0B1A10` sobre WhatsApp ≈ 9:1. Todos passam.

### 7.2 Tipografia

Duas famílias, auto-hospedadas em WOFF2 (uma fonte variável por família, subconjunto latino, 65 KB no total), `font-display: swap`, com fontes de reserva do sistema de métrica ajustada (`size-adjust`) pra o nome não saltar enquanto a Big Shoulders carrega:

- **Big Shoulders Display**, fonte variável no eixo de peso 600 a 900 (a página usa 600, 800 e 900): nome, títulos de seção, nomes dos serviços, sobretítulos e números. Condensada e pesada, cara de cartaz de show. Sempre em caixa alta nos títulos.
- **Instrument Sans**, fonte variável no eixo de peso 400 a 600 (a página usa 400 e 600): texto corrido, botões, rodapé.

Escala (tamanhos fluidos com `clamp`):

| Papel | Fonte | Tamanho | Observações |
|---|---|---|---|
| Nome no hero | Big Shoulders Display 900 | `clamp(3.5rem, 9.5vw, 8.5rem)` | duas linhas, entrelinha 0,88, caixa alta, tratamento cromo |
| Título de seção | Big Shoulders Display 800 | `clamp(2.25rem, 5vw, 4rem)` | caixa alta, cor Cromo |
| Nome de serviço | Big Shoulders Display 800 | `clamp(1.75rem, 3vw, 2.5rem)` | caixa alta, cor Cromo; Mel em hover |
| Sobretítulo | Big Shoulders Display 600 | `0.95rem` | caixa alta, espaçamento 0,12em, cor Mel |
| Corpo | Instrument Sans 400 | `1.0625rem`, entrelinha 1,6 | cor Creme, medida máxima 60 caracteres |
| Secundário | Instrument Sans 400 | `0.9375rem` | cor Cinza-cromo |
| Botão | Instrument Sans 600 | `1rem` | caixa normal |

### 7.3 Assinatura: o nome estampado no cromo

O nome "EDUARDO LEOPOLDINO" no hero é a única coisa que brilha na página. Tratamento: gradiente vertical de cromo
(claro em cima, cinza no meio) que termina numa faixa âmbar na base das letras, como o cromo das gaitas refletindo a
madeira do violão nas fotos edu-40 e edu-41. Um relevo mínimo (1 px de luz em cima, sombra curta embaixo) dá o efeito de
letra estampada na placa da gaita. Cada linha do nome recebe o gradiente inteiro.

Regras: sem "linha de horizonte" dura no meio da letra (efeito cromo dos anos 80), sem bisel 3D, sem animação de brilho
passando. Nenhum outro texto da página usa o tratamento. Em navegador sem suporte a `background-clip: text`, o nome fica
em Cromo sólido.

O divisor com os dez furos da gaita foi considerado e cortado em 26/10/2026: a assinatura já é o elemento marcante.

### 7.4 Layout

Largura máxima do conteúdo: 1200 px. Margem lateral: 24 px no celular, 48 px no desktop. Grade de 12 colunas só nas
seções que precisam (hero, sobre). Cantos: raio 4 px em botões e caixas; o botão flutuante é a única exceção (seção 6).

Hero no desktop (a partir de 900 px):

```
+---------------------------------------------------------------+
| EDUARDO LEOPOLDINO                               [ WhatsApp ] |  barra
+--------------------------------+------------------------------+
| GAITISTA DE ROCK               |          .. brilho ambar ..  |
|                                |      +---------------------+ |
| EDUARDO                        |      | edu-27: mao         | |
| LEOPOLDINO      (cromo)        |      | segurando a gaita   | |
|                                |      | cromatica, sangra   | |
| Aulas, gravacoes, shows e      |      | pela borda direita  | |
| eventos particulares. Gaita    |      | e se funde ao fundo | |
| com a energia do rock.         |      | pela esquerda       | |
|                                |      +---------------------+ |
| [Chamar no WhatsApp] [Ver servicos]                           |
+--------------------------------+------------------------------+
```

Hero no celular: sobretítulo, nome, frase e botões em coluna; a foto vem abaixo dos botões, com altura de 60 vh, e o
brilho âmbar continua atrás dela.

Serviços: quatro linhas separadas por fio de 1 px em Cinza-cromo a 30 %, como a lista de músicas de um setlist.
Em cada linha, no desktop: nome do serviço (coluna de 4), texto (coluna de 5), botão (coluna de 3, alinhado à direita).
No celular tudo empilha. Em hover, a linha ganha fundo Palco e o nome passa a Mel.

```
SERVICOS
-----------------------------------------------------------------
AULAS PARTICULARES    Para comecar do zero ou...   [Quero fazer aula]
-----------------------------------------------------------------
GRAVACOES             Gaita na sua musica...       [Quero gaita na minha musica]
-----------------------------------------------------------------
```

Sobre: foto edu-32 à esquerda (5 colunas, proporção 4:5), texto à direita (6 colunas, com uma coluna de respiro).

Chamada final: faixa de altura mínima 60 vh com edu-40 ao fundo, escurecida com Veludo a 70 %, texto e botão centralizados.

### 7.5 Movimento

Um momento orquestrado e mais nada: ao carregar, o sobretítulo, o nome, a frase, os botões e a foto do hero sobem 12 px e
aparecem em sequência (80 ms de intervalo, 500 ms cada). Botões: 150 ms de transição em cor e um deslocamento de 1 px pra
cima em hover. Linhas de serviço: 200 ms na cor de fundo. Com `prefers-reduced-motion: reduce`, nada se move.

Exceção decidida em 26/10/2026: a foto do hero só sobe os 12 px, sem fade. O navegador tira da medição de LCP qualquer
elemento que começa com opacidade 0; com a foto apagada na primeira pintura, o LCP passava a ser o nome na barra superior.
Com a foto visível desde o início, o LCP medido é ela, que é o que a página realmente mostra de maior.

### 7.6 O que não fazer

- Preto puro de fundo, neon, verde ácido fora do botão de WhatsApp.
- Texturas de estoque: grunge, fumaça, clipart de guitarra, pauta musical.
- Cards com ícone genérico pra cada serviço; marcadores numerados; emoji nos textos.
- Fotos com filtro pesado. Só é permitido escurecer a foto de fundo da chamada final.

## 8. Fotos

Origem: 42 arquivos JPG do ensaio, 4000 × 6000 px, 10 a 23 MB cada, fora do repositório
(pasta local de quem desenvolve). Fotos feitas pela equipe do projeto, com direitos liberados para o site.
Os originais nunca entram no repositório nem no site.

| Onde | Foto | Corte | Entrega |
|---|---|---|---|
| Hero | edu-27 | retrato inteiro, sangrando pela direita; foco na mão e na gaita cromática | 1 |
| Sobre | edu-32 | retrato 4:5, gaita no bolso da camisa | 1 |
| Chamada final (fundo) | edu-40 | gaitas sobre o violão; no desktop, faixa larga pela região das gaitas | 1 |
| Imagem de compartilhamento (Open Graph) | edu-40 | 1200 × 630: nome em cromo à esquerda, foto à direita com a mesma fusão do hero; gerada por captura de um HTML (`scripts/qa/og.html`) e gravada em `img/og.jpg` (114 KB) | 1 |
| Galeria | edu-22, edu-21, edu-24, edu-35, edu-14, edu-31, edu-28, edu-37, edu-41 | 3:4 | 2 |

Pipeline (`scripts/otimizar_fotos.py`, Python com Pillow): lê a pasta de origem, corrige orientação pelo EXIF, remove
os metadados, redimensiona para as larguras 480, 800, 1200 e 1600 px e grava WebP (qualidade 78) e AVIF (qualidade 60)
em `img/`, mais um `img/manifest.json` com largura e altura de cada arquivo.

Resultado medido em 26/10/2026: edu-27 em 1200 px ficou com 80 KB em WebP e 69 KB em AVIF, bem abaixo do orçamento de 250 KB do hero.

No HTML: `<picture>` com fonte AVIF, fonte WebP e `img` com `srcset`, `sizes`, `width` e `height` (evita salto de layout).
Hero com `fetchpriority="high"` e `preload`; todas as outras com `loading="lazy"` e `decoding="async"`.

## 9. Requisitos técnicos

- **Stack**: HTML, CSS e JavaScript puros. Sem framework, sem pré-processador, sem etapa de build pro HTML. O JS é opcional
  e pequeno: esconder a barra ao rolar e mostrar o botão flutuante só quando nenhum outro botão de WhatsApp está na tela.
  A animação de entrada do hero é só CSS. A página funciona inteira sem JS.
- **Fontes**: auto-hospedadas em `fonts/`, uma fonte variável por família (2 arquivos WOFF2, 65 KB medidos em
  26/10/2026; orçamento de 150 KB). `preload` das duas, porque as duas aparecem acima da dobra. Origem e licenças em
  `fonts/LEIA-ME.md`.
- **Orçamento de desempenho** (Lighthouse em celular, rede "Slow 4G"): LCP até 2,5 s; CLS abaixo de 0,05; INP abaixo de
  200 ms; imagem do hero até 250 KB na largura de 1200 px; primeira carga até 1,2 MB no total. Nota mínima 90 nas quatro
  categorias do Lighthouse.
- **Acessibilidade** (WCAG 2.2 AA): contrastes da seção 7.1; foco de teclado visível (contorno Mel de 2 px com 3 px de
  afastamento); marcos semânticos (`header`, `main`, `section` com título, `footer`); ordem de títulos sem pulo;
  `alt` descritivo em toda foto; alvos de toque de no mínimo 44 × 44 px; `prefers-reduced-motion` respeitado;
  `lang="pt-BR"`.
- **SEO**: `title` "Eduardo Leopoldino · Gaitista · Aulas online, gravações e shows"; `meta description` de até
  155 caracteres; `canonical`; Open Graph e Twitter Card com a imagem da seção 8; favicon (SVG, PNG 192 e 512,
  `apple-touch-icon`); `robots.txt` e `sitemap.xml`; dados estruturados JSON-LD de `Person` (com `jobTitle`
  "Gaitista", `telephone`, `sameAs` das redes) na entrega 2, quando houver cidade e redes confirmadas.
- **Hospedagem da validação** (decisão de 26/10/2026): GitHub Pages, publicado da raiz do branch `main`, com
  `.nojekyll`. URL prevista: `https://guidagaita.github.io/edu-gaita/` (premissa: conta do GitHub já autenticada na
  máquina de quem desenvolve e nome da pasta do projeto; confirmar ao publicar e corrigir `canonical`, Open Graph,
  `robots.txt` e `sitemap.xml` se mudar). Como o site fica numa subpasta, todos os caminhos do HTML são relativos.
  O Pages não aceita cabeçalhos HTTP próprios: cache longo e cabeçalhos de segurança ficam pra hospedagem definitiva
  (entrega 2, junto do domínio). No plano gratuito do GitHub, o Pages exige repositório público: tudo que está no
  repositório (spec, roadmap, fotos otimizadas) fica visível. O `robots.txt` só vale na raiz do domínio, então em
  `*.github.io/edu-gaita/` ele é ignorado; o protótipo continua protegido pelo `noindex` dele.
- **Compatibilidade**: duas últimas versões de Chrome, Edge, Firefox e Safari; iOS Safari 15 ou mais novo; Android Chrome.
- **Privacidade (LGPD)**: sem cookies, sem script de terceiros, sem fonte carregada do Google. O único dado que sai da
  página é o clique no link do WhatsApp, feito pelo próprio visitante.

Estrutura do repositório:

```
edu-gaita/
  docs/            spec.md, roadmap.md
  scripts/         otimizar_fotos.py
  img/             fotos otimizadas + manifest.json (geradas, versionadas)
  fonts/           WOFF2 auto-hospedadas, licenças e LEIA-ME (entrega 1)
  prototipo/       protótipo de cores, fontes e hero
  index.html       a página (entrega 1)
  css/estilo.css   tokens, reset, tipografia, seções (entrega 1)
  js/pagina.js     comportamentos opcionais (entrega 1)
  site.webmanifest, robots.txt, sitemap.xml, .nojekyll   metadados e marcador do GitHub Pages (entrega 1)
  scripts/qa/      verificação automática (larguras, comportamento, Lighthouse) e geração de og.jpg e ícones, em Node
```

## 10. Fora do escopo

CMS ou painel de edição; blog; formulário de contato; agenda ou calendário de datas; pagamento online; loja;
versão em outro idioma; app; integração com Instagram ou Spotify além de links no rodapé; player de áudio próprio.

## 11. Premissas e pendências

| # | Item | Premissa adotada até resposta | Quem resolve |
|---|---|---|---|
| P2 | Redes sociais (Instagram, YouTube, Spotify) | nenhuma listada; rodapé sem redes | cliente |
| P3 | Fatos da bio: anos tocando, bandas e artistas, formação | parágrafo genérico da seção 5 | cliente, via currículo |
| P4 | Formatos de shows e eventos (solo/banda, duração dos sets, deslocamento) | textos sem promessa de formato; aulas e gravações já confirmadas como online | cliente |
| P5 | Vídeo e áudio dele tocando | sem seção de vídeo na entrega 1 | cliente |
| P6 | Depoimentos | sem seção de depoimentos | cliente |
| P7 | Hospedagem definitiva e domínio | validação no GitHub Pages; depois, Pages com domínio próprio ou Vercel, a decidir; domínio `.com.br` pelo registro.br quando o cliente quiser | quem desenvolve e cliente |
| P8 | Analytics | nenhum no lançamento | cliente, depois do lançamento |
| P9 | Crédito das fotos no rodapé | a definir; os direitos estão liberados | quem desenvolve |
| P10 | Preço na página | não mostra (decidido em 26/10/2026) | fechado |

## 12. Decisões registradas

| Data | Decisão |
|---|---|
| 26/10/2026 | Página única em português, sem formulário: WhatsApp é o único canal de contato. |
| 26/10/2026 | Ordem dos serviços: aulas particulares, gravações, shows, eventos particulares. |
| 26/10/2026 | Nome na página: "Eduardo Leopoldino". |
| 26/10/2026 | Número de WhatsApp: +55 61 98108-0310, um só pra todos os botões, mensagem diferente por serviço. |
| 26/10/2026 | Sem preço na página. |
| 26/10/2026 | Textos genéricos até o currículo chegar; nada inventado sobre o cliente. |
| 26/10/2026 | Direção visual "Cromo e mel sobre veludo": tema escuro, paleta da seção 7.1, Big Shoulders Display + Instrument Sans, nome em cromo como assinatura, edu-27 no hero. |
| 26/10/2026 | Divisor com os dez furos da gaita: cortado. |
| 26/10/2026 | Stack estático puro; fotos otimizadas por script Python com Pillow (já disponível na máquina), sem Node. |
| 26/10/2026 | Duas entregas: MVP publicado em URL temporária, depois versão completa. Sem prazo. |
| 26/10/2026 | Protótipo de cores e hero feito antes da construção, pra validar a direção visual. |
| 26/10/2026 | Protótipo aprovado por quem contratou ("adorei a paleta"); entrega 1 liberada sem ajustes na seção 7. |
| 26/10/2026 | Cidade confirmada: Brasília, DF. Entra no sobretítulo do hero, no "Sobre", no rodapé e na `meta description`. |
| 26/10/2026 | Aulas particulares são só online; gravações são só a distância. Etiqueta "Online" nessas duas linhas de serviço. |
| 26/10/2026 | Validação da entrega 1 pelo GitHub Pages, configurado junto com quem contratou; hospedagem definitiva e domínio ficam pra entrega 2. |
| 26/10/2026 | Fontes: uma fonte variável por família (2 arquivos, 65 KB) em vez de 3 pesos estáticos cada; reservas locais com `size-adjust`. |
| 26/10/2026 | Botão flutuante aparece só quando nenhum outro botão de WhatsApp do conteúdo está na tela. |
| 26/10/2026 | Foto do hero entra sem fade (só sobe), pra continuar sendo o LCP medido. |
