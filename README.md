# edu-gaita

Landing page de uma página só para Eduardo Leopoldino, gaitista de rock de Brasília, DF.
Objetivo da página: levar quem chega a mandar mensagem no WhatsApp pedindo um dos quatro
serviços (aulas particulares online, gravações a distância, shows, eventos particulares).

A estrutura e o movimento seguem o site GuidaGaita (fotos do ensaio atrás de cada seção, cartões de
serviço, revelação ao rolar, faixa rolante, grão e vinheta, faíscas no hero); a paleta "Cromo e mel
sobre veludo" e as fontes são próprias. Tudo isso está na spec.

## Documentos

- [docs/spec.md](docs/spec.md): o que a página é, conteúdo, direção visual, requisitos técnicos, pendências e decisões.
- [docs/roadmap.md](docs/roadmap.md): roadmap de construção em duas entregas, com checklist e critério de pronto de cada tarefa.

## O que tem no repositório

| Caminho | O que é |
|---|---|
| `index.html` | a página inteira: barra, hero, faixa rolante, serviços, sobre, galeria, chamada final, rodapé, botão flutuante |
| `css/estilo.css` | tokens da paleta, tipografia, fundos fotográficos, componentes, seções e o vocabulário de revelação ao rolar |
| `js/pagina.js` | revelação ao rolar, faixa rolante, barra que some ao rolar, botão flutuante; a página funciona sem ele |
| `js/palco.js` | faíscas do hero em canvas; só decoração, desligado com `prefers-reduced-motion` |
| `fonts/` | Big Shoulders Display e Instrument Sans em WOFF2 (fontes variáveis), licenças OFL e `LEIA-ME.md` |
| `img/` | fotos otimizadas (WebP e AVIF) geradas pelo script, `manifest.json`, imagem de compartilhamento `og.jpg` e ícones |
| `site.webmanifest`, `robots.txt`, `sitemap.xml`, `.nojekyll` | metadados e o marcador que desliga o Jekyll no GitHub Pages |
| `docs/` | spec, roadmap e capturas de tela (`docs/capturas/`) |
| `scripts/otimizar_fotos.py` | gera as versões web das fotos a partir dos originais, que ficam fora do repositório |
| `scripts/qa/` | verificação automática da página (cinco larguras, comportamentos, Lighthouse) e geração de `og.jpg` e dos ícones; roda em Node |
| `prototipo/` | protótipo estático de cores, fontes e hero, aprovado em 26/10/2026; fica como referência |

## Como ver a página localmente

As fontes são carregadas por `@font-face`, e o navegador bloqueia isso quando o HTML é aberto direto do disco
(`file://`). Sirva a pasta por HTTP:

```
python -m http.server 8000
```

e abra `http://localhost:8000/`.

## Como gerar as fotos otimizadas

Requer Python 3 com Pillow (`pip install pillow`).

```
python scripts/otimizar_fotos.py --origem "C:\caminho\para\os\originais" --so edu-22,edu-11
python scripts/otimizar_fotos.py --origem "C:\caminho\para\os\originais" --so edu-24,edu-33 --qualidade webp=58,avif=40
```

Sem `--so`, processa todos os JPG da pasta de origem. Saída em `img/`, mais um `img/manifest.json`
com largura e altura de cada arquivo, usado pelos atributos `width`/`height` no HTML. A opção
`--qualidade` serve pras fotos de fundo, que ficam atrás do véu escuro e aguentam compressão alta;
as fotos das molduras (galeria e "Sobre") ficam na qualidade padrão.

## Como rodar a verificação e gerar a imagem de compartilhamento

Requer Node 18 ou mais novo e o Microsoft Edge instalado (o caminho pode ser trocado pela variável de
ambiente `NAVEGADOR`). Com a página servida em `http://127.0.0.1:8765/` (`python -m http.server 8765`):

```
cd scripts/qa
npm install
node qa.mjs              # cinco larguras, comportamentos, revelações, mensagens de WhatsApp, capturas em scripts/qa/saida/
node lh.mjs              # Lighthouse em celular, relatório em scripts/qa/saida/lighthouse.html
node gerar-imagens.mjs   # regrava img/og.jpg e os ícones a partir de og.html e icone.html
```

## Como publicar no GitHub Pages

Veja a tarefa "Publicação no GitHub Pages" no [roadmap](docs/roadmap.md): repositório público, Pages servindo o branch
`main` da pasta raiz, e conferir a URL final nos metadados de `index.html`, `robots.txt` e `sitemap.xml`.
