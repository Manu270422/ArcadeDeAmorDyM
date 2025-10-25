/* js/index-ui.js */
(function(){
  // espera hasta que ArcadeAmor exista
  function ready(cb){
    if(window.ArcadeAmor) return cb();
    const t = setInterval(()=>{ if(window.ArcadeAmor){ clearInterval(t); cb(); } }, 30);
    // por si main.js no está
    setTimeout(()=> clearInterval(t), 4000);
  }

  ready(()=> {
    const badges = document.querySelectorAll('.progress-badge');
    const buttons = document.querySelectorAll('.btn-arcade');

    function renderBadges(){
      const prog = (window.ArcadeAmor.getProgress && typeof window.ArcadeAmor.getProgress === 'function') ? window.ArcadeAmor.getProgress() : {};
      badges.forEach(b => {
        const game = b.dataset.game;
        if(prog && prog[game]){
          b.innerText = '✅';
          b.classList.add('progress-complete');
          b.classList.remove('progress-locked','progress-new');
        } else {
          b.innerText = '🔒';
          b.classList.add('progress-locked');
          b.classList.remove('progress-complete','progress-new');
        }
      });
      // actualiza scoreboard (por si ya hay puntos)
      const scoreEl = document.getElementById('score-display');
      if(scoreEl && window.ArcadeAmor && typeof window.ArcadeAmor.getScore === 'function'){
        scoreEl.innerText = window.ArcadeAmor.getScore();
      }
    }

    // initial render
    renderBadges();

    // escuche cambios de localStorage (cuando se actualiza desde otro juego)
    window.addEventListener('storage', (e) => {
      if(e.key && e.key.includes('arcadeAmor')) renderBadges();
    });

    // también re-render cuando la app signale cambios (por si main.js tiene eventos)
    // Polling suave cada 1.2s para asegurarnos (no intensivo)
    setInterval(renderBadges, 1200);

    // efecto mini corazón/pop cuando clickea un botón
    buttons.forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const r = document.createElement('div');
        r.className = 'icon-pop';
        r.style.left = (ev.clientX - btn.getBoundingClientRect().left) + 'px';
        r.style.top = (ev.clientY - btn.getBoundingClientRect().top) + 'px';
        r.innerText = '💛';
        btn.appendChild(r);
        setTimeout(()=> r.remove(), 1000);
      });
    });

    // función que anima la insignia de un juego cuando se completa
    window.__arcadeBadgePulse = function(gameKey){
      const b = document.querySelector(`.progress-badge[data-game="${gameKey}"]`);
      if(!b) return;
      b.classList.add('badge-pulse');
      setTimeout(()=> b.classList.remove('badge-pulse'), 1000);
    };

    // Si ArcadeAmor expone setProgress or markGameCompleted, interceptamos
    // para hacer pulse inmediato: monkey-patch markGameCompleted si existe
    if(window.ArcadeAmor && typeof window.ArcadeAmor.markGameCompleted === 'function'){
      const original = window.ArcadeAmor.markGameCompleted;
      window.ArcadeAmor.markGameCompleted = function(slug, pts){
        original(slug, pts);
        // update immediately and pulse badge
        renderBadges();
        try{ window.__arcadeBadgePulse(slug); }catch(e){}
      };
    }
  });
})();