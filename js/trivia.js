/* js/trivia.js */
(function(){

  // ▶ Música especial de Trivia
  ArcadeAmor.playMusic("../musica/trivia.mp3");

  // ▶ TODAS LAS PREGUNTAS
  const preguntas = [
    { pregunta: "¿Dónde nos conocimos?", opciones: ["En el colegio","En una fiesta","En el parque","A través de una pantalla"], respuesta: "A través de una pantalla" },
    { pregunta: "¿Dónde nos vimos por primera vez?", opciones: ["En el colegio","En una fiesta","En el parque","En el Pueblo"], respuesta: "En el Pueblo" },
    { pregunta: "¿Cuál es mi comida favorita?", opciones: ["Pizza","Hamburguesa","Pastas","Arroz con pollo"], respuesta: "Pastas" },
    { pregunta: "¿Cuál es mi color favorito?", opciones: ["Azul","Rojo","Verde","Negro"], respuesta: "Azul" },
    { pregunta: "¿Según tú qué fue lo primero que pensé cuando te vi?", opciones: ["Qué linda","Qué rara","Qué seria","Qué graciosa"], respuesta: "Qué linda" },
    { pregunta: "¿Cuál crees que es nuestro lugar soñado para viajar?", opciones: ["París","Cartagena","Madrid","San Andrés"], respuesta: "San Andrés" },
    { pregunta: "¿Según tú qué es lo que más me gusta de ti?", opciones: ["Tu sonrisa","Tus ojos","Tu cabello","Todo"], respuesta: "Todo" },
    { pregunta: "¿Quién es más celoso?", opciones: ["Yo","Tú","Ninguno","Los dos"], respuesta: "Los dos" },
    { pregunta: "¿Qué canción nos representa?", opciones: ["Manicomio","Ay vamos","Quién entiende este amor","Todas"], respuesta: "Todas" },
    { pregunta: "¿Cuál es nuestra fecha más especial?", opciones: ["Tu cumpleaños","Mi cumpleaños","El día que nos vimos","El día que empezamos"], respuesta: "El día que nos vimos" },
    { pregunta: "¿Qué te debo por perder esta trivia?", opciones: ["Un helado","Un beso","Un abrazo","Un baile sexy"], respuesta: "Un beso" },
    { pregunta: "¿Qué te ganas si ganas la trivia?", opciones: ["Un regalo","Un beso","Un masaje","Todo lo que quieras"], respuesta: "Todo lo que quieras" },
    { pregunta: "¿Qué parte de ti me encanta besar?", opciones: ["Tus labios","Tu cuello","Tus mejillas","Todo"], respuesta: "Todo" },
    { pregunta: "Si estamos solos, ¿qué me gusta hacer?", opciones: ["Ver pelis","Besarte","Abrazarte","De todo un poco"], respuesta: "De todo un poco" },
    { pregunta: "¿Qué es lo que más me enamora de ti?", opciones: ["Tu forma de ser","Tu físico","Tu mirada","Todo"], respuesta: "Todo" },
    { pregunta: "¿Dónde me encantaría despertarme contigo?", opciones: ["En una playa","En la montaña","En tu cama","En una cabaña"], respuesta: "En una cabaña" },
    { pregunta: "¿Quién dice más veces 'te amo'?", opciones: ["Yo","Tú","Los dos","Ninguno"], respuesta: "Los dos" },
    { pregunta: "¿Quién es más cursi?", opciones: ["Yo","Tú","Los dos","Nadie"], respuesta: "Yo" },
    { pregunta: "¿Qué pienso cuando me miras fijo?", opciones: ["Qué linda","Qué rara","Qué sexy","Que eres mía"], respuesta: "Que eres mía" },
    { pregunta: "¿Cuál es nuestro plan favorito juntos?", opciones: ["Salir a comer","Ver pelis","Dormir abrazados","Hablar de todo"], respuesta: "Dormir abrazados" },
    { pregunta: "¿Qué día nos dimos nuestro primer beso?", opciones: ["7 de enero", "6 de enero", "8 de enero", "No me acuerdo 😅"], respuesta: "7 de enero" },
    { pregunta: "¿Qué día nos dimos nuestro último beso?", opciones: ["7 de enero", "6 de enero", "8 de enero", "No me acuerdo 😅"], respuesta: "8 de enero" },
    { pregunta: "¿Qué color tenemos en nuestra fecha?", opciones: ["Rojo", "Amarillo", "Negro", "Azul"], respuesta: "Amarillo" },
    { pregunta: "¿Cuándo es nuestra fecha?", opciones: ["27 de abril", "27 de marzo", "27 de mayo", "27 de agosto"], respuesta: "27 de abril" },
    { pregunta: "¿Cuál es mi mayor miedo?", opciones: ["Las alturas", "Perderte a ti", "Las arañas", "Las culebras"], respuesta: "Perderte a ti" },
    { pregunta: "¿Qué es lo primero que hago cuando me despierto?", opciones: ["Revisar el celular", "Pensar en ti", "Ir al baño", "Dormir 5 minutos más"], respuesta: "Revisar el celular" },
    { pregunta: "¿Cuál es mi sueño más grande?", opciones: ["Ser millonario", "Viajar contigo por el mundo", "Tener una mansión"], respuesta: "Viajar contigo por el mundo" },
    { pregunta: "¿Qué significa que alguien te regale una rosa roja?", opciones: ["Amistad", "Amor verdadero", "Suerte", "Alegría"], respuesta: "Amor verdadero" },
    { pregunta: "¿Cuál es la fecha del Día de San Valentín?", opciones: ["1 de febrero", "14 de febrero", "21 de marzo", "25 de diciembre"], respuesta: "14 de febrero" },
    { pregunta: "¿Qué representa el emoji 💍?", opciones: ["Una amistad", "Un juego", "Una propuesta de matrimonio", "Una corona"], respuesta: "Una propuesta de matrimonio" },
    { pregunta: "¿Qué animal es considerado símbolo del amor eterno?", opciones: ["Gato", "Lobo", "Pingüino", "Delfín"], respuesta: "Pingüino" },
    { pregunta: "¿Cómo se llama el ogro verde famoso de DreamWorks?", opciones: ["Hulk", "Shrek", "Mike", "Bob"], respuesta: "Shrek" },
    { pregunta: "¿Cuál es la capital de Francia?", opciones: ["Berlín", "Madrid", "París", "Roma"], respuesta: "París" },
    { pregunta: "¿Qué planeta es conocido como el planeta rojo?", opciones: ["Júpiter", "Marte", "Venus", "Saturno"], respuesta: "Marte" },
    { pregunta: "¿Cuántos continentes hay en el mundo?", opciones: ["5", "6", "7", "8"], respuesta: "7" },
    { pregunta: "¿Cuál es el océano más grande?", opciones: ["Índico", "Atlántico", "Pacífico", "Ártico"], respuesta: "Pacífico" },
    { pregunta: "¿En qué país se encuentra la Torre Eiffel?", opciones: ["Italia", "Francia", "España", "Alemania"], respuesta: "Francia" },
    { pregunta: "¿Qué prefiero en una cita?", opciones: ["Cine", "Picnic", "Atardecer en la playa", "Fiesta"], respuesta: "Atardecer en la playa" },
    { pregunta: "¿Cuál es mi sabor favorito de helado?", opciones: ["Vainilla", "Chocolate", "Fresa", "Menta"], respuesta: "Chocolate" },
    { pregunta: "¿Qué emoji usarías para decir \"me gustas\"?", opciones: ["😂", "😍", "😡", "🐷"], respuesta: "😍" },
    { pregunta: "¿Según yo qué canción te haría llorar?", opciones: ["Si estuviésemos juntos - Bad Bunny", "Lugar Seguro - Jay Wheeler", "Un peso - J Balvin", "Amorfoda - Bad Bunny"], respuesta: "Si estuviésemos juntos - Bad Bunny" },
    { pregunta: "¿Qué elegiría como plan perfecto?", opciones: ["Maratón de pelis", "Gimnasio", "Fiesta", "Dormir todo el día"], respuesta: "Maratón de pelis" },
    { pregunta: "¿Cuál es el animal terrestre más rápido?", opciones: ["León", "Chita", "Caballo", "Elefante"], respuesta: "Chita" },
    { pregunta: "¿Qué animal representa la sabiduría?", opciones: ["Gato", "Búho", "Delfín", "Tigre"], respuesta: "Búho" },
    { pregunta: "¿Cuál es el animal más grande del planeta?", opciones: ["Elefante", "Tiburón blanco", "Ballena azul", "Jirafa"], respuesta: "Ballena azul" },
    { pregunta: "¿Qué animal salta y lleva a su cría en una bolsa?", opciones: ["Lobo", "Canguro", "Perro", "Mono"], respuesta: "Canguro" },
    { pregunta: "¿Cuál de estos animales puede dormir de pie?", opciones: ["Gato", "Caballo", "Perro", "Gallo"], respuesta: "Caballo" },
    { pregunta: "¿Cuál es el órgano más grande del cuerpo humano?", opciones: ["Cerebro", "Piel", "Hígado", "Estómago"], respuesta: "Piel" },
    { pregunta: "¿Cuántos colores tiene el arcoíris?", opciones: ["5", "6", "7", "8"], respuesta: "7" },
    { pregunta: "¿Qué fruta flota en el agua?", opciones: ["Uva", "Sandía", "Manzana", "Banana"], respuesta: "Manzana" },
    { pregunta: "¿Cuánto tiempo tarda la luz del sol en llegar a la Tierra?", opciones: ["2 segundos", "8 minutos", "1 hora", "30 segundos"], respuesta: "8 minutos" },
    { pregunta: "¿Cuál es el metal más liviano?", opciones: ["Aluminio", "Hierro", "Litio", "Cobre"], respuesta: "Litio" },
    { pregunta: "¿Cuál es mi color favorito?", opciones: ["Azul", "Rojo", "Negro", "Verde"], respuesta: "Azul" },
    { pregunta: "¿Qué es lo que más me molesta?", opciones: ["El calor", "La mentira", "El desorden", "Los gritos"], respuesta: "La mentira" },
    { pregunta: "¿Cuál es mi película favorita de todos los tiempos?", opciones: ["Avengers", "Rápidos y Furiosos", "Interestelar", "El Rey León"], respuesta: "Rápidos y Furiosos" },
    { pregunta: "¿Qué haría si tuviera un millón de pesos?", opciones: ["Comprarme ropa", "Invertirlo", "Invitarte a viajar", "Guardarlo todo"], respuesta: "Invitarte a viajar" },
    { pregunta: "¿A qué lugar del mundo me gustaría llevarte primero?", opciones: ["París", "Miami", "Londres", "Roma"], respuesta: "París" },
    { pregunta: "Si vamos a la playa, ¿qué haríamos primero?", opciones: ["Jugar en el agua", "Tomar fotos juntos", "Comer una picada", "Buscar caracoles"], respuesta: "Tomar fotos juntos" },
    { pregunta: "¿Cuál de estas fechas me encantaría repetir contigo cada año?", opciones: ["San Valentín", "Nuestro aniversario", "Navidad", "Tu cumpleaños"], respuesta: "Nuestro aniversario" },
    { pregunta: "¿Qué plan me gustaría más contigo?", opciones: ["Viaje en globo", "Cine y comida", "Cabaña en la montaña", "Fiesta hasta el amanecer"], respuesta: "Cabaña en la montaña" },
    { pregunta: "¿A qué país te gustaría que viajáramos por nuestro aniversario?", opciones: ["Italia", "Francia", "Inglaterra", "EE.UU"], respuesta: "Inglaterra" },
    { pregunta: "¿Cuál es mi serie favorita?", opciones: ["Peaky Blinders", "La Casa de Papel", "Flash", "El juego del calamar"], respuesta: "La Casa de Papel" },
    { pregunta: "¿Qué parte del cuerpo me gusta más de ti?", opciones: ["Tus labios", "Tus ojos", "Tu cabello", "Tus manos"], respuesta: "Tus ojos" },
    { pregunta: "¿Cómo reacciono cuando estoy celoso?", opciones: ["Te lo digo", "Me pongo raro", "Me río", "Me alejo"], respuesta: "Me pongo raro" },
    { pregunta: "¿Qué música me hace pensar en ti?", opciones: ["Reguetón", "Bachata", "Baladas románticas", "Rock"], respuesta: "Baladas románticas" },
    { pregunta: "¿Cuál de estos apodos te he dicho más?", opciones: ["Mi reina", "Bebe", "Amor", "Mami"], respuesta: "Amor" },
    { pregunta: "¿Qué harías si nos regalamos un día sin celular?", opciones: ["Dormir", "Abrazarnos y ver pelis", "Ir al parque", "Jugar a mirarnos"], respuesta: "Abrazarnos y ver pelis" },
    { pregunta: "¿Cuál sería tu cita ideal conmigo?", opciones: ["Cena elegante", "Maratón de pelis en cama", "Día en el centro comercial", "Ir a bailar"], respuesta: "Maratón de pelis en cama" },
    { pregunta: "¿Qué preferirías que te regale?", opciones: ["Ropa", "Cartas escritas por mí", "Perfume", "Un peluche"], respuesta: "Un peluche" },
    { pregunta: "¿Cuál de estos animales me describes más?", opciones: ["León", "Perrito fiel", "Gato", "Panda"], respuesta: "Perrito fiel" },
    { pregunta: "¿Qué te enamora más de mí?", opciones: ["Mi voz", "Cómo te cuido", "Mi sentido del humor", "Mis besos"], respuesta: "Cómo te cuido" },
    { pregunta: "Si fuéramos personajes de película, ¿qué seríamos?", opciones: ["Shrek y Fiona", "Barbie y Ken", "Elsa y Olaf", "Harry y Hermione"], respuesta: "Shrek y Fiona" },
    { pregunta: "¿Qué superpoder me gustaría tener para estar contigo?", opciones: ["Volar", "Leer tu mente", "Teletransportarme", "Ser invisible"], respuesta: "Teletransportarme" },
    { pregunta: "¿Qué emoji usarías para describirnos?", opciones: ["❤️🔥", "🐻💕", "💑", "😍😜"], respuesta: "💑" },
    { pregunta: "¿Qué canción pondríamos como nuestro himno?", opciones: ["Ay vamos - J Balvin", "Manicomio - Cosculluela", "La Bachata - Manuel Turizo", "Tusa - Karol G"], respuesta: "Ay vamos - J Balvin" },
    { pregunta: "¿Qué prefieres hacer un viernes por la noche?", opciones: ["Dormir", "Ver películas contigo en cama", "Salir a bailar", "Comer algo rico"], respuesta: "Ver películas contigo en cama" },
    { pregunta: "¿Qué prefieres que te dé antes de dormir?", opciones: ["Un abrazo", "Un beso en la frente", "El ñakañaka", "Un mensaje de voz"], respuesta: "El ñakañaka" },
    { pregunta: "¿Qué prefieres que te diga?", opciones: ["Te amo", "Me encantas", "No puedo dejar de pensar en ti", "Te extraño"], respuesta: "No puedo dejar de pensar en ti" },
    { pregunta: "¿Qué prefieres en un día lluvioso conmigo?", opciones: ["Ver películas abrazados", "Cocinar juntos", "Dormir", "Hablar por horas"], respuesta: "Ver películas abrazados" },
    { pregunta: "¿Qué prefieres: besos en…?", opciones: ["Los labios", "El cuello", "La frente", "La espalda"], respuesta: "Los labios" },
    { pregunta: "¿Qué prefieres que te haga en una cita sorpresa?", opciones: ["Un picnic", "Una carta romántica", "Un masaje casero", "Una canción dedicada"], respuesta: "Un picnic" },    
  ];

  // ▶ Mezclar preguntas
  let orden = preguntas.map((_,i)=>i).sort(()=>Math.random()-0.5);
  let indice = 0;
  let aciertos = 0;

  const preguntaEl = document.getElementById('pregunta');
  const opcionesEl = document.getElementById('opciones');
  const resultadoEl = document.getElementById('resultado');
  const contadorEl = document.getElementById('contador');
  const siguienteBtn = document.getElementById('siguiente');

  function mostrar(){
    resultadoEl.innerText = '';
    opcionesEl.innerHTML = '';
    const obj = preguntas[orden[indice]];
    preguntaEl.innerText = obj.pregunta;
    contadorEl.innerText = `Pregunta ${indice+1} de ${preguntas.length}`;

    obj.opciones.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'opcion';
      b.innerText = opt;
      b.onclick = () => seleccionar(b, opt, obj.respuesta);
      opcionesEl.appendChild(b);
    });
  }

  function seleccionar(btn, elegido, correcto){
    Array.from(opcionesEl.children).forEach(x => x.classList.add('disabled'));
    if(elegido === correcto){
      resultadoEl.innerText = '✅ ¡Correcto!';
      resultadoEl.style.color = '#118f3e';
      aciertos++;
      btn.style.background = '#d6f8e0';
      if(window.ArcadeAmor) ArcadeAmor.playSfx('correct');
    } else {
      resultadoEl.innerText = '❌ Ups... la correcta era: ' + correcto;
      resultadoEl.style.color = '#c53030';
      btn.style.background = '#ffd6d6';
      Array.from(opcionesEl.children).forEach(x => {
        if(x.innerText === correcto) x.style.background = '#d6f8e0';
      });
      if(window.ArcadeAmor) ArcadeAmor.playSfx('wrong');
    }
  }

  function siguiente(){
    if(indice < orden.length - 1){
      indice++; mostrar();
    } else {
      terminar();
    }
  }

  function terminar(){
    const total = preguntas.length;
    const porcentaje = Math.round((aciertos/total)*100);
    let medalla = '';
    if(porcentaje >= 90) medalla = '🥇';
    else if(porcentaje >= 70) medalla = '🥈';
    else if(porcentaje >= 50) medalla = '🥉';

    resultadoEl.innerText = `🎉 Terminaste — Aciertos: ${aciertos} / ${total} → ${porcentaje}% ${medalla}`;
    resultadoEl.style.color = '#2a2a72';
    opcionesEl.innerHTML = '';
    contadorEl.innerText = '¡Felicidades!';
    siguienteBtn.style.display = 'none';

    const puntosGanados = aciertos * 10;
    if(window.ArcadeAmor){
      ArcadeAmor.addPoints(puntosGanados);
      ArcadeAmor.markGameCompleted('trivia',0);
      if(porcentaje >= 70) ArcadeAmor.showConfetti();
      else ArcadeAmor.showFloatingHearts(12);
    }
  }

  siguienteBtn.addEventListener('click', siguiente);
  document.addEventListener('DOMContentLoaded', mostrar);

})();
