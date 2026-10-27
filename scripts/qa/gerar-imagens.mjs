/* Gera img/og.jpg (imagem de compartilhamento 1200 × 630) e os ícones PNG a partir de og.html e icone.html,
   capturando com o Edge sem janela. Uso: node gerar-imagens.mjs */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const NAVEGADOR = process.env.NAVEGADOR || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const AQUI = new URL('./', import.meta.url);
const IMG = fileURLToPath(new URL('../../img/', import.meta.url));

const browser = await puppeteer.launch({ executablePath: NAVEGADOR, headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();

// Ícones: fundo cheio (Android e apple-touch-icon) e cantos arredondados (favicon PNG).
await page.goto(new URL('icone.html', AQUI).href, { waitUntil: 'load' });
for (const [tamanho, arquivo] of [[512, 'icone-512.png'], [192, 'icone-192.png'], [180, 'apple-touch-icon.png']]) {
  await page.setViewport({ width: tamanho, height: tamanho, deviceScaleFactor: 1 });
  await page.screenshot({ path: IMG + arquivo, clip: { x: 0, y: 0, width: tamanho, height: tamanho } });
}
await page.evaluate(() => document.getElementById('fundo').setAttribute('rx', '12'));
await page.setViewport({ width: 32, height: 32, deviceScaleFactor: 1 });
await page.screenshot({ path: IMG + 'favicon-32.png', omitBackground: true, clip: { x: 0, y: 0, width: 32, height: 32 } });

// Imagem de compartilhamento.
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(new URL('og.html', AQUI).href, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
const fontes = await page.evaluate(() => [...document.fonts].map(f => f.family + ': ' + f.status));
await page.screenshot({ path: IMG + 'og.jpg', type: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

for (const f of ['og.jpg', 'icone-512.png', 'icone-192.png', 'apple-touch-icon.png', 'favicon-32.png']) {
  console.log(f, Math.round(fs.statSync(IMG + f).size / 1024) + ' KB');
}
console.log('fontes na imagem OG:', fontes.join(', '));
