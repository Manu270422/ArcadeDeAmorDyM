/* js/ui-extras.js */
(function(){
  // easter egg: 5 clicks en logo
  const logo = document.getElementById('arcade-logo');
  let clicks = 0, last = 0;
  if(logo){
    logo.addEventListener('click', () => {
      const now = Date.now();
      if(now - last > 1500) clicks = 0;
      clicks++; last = now;
      logo.classList.add('easter');
      setTimeout(()=> logo.classList.remove('easter'), 900);
      if(clicks >= 5){
        // abrir galería secreta
        const g = document.getElementById('secret-gallery');
        const content = document.getElementById('secret-content');
        if(g && content){
          content.innerHTML = `
            <h3 style="text-align:center;margin-bottom:14px">🌹 Galería Secreta 🌹</h3>
            <div class="carousel">
              <div class="carousel-track">
                <div class="carousel-slide"><img src="imagenes/1000812091.jpg" alt="foto 1"><p class="caption">Nuestro inicio 💕</p></div>
                <div class="carousel-slide"><img src="imagenes/1000812092.jpg" alt="foto 2"><p class="caption">Una cita inolvidable ✨</p></div>
                <div class="carousel-slide"><img src="imagenes/1000812093.jpg" alt="foto 3"><p class="caption">Tus sonrisas me matan 😍</p></div>
                <div class="carousel-slide"><img src="imagenes/1000812094.jpg" alt="foto 4"><p class="caption">Momentos juntos 💑</p></div>
                <div class="carousel-slide"><img src="imagenes/1000812095.jpg" alt="foto 5"><p class="caption">Mi lugar favorito: a tu lado 💖</p></div>
                <div class="carousel-slide"><img src="imagenes/1000812096.jpg" alt="foto 6"><p class="caption">Nuestro futuro 💍</p></div>
              </div>
              <button class="carousel-btn prev">‹</button>
              <button class="carousel-btn next">›</button>
            </div>
          `;
          g.setAttribute('aria-hidden','false');
          document.getElementById('close-secret').addEventListener('click', ()=> g.setAttribute('aria-hidden','true'), {once:true});

          // lógica carrusel
          const track = content.querySelector('.carousel-track');
          const slides = Array.from(track.children);
          const prevBtn = content.querySelector('.carousel-btn.prev');
          const nextBtn = content.querySelector('.carousel-btn.next');
          let index = 0;

          function updateSlide(){
            track.style.transform = `translateX(-${index * 100}%)`;
          }

          prevBtn.addEventListener('click', ()=>{
            index = (index - 1 + slides.length) % slides.length;
            updateSlide();
          });
          nextBtn.addEventListener('click', ()=>{
            index = (index + 1) % slides.length;
            updateSlide();
          });
        }
        clicks = 0;
      }
    });
  }

  // Cuando ArcadeAmor marque juego completado, mostramos un logro festival
  function onGameComplete(slug){
    if(window.ArcadeAmor && typeof window.ArcadeAmor.showAchievement === 'function'){
      const titles = {
        trivia: 'Genio de la Trivia',
        ahorcado: 'Salvador de palabras',
        memoria: 'Guardiana de recuerdos',
        sorpresa: 'Corazón desbloqueado'
      };
      const desc = {
        trivia: 'Acertaste todas las preguntas, te conozco como nadie.',
        ahorcado: 'Adivinaste la frase misteriosa. Bravo.',
        memoria: 'Armaste todos los recuerdos. Qué lindo.',
        sorpresa: 'Leíste la carta. Gracias por sentir.'
      };
      window.ArcadeAmor.showAchievement({
        title: titles[slug] || 'Logro desbloqueado',
        desc: desc[slug] || 'Has completado algo bonito',
        emoji: '💖',
        ctaText: 'Seguir jugando'
      });
    }
  }

  // Monkey patch si markGameCompleted existe
  if(window.ArcadeAmor && typeof window.ArcadeAmor.markGameCompleted === 'function'){
    const orig = window.ArcadeAmor.markGameCompleted;
    window.ArcadeAmor.markGameCompleted = function(slug, pts){
      orig(slug, pts);
      try { onGameComplete(slug); } catch(e){}
    };
  }
})();