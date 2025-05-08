
function init(){

}

function login(){
    event.preventDefault();
    let data = new FormData(event.target);

    fetch('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(data.entries()))
    })
    .then(response => {
        if(!response.ok) alert("Correo y/o Contraseña incorrectos.");
        return response.json();
    })
    .then(user =>{
        sessionStorage.setItem('user', JSON.stringify(user));
        init();
        window.location.href = local_url+'/home.html';
    })
    .catch(err =>{
        console.log('Error in login: ' + err);
    });

}   

let FormLogin = document.getElementById("FormLogin");
if(FormLogin != undefined) FormLogin.addEventListener('submit', login);

function logout(){
    sessionStorage.clear();
    window.location.href = local_url+'/login.html';
}

//--------------------------------------------------------------------
//--------------------------------------------------------------------
init();