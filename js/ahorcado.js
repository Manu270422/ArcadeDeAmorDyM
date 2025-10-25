/* js/ahorcado.js */
(function(){
  const palabras = [
    "TE AMO",
    "ERES MI VIDA",
    "MI CIELO",
    "MI TESORO",
    "CONTIGO SIEMPRE",
    "TE QUIERO",
    "ERES MI TODO",
    "MI CORAZON",
    "SIN TI NO SE QUE SERIA DE MI",
    "MI MEDIA NARANJA",
    "JUNTOS POR SIEMPRE",
    "ERES MI HOGAR",
    "HASTA QUE LA MUERTE NOS SEPARE",
    "MI MOTIVO",
    "TE EXTRAÑO CADA MAÑANA CADA TARDE Y CADA NOCHE",
    "ERES PERFECTA",
    "MI RAZON DE VIVIR",
    "TU MIRADA ME FASCINA",
    "ERES MI SUEÑO",
    "NUESTRO AMOR ES ETERNO",
    "JUNTOS DE LA MANO DE DIOS",
    "MI RAZON DE SER",
    "TE NECESITO SIEMPRE A MI LADO",
    "AMOR ETERNO",
    "SIEMPRE TU",
    "MI LUZ",
    "ERES UNICA E INIGUALABLE",
    "ABRAZOS DESDE LA DISTANCIA",
    "BESOS EN ESOS CACHETITOS",
    "NUNCA TE VAYAS DE MI VIDA",
    "ERES MI PAZ",
    "VIAJEMOS JUNTOS POR TODO EL MUNDO",
    "MI COMPAÑERA",
    "ERES MI SOL"
  ];

  // Música de fondo (si ArcadeAmor está disponible)
  (function(){
    if(window.ArcadeAmor){
      window.ArcadeAmor.playMusic("../musica/ahorcado.mp3");
    }
  })();

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const palabraEl = document.getElementById("palabra");
  const letrasEl = document.getElementById("letras");
  const mensajeEl = document.getElementById("mensaje");

  let indice = 0;
  let palabra, progreso, errores;
  const maxErrores = 6;

  function iniciarRonda(){
    // limpiar todo
    ctx.clearRect(0,0,canvas.width,canvas.height);
    letrasEl.innerHTML = "";
    mensajeEl.textContent = "";

    palabra = palabras[indice];
    progreso = Array(palabra.length).fill("_");
    for(let i=0;i<palabra.length;i++){
      if(palabra[i] === " ") progreso[i] = " ";
    }
    errores = 0;

    mostrarPalabra();
    crearBotones();
  }

  function mostrarPalabra(){
    palabraEl.textContent = progreso.join(" ");
  }

  function dibujarParte(n){
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#333";
    if(n===1){ ctx.beginPath(); ctx.moveTo(10,190); ctx.lineTo(190,190); ctx.stroke(); }
    if(n===2){ ctx.beginPath(); ctx.moveTo(50,190); ctx.lineTo(50,20); ctx.lineTo(130,20); ctx.lineTo(130,40); ctx.stroke(); }
    if(n===3){ ctx.beginPath(); ctx.arc(130,55,15,0,Math.PI*2); ctx.stroke(); }
    if(n===4){ ctx.beginPath(); ctx.moveTo(130,70); ctx.lineTo(130,120); ctx.stroke(); }
    if(n===5){ ctx.beginPath(); ctx.moveTo(130,80); ctx.lineTo(110,100); ctx.moveTo(130,80); ctx.lineTo(150,100); ctx.stroke(); }
    if(n===6){ ctx.beginPath(); ctx.moveTo(130,120); ctx.lineTo(110,150); ctx.moveTo(130,120); ctx.lineTo(150,150); ctx.stroke(); }
  }

  function crearBotones(){
    const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    abecedario.forEach(l => {
      const b = document.createElement("button");
      b.textContent = l;
      b.onclick = () => seleccionarLetra(b, l);
      letrasEl.appendChild(b);
    });
  }

  function seleccionarLetra(btn, letra){
    btn.disabled = true;
    let acierto = false;
    for(let i=0;i<palabra.length;i++){
      if(palabra[i]===letra){
        progreso[i] = letra;
        acierto = true;
      }
    }
    if(!acierto){
      errores++;
      dibujarParte(errores);
    }
    mostrarPalabra();
    revisarEstado();
  }

  function revisarEstado(){
    if(!progreso.includes("_")){
      mensajeEl.textContent = "🎉 ¡Ganaste!";
      if(window.ArcadeAmor){
        ArcadeAmor.addPoints(50);
        ArcadeAmor.showConfetti();
        ArcadeAmor.playSfx("win");
      }
      letrasEl.innerHTML = "";

      setTimeout(()=>{
        indice++;
        if(indice < palabras.length){
          iniciarRonda(); // pasa a la siguiente
        } else {
          mensajeEl.textContent = "🏆 ¡Ganaste todas las frases!";
        }
      }, 1500);

    } else if(errores >= maxErrores){
      mensajeEl.textContent = "😢 Perdiste. Era: " + palabra;
      letrasEl.innerHTML = "";
      if(window.ArcadeAmor) ArcadeAmor.playSfx("lose");

      // Reinicia automáticamente tras 2s
      setTimeout(()=> iniciarRonda(), 2000);
    }
  }

  // Control con teclado además de botones
  document.addEventListener("keydown", e => {
    const letra = e.key.toUpperCase();
    const btn = [...letrasEl.querySelectorAll("button")].find(b => b.textContent === letra);
    if(btn && !btn.disabled){
      btn.click();
    }
  });

  if(window.ArcadeAmor){
    window.ArcadeAmor.playSfx('unlock');
  }

  // inicio
  iniciarRonda();
})();