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

function currentYear() {
    let d = new Date();
    let year = d.getFullYear()
    model.currentYear = year + model.changeYear
}

function changeYear(value) {
    
    model.changeYear += value
    console.log(model.currentYear)

    navBarView();
}

//Først må året bli laget igjennom view og fra modell (året nå)
//Lage en funksjon som endrer på året i modell + 1 osv
