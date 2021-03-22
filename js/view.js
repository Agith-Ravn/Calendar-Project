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
        <p class="loginButton" onclick="selectView('loginPage')">Login</p>
        <p class="seHeleÅret" onclick="selectView('yearPage')" >Se hele året</p>`
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
        html += `<div class="nyHendelse"> + Legg til ny </div>`
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
    html += 
    `<div>
        <input type="text"><br>
        <input type="password">
    </div>`
    return html;
}

// THIS IS THE INITEIER YEAR  
function initiereYear(){
    let html = ``;
    html += 
    `<div class="navBar">
        <p class="loginButton" onclick="selectView('loginPage')">Login</p>
        <p class="seHeleÅret">Tilbake</p>`
        for(var i in model.months) {
            html += ('<div class="mnd"><a> ' + model.months[i] + ' </a></div>');
        }
    html += 
    `</div>
    <h1>Year</h1>`
    return html
}
