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

    //days in this month
    model.daysInMonth = new Date(model.currentYear, model.currentMonth, 0).getDate();
}   

function findDaysOfMonthYear(){
    
}

function daysInMonth(month, year){
    return new Date(year, month, 0).getDate();
}

//Får dato til å starte på riktig ukedag
function dateDisplacement() {
    let x = firstWeekdayInMonth(model.currentYear, model.currentMonth, 01)

    for(let i = 1; i <= 7; i++) {
        if (x == i) {
            model.dateDisplacement = i - 1;
        }
    } 
}

//Finner første ukedag i mnd
function firstWeekdayInMonth(year, month, date) {
    let d = new Date(year, month - 1, date);
    d.getDay()
    return d.getDay()
}

//Changes month when selecting month in navbar
function changeMonth(monthIndex, selectedDiv) {
    model.changeMonth = monthIndex + 1;
    model.selectedMonth = selectedDiv; 
    updateView();
}

//Farger current/selected mnd
function styleCurrentMonth() {
    let id = 'colorSelected' + (model.currentMonth - 1)

    if (model.selectedMonth == 'empty') {
        document.getElementById(id).classList.add('colorSelected');
    } else {
        document.getElementById(model.selectedMonth).classList.add('colorSelected');
    }
}   

function changeYear(value) {    
    model.changeYear += value
    updateView();
}

function weeksRow() {
    let x = model.dateDisplacement + model.daysInMonth

    if (x >= 36) {
        model.weeksRow = 6
    } if (x >= 29 && x < 36) {
        model.weeksRow = 5
    } if (x <= 28) {
        model.weeksRow = 4
    }
    
} 
//Uferdig
findWeekNumber();
function findWeekNumber() {    
    //define a date object variable with date inside it  
    var date1 = new Date("01/01/2021");  

    //find the year of the entered date  
    var oneJan =  new Date(date1.getFullYear(), 0, 1);   

    // calculating number of days in given year before the given date   
    var numberOfDays =  Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));   

    // adding 1 since to current date and returns value starting from 0   
    var result = Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);     

    //display the calculated result         
    console.log(result)
    
}

