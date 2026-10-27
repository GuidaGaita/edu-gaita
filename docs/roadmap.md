# Roadmap de construção: landing page de Eduardo Leopoldino

Escrito em 26/10/2026. Sem prazo fechado. Duas entregas: a primeira é o MVP publicado numa URL temporária pro cliente
validar; a segunda é a versão completa, com os textos do currículo, galeria, vídeo (se houver) e domínio próprio.

Cada tarefa tem um "Pronto quando", que é o critério pra marcar a caixa. A spec de referência é
[docs/spec.md](spec.md); os números de seção citados abaixo são dela.

Legenda: `[x]` feito, `[ ]` a fazer, `[~]` começado.

## Visão geral

| Etapa | O que entrega | Estado |
|---|---|---|
| Fase 0: Fundação | repositório, spec, roadmap, script de fotos, protótipo de cores | feita em 26/10/2026, falta validar o protótipo |
| Entrega 1: MVP publicado | hero, serviços, sobre genérico, chamada final, rodapé, botão flutuante, SEO básico, no ar em URL temporária | a fazer |
| Entrega 2: Versão completa | textos finais do currículo, galeria, vídeo e depoimentos (se houver), SEO completo, domínio, entrega ao cliente | a fazer |
| Backlog | o que só entra se o cliente pedir | sem data |

## Fase 0: Fundação (26/10/2026)

- [x] 0.1 Repositório git iniciado na pasta do projeto, com `.gitignore` e `README.md`.
- [x] 0.2 Spec escrita (`docs/spec.md`), com decisões e pendências registradas.
- [x] 0.3 Roadmap escrito (este arquivo).
- [x] 0.4 Script `scripts/otimizar_fotos.py` criado e rodado para as três fotos do protótipo (edu-27, edu-32, edu-40), em WebP e AVIF, larguras 480 a 1600.
- [x] 0.5 Protótipo em `prototipo/index.html` com paleta, tipografia, botões, as quatro linhas de serviço, hero com o nome em cromo, prévia do "Sobre" e a chamada final. Serve pra validar as cores com quem contratou e com o cliente.
- [ ] 0.6 Validar o protótipo com o cliente e anotar ajustes na spec (seção 7) antes de começar a entrega 1.
  Pronto quando: a seção 12 da spec tiver uma linha "Protótipo aprovado" com a data, ou as mudanças pedidas estiverem na seção 7.

## Entrega 1: MVP publicado

### 1.1 Fotos otimizadas do MVP
- [x] Rodar o script para edu-27, edu-32 e edu-40 em todas as larguras (480, 800, 1200, 1600) e nos dois formatos (WebP e AVIF). Feito em 26/10/2026.
- [ ] Gerar a imagem de compartilhamento 1200 × 630 a partir de edu-40 (`img/og.jpg`).
- Pronto quando: `img/manifest.json` lista as três fotos, o hero em 1200 px pesa até 250 KB e a imagem OG abre no validador de Open Graph.

### 1.2 Fontes auto-hospedadas
- [ ] Baixar Big Shoulders Display (700, 800, 900) e Instrument Sans (400, 500, 600) em WOFF2, subconjunto latino, para `fonts/`.
- [ ] Declarar `@font-face` com `font-display: swap` e `preload` do peso 900 da Big Shoulders Display.
- Pronto quando: a página não faz nenhuma requisição a `fonts.googleapis.com` nem `fonts.gstatic.com` e as seis fontes somam até 150 KB.

### 1.3 Base de estilo
- [ ] Tokens CSS em `:root` com os nomes e valores da paleta (spec 7.1) e a escala de tipos (spec 7.2). O protótipo já tem a primeira versão desses tokens: copiar de lá.
- [ ] Reset mínimo, largura máxima 1200 px, margens laterais, foco visível, `prefers-reduced-motion`.
- [ ] Componentes: botão de WhatsApp (primário), botão secundário, sobretítulo, título de seção, linha de serviço.
- Pronto quando: uma página de teste com todos os componentes passa no verificador de contraste em todas as combinações da spec 7.1.

### 1.4 Hero com a assinatura em cromo
- [ ] Estrutura em duas colunas no desktop e em coluna única no celular (spec 7.4).
- [ ] Nome em duas linhas com o gradiente cromo terminando em âmbar, relevo mínimo e fallback em Cromo sólido.
- [ ] Foto edu-27 com `fetchpriority="high"`, `preload`, brilho âmbar atrás e fusão com o fundo pela esquerda e pela base.
- [ ] Animação de entrada em sequência, desligada com `prefers-reduced-motion`.
- Pronto quando: em 390 px, 768 px e 1440 px de largura o nome não quebra em três linhas, a foto não cobre texto e o LCP medido no Lighthouse é a foto ou o nome, abaixo de 2,5 s.

### 1.5 Serviços
- [ ] Quatro linhas na ordem da spec (aulas, gravações, shows, eventos), com título, texto genérico e botão de WhatsApp com a mensagem daquele serviço (spec 6).
- [ ] Hover e foco: fundo Palco, nome em Mel.
- Pronto quando: cada um dos quatro links abre o WhatsApp com a mensagem certa, testado num celular Android e num iPhone.

### 1.6 Sobre (texto genérico)
- [ ] Foto edu-32 em 4:5 e o parágrafo genérico da spec, seção 5.
- Pronto quando: a seção existe e o texto não afirma nada que não esteja confirmado (conferir com a spec, seção 11).

### 1.7 Chamada final, rodapé e botão flutuante
- [ ] Chamada final com edu-40 escurecida, frase "Vamos colocar gaita nisso?" e botão de WhatsApp.
- [ ] Rodapé com nome completo, número em texto clicável e "© 2026 Eduardo Leopoldino"; espaço reservado pra redes e crédito de fotos.
- [ ] Botão flutuante fixo, com área segura do iPhone, que some dentro da chamada final.
- Pronto quando: o botão flutuante nunca cobre outro botão de WhatsApp e todos os links do rodapé funcionam.

### 1.8 SEO básico e metadados
- [ ] `title`, `meta description`, `canonical`, `lang="pt-BR"`, Open Graph e Twitter Card com `img/og.jpg`.
- [ ] Favicon SVG, PNG 192 e 512, `apple-touch-icon`, `site.webmanifest`.
- [ ] `robots.txt` e `sitemap.xml`.
- Pronto quando: a prévia de compartilhamento no WhatsApp mostra título, descrição e a imagem.

### 1.9 Hospedagem e cabeçalhos
- [ ] `vercel.json` com cache longo pra `img/` e `fonts/` e os cabeçalhos de segurança da spec, seção 9.
- [ ] Projeto criado na Vercel e publicado com URL temporária.
- Pronto quando: a URL temporária abre a página em celular e desktop e os cabeçalhos aparecem na aba de rede.

### 1.10 Qualidade da entrega 1
- [ ] Testar em 360, 390, 768, 1024 e 1440 px de largura; nada rola na horizontal.
- [ ] Lighthouse em celular: nota mínima 90 em desempenho, acessibilidade, boas práticas e SEO.
- [ ] Navegação só por teclado: todo botão e link alcançável, foco visível, ordem lógica.
- [ ] Leitor de tela: títulos em ordem, `alt` das fotos, rótulos dos botões de WhatsApp.
- [ ] Revisão de texto: sem erro de acento, sem afirmação não confirmada.
- Pronto quando: todas as caixas acima marcadas e a URL temporária enviada ao cliente pra validação.

## Entrega 2: Versão completa

### 2.1 Textos finais com o currículo
- [ ] Receber o currículo e as respostas das pendências P1 a P6 da spec (cidade, redes, fatos da bio, formatos, vídeo, depoimentos).
- [ ] Reescrever "Sobre" com três ou quatro fatos verificáveis; completar os textos dos serviços com os formatos confirmados; cidade no sobretítulo do hero e no `title`.
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

### 2.6 Domínio próprio
- [ ] Cliente registra o domínio (sugestão: `.com.br` pelo registro.br) ou aponta um que já tenha.
- [ ] DNS apontado pra Vercel, HTTPS ativo, redirecionamento de `www` pra raiz (ou o contrário, uma só forma).
- [ ] `canonical`, `sitemap.xml` e Open Graph atualizados pro domínio final.
- Pronto quando: o domínio abre com cadeado e a URL temporária redireciona pra ele.

### 2.7 Refinamento visual
- [ ] Revisar com capturas de tela em celular e desktop: espaçamentos, hover, foco, animação de entrada.
- [ ] Aplicar a regra "tira um acessório": cortar qualquer enfeite que não sirva ao objetivo da página.
- Pronto quando: quem contratou aprova as capturas e a spec, seção 7, bate com o que está no ar.

### 2.8 Qualidade final e entrega
- [ ] Repetir a bateria da tarefa 1.10 no domínio final.
- [ ] Escrever no `README.md` como trocar um texto, uma foto e o número de WhatsApp, pra manutenção futura.
- [ ] Entregar ao cliente: URL final, acesso ao repositório (se ele quiser) e esse guia.
- Pronto quando: cliente confirma que recebeu e que o WhatsApp está recebendo as mensagens com o texto certo.

## Backlog (só se o cliente pedir)

- Evento de clique nos botões de WhatsApp (medição), com aviso de cookies se a ferramenta exigir (pendência P8 da spec).
- Faixa com últimos posts do Instagram.
- Versão em inglês.
- Página de agenda de shows.
- Player de áudio próprio com trechos de gravações.

## Como este roadmap é mantido

- A caixa só é marcada quando o "Pronto quando" da tarefa foi verificado, não quando o código foi escrito.
- Toda decisão nova vai pra seção 12 da spec com a data; toda pendência resolvida sai da seção 11.
- Datas sempre por extenso (dia/mês/ano), nunca "ontem" ou "semana que vem".
