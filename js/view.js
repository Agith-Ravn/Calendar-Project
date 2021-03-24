// Views
function updateView(){
    if(model.currentPage == 'homePage') {
        model.navbar.homePageView = true;
        document.getElementById('app').innerHTML = homeView()
    }
    if(model.currentPage == 'loginPage') {
        document.getElementById('app').innerHTML = loginScreen()
    }
    if(model.currentPage == 'yearPage') {
        model.navbar.homePageView = false;
        document.getElementById('app').innerHTML = initiereYear()
    }
}

// THIS IS HOME PAGE.
function homeView() {
    let html = ``;

    //Navbar
    html += navBarView();

    //All dates
    html += `<div class="grid-date-container">`
    for (let j = 1; j <= 31 ; j++) {
        html += `<div class="grid-item">${j}</div>`
    }
    html += `</div>`
    
    //Events / hendelser
    html +=`<div class="widthCard">
                <div class="hendelser">
                    <h1> 18 Mars 2021 </h1>
                    <div class="nyHendelse"><a> + Legg til ny </a></div>`

            html += `<div class="hendelseBox">`

            // Hvordan skal vi farge <div> </div>?
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
                
    html += `</div></div></div>`
    return html
}


// THIS IS LOGIN PAGE 
function loginScreen() {
    let html = ``;
    html += `<div id="loginBackground"> 
                <div id="loginContainer">
                    <div> Admin </div>
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
    let html = ``;
    
    //Navbar
    html += navBarView();

    //Entire year (10 years)
    html += `<div id="entireYear">`
        html += `<div id="years">`

            //Midlertidig buttons
            html += `<div> < </div>`
            for (let i = 2020; i <= 2030 ; i++) {
                html += `<div class="year">${i}</div>`
            }
            //Midlertidig buttons
            html += `<div> > </div>`
        html += ` </div>`

        //Months
        html += `<div class="month-container">`
        for (let j = 0; j < 12 ; j++) {
            html += `<div class="grid-item-month">` + model.months[j] + `</div>`
        }

    html += `</div> </div>`
    return html
}

//Egen funksjon som lager navbar
function navBarView() {
    currentYear();
    
    let html = '';
    html += `<div class="navBar">`

        //Navbar login & se hele året button
        html += `<div class="buttonContainer">
                <p class="loginButton" onclick="selectView('loginPage')">Logout</p>`
        if (model.navbar.homePageView == true) {
            html += `<p class="seHeleÅret" onclick="selectView('yearPage')" >Se hele året</p>`
        } 
        if (model.navbar.homePageView == false) {
            html += `<p class="seHeleÅret" onclick="selectView('homePage')" >Tilbake</p>`
        }
        html += `</div>`

        //Navbar year
        html += `<div class="navBarYearContainer"> 
                    <div onclick="changeYear(-1)"> < </div>
                    <h1> ` + model.currentYear + `</h1>
                    <div onclick="changeYear(1)"> > </div>
                </div>`

        //Navbar month
        for(var i in model.months) {
            html += '<div class="navBarMonth"><a> ' + model.months[i] + ' </a></div>';
        }

    html +=`</div>`

    return html
}