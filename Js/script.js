/* ========= Árbol de Amor v2 — script.js ========= */

/* ----- Generador de enlaces offline (opcional) ----- */
const genBtn=document.getElementById('gen-btn');
if(genBtn){
  genBtn.addEventListener('click',()=>{
    const name = encodeURIComponent(document.getElementById('gen-name').value.trim());
    const msg  = encodeURIComponent(document.getElementById('gen-msg').value.trim().replace(/\n/g,'\\n'));
    const sig  = encodeURIComponent(document.getElementById('gen-firma').value.trim());
    const mus  = encodeURIComponent(document.getElementById('gen-mus').value.trim());
    let url = location.origin+location.pathname+'?';
    url += name ? `text=Querida%20${name}%3A%0A%0A${msg}&` : `text=${msg}&`;
    if(sig) url+=`firma=${sig}&`;
    if(mus) url+=`musica=${mus}&`;
    url+='start=2024-08-03&event=2025-08-03';
    document.getElementById('gen-link').textContent = url;
    navigator.clipboard.writeText(url).catch(()=>{});
  });
}

/* -------------------- Utils -------------------- */
const $ = s=>document.querySelector(s);
const $$ = s=>document.querySelectorAll(s);
const getParam = k => new URLSearchParams(location.search).get(k);

/* ---------------- Cargar SVG ------------------ */
fetch('Img/treelove.svg')
  .then(r=>{if(!r.ok)throw new Error('SVG no encontrado');return r.text();})
  .then(txt=>{
    $('#tree-container').innerHTML = txt;
    const svg = $('#tree-container svg'); if(!svg)return;

    /* Preparar paths */
    const paths=[...svg.querySelectorAll('path')];
    paths.forEach(p=>{
      const len=p.getTotalLength();
      Object.assign(p.style,{
        stroke:'#222',strokeWidth:'2.5',fillOpacity:0,
        strokeDasharray:len,strokeDashoffset:len
      });
    });

    /* Dibujar */
    setTimeout(()=>{
      paths.forEach((p,i)=>{
        p.style.transition=
          `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i*.08}s,
           fill-opacity .5s ${.9+i*.08}s`;
        p.style.strokeDashoffset=0;
        setTimeout(()=>{p.style.fillOpacity=1;p.style.stroke='';p.style.strokeWidth='';},1200+i*80);
      });

      const total=1200+(paths.length-1)*80+500;
      setTimeout(()=>{
        svg.classList.add('move-and-scale');
        setTimeout(()=>{
          showDedicationText();
          if(getParam('petalos')!=='no') spawnPetals();
          showCountdown();
          initMusic();
        },1200);
      },total);
    },60);

    /* Corazones latidos */
    paths.filter(p=>{
      const st=p.getAttribute('style')||''; return st.includes('#FC6F58')||st.includes('#C1321F');
    }).forEach(p=>p.classList.add('heart-beat'));
  })
  .catch(e=>{document.body.innerHTML=`<h2 style="margin-top:40vh;text-align:center;color:#e60026">${e.message}</h2>`});

/* ------------ Máquina de escribir ------------- */
function showDedicationText(){
  let txt=getParam('text');
  txt = txt ? decodeURIComponent(txt).replace(/\\n/g,'\n')
            : 'Para el amor de mi vida:\n\nDesde el primer momento supe que eras tú...';

  const box=$('#dedication-text'); box.classList.add('typing');
  let i=0;
  (function type(){
    if(i<=txt.length){
      box.textContent = txt.slice(0,i++);
      setTimeout(type, txt[i-2]==='\n'?350:45);
    }else setTimeout(showSignature,600);
  })();
}
function showSignature(){
  const box=$('#dedication-text');
  let sig=$('#signature');
  if(!sig){sig=document.createElement('div');sig.id='signature';sig.className='signature';box.appendChild(sig);}
  sig.textContent = getParam('firma') ? decodeURIComponent(getParam('firma')) : 'Con amor, Zero';
  sig.classList.add('visible');
}

/* ------------- Pétalos flotantes -------------- */
function spawnPetals(){
  const c=$('#floating-objects');
  let n=0; (function spawn(){
    const el=document.createElement('div');el.className='floating-petal';
    el.style.cssText=`left:${Math.random()*90+2}%;top:${100+Math.random()*10}%;
      opacity:${0.7+Math.random()*0.3}`;
    c.appendChild(el);
    const dur=6000+Math.random()*4000, drift=(Math.random()-0.5)*60;
    setTimeout(()=>{
      el.style.transition=`transform ${dur}ms linear, opacity 1.2s`;
      el.style.transform=`translate(${drift}px,-110vh) scale(${0.8+Math.random()*0.6}) rotate(${Math.random()*360}deg)`;
      el.style.opacity=.2;
    },30);
    setTimeout(()=>el.remove(),dur+2000);
    setTimeout(spawn, n++<32?350+Math.random()*500:1200+Math.random()*1200);
  })();
}

/* ------------- Cuenta regresiva -------------- */
function showCountdown(){
  const box=$('#countdown');
  const start=new Date((getParam('start')||'2024-08-03')+'T00:00:00');
  const event=new Date((getParam('event')||'2025-08-03')+'T00:00:00');
  function update(){
    const now=new Date();
    const days = Math.floor((now-start)/864e5);
    const diff = event-now;
    const ed   = Math.max(0,Math.floor(diff/864e5));
    const eh   = Math.max(0,Math.floor(diff/36e5)%24);
    const em   = Math.max(0,Math.floor(diff/6e4)%60);
    const es   = Math.max(0,Math.floor(diff/1e3)%60);
    box.innerHTML=`Llevamos juntos: <b>${days}</b> días<br>Aniversario en: <b>${ed}d ${eh}h ${em}m ${es}s</b>`;
    box.classList.add('visible');
  }
  update(); setInterval(update,1000);
}

/* ----------------- Música ------------------ */
function initMusic(){
  const audio=$('#bg-music'); if(!audio)return;
  const userMus=getParam('musica');
  if(userMus) audio.src='Music/'+decodeURIComponent(userMus).replace(/[^\w\d .\-]/g,'');
  audio.loop=true; audio.volume=.7;

  let btn=$('#music-btn');
  if(!btn){
    btn=document.createElement('button');btn.id='music-btn';btn.textContent='🔊 Música';
    Object.assign(btn.style,{position:'fixed',bottom:'18px',right:'18px',zIndex:99,
      background:'rgba(255,255,255,0.85)',border:'none',borderRadius:'24px',
      padding:'10px 18px',fontSize:'1.1em',cursor:'pointer'});
    document.body.appendChild(btn);
  }
  function play(){audio.play().then(()=>btn.textContent='🔊 Música').catch(()=>btn.textContent='▶️ Música');}
  play();
  btn.onclick=()=>{audio.paused?play():(audio.pause(),btn.textContent='🔈 Música');};
}
