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
    model.currentYear = (year + model.changeYear)
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

function findDaysOfMonthYear(){
    
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
