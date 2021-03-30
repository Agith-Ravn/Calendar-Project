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

//Får dato til å starte på riktig ukedag
function dateDisplacement() {
    let x = firstWeekdayInMonth(model.currentYear, model.currentMonth, 01)

    if (x == 1) {
    model.dateDisplacement = 0;
    }
    if (x == 2) {
    model.dateDisplacement = 1;
    }
    if (x == 3) {
    model.dateDisplacement = 2;
    }
    if (x == 4) {
    model.dateDisplacement = 3;
    }
    if (x == 5) {
    model.dateDisplacement = 4;
    }
    if (x == 6) {
    model.dateDisplacement = 5;
    }
    if (x == 7) {
    model.dateDisplacement = 6;
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

    //Må fikses slikt at mnd som er valgt når du kommer inn på kalenderen (mnd nå) også er farget

    model.changeMonth = monthIndex + 1;
    model.selectedMonth = selectedDiv;
    
    
    updateView();
    dateDisplacement();
}


function styleCurrentMonth() {
    if (model.selectedMonth == 'empty') {
    document.getElementById('colorSelected2').classList.add('colorSelected');
    } else {
        document.getElementById(model.selectedMonth).classList.add('colorSelected');
    }
}   


function changeYear(value) {    
    model.changeYear += value
    updateView();
}
