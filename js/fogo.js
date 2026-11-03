/* Chamas do cartão do curso: só decoração. Um canvas sobre a foto, com línguas de fogo subindo da base e
   faíscas escapando. A página funciona sem isto e, com prefers-reduced-motion, o arquivo não faz nada
   (o CSS já esconde o canvas).

   Cada chama é um drawImage de um sprite pintado uma única vez, somado em modo "lighter": é a soma das
   luzes que dá o miolo claro. O sprite muda com a idade (amarelo, laranja, vermelho), como numa chama de
   verdade. O movimento é integrado por tempo, e o laço só roda com o cartão na tela e a aba em primeiro plano. */
(function () {
  "use strict";

  var canvas = document.getElementById("fogo");
  if (!canvas) { return; }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }
  var ctx = canvas.getContext("2d");
  if (!ctx) { return; }

  var entre = function (a, b) { return a + Math.random() * (b - a); };

  function halo(tamanho, paradas) {
    var c = document.createElement("canvas");
    c.width = c.height = tamanho;
    var g = c.getContext("2d");
    var grad = g.createRadialGradient(tamanho / 2, tamanho / 2, 0, tamanho / 2, tamanho / 2, tamanho / 2);
    paradas.forEach(function (p) { grad.addColorStop(p[0], p[1]); });
    g.fillStyle = grad;
    g.fillRect(0, 0, tamanho, tamanho);
    return c;
  }

  var AMARELO = halo(96, [[0, "rgba(255, 244, 190, 1)"], [0.35, "rgba(255, 196, 80, 0.75)"], [0.7, "rgba(255, 120, 30, 0.2)"], [1, "rgba(255, 90, 10, 0)"]]);
  var LARANJA = halo(96, [[0, "rgba(255, 170, 60, 0.95)"], [0.4, "rgba(255, 110, 25, 0.55)"], [0.75, "rgba(220, 60, 10, 0.15)"], [1, "rgba(200, 40, 0, 0)"]]);
  var VERMELHO = halo(96, [[0, "rgba(230, 70, 15, 0.7)"], [0.5, "rgba(170, 35, 5, 0.3)"], [1, "rgba(120, 20, 0, 0)"]]);
  var FAISCA = halo(24, [[0, "rgba(255, 250, 225, 1)"], [0.3, "rgba(255, 190, 90, 0.8)"], [1, "rgba(255, 110, 20, 0)"]]);

  var chamas = [];
  var faiscas = [];
  var linguas = [];
  var cw = 0;   /* medidas lidas só no semear(): medir a cada quadro obrigaria a refazer o layout */
  var ch = 0;
  var raf = null;
  var ultimo = 0;
  var relogio = 0;

  /* Cada partícula pertence a uma "língua" de fogo e converge pro centro dela conforme sobe: é isso que
     desenha a ponta da chama, em vez de uma nuvem redonda. A posição sai da idade (t de 0 a 1), não de
     velocidade somada, então a forma não depende da taxa de quadros. */
  function nascerChama(p, inicio) {
    p.lingua = linguas[Math.floor(Math.random() * linguas.length)];
    p.vida = entre(0.45, 0.95);
    p.idade = inicio ? Math.random() * p.vida : 0;
    p.desvio = (Math.random() + Math.random() - 1) * p.lingua.largura;
    p.base = p.lingua.largura * entre(0.75, 1.25);
    p.fase = entre(0, Math.PI * 2);
  }

  function nascerFaisca(p, inicio) {
    p.x = Math.random() * cw;
    p.y = inicio ? Math.random() * ch : ch;
    p.vida = entre(1.1, 2.4);
    p.idade = inicio ? Math.random() * p.vida : 0;
    p.vy = -ch * entre(0.28, 0.5);
    p.vx = entre(-18, 18);
    p.r = entre(2.5, 6);
    p.fase = entre(0, Math.PI * 2);
  }

  function semear() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    cw = canvas.offsetWidth;
    ch = canvas.offsetHeight;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var i, p;
    var alturaMax = Math.min(ch * 0.66, 320);
    var nLinguas = Math.max(6, Math.round(cw / 48));
    linguas = [];
    for (i = 0; i < nLinguas; i++) {
      linguas.push({
        x: (i + 0.5) / nLinguas * cw + entre(-10, 10),
        altura: alturaMax * entre(0.5, 1),
        largura: cw / nLinguas * 0.95,
        fase: entre(0, Math.PI * 2),
        ritmo: entre(2.4, 4.6)
      });
    }
    chamas = [];
    faiscas = [];
    var n = Math.max(90, Math.min(nLinguas * 20, 190));
    for (i = 0; i < n; i++) { p = {}; nascerChama(p, true); chamas.push(p); }
    for (i = 0; i < 14; i++) { p = {}; nascerFaisca(p, true); faiscas.push(p); }
  }

  function quadro(agora) {
    /* Teto de 50 ms: ao voltar de uma aba oculta, o primeiro quadro não "salta". */
    var dt = Math.min((agora - ultimo) / 1000, 0.05);
    ultimo = agora;
    relogio += dt;
    ctx.clearRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = "lighter";
    var i, p, t, l, h, x, y, larg, alt;
    for (i = 0; i < chamas.length; i++) {
      p = chamas[i];
      p.idade += dt;
      t = p.idade / p.vida;
      if (t >= 1) { nascerChama(p, false); t = 0; }
      l = p.lingua;
      /* A altura da língua pulsa: é o tremular da chama. */
      h = l.altura * (0.72 + 0.28 * Math.sin(relogio * l.ritmo + l.fase));
      x = l.x + Math.sin(relogio * 1.3 + l.fase) * 7 + p.desvio * Math.pow(1 - t, 1.4) + Math.sin(p.fase + p.idade * 10) * 5 * t;
      y = ch + 4 - h * t;
      larg = p.base * 1.15 * (1 - t * 0.8);
      alt = larg * 2.1;
      ctx.globalAlpha = (t < 0.1 ? t / 0.1 : Math.pow(1 - (t - 0.1) / 0.9, 0.7)) * 0.5;
      ctx.drawImage(t < 0.28 ? AMARELO : t < 0.62 ? LARANJA : VERMELHO, x - larg / 2, y - alt / 2, larg, alt);
    }
    for (i = 0; i < faiscas.length; i++) {
      p = faiscas[i];
      p.idade += dt;
      t = p.idade / p.vida;
      if (t >= 1) { nascerFaisca(p, false); t = 0; }
      p.x += (p.vx + Math.sin(p.fase + p.idade * 5) * 26) * dt;
      p.y += p.vy * dt;
      larg = p.r * 2;
      ctx.globalAlpha = (1 - t) * (0.6 + 0.4 * Math.sin(p.fase + p.idade * 14));
      ctx.drawImage(FAISCA, p.x - larg / 2, p.y - larg / 2, larg, larg);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(quadro);
  }

  function ligar() {
    if (raf) { return; }
    ultimo = performance.now();
    raf = requestAnimationFrame(quadro);
  }

  function desligar() {
    if (!raf) { return; }
    cancelAnimationFrame(raf);
    raf = null;
  }

  /* Só semeia quando o cartão chega perto da tela: não gasta nada no carregamento. */
  var visivel = false;
  var semeado = false;
  function atualizar() {
    if (visivel && !document.hidden) {
      if (!semeado) { semear(); semeado = true; }
      ligar();
    } else {
      desligar();
    }
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      visivel = entradas[0].isIntersecting;
      atualizar();
    }, { threshold: 0, rootMargin: "120px 0px" }).observe(canvas);
  } else {
    visivel = true;
    atualizar();
  }
  document.addEventListener("visibilitychange", atualizar);

  var temporizador;
  window.addEventListener("resize", function () {
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      if (semeado) { semear(); }
    }, 200);
  }, { passive: true });
})();
