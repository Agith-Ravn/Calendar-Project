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


function datePlacement() {

    //En funksjon som finner antall dager i året
    // for(let j = 0; j < 12; j++) {
    //     test123 = new Date(2000, j, 0).getDate();
    // }
    console.log(test123)
    
    for (let i = 0; i < /*antall dager i ukeb*/2; i++)

    //Funksjonen har kan finne ut når dato starter i 2000 og oppover?
    //Start på 1996 (skuddår). 1 Januar er en mandag
    //Ukedager som looper i igjennom alle dager?
    //filtrere for å finne ukedag for datoen





    model.datePlacement = 5;
    
    //35 - antall dager i mnd (eksempel: januar 21) = 4 > 
    //Hvis januar starter på fredag > januar slutter på søndag 

    //februar starter på mandag
    //februar har 28 dager
    //februar slutter på søndag

    //mars starer på mandag
    //mars har 31 dager 
    //mars slutter på onsdag
}

//Changes month when selecting month in navbar
function changeMonth(monthIndex, colorSelected) {
    model.changeMonth = monthIndex + 1;
    model.selectedMonth = colorSelected;
    
    updateView();
    styleCurrentMonth();
    datePlacement()
}


function styleCurrentMonth() {
    let selectedMonth = model.selectedMonth
    document.getElementById(selectedMonth).classList.add('colorSelected');    
}   


function changeYear(value) {    
    model.changeYear += value
    updateView();
}
