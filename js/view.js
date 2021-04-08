// Views
function updateView(){
    if(model.currentPage == 'homePage') {
        model.navbar.homePageView = true;
        findCurrentDate();
        dateDisplacement();
        findWeeksRowCount();
        findWeeksInCurrentMonth();
        document.getElementById('app').innerHTML = homeView()
        styleCurrentMonth();
        styleCurrentDate();
    }
    if(model.currentPage == 'loginPage') {
        document.getElementById('app').innerHTML = loginScreen()
    }
    if(model.currentPage == 'yearPage') {
        model.navbar.homePageView = false;
        findCurrentDate();
        document.getElementById('app').innerHTML = initiereYear()
    }
}

// THIS IS HOME PAGE.
function homeView() {
    let html = ``;
    //Navbar
    html += navBarView();
    //Dates
    html += `<div class="calender">`
            //Weeks
            html += `<div class="weeksContainer">`
                //Midlertidig
                html += `<p> Uke</p>`
                for(let i = 1; i <= model.weeksRowCount; i++) {
                    html += `<p class="weeks-grid-item"> ${model.weeksInCurrentMonth[i - 1]}</p>`
                }

            html += `</div>`
            //Weekdays
            html += `<div class="grid-date-container">
                <p>Mandag</p>
                <p>Tirsdag</p>
                <p>Onsdag</p>
                <p>Torsdag</p>
                <p>Fredag</p>
                <p>Lørdag</p>
                <p>Søndag</p>`
                //Empty boxes (date displacement)
                for(let j = 1; j <= model.dateDisplacement; j++) {
                    html += `<p>  </p>`
                }
                //Dates
                for (let i = 1; i <= model.daysInMonth ; i++) {
                    html += `<div id="date${i}" class="dates-grid-item" onclick="selectedDate(this);getSelectedAppointment();">${i}</div>`
                }
            html += `</div>`
    html += `</div>`
    //Events / hendelser
    html +=`<div class="widthCard">
                <div class="hendelser">
                    <h1> 18 Mars 2021 </h1>
                    <div class="nyHendelse"><a> + Legg til ny </a></div>`

            html += `<div class="hendelseBox">`
            // Hvordan skal vi farge <div> </div>?
            html += `<div class="hendelse">
                        <div> <!-- color --> </div>
                        <h2> Tekst 1 </h2>
                        <p> Innholds tekst </p>       
                    </div>`
            html += `<div class="hendelse">
                        <div> <!-- color --> </div>
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
    var getMonthDays = days(0, fullYear); // adds a week to a date
    let html = ``;
    //Navbar
    html += navBarView();
    html += `<div id="entireYear">`
        // HTML + funksjon 
        html += yearUpdateView();
        //Months
        // Put days in month for visual not just a gray box.
        html += `<div class="month-container">`
        for (let j = 1; j <= 12 ; j++) {
            var getMonthDays = days(j, fullYear)
            html += `<div class="grid-item-month">` + model.months[j - 1] + `
                <div class="daysInMonthBox">
                    <div class="grid-item-month-days">`
                        for (let i = 1; i <= getMonthDays ; i++) {
                            html += `<div class="grid-item-year-days">${i}</div>`
                        }
            html += `</div>
                </div>
            </div>`
        }
    html += `</div> </div>`
    return html
}
//Egen funksjon som lager navbar
function navBarView() {
    let html = '';
    html += `<div class="navBar">`
        //Navbar login & se hele året button
        html += `<div class="buttonContainer">
                <p class="loginButton" onclick="selectView('loginPage')">Login</p>`
        if (model.navbar.homePageView == true) {
            html += `<p class="seHeleÅret" onclick="selectView('yearPage')" >Se hele året</p>`
        } 
        if (model.navbar.homePageView == false) {
            html += `<p class="seHeleÅret" onclick="selectView('homePage')" >Tilbake</p>`
        }
        html += `</div>`
        //Navbar year
        html += `<div class="navBarYearContainer"> 
                    <div onclick="changeYear(-1)"> ‹ </div>
                    <h1> ` + model.currentYear + `</h1>
                    <div onclick="changeYear(1)"> › </div>
                </div>`
        //Navbar month
        html += `<div>`
        for(var i in model.months) {
            html += `<div class="navBarMonth" id="month${i}" onclick="changeMonth(${i}, 'month${i}')"> `
            + model.months[i] + `</div>`
        }
        html += `</div>`
    html +=`</div>`
    return html
}
function yearUpdateView() {
    return `<div id="years">
        <div> <button onclick="previous()"> < </button></div>

        <div id="year" class="year">${fullYear}</div>

        <div> <button onclick="next()"> > </button> </div>
    </div>`
}
