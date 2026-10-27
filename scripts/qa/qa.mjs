/* Verificação automática da página em cinco larguras, com o Edge sem janela.
   Uso: node qa.mjs  (com a página servida em http://127.0.0.1:8765/)
   Saída: JSON no terminal e capturas em scripts/qa/saida/. */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const NAVEGADOR = process.env.NAVEGADOR || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const URL_PAGINA = process.env.PAGINA || 'http://127.0.0.1:8765/index.html';
const SAIDA = fileURLToPath(new URL('./saida/', import.meta.url));
fs.mkdirSync(SAIDA, { recursive: true });
const dormir = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: NAVEGADOR, headless: true });
const resumo = { larguras: {} };
const larguras = [[360, 800], [390, 844], [768, 1024], [1024, 768], [1440, 900]];

for (const [w, h] of larguras) {
  const page = await browser.newPage();
  const falhas = [], consoleErros = [];
  page.on('requestfailed', r => falhas.push(r.url() + ' ' + (r.failure() && r.failure().errorText)));
  page.on('response', r => { if (r.status() >= 400) falhas.push(r.status() + ' ' + r.url()); });
  page.on('console', m => { if (m.type() === 'error') consoleErros.push(m.text()); });
  page.on('pageerror', e => consoleErros.push('pageerror: ' + e.message));
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(URL_PAGINA, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await dormir(900); // animação de entrada termina em 740 ms

  const dados = await page.evaluate(() => {
    const q = s => document.querySelector(s);
    const nome = q('.nome'); const spans = [...nome.querySelectorAll('span')];
    const rect = el => el.getBoundingClientRect();
    const t = rect(q('.hero-texto')), f = rect(q('.hero-foto img'));
    const sobrepoe = !(f.left >= t.right || f.right <= t.left || f.top >= t.bottom || f.bottom <= t.top);
    const recursos = performance.getEntriesByType('resource');
    return {
      transbordaHorizontal: document.documentElement.scrollWidth > window.innerWidth,
      nomeLinhas: Math.round(rect(nome).height / (parseFloat(getComputedStyle(nome).fontSize) * 0.88)),
      nomeFonte: getComputedStyle(nome).fontSize,
      spansTransbordam: spans.some(s => s.scrollWidth > nome.clientWidth + 1),
      fotoCobreTextoDesktop: window.innerWidth >= 900 && sobrepoe,
      fonteDisplay: document.fonts.check('900 1em "Big Shoulders Display"'),
      fonteCorpo: document.fonts.check('400 1em "Instrument Sans"'),
      requisicoesExternas: recursos.filter(e => !e.name.startsWith(location.origin)).map(e => e.name),
      transferidoKB: Math.round(recursos.reduce((a, e) => a + (e.transferSize || e.encodedBodySize || 0), 0) / 1024),
      imagemHero: ((recursos.find(e => /edu-27/.test(e.name)) || {}).name || '').split('/').pop(),
      flutuanteVisivelNoTopo: q('.flutuante').classList.contains('visivel'),
      alvosPequenos: [...document.querySelectorAll('a')].map(a => { const r = rect(a); return { t: (a.getAttribute('aria-label') || a.textContent).trim().slice(0, 28), w: Math.round(r.width), h: Math.round(r.height) }; }).filter(a => a.w && a.h && (a.w < 44 || a.h < 44)),
      titulos: [...document.querySelectorAll('h1,h2,h3')].map(x => x.tagName + ' ' + x.textContent.trim().replace(/\s+/g, ' ')),
      alts: [...document.querySelectorAll('img')].map(i => i.alt),
      alturaPagina: document.documentElement.scrollHeight,
    };
  });

  // Comportamentos do js/pagina.js: botão flutuante e barra.
  await page.evaluate(() => document.querySelector('#sobre').scrollIntoView({ block: 'center', behavior: 'instant' }));
  await dormir(500);
  const emSobre = await page.evaluate(() => ({ flutuanteVisivel: document.querySelector('.flutuante').classList.contains('visivel'), barraOculta: document.querySelector('.barra').classList.contains('oculta') }));
  await page.evaluate(() => document.querySelector('#contato .botao').scrollIntoView({ block: 'center', behavior: 'instant' }));
  await dormir(500);
  const flutuanteNaChamada = await page.evaluate(() => document.querySelector('.flutuante').classList.contains('visivel'));
  await page.evaluate(() => window.scrollBy({ top: -300, behavior: 'instant' }));
  await dormir(400);
  const barraVoltou = await page.evaluate(() => !document.querySelector('.barra').classList.contains('oculta'));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await dormir(400);

  await page.screenshot({ path: `${SAIDA}/pagina-${w}.png`, fullPage: true });
  await page.screenshot({ path: `${SAIDA}/hero-${w}.png` });
  resumo.larguras[w] = { ...dados, emSobre, flutuanteNaChamada, barraVoltou, falhas, consoleErros };

  if (w === 1440) {
    // Ordem de foco por teclado.
    const ordem = [];
    for (let i = 0; i < 13; i++) {
      await page.keyboard.press('Tab');
      ordem.push(await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return (a.className || a.tagName) + ' | ' + (a.getAttribute('aria-label') || a.textContent).trim().replace(/\s+/g, ' ').slice(0, 40) + ' | contorno ' + cs.outlineColor + ' ' + cs.outlineWidth; }));
    }
    resumo.ordemDeFoco = ordem;
    resumo.mensagensWhatsApp = await page.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].map(a => { const u = new URL(a.href); return u.pathname.slice(1) + ' | ' + (u.searchParams.get('text') || '(sem texto)'); }));
    resumo.linksNovaAbaComNoopener = await page.evaluate(() => [...document.querySelectorAll('a[target=_blank]')].every(a => /noopener/.test(a.rel)));
  }
  await page.close();
}

// Movimento reduzido: nada se move.
const pr = await browser.newPage();
await pr.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await pr.setViewport({ width: 1440, height: 900 });
await pr.goto(URL_PAGINA, { waitUntil: 'load' });
resumo.movimentoReduzido = await pr.evaluate(() => { const cs = getComputedStyle(document.querySelector('.nome')); return { opacity: cs.opacity, animation: cs.animationName, scroll: getComputedStyle(document.documentElement).scrollBehavior }; });
await pr.close();

// Candidatos a LCP num celular emulado: a foto do hero deve ser o maior.
const pl = await browser.newPage();
await pl.setViewport({ width: 412, height: 823, deviceScaleFactor: 2 });
await pl.evaluateOnNewDocument(() => {
  window.__lcp = [];
  new PerformanceObserver(l => l.getEntries().forEach(e => window.__lcp.push({ ms: Math.round(e.startTime), tamanho: e.size, elemento: e.element ? e.element.tagName + '.' + e.element.className : null, url: (e.url || '').split('/').pop() }))).observe({ type: 'largest-contentful-paint', buffered: true });
});
await pl.goto(URL_PAGINA, { waitUntil: 'networkidle0' });
await dormir(2000);
resumo.candidatosLCP = await pl.evaluate(() => window.__lcp);
await pl.close();

await browser.close();
fs.writeFileSync(`${SAIDA}/qa.json`, JSON.stringify(resumo, null, 1));
console.log(JSON.stringify(resumo, null, 1));
