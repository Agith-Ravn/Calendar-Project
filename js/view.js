// Views
function updateView(){
    if(model.currentPage == 'homePage') {
        model.navbar.homePageView = true;
        findCurrentDate();
        dateDisplacement();
        findWeeksRowCount();
        findWeeksInCurrentMonth();
        getAppointmentsSelctedMonth();
        showAppointments();
        document.getElementById('app').innerHTML = homeView()
        styleCurrentMonth();
        styleSelectedDate();
        
    }
    if(model.currentPage == 'loginPage') {
        document.getElementById('app').innerHTML = loginScreen()
    }
    if(model.currentPage == 'yearPage') {
        model.navbar.homePageView = false;
        findCurrentDate();
        document.getElementById('app').innerHTML = initiereYear()
        selectCurrentYear();
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
                    html += `<div>
                                <div id="date${i}" class="dates-grid-item" onclick="selectedDate(this, ${i})"> ${i} </div>
                                <div class="appointment-container">`

                                let date = i
                                for(let i = 0; i < model.selectedMonthAppointments.length; i++) {
                                    if (model.selectedMonthAppointments[i].date.getDate() == date) {
                                        html +=`<div class="appointment--color" style="background-color:${model.selectedMonthAppointments[i].color}"></div>`
                                    }
                                }
                    html +=`</div></div>`
                }
            html += `</div>`
    html += `</div>`    
    html += appointmentsView();
    html += `</div>`
    
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
    html += yearUpdateView();
        html += `<div class="month-container">`
        for (let j = 1; j <= 12 ; j++) {
            var getMonthDays = days(j, model.currentYear)
            html += `<div class="grid-item-month"><div class="month-name">` + model.months[j - 1] + `</div>
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

function appointmentsView() {
    let html = '';
    html +=`<div class="widthCard">
    <div id="changeBox" class="hendelser">
        <h1>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</h1>
        <a href="#" onclick="addAppointment()"> <div class="nyHendelse">+ Legg til ny </div></a>`

    html += `<div class="hendelseBox">`

    for(let i = 0; i < model.selectedDateAppointments.length; i++) {
        html += `<div class="hendelse">
                <div style="background:${model.selectedDateAppointments[i].color};"> <!-- color --> </div>
                <h2> ${model.selectedDateAppointments[i].header} </h2>
                <p> ${model.selectedDateAppointments[i].content} </p>
                <p> Privat: ${model.selectedDateAppointments[i].privat} <- må endres til noe annet </p>
                </div>`
    }
        
    html += `</div></div>`

    return html;
}


function yearUpdateView() {
    let html = '';
    html += `<div id="years">
        <div> <button onclick="changeYear(-10)"> ‹ </button></div>`

    let currentYear = model.currentYear
    let lastNumber = currentYear.toString().slice(-1);
    let x = currentYear - lastNumber;
    let y = 9 - lastNumber;
    for(let i = x; i <= (model.currentYear + y); i++) {
        html += `<div class="entireYear__years" id="year${i}" onclick="selectYearInEntireYear(${i})">${i}</div>`   
    }

    html += `<div> <button onclick="changeYear(10)"> › </button> </div>
    </div>`
    return html;
}

function addAppointment() {
    let html = '';
    html +=`<div id="changeBox">
        <div class="gridContainer">
            <div class="gridItem" >
                <a href="#" id="circleColorChooser" onclick="changeColorfunction()"></a>
            </div>
            <div class="gridItem" >
                <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
        </div>

        <h2 id="alignTextInEvent">Header</h2>
        <input id="headerText" alt="text"><br>
        <h2 id="alignTextInEvent">Paragraph</h2>
        <input id="paragraphText" alt="text">

        <br>
        <h2 id="alignTextInEvent">Velg hvem som skal se</h2>
        <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul1">
        <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul2">
        <label id="alignTextInEvent" for="Modul1"> Modul 2</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul3">
        <label id="alignTextInEvent" for="Modul1"> Modul 3</label><br>

        <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT">
        <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat">
        <label id="alignTextInEvent" for="Privat"> Privat</label><br>
        <br>


        <h2 id="alignTextInEvent">Legg til ferie</h2>
        <p id="alignTextInEvent">Fra</p>
        <input id="alignTextInEvent" type="date">
        <br>
        <p id="alignTextInEvent">Til</p>
        <input id="alignTextInEvent" type="date">

        <a href="#"><div class="nyHendelse">Legg til i kalender </div></a>
    </div>
    `
    document.getElementById("changeBox").innerHTML = html;
}


