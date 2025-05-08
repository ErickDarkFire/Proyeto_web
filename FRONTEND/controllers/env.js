const local_url = "http://localhost:3000/";

<<<<<<< HEAD
=======
function logout(){
    event.preventDefault(); // Esto evita que el enlace recargue la página
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    user_account = null;
    window.location.href = local_url+'login.html';
}
let btnSalir = document.getElementById("btnSalir");
if(btnSalir != undefined) btnSalir.addEventListener('click',logout);
>>>>>>> be5c65a3207f353d4e85c598141e857fe13d121e
