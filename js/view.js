// Views
function updateView(){
    if(model.currentPage == 'homePage') {
        document.getElementById('app').innerHTML = homeView()
    }
    if(model.currentPage == 'loginPage') {
        document.getElementById('app').innerHTML = loginScreen()
    }
    if(model.currentPage == 'yearPage') {
        document.getElementById('app').innerHTML = initiereYear()
    }
}

// THIS IS HOME PAGE. THIS IS A MESSSSSSSSSSSSSS
function homeView() {
    let html = ``;
    html += 
    `<div class="navBar">
        <p class="loginButton" onclick="selectView('loginPage')">Logout</p>
        <p class="seHeleÅret" onclick="selectView('yearPage')" >Se hele året</p>
        <h1>< 2021 ></h1>`
        for(var i in model.months) {
            html += ('<div class="mnd"><a> ' + model.months[i] + ' </a></div>');
        }
    html +=`</div>`
    html += `<div class="grid-date-container">`
    for (let j = 1; j <= 31 ; j++) {
        html += `<div class="grid-item">${j}</div>`
    }
    html += `</div>
    <div class="widthCard">`
        html += `<div class="hendelser">`
        //Dato
        html += `<h1> 18 Mars 2021 </h1>`
        //Legg til ny hendelse
        html += `<div class="nyHendelse"><a> + Legg til ny </a></div>`
        //Alle hendelser        
        html += `<div class="hendelseBox">`
            //Hendelse             Hvordan skal vi farge <div> </div>?
            html += `<div class="hendelse">
                        <div> </div>
                        <h2> Tekst 1 </h2>
                        <p> Innholds tekst </p>       
                    </div>`
            html += `<div class="hendelse">
                        <div> </div>
                        <h2> Tekst 2 </h2>
                        <p> Innholds tekst bla bla bla bla blablal bla Innholds tekst bla bla bla bla blablal blaInnholds tekst bla bla bla bla blablal blaInnholds tekst bla bla bla bla blablal blalablal bla </p>       
                    </div>`
        html += `</div">`    
    html += `</div></div>`
    return html
}

// THIS IS LOGIN PAGE 
function loginScreen() {
    let html = ``;
    html += `<div id="loginBackground"> 
                <div id="loginContainer">
                    <div> Login</div>
                    <input type="text" oninput="model.loginInputUser = this.value" id="usernameInput" placeholder="Username">
                    <input type="password" oninput="model.loginInputPassword = this.value" id="passwordInput" placeholder="Password">
                    <button onclick="loginResponse('homePage')">Login</button>
                    <p id="errorMessage" style="font-size: 12px; color: red; display: none;">Wrong Password or Username</p>
                </div>
            </div>`
    return html;
}

// THIS IS THE INITEIER YEAR  
function initiereYear(){
    
   //Menu bar
   let html = ``;
   html += 
   `<div class="navBar">
       <p class="loginButton" onclick="selectView('loginPage')">Logout</p>
       <p class="seHeleÅret" onclick="selectView('homePage')" >Tilbake</p>
       <h1>< 2021 ></h1>`
       for(var i in model.months) {
           html += ('<div class="mnd"><a> ' + model.months[i] + ' </a></div>');
       }
   html +=`</div>`


   //Entire year
        html += `<div id="entireYear">`
            html += `<div id="years">`            
                html += `<div> < </div>`


                for (let i = 2020; i <= 2030 ; i++) {
                    html += `<div class="year">${i}</div>`
                }

                html += `<div> > </div>`
            html += ` </div>`


            html += `<div class="month-container">`

            let months = model.months
            
            for (let j = 0; j < 12 ; j++) {
                html += `<div class="grid-item-month">` + model.months[j] + `</div>`
            }

            html += `</div>`
        html += `</div>`

    return html
}
