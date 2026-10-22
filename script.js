(function(){
  // ====== Configure aqui ======
  var WHATSAPP = "5585996438607";            // ex.: "5585999999999" (país + DDD + número, só dígitos)
  var WHATSAPP_MSG = "Olá! Vim pelo site da Arfia e quero conversar sobre um projeto.";
  var EMAIL = "arfiadigitalstudio@gmail.com";               // ex.: "contato@arfia.com.br"
  var PROJECT_LINKS = {         // endereços publicados dos projetos demonstrativos
    barbearia: "",
    clinica: "",
    plataforma: ""
  };
  // ============================

  document.getElementById("year").textContent = new Date().getFullYear();
  if (EMAIL) document.getElementById("emailItem").innerHTML = '<a href="mailto:'+EMAIL+'">'+EMAIL+'</a>';

  var toastTimer;
  function toast(msg){
    var t = document.querySelector(".toast");
    if(!t){ t = document.createElement("div"); t.className = "toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function(){ t.hidden = true; }, 3400);
  }

  document.querySelectorAll("[data-whatsapp]").forEach(function(a){
    if (WHATSAPP){
      a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(WHATSAPP_MSG);
      a.target = "_blank"; a.rel = "noopener";
    } else {
      a.addEventListener("click", function(e){ e.preventDefault(); toast("Adicione o número do WhatsApp na configuração da página para ativar este botão."); });
    }
  });

  document.querySelectorAll("[data-project]").forEach(function(a){
    var url = PROJECT_LINKS[a.dataset.project];
    if (url){ a.href = url; a.target = "_blank"; a.rel = "noopener"; }
    else a.addEventListener("click", function(e){ e.preventDefault(); toast("Link do projeto ainda não publicado."); });
  });

  // Menu mobile
  var burger = document.getElementById("burger"), mm = document.getElementById("mobileMenu");
  burger.addEventListener("click", function(){
    var open = mm.hidden; mm.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  mm.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ mm.hidden = true; burger.setAttribute("aria-expanded","false"); burger.setAttribute("aria-label","Abrir menu"); }); });

  // Borda do cabeçalho ao rolar
  var header = document.querySelector(".site-header");
  function onScroll(){ header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive:true }); onScroll();

  // Item ativo do menu conforme a seção visível
  var links = document.querySelectorAll(".menu a");
  var ids = ["inicio","servicos","projetos","processo","contato"];
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){
          links.forEach(function(l){ l.removeAttribute("aria-current"); if (l.getAttribute("href") === "#"+en.target.id) l.setAttribute("aria-current","page"); });
        }
      });
    }, { rootMargin:"-45% 0px -50% 0px" });
    ids.forEach(function(id){ var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
