/* Lighthouse em celular contra a página servida localmente.
   Uso: node lh.mjs  (com a página servida em http://127.0.0.1:8765/)
   Saída: resumo no terminal e relatório completo em scripts/qa/saida/lighthouse.html. */
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const NAVEGADOR = process.env.NAVEGADOR || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const URL_PAGINA = process.env.PAGINA || 'http://127.0.0.1:8765/';
const SAIDA = fileURLToPath(new URL('./saida/', import.meta.url));
fs.mkdirSync(SAIDA, { recursive: true });

const chrome = await chromeLauncher.launch({ chromePath: NAVEGADOR, chromeFlags: ['--headless=new', '--no-first-run', '--disable-gpu'] });
const r = await lighthouse(URL_PAGINA, { port: chrome.port, output: ['json', 'html'], logLevel: 'error' });
fs.writeFileSync(`${SAIDA}/lighthouse.json`, r.report[0]);
fs.writeFileSync(`${SAIDA}/lighthouse.html`, r.report[1]);

const a = r.lhr.audits;
const nota = Object.fromEntries(Object.entries(r.lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
const lcpItem = (((a['largest-contentful-paint-element'] || {}).details || {}).items || [])[0];
const lcpNode = lcpItem && lcpItem.items && lcpItem.items[0] && lcpItem.items[0].node && lcpItem.items[0].node.snippet;
const abaixoDeUm = Object.values(a).filter(x => x.score !== null && x.score < 1 && !['informative', 'manual', 'notApplicable'].includes(x.scoreDisplayMode)).map(x => `${x.id} (${x.score}): ${x.title}`);
console.log(JSON.stringify({ nota, fcp: a['first-contentful-paint'].displayValue, lcp: a['largest-contentful-paint'].displayValue, cls: a['cumulative-layout-shift'].displayValue, tbt: a['total-blocking-time'].displayValue, si: a['speed-index'].displayValue, elementoLCP: lcpNode, totalKB: Math.round((a['total-byte-weight'].numericValue || 0) / 1024), auditoriasAbaixoDeUm: abaixoDeUm }, null, 1));
await chrome.kill();
