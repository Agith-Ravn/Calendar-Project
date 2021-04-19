// Controller.js
function selectView(cachedView){
    model.currentPage = cachedView
    updateView();
}

function loginResponse(){
    if(model.loginInputUser === model.adminUser.userName && model.loginInputPassword === model.adminUser.password){
        document.getElementById('app').innerHTML = homeView();
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
}

/*--------------------------- Calender - Homepage ---------------------------*/
//Egen funksjon som finner datoen idag
function findCurrentDate() {
    //year
    let d = new Date();
    let year = d.getFullYear()
    if (model.selectedYearInEntireYear !== 0 ) {
        model.currentYear = model.selectedYearInEntireYear
    } else {
        model.currentYear = (year + model.changeYear)
    }

    //month
    let month = d.getMonth() + 1;
    if (model.changeMonth == 0) {
        model.currentMonth = month
    } else {
        model.currentMonth = model.changeMonth
    }
    //date
    let date = d.getDate();
    model.currentDate = date
    //days in this month
    model.daysInMonth = new Date(model.currentYear, model.currentMonth, 0).getDate();

    //gives selectedDate same date as currentDate
    if (model.selectedDate == 0) {
        model.selectedDate = model.currentDate;
    }
}

function getCurrentTime() {
    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    
    if(hour < 10) {
        hour = ('0' + hour).slice(-2)
    }
    if(minutes < 10) {
        minutes = ('0' + minutes).slice(-2)
    }
    model.currentTime = hour + ':' + minutes;
}

function updateTime() {
    let time
    if (time != model.currentTime) {
        time = model.currentTime;
        updateView();
    }
}

function runUpdateTimeIntervalOnce() {
    if (model.interval == false) {
        model.interval = true;
        setInterval(updateTime, 10000);
    }
}

function daysInMonth(month, year){
    return new Date(year, month, 0).getDate();
}

//Får dato til å starte på riktig ukedag
function dateDisplacement() {
    let x = firstWeekdayInMonth(model.currentYear, model.currentMonth,)
    if (x == 0) {
        model.dateDisplacement = 6;
    }
    for(let i = 1; i <= 6; i++) {
        if (x == i) {
            model.dateDisplacement = (i - 1);
        }
    }
}

//EntireYear - Får dato til å starte på riktig ukedag
function dateDisplacementEntireYear() {
    let filterdList = [];
    for(let i = 1; i <= 12; i++) {
        let month = i;
        let x = firstWeekdayInMonth(model.currentYear, i);

        if (x == 0) {
            filterdList.push({month, dateDisplacement:6})
        }

        for(let j = 1; j <= 6; j++) {
            if (x == j) {
                filterdList.push({month, dateDisplacement:j - 1});
            }
        }
    }
    model.dateDisplacementEntireYear = filterdList;
    // console.log(model.dateDisplacementEntireYear)
}

//Finner første ukedag i mnd
function firstWeekdayInMonth(year, month) {
    let d = new Date(year, month - 1, 01);
    return d.getDay()
}

//Changes month when selecting month in navbar
function changeMonth(monthIndex, idName) {
    model.changeMonth = monthIndex + 1;
    model.colorSelectedMonth = idName;
    updateView();
}

//Farger current/selected mnd
function styleCurrentMonth() {
    let id = 'month' + (model.currentMonth - 1)
    if (model.colorSelectedMonth == 'empty') {
        document.getElementById(id).classList.add('colorSelected');
    } else {
        document.getElementById(model.colorSelectedMonth).classList.add('colorSelected');
    }
}

function changeYear(value) {
    model.changeYear += value
    if (model.selectedYearInEntireYear !== 0) {
        model.selectedYearInEntireYear += value;
    }
    updateView();
}

//Funksjon som finner riktig uke nummer i currentMonth
function findWeeksInCurrentMonth() {
    let x = []
    if (model.daysInMonth + model.dateDisplacement <= 28) {
        x.push(1, 8, 15, 22)
    } else if (model.daysInMonth + model.dateDisplacement >= 29 &&
        model.daysInMonth + model.dateDisplacement < 35) {
        let LastDateInMonth = model.daysInMonth;
        x.push(1, 8, 15, 22, LastDateInMonth)
    } else if (model.daysInMonth + model.dateDisplacement >= 35) {
        let LastDateInMonth = model.daysInMonth;
        x.push(1, 8, 15, 22, 29, LastDateInMonth)
    }
    let weekNumber = []
    for(let i = 0; i < x.length; i++) {
        let date = x[i];
        weekNumber.push(findWeekNumber(model.currentYear, model.currentMonth, date))
    }
    model.weeksInCurrentMonth = weekNumber;
}

//Hjelpe funksjon som finner uke nummer fra dato
function findWeekNumber(year,month,day) {
    function serial(days) { return 86400000*days; }
    function dateserial(year,month,day) { return (new Date(year,month-1,day).valueOf()); }
    function weekday(date) { return (new Date(date)).getDay()+1; }
    function yearserial(date) { return (new Date(date)).getFullYear(); }
    var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year,month,day),
        date2 = dateserial(yearserial(date - serial(weekday(date-serial(1))) + serial(4)),1,3);
    return ~~((date - date2 + serial(weekday(date2) + 5))/ serial(7));
}

//Antall rader i mnd
function findWeeksRowCount() {
    let x = model.dateDisplacement + model.daysInMonth
    if (x >= 36) {
        model.weeksRowCount = 6
    } if (x >= 29 && x < 36) {
        model.weeksRowCount = 5
    } if (x <= 28) {
        model.weeksRowCount = 4
    }
}

//Style currentDate first, then style selectedDate
function styleSelectedDate() {
    let index = model.selectedDate
    let id = 'date' + index
    document.getElementById(id).classList.add('selectedDate')
}

//Style selectedDate
function selectedDate(selectedDiv, date) {
    let datesDiv = document.getElementsByClassName('dates-grid-item');
    for(let i = 0; i < datesDiv.length; i++) {
        datesDiv[i].classList.remove('selectedDate');
    }
    model.selectedDate = date
    selectedDiv.classList.add('selectedDate')
    updateView();
}

//Shows appointments from selectedDate
function showAppointments() {
    let filteredList = [];
    for(let i = 0; i < model.appointments.length; i++) {
        let appointment = model.appointments[i];
        if (appointment.date.getFullYear() == model.currentYear
            && appointment.date.getMonth() == (model.currentMonth - 1)
            && appointment.date.getDate() == model.selectedDate) {

            filteredList.push(appointment)
        }
    }
    model.selectedDateAppointments = filteredList
}

//Get appointment from selected month
function getAppointmentsSelctedMonth() {
    let filteredList = [];
    for(let i = 0; i < model.appointments.length; i++) {
        let appointment = model.appointments[i];
        if (appointment.date.getFullYear() == model.currentYear
            && appointment.date.getMonth() == (model.currentMonth - 1)) {

            filteredList.push(appointment)
        }
    }
    model.selectedMonthAppointments = filteredList
}


// Backwords years
function days(month,year) {
    return new Date(year, month, 0).getDate();
    initiereYear();
};

//Select current year in entire year view
function selectCurrentYear() {
    let index;
    if (model.selectedYearInEntireYear !== 0 ) {
        index = model.selectedYearInEntireYear
    } else {
        index = model.currentYear
    }
    let id = 'year' + index
    document.getElementById(id).classList.add('entireYear__currentYear')
}

function selectYearInEntireYear(value) {
    model.selectedYearInEntireYear = value;
    updateView();
}

//Gets all holidays
function getHolidays() {
    //Gets all holidays in current year (er kun 2021 uansett.. finn et bedre alternativ)
    let filterdList = []
    for(let i = 0; i < holidays2021.length; i++) {
        let date = holidays2021[i].date.datetime;
        let holidayName = holidays2021[i].name[0].text;
        filterdList.push({holidayName, date})
    }
    model.allHolidaysInCurrentYear = filterdList;

    //Gets all holidays in current month
    let filterdList2 = []
    for(let i = 0; i < model.allHolidaysInCurrentYear.length; i++) {
        if (holidays2021[i].date.datetime.month == model.currentMonth) {
            let date = holidays2021[i].date.datetime
            let holidayName = holidays2021[i].name[0].text
            filterdList2.push({holidayName, date})
        }
    }
    model.allHolidaysInCurrentMonth = filterdList2;
}

//Finds all sundays in currentMonth
function getSundays() {

    //All sundays in currentMonth
    let filteredList = []
    for(let i = 1; i < model.daysInMonth + 1; i++) {
        let isoDates = new Date(model.currentYear, (model.currentMonth - 1), i);
        let dateToString = isoDates.toString()
        let weekday = dateToString.substr(0, 2)
        if (weekday == 'Su') {
            filteredList.push(i)
        }
    }
    model.sundaysInCurrentMonth = filteredList;

    //All sundays in a year
    let filteredList2 = []
    for(let j = 0; j < model.months.length; j++) {
        for(let i = 1; i <= model.daysInMonth + 1; i++) {
            let isoDates = new Date(model.currentYear, (j - 1), i);
            let month = j
            let date = i
            let dateToString = isoDates.toString()
            let weekday = dateToString.substr(0, 2)
            if (weekday == 'Su') {
                filteredList2.push({month, date})
            }
        }
    }
    model.sundaysInCurrentYear = filteredList2;
    // console.log(model.sundaysInCurrentYear)
}


// Add Event to Calender
// function addNewEvent() {
//     //const h = document.getElementById("headerText").value
//     //const p = document.getElementById("paragraphText").value
//     console.log(h);
//     console.log(p);
//     model.addedNewEventParams
//     model.appointments
// }

// Pusher input Values fra event/hendelser. 
function pushToAppointmentsArray(){
    // items = []
    // newDate = model.currentYear, model.selectedDate, model.currentMonth; 
    newColorValue = model.appointmentsColorInput;
    newHeaderValue = model.appointmentsHeaderInput;
    newParagraphValue = model.appointmentsContentInput;

    // items.push(newColorValue,newHeaderValue,newParagraphValue);
    // { date: new Date(2021, 3, 16), time: '09.00', header: 'Chorei',     content: '', privat: false, color: 'blue'} //Følg dette oppsette <--
    model.appointments.push({date: '', time: '', header: newHeaderValue, content:newParagraphValue, privat: '', color: newColorValue})
    console.table(model.appointments)
}

function selectVacationStart(startDate){
    model.vacationStartDate = startDate.value;
}

function selectVacationEnd(endDate){
    model.vacationEndDate = endDate.value;
}

//Bestemmer om du edit mode er på eller av
function appointmentEditMode(trueOrFalse) {
    model.appointmentEditMode = trueOrFalse
    updateView();
}


/* 
Plan: 
    X - Gjør det mulig å legg til ny appointment | Jonas allerede fikset
    o - Legge til i model at du er i legg til ny menu
    o - Kunne gå ut av "legg til ny appointment menu" når man trykker "legg til i kalender"
    o - koble input felt sammen med modell
    o - når du trykker på "legg til i kalender", skal du pushe alt i innput felt opp til modell (appointment)
    o - Kanskje legge til en tilbake knapp, i tilfelle du ikke skal legge til noe?
    o - Skal komme opp feil melding, om VITKIGE input felt ikke er fylt inn
    o - Kunne velge ferie (ta dette til slutt)
*/