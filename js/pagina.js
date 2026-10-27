/* Comportamento e movimento (docs/spec.md, seção 9). A página funciona inteira sem este arquivo:
   sem JS, a barra fica sempre visível, o botão flutuante também, e nada fica escondido
   esperando revelação (a classe .js do <html>, posta no <head>, é o portão de tudo isso). */
(function () {
  "use strict";

  var REDUZIDO = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Revelação ao rolar: cada .revela ganha .entrou quando entra na tela, uma vez só.
        A margem inferior positiva começa a entrada um pouco antes de o elemento aparecer,
        pra quem rola encontrar o conteúdo pronto. Blocos altos (.revela--tarde) só começam
        quando já estão 12 % dentro da tela, senão no celular chegam "prontos" e ninguém vê. */
  function revelacao() {
    var alvos = document.querySelectorAll(".revela");
    if (!alvos.length) { return; }
    if (REDUZIDO || !("IntersectionObserver" in window)) {
      alvos.forEach(function (el) { el.classList.add("entrou"); });
      return;
    }
    var observar = function (margem) {
      return new IntersectionObserver(function (entradas, obs) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) { return; }
          entrada.target.classList.add("entrou");
          obs.unobserve(entrada.target);
        });
      }, { threshold: 0, rootMargin: margem });
    };
    var cedo = observar("0px 0px 14% 0px");
    var tarde = observar("0px 0px -12% 0px");
    alvos.forEach(function (el) {
      (el.classList.contains("revela--tarde") ? tarde : cedo).observe(el);
    });
  }

  /* 2. Faixa rolante: duplica o grupo até cobrir uma volta e meia da tela, depois espelha a
        volta inteira, pra animação de -50 % fechar sem emenda. Mede uma vez só. */
  function faixaRolante() {
    var trilho = document.getElementById("faixa-rolante");
    if (!trilho) { return; }
    var grupo = trilho.querySelector(".faixa-rolante__grupo");
    if (!grupo) { return; }
    var largura = grupo.getBoundingClientRect().width;
    var porVolta = largura > 0 ? Math.min(Math.max(Math.ceil((window.innerWidth * 1.5) / largura), 1), 12) : 1;
    var volta = document.createDocumentFragment();
    for (var i = 1; i < porVolta; i++) { volta.appendChild(grupo.cloneNode(true)); }
    trilho.appendChild(volta);
    var espelho = document.createDocumentFragment();
    Array.prototype.forEach.call(trilho.children, function (el) { espelho.appendChild(el.cloneNode(true)); });
    trilho.appendChild(espelho);
  }

  /* 3. Barra superior: some ao rolar pra baixo, volta ao rolar pra cima (spec, seção 5).
        Nunca some perto do topo, pra não sumir no hero. */
  function barra() {
    var el = document.querySelector(".barra");
    if (!el) { return; }
    var ultimoY = 0;
    var agendado = false;
    window.addEventListener("scroll", function () {
      if (agendado) { return; }
      agendado = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        var delta = y - ultimoY;
        if (y < 120 || delta < -4) {
          el.classList.remove("oculta");
        } else if (delta > 4) {
          el.classList.add("oculta");
        }
        ultimoY = y;
        agendado = false;
      });
    }, { passive: true });
  }

  /* 4. Botão flutuante: só aparece quando nenhum outro botão de WhatsApp do conteúdo está na
        tela (spec, seção 6). */
  function flutuante() {
    var botao = document.querySelector(".flutuante");
    var outros = document.querySelectorAll("main a.botao-whatsapp");
    if (!botao) { return; }
    if (!outros.length || !("IntersectionObserver" in window)) {
      botao.classList.add("visivel");
      return;
    }
    var naTela = new Set();
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) { naTela.add(entrada.target); } else { naTela.delete(entrada.target); }
      });
      botao.classList.toggle("visivel", naTela.size === 0);
    }, { threshold: 0.3 });
    outros.forEach(function (b) { observador.observe(b); });
  }

  function partida() {
    revelacao();
    faixaRolante();
    barra();
    flutuante();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", partida);
  } else {
    partida();
  }
})();
