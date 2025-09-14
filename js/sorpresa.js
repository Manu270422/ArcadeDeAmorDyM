/* js/sorpresa.js */
(function(){
  const btn = document.getElementById("mostrar");
  const texto = document.getElementById("texto");
  const corazones = document.getElementById("corazones");

(function(){
  ArcadeAmor.playMusic("../musica/sorpresa.mp3");

})();

btn.addEventListener("click", ()=>{
  texto.innerHTML = `
  Mi gorda hermosa, desde que llegaste a mi vida todo cambió. 
  No sé cómo explicarlo en pocas palabras, pero contigo todo tiene más sentido.  
  Eres mi paz en los días difíciles, mi alegría en las horas más simples, 
  y la razón por la que cada mañana quiero ser mejor.  

  Tal vez no siempre te diga todo lo que siento, 
  porque soy de pocas palabras, pero cada gesto, 
  cada mirada y cada pensamiento mío está lleno de ti.  

  Quiero que sepas que te llevo en mi mente a cada momento 
  y en mi corazón para siempre.  
  No hay distancia ni tiempo que pueda cambiar lo que siento. 
  
  Eres mi razón de vivir y sin ti no sé que sería de mí.
  Gracias por llegar a mi vida, aunque eres un tormento, que
  no sé ni como te soporto a diario. Pero me encanta estar
  a tu lado y vivir buenos momentos de tu lado.

  Anhelo y aspiro poder encontrarnos de nuevo, pasar tiempo
  juntos y estar tomados de la mano, estar felices y sentir
  esa paz y felicidad.

  Me haces el hombre más feliz del mundo, sé que no he sido
  el mejor hombre para ti y te he tratado de lo peor, pero 
  creeme que no es mi intención tratarte así, yo solo quiero
  lo mejor para los dos y estoy muy arrepentido de cómo te he tratado
  durante todo este tiempo. 

  Quiero divertirme contigo, salir a pasear, a comer, a jugar, tomarnos
  fotos, grabar videos y guardar esos momentos únicos e inigualables.

  Te amo mucho mi cachetona hermosa, por ti lo que sea, por ti muevo
  cielo, mar y tierra. Eres mi todo y siempre serás mía.

  Espero con ansías el día en el que me digas que sí frente a un altar
  y me des el beso, ese día sería el hombre más feliz del mundo.

  También sería el hombre más feliz el día que me entere que estamos 
  esperando una mini versión de nosotros. 

  Quiero que le demos una muy buena vida a nuestros niños, lo sepamos 
  criar muy bien y antes todo poner a Dios sobre todas las cosas. Sin Dios
  no somos nada y con él todo es posible. 

  Quiero que seamos una familia unida, que no hayan discusiones en casa, estar siempre
  unidos y ser una gran familia, nosotros seremos el ejemplo a seguir de nuestros hijos. 

  Gracias por ser mi apoyo, mi inspiración y mi mejor regalo de la vida.  
  Te amo con un amor sincero, fuerte y eterno. 💕
  `;
  corazones.innerText = "💖💘💞💕💓💗💝";
  if(window.ArcadeAmor){
    ArcadeAmor.addPoints(40);
    ArcadeAmor.markGameCompleted("sorpresa",0);
    ArcadeAmor.showFloatingHearts(15);
  }
  btn.style.display="none";
});
})();
