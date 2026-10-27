# edu-gaita

Landing page de uma página só para Eduardo Leopoldino, gaitista com foco em gaita rock.
Objetivo da página: levar quem chega a mandar mensagem no WhatsApp pedindo um dos quatro
serviços (aulas particulares, gravações, shows, eventos particulares).

## Documentos

- [docs/spec.md](docs/spec.md): o que a página é, conteúdo, direção visual, requisitos técnicos, pendências.
- [docs/roadmap.md](docs/roadmap.md): roadmap de construção em duas entregas, com checklist e critério de pronto de cada tarefa.

## Pastas

| Pasta | O que tem |
|---|---|
| `docs/` | spec e roadmap |
| `scripts/` | `otimizar_fotos.py`, gera as versões web das fotos |
| `img/` | fotos otimizadas (WebP e AVIF) geradas pelo script; os originais ficam fora do repositório |
| `prototipo/` | protótipo estático pra validar cores, fontes e o hero antes da construção |
| `docs/capturas/` | capturas do protótipo em desktop e celular, feitas em 26/10/2026 |

## Como gerar as fotos otimizadas

Requer Python 3 com Pillow (`pip install pillow`).

```
python scripts/otimizar_fotos.py --origem "C:\caminho\para\os\originais" --so edu-27,edu-32,edu-40
```

Sem `--so`, processa todos os JPG da pasta de origem. Saída em `img/`, mais um `img/manifest.json`
com largura e altura de cada arquivo, usado pelos atributos `width`/`height` no HTML.

## Como ver o protótipo

Abra `prototipo/index.html` no navegador. Ele usa as fontes do Google Fonts (só no protótipo;
no site final elas serão auto-hospedadas) e as fotos de `img/`.
