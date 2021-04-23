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

    let dato = ('0' + model.selectedDate).slice(-2)
    let mnd = ('0' + model.currentMonth).slice(-2)
    model.selectedFullDate = `${model.currentYear}`+ '-' + mnd + '-' + dato
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
        model.clearInterval = setInterval(updateTime, 10000);
    }
}

function stopTimeInterval() {
    clearInterval(model.clearInterval)
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
    appointmentMenuToFalse();
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
    appointmentMenuToFalse();
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
    appointmentMenuToFalse();
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

// Pusher input Values fra event/hendelser.
function pushToAppointmentsArray(){
    newColorValue = model.appointmentsColorInput
    newHeaderValue = model.appointmentsHeaderInput;
    newParagraphValue = model.appointmentsContentInput;
    newTimeValue = model.appointmentTimeInput;
    newDateValue = model.selectedDate;
    visibility = model.appointmentVisibilityInput;

    //legger til null forran hvis dato eller month er mindre enn 10
    date = ('0' + newDateValue).slice(-2)
    month = ('0' + model.currentMonth).slice(-2)
    fullDate = `${model.currentYear}-${month}-${date}` 
    newId = generateId(model.appointments, fullDate)

    // { date: new Date(2021, 3, 16), time: '09.00', header: 'Chorei',     content: '', privat: false, color: 'blue'} //Følg dette oppsette <--
    model.appointments.push(
        {
            id:         newId,
            date:       new Date( model.currentYear, model.currentMonth - 1,  model.selectedDate),
            time:       newTimeValue,
            header:     newHeaderValue,
            content:    newParagraphValue,
            visibility: visibility,
            color:      newColorValue,
        }
    )
    updateView();
}

function pushToSpecialEventsArray() {
    let startDate = model.specialEvent.startDateInput
    let endDate = model.specialEvent.endDateInput
    let header = model.specialEvent.headerInput
    let content = model.specialEvent.contentInput
    let visibility = model.specialEvent.visibility
    let color = model.specialEvent.colorInput

    if (startDate > endDate) {
        alert('Ugyldig dato, Til dato starter før fra dato.')
        return
    }
    if (startDate.length == !8 || endDate.length == !8) {
        alert('Fyll inn dato')
        return
    }

    let id = generateId(model.specialEvent.events, startDate);
    let calculatedDate = calculateSpecialEventDate(startDate, endDate);

    model.specialEvent.events.push(
        {
            id: id,
            startDate: startDate,
            endDate: endDate,
            header: header,
            content: content,
            visibility: visibility,
            color: color,
            calculatedDate: calculatedDate
        }
    )
    updateView();
}

//Save changes on "normal" events
function saveEditEvent(id, index){
    let id2 = model.selectedIdEvent.replace(' ','')
    if(id == id2){        
        let event = model.selectedDateAppointments[index]
        let vEvent = model.selectedDateAppointments[index].visibility
        let vInput = model.appointmentVisibilityInput

        let date = event.date 
        let time = model.appointmentTimeInput == "" ? event.time : model.appointmentTimeInput
        let header = model.appointmentsHeaderInput == "" ? event.header : model.appointmentsHeaderInput
        let content = model.appointmentsContentInput == "" ? event.content : model.appointmentsContentInput
        let color = model.appointmentsColorInput == "" ? event.color : model.appointmentsColorInput

        //Fungerer ikke.. finn en løsning
        let modul1 = vInput.modul1 == "" ? vEvent.modul1 : vInput.modul1;
        let modul2 = vInput.modul2 == "" ? vEvent.modul2: vInput.modul2;
        let modul3 = vInput.modul3 == "" ? vEvent.modul3 : vInput.modul3;
        let startIT = vInput.startIT == "" ? vEvent.startIT : vInput.startIT;
        let privat = vInput.privat == "" ? vEvent.privat : vInput.privat;

        let appointments = (appointment) => appointment.id == id;
        let appointmentIndex = model.appointments.findIndex(appointments)
        
        let visibility = {modul1: modul1, modul2: modul2, modul3: modul3, startIT: startIT, privat: privat,}

        let changes = {
            id: id,
            date: date,
            time: time,
            header: header,
            content: content,
            color: color,
            visibility: visibility,         
        }
        model.appointments[appointmentIndex] = changes
        // updateView();
        // console.log(model.appointments[appointmentIndex].visibility)
    }
}

//Save changes on special events
function saveSpecialEvent(id, index) {
    let id2 = model.selectedIdSpecialEvent.replace(' ','')
    if(id == id2) {
        let indexForEvents = model.specialEvent.events[index]
        let sEvent = model.specialEvent
        let vInput = model.specialEvent.visibility

        let startDateInput = sEvent.startDateInput == "" ? indexForEvents.startDate : sEvent.startDateInput;
        let endDateInput = sEvent.endDateInput == "" ? indexForEvents.endDate : sEvent.endDateInput;
        let headerInput = sEvent.headerInput == "" ? indexForEvents.header : sEvent.headerInput;
        let contentInput = sEvent.contentInput == "" ? indexForEvents.content : sEvent.contentInput;
        let colorInput = sEvent.colorInput == "" ? indexForEvents.color : sEvent.colorInput;

        // let modul1 = vInput.modul1 == "" ? indexForEvents.visibility.modul1 : vInput.modul1
        // let modul2 = vInput.modul2 == "" ? indexForEvents.visibility.modul2 : vInput.modul2
        // let modul3 = vInput.modul3 == "" ? indexForEvents.visibility.modul3 : vInput.modul3
        // let startIT = vInput.startIT == "" ? indexForEvents.visibility.startIT : vInput.startIT
        // let privat = vInput.privat == "" ? indexForEvents.visibility.privat : vInput.privat

        let test = specialEventCheckbox(index)
        // console.log(test)
        // let visibilityInput = {modul1: modul1, modul2: modul2, modul3: modul3, startIT: startIT, privat: privat,}

        if (startDateInput > endDateInput) {
            alert('Ugyldig dato, Til dato starter før fra dato.')
            return
        }
        if (startDateInput.length == !8 || endDateInput.length == !8) {
            alert('Fyll inn dato')
            return
        }

        let calculatedDate = calculateSpecialEventDate(startDateInput, endDateInput);

        let changes = {
                id: id,
                startDate: startDateInput,
                endDate: endDateInput,
                header: headerInput,
                content: contentInput,
                visibility: visibilityInput,
                color: colorInput,
                calculatedDate: calculatedDate
            }

        model.specialEvent.events[index] = changes
        // updateView();
        // clearInput();
        // console.log(model.specialEvent.events[index].visibility)
    }
}

//Delete "normal" event
function deleteEvent(id) {
    let appointments = (appointment) => appointment.id == id;
    let appointmentIndex = model.appointments.findIndex(appointments)
    let id2 = model.selectedIdEvent.replace(' ','')
    if(id == id2) {
        model.appointments.splice(appointmentIndex, 1);
    }
    updateView();
    // clearInput();
}

//Delete special event
function deleteSpecialEvent(id, index) {
    let id2 = model.selectedIdSpecialEvent.replace(' ','')
    if(id == id2) {
        model.specialEvent.events.splice(index, 1);
    }
    updateView();
    // clearInput();
}

//Regner ut hvor mange dager
function calculateSpecialEventDate(start, end) {

    const listDate = [];
    const startDate = start;
    const endDate = end;
    const dateMove = new Date(startDate);
    let strDate = startDate;
    while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
    };
    return listDate;
}

// generateId(model.specialEvent.events, '2021-04-01');
function generateId(idEvents, date) {
    let newId
    let idInEvents
    let generatedId = 1;
    for(let i = 0; i < idEvents.length; i++) {
        idInEvents = idEvents[i].id
        // console.log(idInEvents + ' Id i events')
        
        newId = date + '-' + generatedId;
        
        if (newId == idInEvents) {
            generatedId++;
        }
        newId = date + '-' + generatedId;
    }
    // console.log(newId + ' ny id')
    return newId
}


function appointmentMenu(trueOrFalse) {
    model.appointmentMenu = trueOrFalse
    if (model.appointmentMenu == true) {stopTimeInterval()}
    updateView();

}

function specialEventMenu(trueOrFalse) {
    model.specialEventMenu = trueOrFalse
    if (model.specialEventMenu == true) {stopTimeInterval()}
    updateView();
  
}

function appointmentEditMode(trueOrFalse) {
    model.appointmentEditMode = trueOrFalse
    if (model.appointmentEditMode == true) {stopTimeInterval()}
    updateView();

}

function specialEventEditMode(trueOrFalse) {
    model.specialEventEditMode = trueOrFalse
    if (model.specialEventEditMode == true) {stopTimeInterval()}
    updateView();
} // window.updateTime.visible

function appointmentMenuToFalse() {
    model.appointmentMenu = false;
    model.specialEventMenu = false;
    model.appointmentEditMode = false;
    model.specialEventEditMode = false;
}

/*
FIX:
    X - Tilbake knapp på vanlig event
    o - Checkbox blir ikke lagret i vanlig og special event
    o - Legg til spesiell hendelse <-- endre navn til dette eller noe annet...
    o - Fikse klokke



*/

function specialEventCheckbox(index) {
    let vInput = model.specialEvent.visibility
    let vEvent = model.specialEvent.events[index].visibility

    let m1 = vEvent.modul1
    m1 != vInput.modul2 ? vInput.modul2 : m1
    // m1 == "" ? vEvent.modul1 : m1

    let m2 = vInput.modul2 
    m2 == "" ? vEvent.modul2 : m2

    let m3 = vInput.modul3
    m3 == "" ? vEvent.modul3 : m3

    let s = vInput.startIT
    s == "" ? vEvent.startIT : s

    let p = vInput.privat
    p == "" ? vEvent.privat : p

    // let m1 = vInput.modul1 
    // m1 == "" ? vEvent.modul1 : vInput.modul1

    console.log(m1)
    // console.log(m2)
    // console.log(m3)
    // console.log(s)
    // console.log(p)
    // console.log(vEvent.modul1)


    // let test = {modul1: m1, modul2: m2, modul3: m3, startIT: si, privat: p,}
    // return test 
}

function checkbox(sLocation, checked) {
    if (checked) {sLocation = checked}
    // console.log(checked)
    console.log(sLocation)

}