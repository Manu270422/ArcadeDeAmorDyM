/* js/main.js - funcionalidades globales */
(function(){
  const SCORE_KEY = 'arcadeAmor_score_v1';
  const PROGRESS_KEY = 'arcadeAmor_progress_v1';
  const MUSIC_KEY = 'arcadeAmor_music_v1';
  const REQUIRED_GAMES = ['trivia','ahorcado','memoria','sorpresa'];

  // helpers localStorage
  function getScore(){ return Number(localStorage.getItem(SCORE_KEY) || 0); }
  function setScore(v){ localStorage.setItem(SCORE_KEY, String(Math.max(0, Math.floor(v)))); updateScoreUI(); }
  function getProgress(){ return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
  function setProgress(obj){ localStorage.setItem(PROGRESS_KEY, JSON.stringify(obj)); }

  // UI updates
  function updateScoreUI(){
    const el = document.getElementById('score-display');
    if(el) el.innerText = getScore();
  }

  // add points & small celebration
  function addPoints(n){
    if(!n || isNaN(n)) return;
    setScore(getScore() + Number(n));
    // pequeña celebración
    showFloatingHearts(8);
  }

  // mark game completed (only first time gives points)
  function markGameCompleted(slug, points){
    const prog = getProgress();
    if(prog[slug]) return; // ya completado
    prog[slug] = true;
    setProgress(prog);
    if(points && !isNaN(points)) addPoints(points);
    // si completó todos, redirige al final tras 900ms
    if(requiredCompleted()){
      setTimeout(()=> {
        // si estamos dentro de /juegos/ (pages), ajustar ruta
        const finalUrl = window.location.pathname.includes('/juegos/') ? '../final.html' : 'final.html';
        window.location.href = finalUrl;
      }, 900);
    }
  }

  function requiredCompleted(){
    const prog = getProgress();
    return REQUIRED_GAMES.every(k => prog[k]);
  }

  // reset
  function resetProgress(){
    localStorage.removeItem(SCORE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    updateScoreUI();
    alert('Progreso reseteado 🔁');
  }

  // floating hearts
  let heartInterval = null;
  function createHeartOnce(){
    const c = document.createElement('div');
    c.className = 'floating-heart';
    c.innerText = '💛';
    const left = Math.random() * 90 + 2;
    c.style.left = left + '%';
    c.style.bottom = '18px';
    c.style.fontSize = (12 + Math.random() * 22) + 'px';
    c.style.opacity = (0.7 + Math.random() * 0.4);
    document.body.appendChild(c);
    setTimeout(()=> c.remove(), 3400);
  }
  function showFloatingHearts(count = 6, spacing = 120){
    for(let i=0;i<count;i++){
      setTimeout(createHeartOnce, i * (spacing / 20));
    }
  }

  // confetti simple (pequeñas piezas)
  function showConfetti(amount = 28){
    for(let i=0;i<amount;i++){
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 6 + Math.floor(Math.random()*10);
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.left = (10 + Math.random()*80) + '%';
      piece.style.top = (10 + Math.random()*20) + 'px';
      piece.style.background = ['#ff6b9a','#ffd166','#7afcff','#a78bfa','#ffb4d6'][Math.floor(Math.random()*5)];
      document.body.appendChild(piece);
      setTimeout(()=> piece.remove(), 1600 + Math.random()*800);
    }
  }

  // Music controls
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle');
  function initMusic(){
    if(!audio || !musicBtn) return;
    const stored = localStorage.getItem(MUSIC_KEY);
    const on = stored === null ? true : (stored === 'true');
    if(on){
      audio.play().catch(()=>{}); musicBtn.innerText = '🔊';
    } else {
      audio.pause(); musicBtn.innerText = '🔈';
    }
    musicBtn.addEventListener('click', toggleMusic);
  }
  function toggleMusic(){
    if(!audio) return;
    if(audio.paused){ audio.play().catch(()=>{}); musicBtn.innerText='🔊'; localStorage.setItem(MUSIC_KEY,'true'); }
    else { audio.pause(); musicBtn.innerText='🔈'; localStorage.setItem(MUSIC_KEY,'false'); }
  }

  // expose to other modules/games
  window.ArcadeAmor = {
    addPoints,
    markGameCompleted,
    getScore,
    resetProgress,
    showConfetti,
    showFloatingHearts,
    getProgress,
    setProgress
  };

  // init actions (on DOM ready)
  document.addEventListener('DOMContentLoaded', () => {
    updateScoreUI();
    initMusic();

    // reset button (if present)
    const resetBtn = document.getElementById('reset-progress');
    if(resetBtn) resetBtn.addEventListener('click', () => {
      if(confirm('¿Seguro quieres resetear todo el progreso?')) resetProgress();
    });

    // floating hearts only on index
    if(document.body.dataset.page === 'index'){
      // empieza generación lenta de corazones
      heartInterval = setInterval(createHeartOnce, 900);
    }
  });

function crearCorazon() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💛";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s"; 
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(crearCorazon, 800);

function lanzarConfetti() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
}

// Dispara confetti al cargar
window.onload = () => {
    setTimeout(lanzarConfetti, 1000);
};

/* --- extensiones: sfx, achievements y preload --- */
(function(){
  // coloca rutas de sfx (pon tus archivos reales en /sfx/)
  const SFX = {
    correct: 'sfx/correct.mp3',
    wrong: 'sfx/wrong.mp3',
    unlock: 'sfx/unlock.mp3'
  };

  // reproducir sfx (simple)
  function playSfx(key){
    try{
      const path = SFX[key];
      if(!path) return;
      const a = new Audio(path);
      a.volume = 0.9;
      a.play().catch(()=>{ /* ignore autoplay block */ });
    }catch(e){}
  }

  // mostrar modal de logro
  function showAchievement({title = 'Logro', desc = '', emoji = '🎉', ctaText = 'Volver'} = {}){
    const modal = document.getElementById('achievement-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    const t = document.getElementById('ach-title');
    const d = document.getElementById('ach-desc');
    const e = document.getElementById('ach-emoji');
    const cta = document.getElementById('ach-cta');
    t.innerText = title; d.innerText = desc; e.innerText = emoji;
    if(emoji && emoji.length < 3) e.classList.add('big'); else e.classList.remove('big');
    cta.innerText = ctaText;
    playSfx('unlock');
    // close handlers
    function close(){
      modal.setAttribute('aria-hidden','true');
      document.getElementById('close-achievement').removeEventListener('click', close);
      cta.removeEventListener('click', close);
    }
    document.getElementById('close-achievement').addEventListener('click', close);
    cta.addEventListener('click', close);
  }

  // preload images (devuelve promesa)
  function preloadImages(urls = []){
    return Promise.all(urls.map(u => new Promise((resolve) => {
      const i = new Image();
      i.onload = ()=> resolve({url:u, ok:true});
      i.onerror = ()=> resolve({url:u, ok:false});
      i.src = u;
    })));
  }

  // expose
  if(window.ArcadeAmor){
    window.ArcadeAmor.playSfx = playSfx;
    window.ArcadeAmor.showAchievement = showAchievement;
    window.ArcadeAmor.preloadImages = preloadImages;
  }
})();

(function(){
  window.ArcadeAmor = window.ArcadeAmor || {};

  ArcadeAmor.playMusic = function(src){
    if (ArcadeAmor.currentMusic) {
      ArcadeAmor.currentMusic.pause();
      ArcadeAmor.currentMusic = null;
    }
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play().catch(()=>{});
    ArcadeAmor.currentMusic = audio;
  };
})();

/* --- Botón global de regresar al menú --- */
(function(){
  const page = document.body.getAttribute("data-page");
  if(page && page !== "index" && page !== "final"){ 
    // Crear botón fijo
    const menuBtn = document.createElement("button");
    menuBtn.id = "menu-fixed";
    menuBtn.textContent = "← Menú";
    menuBtn.onclick = () => location.href = "../index.html";
    document.body.appendChild(menuBtn);

    // Estilos dinámicos por JS
    const style = document.createElement("style");
    style.textContent = `
      #menu-fixed {
        position: fixed;
        top: 15px;
        left: 15px;
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        background: #ff6b81;
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: background 0.3s;
      }
      #menu-fixed:hover {
        background: #ff4757;
      }
    `;
    document.head.appendChild(style);
  }
})();

})();
