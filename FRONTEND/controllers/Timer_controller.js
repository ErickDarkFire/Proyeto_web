let seg = 20;
let progressPercent = 0;
let stepPercent = 0.1;
let progressBarID = null;
let CountDownID = null;
function TimesUp(){
    let txtseg;
    seg--;
    document.getElementById('txtseg').innerHTML = seg < 10 ? '0' + seg : seg;
    if(seg <= 0){
        //alert('Se acabo el tiempo!');
        validarRespuesta(-1);
        seg = 0;
        //clearInterval(CountDownID);
        return;
    }
}
function IncreaseBar(){
    let bar = document.getElementById('progress');
    if (progressPercent >= 100) {
        bar.style.width = "100%";
        //alert("Barra completada en el seg: " + seg);
        //clearInterval(progressBarID);
        return;
    }
    progressPercent += stepPercent;
    bar.style.width = progressPercent + "%";
}

document.addEventListener('preguntaCargada', () => {
    //console.log("Pregunta cargada. ¡Ahora empiezo el temporizador!");
    let contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';
    CountDownID = setInterval(TimesUp ,1010);
    //calculamos cuantas veces se tiene que ejecutar en 1 seg
    let totalDuration = 20000; // 20 segundos
    stepPercent = 0.1; // aumenta 0.1% por paso
    progressPercent = 0;
    let steps = 100 / stepPercent; // 1000 pasos en total
    let intervalTime = totalDuration / steps; // tiempo entre pasos (20ms)
    progressBarID = setInterval(IncreaseBar, intervalTime);
});