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

//Changes month when selecting month in navbar
function changeMonth(monthIndex, colorSelected) {
    model.changeMonth = monthIndex + 1;
    model.selectedMonth = colorSelected;
    
    updateView();
    styleCurrentMonth();
    
}

function styleCurrentMonth() {
    let selectedMonth = model.selectedMonth
    document.getElementById(selectedMonth).classList.add('colorSelected');    
}   

function changeYear(value) {    
    model.changeYear += value
    updateView();
}