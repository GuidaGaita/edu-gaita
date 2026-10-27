# Fontes auto-hospedadas

Duas famílias, uma fonte variável cada, subconjunto latino, formato WOFF2. Baixadas em 26/10/2026 da API do
Google Fonts (`fonts.googleapis.com/css2`), que entrega o arquivo variável quando se pede um intervalo de pesos.

| Arquivo | Família | Eixo de peso | Versão na API | Tamanho | Licença |
|---|---|---|---|---|---|
| `big-shoulders-display.woff2` | Big Shoulders Display | 600 a 900 | v24 | 35 KB | OFL 1.1, `OFL-big-shoulders-display.txt` |
| `instrument-sans.woff2` | Instrument Sans | 400 a 600 | v4 | 30 KB | OFL 1.1, `OFL-instrument-sans.txt` |

Total: 65 KB, dentro do orçamento de 150 KB da spec (seção 9). A página não faz nenhuma requisição ao Google.

## Como baixar de novo

Pedir a CSS com um `User-Agent` de navegador moderno (senão a API devolve TTF em vez de WOFF2) e baixar a URL do
bloco marcado `/* latin */` de cada família:

```
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600..900&family=Instrument+Sans:wght@400..600&display=swap"
```
