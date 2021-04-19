// Views
function updateView(){
    if(model.currentPage == 'homePage') {
        model.navbar.homePageView = true;
        findCurrentDate();
        getCurrentTime()
        getHolidays();
        getSundays();
        dateDisplacement();
        findWeeksRowCount();
        findWeeksInCurrentMonth();
        getAppointmentsSelctedMonth();
        showAppointments();
        document.getElementById('app').innerHTML = homeView()
        styleCurrentMonth();
        styleSelectedDate();
        // runUpdateTimeIntervalOnce();
    }
    if(model.currentPage == 'loginPage') {
        document.getElementById('app').innerHTML = loginScreen()
    }
    if(model.currentPage == 'yearPage') {
        model.navbar.homePageView = false;
        findCurrentDate();
        dateDisplacementEntireYear();
        getHolidays();
        getSundays();
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
                    let date = i
                    html += `<div>`
                        html += `<div id="date${i}" class="dates-grid-item `
                        holidaysInMonthView(date) == undefined ? html += '' : html += holidaysInMonthView(date);
                        sundaysInMonthView(date) == undefined ? html += '' : html += sundaysInMonthView(date);                        
                        html +=`" onclick="selectedDate(this, ${i})"> ${i} </div>
                        <div class="appointment-container">`
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
                    
                    //displacement in entireYear view
                    for(let i = 0; i < model.dateDisplacementEntireYear.length; i++) {
                        if(model.dateDisplacementEntireYear[i].month == (j)) {
                            for(let o = 0; o < model.dateDisplacementEntireYear[i].dateDisplacement; o++) {
                                html += `<p> </p>`
                            }
                        }
                    }

                    //days in month
                    for (let i = 1; i <= getMonthDays ; i++) {
                        html += `<div class="grid-item-year-days`
                        holidaysInEntireYearView(i, j) == undefined ? html += '' : html += holidaysInEntireYearView(i, j);
                        sundaysInEntireYearView(i, j) == undefined ? html += '' : html += sundaysInEntireYearView(i, j);
                        html += `">${i}</div>`
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
    //hvis modeL.appointment == true, skal "addAppointView" vises
    // hvis modeL.appointment == true, skal det under vises
    
    let html = '';
    html +=`<div class="widthCard">`

    if(model.appointmentEditMode == true) {
        html += addAppointment();

    }


    if(model.appointmentEditMode == false) {
    html +=`<div id="changeBox" class="hendelser">
        <div id="remove">
        <h1>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear} | ${model.currentTime}</h1>
        </div>
        
            <a href="#" onclick="appointmentEditMode(true)"> 
                <div class="nyHendelse">+ Legg til ny </div>
            </a>`
    html += `<div class="hendelseBox">`

    //Holidays in appointment
    for(let i = 0; i < model.allHolidaysInCurrentMonth.length; i++) {
        let holidayName;
        if (model.allHolidaysInCurrentMonth[i].date.day == model.selectedDate) {
            holidayName = model.allHolidaysInCurrentMonth[i].holidayName
            html += `<div class="hendelse">
                        <div> <!-- color --> </div>
                        <h2 style="color:red"> ${holidayName} </h2>
                    </div>`
        }
    }

    //Shows appointment from model
    for(let i = 0; i < model.selectedDateAppointments.length; i++) {
        html += `<div class="hendelse">
                <div style="background:${model.selectedDateAppointments[i].color};"> <!-- color --> </div>
                
                <h2 class="header"> ${model.selectedDateAppointments[i].time} <span style="font-weight:100"> | </span> ${model.selectedDateAppointments[i].header} </h2>
                <p> ${model.selectedDateAppointments[i].content} </p>
                </div>`
    }
    html += `</div>`
    }

    html += `</div>`
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

// function 


function addAppointment() {
    // window.updateTime.visible
    let html = '';
    html +=` 
        <div id="changeBox" class="hendelser">
        <div class="gridContainer">
            <div class="gridItem" >
                <input type="color" id="circleColorChooser" value="#000000" onchange="model.appointmentsColorInput = this.value">
            </div>
            <div class="gridItem" >
                <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
        </div>
        
        <h3 id="alignTextInEvent">Header</h3>
        <input id="headerText" placeholder="Enter text" type="text" oninput="model.appointmentsHeaderInput = this.value"><br>

        <h3 id="alignTextInEvent">Paragraph</h3>
        <input id="paragraphText" placeholder="Enter text" type="text" oninput="model.appointmentsContentInput = this.value">

        <h3 id="alignTextInEvent">Tid</h3>
        <input id="timeWhenStart" type="time" oninput="model.appointmentTimeInput = this.value">
    
        <br>
        <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
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


        <h3 id="alignTextInEvent">Legg til ferie</h3>
        <p id="alignTextInEvent">Fra</p>
        <input id="alignTextInEvent" type="date" input="model.vacationStartDate = this.value">
        <br>
        <p id="alignTextInEvent">Til</p>
        <input id="alignTextInEvent" type="date" input="model.vacationStartEnd = this.value">

        <input type="submit" class="nyHendelse" value="Legg til i kalender" onclick="pushToAppointmentsArray();appointmentEditMode(false)"> 
        
    </div>`
    
    return html;
}

//Gives all holidays classname 'holidays'
function holidaysInMonthView(date) {
    for(let i = 0; i < model.allHolidaysInCurrentMonth.length; i++) {
        if (model.allHolidaysInCurrentMonth[i].date.day == date && model.allHolidaysInCurrentMonth[i].date.year == model.currentYear) {
            return ' holidays'
        } 
    }
}

//Gives all sundays classname 'sunday'
function sundaysInMonthView(date) {
    for(let i = 0; i < model.sundaysInCurrentMonth.length; i++) {
        if (model.sundaysInCurrentMonth[i] == date) {
            return ' sundays'
        }
    }
}

//Gives all holidays classname 'holidays'
function holidaysInEntireYearView(date, month) {
    for(let i = 0; i < model.allHolidaysInCurrentYear.length; i++) {
        // console.log(model.allHolidaysInCurrentYear[i].date.year)
        if (model.allHolidaysInCurrentYear[i].date.day == date && model.allHolidaysInCurrentYear[i].date.month == month && model.allHolidaysInCurrentYear[i].date.year == model.currentYear) {
            return ' holidays'
        } 
    }
}

//Gives all sundays classname 'sunday'
function sundaysInEntireYearView(date, month) {
    for(let i = 0; i < model.sundaysInCurrentYear.length; i++) {
        if (model.sundaysInCurrentYear[i].date == date && model.sundaysInCurrentYear[i].month == month) {
            return ' sundays'
        }
    }
}