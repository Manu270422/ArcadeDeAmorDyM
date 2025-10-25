/* js/memoria.js */
(function(){
  const imagenes = [
    "../imagenes/foto1.jpg",
    "../imagenes/foto2.jpg",
    "../imagenes/foto3.jpg",
    "../imagenes/foto4.jpg",
    "../imagenes/foto5.jpg",
    "../imagenes/foto6.jpg",
  ]; 

(function(){
  ArcadeAmor.playMusic("../musica/memoria.mp3");
})();

  const grid = document.getElementById("grid");
  const mensaje = document.getElementById("mensaje");

  let cartas = [];
  let seleccionadas = [];
  let parejas = 0;

  function init(){
    const baraja = [...imagenes, ...imagenes].sort(()=>Math.random()-0.5);
    baraja.forEach(src=>{
      const div = document.createElement("div");
      div.className = "card";
      const img = document.createElement("img");
      img.src = src;
      div.appendChild(img);
      div.onclick = ()=> voltear(div);
      grid.appendChild(div);
    });
    cartas = Array.from(document.querySelectorAll(".card"));
  }

  function voltear(card){
    if(seleccionadas.length===2 || card.classList.contains("flipped")) return;
    card.classList.add("flipped");
    seleccionadas.push(card);

    if(seleccionadas.length===2){
      setTimeout(comparar,800);
    }
  }

  function comparar(){
    const [c1,c2] = seleccionadas;
    if(c1.querySelector("img").src === c2.querySelector("img").src){
      parejas++;
      if(parejas === imagenes.length){
        mensaje.textContent = "🎉 ¡Ganaste el Memoria!";
        if(window.ArcadeAmor){
          ArcadeAmor.addPoints(60);
          ArcadeAmor.markGameCompleted("memoria",0);
          ArcadeAmor.showConfetti();
        }
      }
    } else {
      c1.classList.remove("flipped");
      c2.classList.remove("flipped");
    }
    seleccionadas = [];
  }

  init();
})();