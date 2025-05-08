const local_url = "http://localhost:3000/";

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