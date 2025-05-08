
function init(){
    let user_account = null;
    
    //Comprobamos si esta registrdo on una cuenta
    if(sessionStorage.getItem('user') != undefined) user_account = JSON.parse(sessionStorage.user);
    
    //Si estas en el leaderboard
    if(window.location.href == local_url+"leaderboard.html"){
        console.log("xd");
    }

    //Si estas en el profile
    if(window.location.href == local_url+"Profile.html"){
        //obtenemos los componentes donde colocaremos la informacion
        let username = document.getElementById('username'),
            usermsg = document.getElementById('usermsg'),
            usercatfav = document.getElementById('usercatfav'),
            userpts = document.getElementById('userpts'),
            userrank = document.getElementById('userrank'),
            useraciertos = document.getElementById('useraciertos');

        getUsers().then(Usuarios => {
            //Obtenemos al usuario
            Usuarios.find( ele => user_account.id = ele.id);
            username.innerText = user_account.name;
            usermsg.innerText = user_account.message;
            usercatfav.innerText = user_account.catfav;
            userpts.innerText = user_account.points;
            userrank.innerText = user_account.rank;
            useraciertos.innerText = user_account.aciertos;
            
            //dependiendo la categoria favorita, cambiamos el color del banner
            let banner = document.getElementById('banner');
            for (let i = 0; i < categorias.length; i++) {
                if( categorias[i] === user_account.catfav ) banner.style.backgroundColor = purple;
            }

        });
    }

    //Si estas en el EditProfile
    if(window.location.href == local_url+"EditProfile.html"){
        let txtName = document.getElementById('txtName'),
            cbcategoria = document.getElementById('cbcategoria'),
            txtmsg = document.getElementById('txtmsg'),
            txtpass = document.getElementById('txtpass'),
            txtConfpass = document.getElementById('txtConfpass');
        
        txtName.innerText = user_account.name;
        txtmsg.innerText = user_account.message;
        cbcategoria.value = user_account.catfav;
        txtpass.innerText = user_account.password;
        
    }

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
        window.location.href = local_url+'home.html';
    })
    .catch(err =>{
        console.log('Error in login: ' + err);
    });

}   

let FormLogin = document.getElementById("FormLogin");
if(FormLogin != undefined) FormLogin.addEventListener('submit', login);

function logout(){
    sessionStorage.clear();
    window.location.href = local_url+'login.html';
}

//--------------------------------------------------------------------
//--------------------------------------------------------------------
init();