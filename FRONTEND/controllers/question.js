const categorias = [
    "Star Wars", "Marvel", "Dragon Ball", "Naruto", "One Piece", "Death Note",
    "Pokemon", "Inazuma Eleven", "LeagueOfLegends", "Zelda", "Minecraft",
    "Mario", "Halo", "GearsOfWar", "Bob Esponja"
];
const colores = [
    "#FF5733", 
    "#C70039", 
    "#900C3F", 
    "#581845", 
    "#1F618D", 
    "#154360", 
    "#117864", 
    "#229954", 
    "#A04000", 
    "#884EA0", 
    "#2C3E50", 
    "#E67E22", 
    "#D35400", 
    "#34495E", 
    "#7D3C98"  
];

let rotationValue = 0;
let seleccionadas = [];
let coloresSeleccionados = []; 

function setRouellete(){
    seleccionadas = categorias.sort(() => 0.5 - Math.random()).slice(0, 5);
    coloresSeleccionados = colores.sort(() => 0.5 - Math.random()).slice(0, 5);
    const ruleta = document.getElementById("ruleta");
    ruleta.innerHTML = "";

    seleccionadas.forEach((categoria, i) => {
        const div = document.createElement("div");
        div.className = "category";
        div.style.setProperty('--i', i + 1);
        div.style.setProperty('--clr', coloresSeleccionados[i % coloresSeleccionados.length]);
        div.innerHTML = `<span>${categoria}</span>`;
        ruleta.appendChild(div);        
    });
    let jugadores = parseInt(localStorage.getItem('totalJugadores'), 10) || 1;
    if(jugadores != 1){
        const turno = parseInt(localStorage.getItem('turno'), 10);
        const h1 = document.getElementById('turno')
        h1.textContent = `Turno del jugador: ${turno}`;
    }
}

function spinRoullete(){
    const roulette = document.querySelector(".wheel");
    const extra = Math.floor(Math.random() * 360);
    rotationValue += 360 * (5 + Math.floor(Math.random() * 5)) + extra;
    roulette.style.transform = `rotate(${rotationValue}deg)`;
}

function categoriaGanadora(rotationDeg, categorias) {
    const grados = ((rotationDeg % 360) + 360) % 360;
    const index = Math.floor(((360 - grados) % 360) / 72);
    return categorias[index];
}

function transicion(){
    const ganadora = categoriaGanadora(rotationValue, seleccionadas);
    window.categoriaSeleccionada = ganadora;
    const modalTexto = document.getElementById("categoriaGanadoraTexto");
    modalTexto.textContent = ganadora;
    const modal = new bootstrap.Modal(document.getElementById('categoriaModal'));
    modal.show();
}

function incrementarRonda() {
    let actual = parseInt(localStorage.getItem('rondaActual'), 10) || 1;
    let rondaActualReal = parseInt(localStorage.getItem('rondaActualReal'), 10) || 1;
    let jugadores = parseInt(localStorage.getItem('totalJugadores'), 10) || 1;
    let turno = parseInt(localStorage.getItem('turno'), 10);
    rondaActualReal +=1;
    actual = Math.ceil(rondaActualReal/jugadores);
    turno = ((rondaActualReal-1)%jugadores) + 1
    localStorage.setItem('rondaActual', actual);
    localStorage.setItem('rondaActualReal', rondaActualReal);
    localStorage.setItem('turno',turno);
}

function verificarFinDeJuego() {
    const total  = Number(localStorage.getItem('totalRondas'));
    const actual = Number(localStorage.getItem('rondaActual'));

    if (actual > total) {
        const scores = JSON.parse(localStorage.getItem('scores'));
        const totalJugadores = Number(localStorage.getItem('totalJugadores'));
        let html = '';
        if (totalJugadores === 1) {
            html = `Obtuviste ${scores[0]} puntos`;
        } else {
            html = '<h5 class="mb-3">Puntuación final</h5><ul class="list-unstyled">';
            scores.forEach((sc, i) => {
                html += `<li>Jugador ${i + 1}: <strong>${sc} pts</strong></li>`;
            });
            html += '</ul>';
        }
        document.getElementById('textoScoreFinal').innerHTML = html;
        const modalScore = bootstrap.Modal.getOrCreateInstance(
            document.getElementById('finalScoreModal')
        );
        modalScore.show();

        if (totalJugadores === 1) {
            const scores = JSON.parse(localStorage.getItem('scores') || '[0]');
            const scoreFinal = scores[0];
            guardarRecordSiEsMayor(scoreFinal);
        }

        modalScore._element.querySelector('#btnBackHome').addEventListener('click', () => window.location.href='Home.html', { once:true });
        ['rondaActual','totalRondas','scores','score','rondaActualReal','turno'].forEach(k => localStorage.removeItem(k));

        return true;
    }
    return false;
}

function guardarRecordSiEsMayor (nuevoScore) {
    const userJSON = sessionStorage.getItem('user');
    if (!userJSON) {
    console.error('Usuario no encontrado en sessionStorage');
        return;
    }
    const id = JSON.parse(userJSON)._id;
    if (!id) { console.error('ID de usuario no encontrado en sessionStorage'); return; }
    fetch(`/users/${id}`, { method: 'GET' })
    .then(resp => {
        if (!resp.ok) return resp.text().then(tx => Promise.reject(tx));
        return resp.json();
    })
    .then(user => {
        const recordAnterior = user.points;
    if (nuevoScore > recordAnterior) {
        console.log(`Nuevo récord! ${nuevoScore} > ${recordAnterior}`);
        return fetch(`/users/${id}`, {
            method : 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body   : JSON.stringify({ points: nuevoScore })
        });
        } else {
        console.log(`Puntaje ${nuevoScore} no supera el récord ${recordAnterior}`);
        }
    })
    .catch(err => console.error('Error GET/PATCH bestScore:', err));
}



function ruleta(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('resultadoModal'));
    modal.hide();
    window.location.href = `Ruleta.html`;
}

function play(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('categoriaModal'));
    modal.hide();
    const param = window.categoriaSeleccionada.toLowerCase().replace(/\s+/g, '')
    window.location.href = `pregunta.html?categoria=${param}`;
}

function cargarPregunta() {
    const params = new URLSearchParams(window.location.search);
    let categoria = params.get("categoria"); 
    categoria = categoria.replace(/\s+/g, "").toLowerCase();
    //console.log(categoria = categoria.replace(/\s+/g, ""));
    fetch(`http://localhost:3000/questions/new/${categoria}`)
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(data => {
        const title = categoria
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, l => l.toUpperCase());
        document.querySelector('.card-title').textContent = data.topic || title;
        document.querySelector('.card-text').textContent  = data.question;
        data.options.forEach((op, i) => {
            const btn = document.getElementById(`opcion${i + 1}`);
            if (btn) {
                btn.querySelector('span').textContent = op;
                btn.addEventListener('click', () => validarRespuesta(i));
            }
        });
        window.respuestaCorrecta = data.rightAnswerIndex;

        // Emitimos un evento personalizado para indicar que ya se cargo la pregunta
        document.dispatchEvent(new Event('preguntaCargada'));
        })
        .catch(() => alert("No se pudo cargar la pregunta."));
}

function validarRespuesta(indiceSeleccionado) {
    //detenemos los timer al responder
    clearInterval(CountDownID);
    clearInterval(progressBarID);
    const correcta = window.respuestaCorrecta;
    
    const puntos = (indiceSeleccionado === correcta)
        ? Math.round((seg / 20) * 100)
        : 0;

    const scores = JSON.parse(localStorage.getItem('scores'));
    const turno  = Number(localStorage.getItem('turno')) || 1;
    scores[turno - 1] += puntos;
    localStorage.setItem('scores', JSON.stringify(scores));

    const texto = (indiceSeleccionado === correcta)
        ? `✅ ¡Respuesta correcta! (+${puntos} pts)`
        : "❌ Respuesta incorrecta (0 pts)";

    document.getElementById("textoResultado").textContent = texto;

    const modalElement = document.getElementById('resultadoModal');
    const modal        = bootstrap.Modal.getOrCreateInstance(modalElement);
    incrementarRonda();
    modal.show();
}

function setMatch(){
    localStorage.clear();
    const input = document.querySelector('.input-rounds');
    const rondas = parseInt(input.value, 10);
    const jugadorSeleccionado = document.querySelector('input[name="players"]:checked');
    if (!jugadorSeleccionado) {
        alert("Por favor selecciona cuántas personas jugarán.");
        return;
    }
    const totalJugadores = parseInt(jugadorSeleccionado.id.replace('players', ''), 10);
    localStorage.setItem('totalJugadores', totalJugadores);
    if (!isNaN(rondas) && rondas > 0) {
        localStorage.setItem('totalRondas', rondas);
        localStorage.setItem('rondasReales', rondas*totalJugadores);
        localStorage.setItem('rondaActualReal', 1);
        localStorage.setItem('turno',1)
        localStorage.setItem('scores', JSON.stringify(Array(totalJugadores).fill(0)));
        window.location.href = 'Ruleta.html';
    } else {
        alert('Por favor ingresa un número válido de rondas.');
    }
}

function mostrarProgresoRonda() {
    const total = parseInt(localStorage.getItem('totalRondas'), 10);
    const actual = parseInt(localStorage.getItem('rondaActual'), 10);

    if (!isNaN(total) && !isNaN(actual)) {
        document.getElementById('infoRonda').textContent = `Ronda ${actual} de ${total}`;
    }
}

async function getQuestionByID(idQuestion){
    let his = await fetch('/questions/byID/' + idQuestion, {
        method: 'GET'
    }).then(async (response) => {
        if(!response.ok) alert(await response.text());
        return await response.json();
    }).catch(err =>{
        console.error("Fallo al obtener la pregunta por ID: " + err)
    });
    return his;
}

function init(){
    if (!localStorage.getItem('rondaActual')) {
        localStorage.setItem('rondaActual', 1);
    }
    if(window.location.href == local_url + 'Ruleta.html'){
        setRouellete();
        mostrarProgresoRonda()
    }
    if(window.location.href.includes(local_url + 'pregunta.html')){
        cargarPregunta();
    }
}

init();

document.getElementById('spinBtn')?.addEventListener('click', spinRoullete);
document.querySelector(".wheel")?.addEventListener("transitionend", transicion);
document.getElementById('AceptarCategoria')?.addEventListener('click', play);
document.getElementById('btnContinuar')?.addEventListener('click',setMatch);
document.getElementById('AceptarRuleta')?.addEventListener('click', () => {
    if (!verificarFinDeJuego()) {  
        ruleta();                
    }
});
modalScore._element.querySelector('#btnBackHome')
        .addEventListener('click', () => {
            window.location.href = 'Home.html';
        }, { once: true });

