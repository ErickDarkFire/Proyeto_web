const local_url = "http://localhost:3000/";

const categorias = [
    "Star-Wars", 
    "Marvel", 
    "Dragon-Ball",
    "Naruto",
    "One-Piece",
    "Death-Note",
    "Pokemon",
    "Inazuma-Eleven",
    "League-Of-Legends",
    "Zelda",
    "Minecraft",
    "Mario",
    "Halo",
    "Gears-Of-War",
    "Bob-Esponja"
];
const colores = [
    "#FFE81F",
    "#ED1D24",
    "#F77F00",
    "#F08C00",
    "#1E90FF",
    "#000000",
    "#FFCB05",
    "#FF6600",
    "#C89B3C",
    "#007C41",
    "#6E8B3D",
    "#E60012",
    "#4B5320",
    "#8B0000",
    "#FFF700"
];

function validateLogin(){
    if(!sessionStorage.user && window.location.href != local_url){
        alert("Favor de iniciar sesión");
        window.location.href = local_url;
    }
    if(sessionStorage.user && window.location.href == local_url){
        window.location.href = local_url+"/home.html";
    }
}
validateLogin();