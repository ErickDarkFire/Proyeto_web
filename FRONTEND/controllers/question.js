const categorias = [
    "Star Wars", "Marvel", "Dragon Ball", "Naruto", "One Piece", "Death Note",
    "Pokemon", "Inazuma Eleven", "LeagueOfLegends", "Zelda", "Minecraft",
    "Mario", "Halo", "GearOfWar", "Bob Esponja"
];
const colores = ['#ff0059', '#105eee', '#ff0000', '#26d500', '#ffee00', '#8000ff'];
let rotationValue = 0;
let seleccionadas = []; 

function setRouellete(){
    seleccionadas = categorias.sort(() => 0.5 - Math.random()).slice(0, 5);
    console.log("Categorías seleccionadas:", seleccionadas);
    const ruleta = document.getElementById("ruleta");
    ruleta.innerHTML = "";

    seleccionadas.forEach((categoria, i) => {
        const div = document.createElement("div");
        div.className = "category";
        div.style.setProperty('--i', i + 1);
        div.style.setProperty('--clr', colores[i % colores.length]);
        div.innerHTML = `<span>${categoria}</span>`;
        ruleta.appendChild(div);
    });
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

function play(){
    console.log("Pase")
    const modal = bootstrap.Modal.getInstance(document.getElementById('categoriaModal'));
    modal.hide();
    window.location.href = local_url + 'Pregunta.html'
}

function init(){
    setRouellete();
}

init();

document.getElementById('spinBtn')?.addEventListener('click', spinRoullete);
document.querySelector(".wheel").addEventListener("transitionend", transicion);
document.getElementById('AceptarCategoria')?.addEventListener('click', play);
