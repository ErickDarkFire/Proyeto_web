function init(){
    //console.log(JSON.parse(sessionStorage.getItem('user')));
    let user_account = null;
    //Comprobamos si esta registrdo on una cuenta
    if(sessionStorage.getItem('user') != null ) user_account = JSON.parse(sessionStorage.getItem('user'));
    
    //Si estas en el leaderboard
    if(window.location.href == local_url+"leaderboard.html"){
        if( user_account == null ){
            //alert("Favor de iniciar sesión para ver el leaderboard");
            window.location.href = local_url + "login.html";
        }else{
            let ranking = document.getElementById("Ranking");
            if(ranking != undefined){
                getRanking().then(rank => {
                    for (let i = 0; i < 10 && i < rank.length ; i++) {
                        let tr = document.createElement('tr');
                        let tdpos = document.createElement('td');
                        let tdname = document.createElement('td');
                        let tdpoints = document.createElement('td');
                        tdpos.classList.add('text-center');
                        tdpoints.classList.add('text-center');
                        tdpos.innerText = i +1;
                        tdname.innerText = rank[i].name;
                        tdpoints.innerText = rank[i].points;
                        //Agregamos al usuario por posicion en el ranking
                        tr.append(tdpos,tdname,tdpoints);
                        ranking.append(tr);
                    }
                }).catch(err => {console.log('Error al obtener el historial del usuario: ' + err);});
            }
        }
    }

    //Si estas en el profile
    if(window.location.href == local_url + "Profile.html"){
        if( user_account == null ){
            //alert("Favor de iniciar sesión para acceder a tu perfil");
            window.location.href = local_url + "login.html";
        }else{
            //obtenemos los componentes donde colocaremos la informacion
            let username = document.getElementById('username'),
                usermsg = document.getElementById('usermsg'),
                useremail = document.getElementById('useremail'),
                usercatfav = document.getElementById('usercatfav'),
                userpts = document.getElementById('userpts'),
                userrank = document.getElementById('userrank'),
                useraciertos = document.getElementById('useraciertos');

            //Colocamos los datos del usuario
            username.innerText = user_account.name;
            usermsg.innerHTML = '<b>Mensaje:</b> ' + user_account.message;
            useremail.innerHTML = '<b>Correo:</b> ' + user_account.email;
            usercatfav.innerHTML = '<b>Categoria favorita:</b> ' + user_account.favourite_category;
            userpts.innerHTML = '<b>Máximo puntaje:</b> ' +user_account.points;
            userrank.innerHTML = '<b>Ranking:</b> ' + user_account.rank;
            const ac = document.getElementsByClassName("right");
            //console.log(ac.length);
            useraciertos.innerHTML = '<b>Aciertos:</b> ' + (ac.length > 0 ? ac.length : '0');
            
            //dependiendo la categoria favorita, cambiamos el color del banner
            let banner = document.getElementById('banner');
            for (let i = 0; i < categorias.length; i++) {
                if( categorias[i] === user_account.favourite_category ) banner.style.backgroundColor = colores[i];
            }

            //Obtenemos las preguntas que ya respondio
            getHistorial().then(questions =>{
                arrQuest = questions.questions;
                //creamos el formato de cada pregunta
                let rowQuestions = document.getElementById('rowQuestions');
                    if(arrQuest.length > 0){
                        //Si el mensaje existe, lo quitamos por que ya estamos en una etiqueta que SI tiene tareas
                        let prevmsg = document.getElementById('msg');
                        if( prevmsg != undefined ) prevmsg.remove();
                        arrQuest.forEach(question => {
                        getQuestionByID(question.question)
                        .then(result => {
                            let row = document.createElement('div');
                            row.classList.add('col-12', 'col-sm-6', 'col-lg-4');
                            let quest = document.createElement('div');
                            quest.classList.add('question', 'p-3');
                            let flex = document.createElement('div');
                            flex.classList.add('d-flex');

                            let preg = document.createElement('div');
                            preg.classList.add('me-3');
                            let b1 = document.createElement('b');
                            b1.style.fontSize = "12px";
                            b1.innerText = result.question;
                            let p = document.createElement('p');
                            p.innerText = result.options[result.rightAnswerIndex];
                            preg.append(b1,p);

                            let i = document.createElement('i');
                            i.classList.add('bi','fs-1');
                            if(question.status != true){
                                quest.classList.add('wrong');
                                i.classList.add('bi-x-circle');
                            } 
                            else{
                                quest.classList.add('right');
                                i.classList.add('bi-check-circle');
                            } 
                            flex.append(preg,i);

                            let gen = document.createElement('div');
                            gen.classList.add('me-2');
                            let b2 = document.createElement('b');
                            b2.innerText = 'Categoria: ';
                            let span = document.createElement('span');
                            let cat = result.topic;
                            for (let i = 0; i < categorias.length; i++) {
                                if( categorias[i].toLowerCase() === cat ) cat = categorias[i];
                            }
                            span.innerText = cat;
                            gen.append(b2,span);

                            quest.append(flex,gen);
                            row.append(quest);
                            //Pegamos todo el contenido de la pregunta dentro del contenedor
                            rowQuestions.append(row);
                        })
                        .catch(err => console.log("Error al insertar en el historial: " + err) );
                        });
                    }else{
                        let mensaje = document.createElement('p');
                        mensaje.id = 'msg';
                        mensaje.style.color = "yellow";
                        mensaje.style.textAlign = 'center';
                        mensaje.innerText = '\nJuega una partida para empezar tu historial!.';
                        //Si el mensaje no existe todavia, lo agregamos evitando repeticiones
                        if( document.getElementById('msg') == undefined ) rowQuestions.append(mensaje);
                    }
                }).catch(err => {console.log('Error al obtener el historial del usuario: ' + err);});
        }
    }

    //Si estas en el EditProfile
    if(window.location.href == local_url+"EditProfile.html"){
        if( user_account == null ){
            //alert("Favor de iniciar sesión para acceder a editar tu perfil");
            window.location.href = local_url + "login.html";
        }else{
            let txtName = document.getElementById('txtName'),
                cbcategoria = document.getElementById('cbcategoria'),
                txtmsg = document.getElementById('txtmsg'),
                txtpass = document.getElementById('txtpass'),
                txtConfpass = document.getElementById('txtConfpass');
            txtName.value = user_account.name;
            txtmsg.value = user_account.message;
            cbcategoria.value = user_account.favourite_category;
            txtpass.value = user_account.password;
        }
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
    .then(async response => {
        if(response.status == 404) alert("Correo y/o Contraseña incorrectos.");
        else return response.json();
    })
    .then(user =>{
        if(user != undefined){
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = local_url+'home.html';
        }
        
    })
    .catch(err =>{
        console.log('No se encontro al usuario.');
    });

}
let FormLogin = document.getElementById("FormLogin");
if(FormLogin != undefined) FormLogin.addEventListener('submit', login);

function register(){
    event.preventDefault();
    let data = new FormData(event.target);
    data.append('points', 0);
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(data.entries()))
    })
    .then(async (response) => {
        if(!response.ok) alert(await response.text()); 
        return response.json();
    })
    .then(user => {
        alert('Registro completado con exito!');
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = local_url+'home.html';
    })
    .catch(err => {
        console.error('Error en login: ', err);
    });

}
let FormReg = document.getElementById("FormReg");
if(FormReg != undefined) FormReg.addEventListener('submit', register);


async function getUser(){
    let user = await fetch('/users/' + sessionStorage.user.id, {
        method: 'GET'
    }).then(async (response) => {
        if(!response.ok) alert(await response.text());
        return await response.json();
    }).catch(err =>{
        console.error("Fallo al obtener al usuario: " + err)
    });
    return user;
}

async function getHistorial(){
    let his = await fetch('/histories/' + JSON.parse(sessionStorage.user)._id, {
        method: 'GET'
    }).then(async (response) => {
        if(!response.ok) alert(await response.text());
        return await response.json();
    }).catch(err =>{
        console.error("Fallo al obtener el historial del usuario: " + err)
    });
    return his;
}

async function getRanking(){
    let record = await fetch('/rank?top=10', {
        method: 'GET'
    }).then(async (response) => {
        if(!response.ok) alert(await response.text());
        return await response.json();
    }).catch(err =>{
        console.error("Fallo al obtener el top de usuarios: " + err)
    });
    return record;
}

function user_update(){
    let data_user = JSON.parse(sessionStorage.user);
    event.preventDefault();
    let data = new FormData(event.target);
    if(data.get('password') == data.get('confirm_password') ){
        data.delete('confirm_password');
        fetch('/users/' + data_user._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(data.entries()))
        })
        .then(async (response) => {
            if(!response.ok) alert(await response.text());
            return response.json();
        })
        .then(userUpdated => {
            alert('Usuario actualizado con exito!!');
            sessionStorage.setItem('user', JSON.stringify(userUpdated));
            init();
            //te devuelve a tu misma pestaña
            window.location.href = local_url+'Profile.html';
        })
        .catch(err => {
            console.error('Error al guardar datos: ', err);
        });
    }else{
        alert('Las contraseñas no coinciden! No se realizo ningun cambio.');
    }
}
let FormEdit = document.getElementById("FormEdit");
if(FormEdit != undefined) FormEdit.addEventListener('submit', user_update);

//--------------------------------------------------------------------
//--------------------------------------------------------------------
init();