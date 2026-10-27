/* Comportamentos opcionais (docs/spec.md, seção 9). A página funciona inteira sem este arquivo:
   sem JS, a barra fica sempre visível e o botão flutuante também. */
(function () {
  "use strict";

  /* 1. Barra superior: some ao rolar pra baixo, volta ao rolar pra cima (spec, seção 5).
        Nunca some perto do topo, pra não sumir no hero. */
  var barra = document.querySelector(".barra");
  if (barra) {
    var ultimoY = 0; /* lido só dentro do evento, pra não forçar layout antes da primeira pintura */
    var agendado = false;
    window.addEventListener("scroll", function () {
      if (agendado) { return; }
      agendado = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        var delta = y - ultimoY;
        if (y < 120 || delta < -4) {
          barra.classList.remove("oculta");
        } else if (delta > 4) {
          barra.classList.add("oculta");
        }
        ultimoY = y;
        agendado = false;
      });
    }, { passive: true });
  }

  /* 2. Botão flutuante: só aparece quando nenhum outro botão de WhatsApp da página está na tela
        (spec, seção 6: nunca cobre o botão da chamada final; aqui vale pra todos). */
  var flutuante = document.querySelector(".flutuante");
  var outros = document.querySelectorAll("main a.botao-whatsapp");
  if (flutuante && outros.length && "IntersectionObserver" in window) {
    var naTela = new Set();
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) { naTela.add(entrada.target); } else { naTela.delete(entrada.target); }
      });
      flutuante.classList.toggle("visivel", naTela.size === 0);
    }, { threshold: 0.3 });
    outros.forEach(function (botao) { observador.observe(botao); });
  } else if (flutuante) {
    flutuante.classList.add("visivel");
  }
})();
