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
