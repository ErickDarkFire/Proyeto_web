const local_url = "http://localhost:3000/";

function logout(){
    event.preventDefault(); // Esto evita que el enlace recargue la página
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    user_account = null;
    window.location.href = local_url+'login.html';
}
let btnSalir = document.getElementById("btnSalir");
if(btnSalir != undefined) btnSalir.addEventListener('click',logout);

function populateSidebar(){
    let profileIcon = document.getElementById('i-profile');
    let lisalir = document.getElementById('li-salir');
    let aprofile = document.getElementById('a-profile');
    let aleaderboard = document.getElementById('a-leaderboard');

    if(sessionStorage.user == undefined){
        //console.log('NO HAY CUENTA');
        if( profileIcon.classList.contains('bi-person') ) profileIcon.classList.remove('bi-person');
        if( !profileIcon.classList.contains('bi-question-circle') ) profileIcon.classList.add('bi-question-circle');
        lisalir.style.display = 'none';
        aleaderboard.href = "login.html";
        aprofile.href = "login.html"
        /*if( window.location.href == local_url + "profile.html" ){
            alert("Favor de iniciar sesión para acceder a tu perfil");
            window.location.href = local_url + "login.html";
        }*/
    }else{
        //console.log('si hay cuenta');
        if( profileIcon.classList.contains('bi-question-circle') ) profileIcon.classList.remove('bi-question-circle');
        if( !profileIcon.classList.contains('bi-person') ) profileIcon.classList.add('bi-person');
        lisalir.style.display = 'block'
        aleaderboard.href = "leaderboard.html";
        aprofile.href = "Profile.html"
    }
}
if(window.location.href != local_url + "login.html") populateSidebar();