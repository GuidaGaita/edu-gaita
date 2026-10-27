/* Faíscas do hero: só decoração. Um canvas atrás do conteúdo da primeira tela, com pontos
   de luz em mel e cromo subindo devagar, como faíscas de palco. A página funciona sem isto e,
   com prefers-reduced-motion, o arquivo não faz nada (o CSS já esconde o canvas).

   Cada faísca é um drawImage de um sprite pintado uma única vez (criar um gradiente por
   partícula por quadro é o que tornaria qualquer densidade cara). O movimento é integrado por
   tempo (dt em segundos), não por quadro: numa tela de 120 Hz a faísca sobe na mesma
   velocidade que numa de 60. O laço pausa quando o hero sai da tela e quando a aba some. */
(function () {
  "use strict";

  var canvas = document.getElementById("faiscas");
  if (!canvas) { return; }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }

  var hero = canvas.closest(".hero");
  var ctx = canvas.getContext("2d");
  if (!hero || !ctx) { return; }

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

  /* Dois sprites: faísca de mel (a maioria) e faísca de cromo, mais rara e mais fria. */
  var sprites = [
    halo(64, [[0, "rgba(255, 240, 210, 1)"], [0.26, "rgba(242, 182, 92, 0.6)"], [0.58, "rgba(227, 154, 58, 0.17)"], [1, "rgba(184, 112, 26, 0)"]]),
    halo(64, [[0, "rgba(255, 255, 255, 1)"], [0.3, "rgba(215, 218, 222, 0.5)"], [0.6, "rgba(163, 169, 175, 0.12)"], [1, "rgba(142, 148, 154, 0)"]])
  ];

  var parts = [];
  var cw = 0;   /* medidas do palco, lidas só no semear(): medir a cada quadro obrigaria o */
  var ch = 0;   /* navegador a refazer o layout */
  var raf = null;
  var ultimo = 0;

  function nascer(p, w, h, inicio) {
    var grande = Math.random() < 0.3;
    p.sprite = Math.random() < 0.82 ? 0 : 1;
    p.x = Math.random() * w;
    p.y = inicio ? Math.random() * h : h + 14;
    p.r = grande ? entre(2.2, 4.6) : entre(0.6, 2);
    p.vx = (Math.random() - 0.5) * (grande ? 9 : 16);
    p.vy = -(Math.random() * (grande ? 10 : 18) + 3);
    p.a = grande ? entre(0.55, 0.95) : entre(0.3, 0.7);
    p.pulso = entre(0, Math.PI * 2);
    p.ritmo = entre(0.5, 1.3);
    p.balanco = entre(0.25, 0.75);
  }

  function semear() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = hero.offsetWidth;
    var h = hero.offsetHeight;
    cw = w;
    ch = h;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(Math.round(w * h / 7000), w < 700 ? 55 : 80);
    parts = [];
    for (var i = 0; i < n; i++) {
      var p = {};
      nascer(p, w, h, true);
      parts.push(p);
    }
  }

  function quadro(agora) {
    /* Teto de 50 ms: ao voltar de uma aba oculta, o primeiro quadro não "salta" as faíscas. */
    var dt = Math.min((agora - ultimo) / 1000, 0.05);
    ultimo = agora;
    ctx.clearRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.pulso += p.ritmo * dt;
      p.x += (p.vx + Math.sin(p.pulso) * p.balanco * 7) * dt;
      p.y += p.vy * dt;
      if (p.y < -14) { nascer(p, cw, ch, false); }
      if (p.x < -14) { p.x = cw + 14; }
      if (p.x > cw + 14) { p.x = -14; }
      var alpha = Math.max(p.a * (0.7 + 0.3 * Math.sin(p.pulso)), 0);
      var d = p.r * 7.5;
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprites[p.sprite], p.x - d / 2, p.y - d / 2, d, d);
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

  semear();
  ligar();

  /* Só anima enquanto o hero estiver na tela... */
  var visivel = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      visivel = entradas[0].isIntersecting;
      if (visivel && !document.hidden) { ligar(); } else { desligar(); }
    }, { threshold: 0 }).observe(hero);
  }

  /* ...e enquanto a aba estiver em primeiro plano */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden || !visivel) { desligar(); } else { ligar(); }
  });

  var temporizador;
  window.addEventListener("resize", function () {
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      semear();
      if (visivel && !document.hidden) { ligar(); }
    }, 200);
  }, { passive: true });
})();
