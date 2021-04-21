function appointmentsView() {
    //hvis modeL.appointment == true, skal "addAppointView" vises
    // hvis modeL.appointment == true, skal det under vises
    let html = '';
    html +=`<div class="widthCard">`

    if(model.appointmentMenuView == true) {
        html += addAppointment();
    }

    if(model.specialEventMenuView == true) {
        html += specialEventMenu();
    }

    if(model.appointmentEditMode == true) {
        html += appointmentEditModeView();
    }

    if(model.specialEventEditMode == true) {
        html += specialEventEditModeView();
    }

    if(model.appointmentMenuView == false 
    && model.specialEventMenuView == false
    && model.appointmentEditMode == false
    && model.specialEventEditMode == false) {
        html +=`<div id="changeBox" class="hendelser">
            <div id="remove">
            <h1>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear} | ${model.currentTime}</h1>
            </div>

                <a href="#" onclick="specialEventMenuView(true)"> 
                    <div class="nySpesiellHendelse">+ Legg spesiell hendelse </div>
                </a>
                <a href="#" onclick="appointmentMenuView(true)"> 
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

        //Shows Speical event
        for(let i = 0; i < model.specialEvent.events.length; i++) {
            let header = model.specialEvent.events[i].header
            let content = model.specialEvent.events[i].content
            let startDate = model.specialEvent.events[i].startDate
            let endDate = model.specialEvent.events[i].endDate
            let color = model.specialEvent.events[i].color

            for(let j = 0; j < model.specialEvent.events[i].calculatedDate.length; j++) {
                let date = model.specialEvent.events[i].calculatedDate[j]
                if (date == model.selectedFullDate) {
                    html += `<div class="hendelse">
                    <div class="appointment__first-row">
                        <div class="appointment__color" style="background:${color};"> </div>
                        <div class="header"> ${header} </div> 
                        <div class="appointment__edit-button" onclick="specialEventEditMode(true)"> Edit </div>
                    </div>
                    <p> ${content} </p>
                    </div>`
                }
            }
        }

        //Shows appointment from model
        for(let i = 0; i < model.selectedDateAppointments.length; i++) {
            html += `<div class="hendelse">
                    <div class="appointment__first-row">
                        <div class="appointment__color" style="background:${model.selectedDateAppointments[i].color};"> <!-- color --> </div>
                        <h2 class="header"> ${model.selectedDateAppointments[i].time} <span style="font-weight:100"> | </span> ${model.selectedDateAppointments[i].header} </h2>
                        <div class="appointment__edit-button" onclick="checkIfIdIsCorrect()"> Edit </div>
                    </div>
                    <p> ${model.selectedDateAppointments[i].content} </p>
                    </div>`
        }
        html += `</div>`
    }

    html += `</div>`
    return html;
}

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
        <!-- Check if True Or False -->
        <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
        <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul1">
        <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul2">
        <label id="alignTextInEvent" for="Modul1"> Modul 2</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul3">
        <label id="alignTextInEvent" for="Modul1"> Modul 3</label><br>

        <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT">
        <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

        <!-- Check if True Or False -->
        <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" oninput="model.appointmentPrivatOrNot = this.value">
        <label id="alignTextInEvent" for="Privat"> Privat</label><br>
        <br>

        <input type="submit" class="appointment__back-button" value="Tilbake" onclick="appointmentMenuView(false)"> 
        <input type="submit" class="appointment__add-button" value="Legg til i kalender" onclick="pushToAppointmentsArray();appointmentMenuView(false)"> 
        </div>`
    return html;
}

function specialEventMenu() {
    let html = '';
    html +=` 
        <div id="changeBox" class="hendelser">
        <div class="gridContainer">
            <div class="gridItem" >
                <input type="color" id="circleColorChooser" value="#000000" onchange="model.specialEvent.colorInput = this.value">
            </div>
            <div class="gridItem" >
                <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
        </div>
        
        <h3 id="alignTextInEvent">Header</h3>
        <input id="headerText" placeholder="Enter text" type="text" oninput="model.specialEvent.headerInput = this.value"><br>

        <h3 id="alignTextInEvent">Paragraph</h3>
        <input id="paragraphText" placeholder="Enter text" type="text" oninput="model.specialEvent.contentInput = this.value">`

    
    html += `
        <br>
        <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
        <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul 1" onclick="model.specialEvent.visibility.modul1 = this.checked">
        <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul 2" onclick="model.specialEvent.visibility.modul2 = this.checked">
        <label id="alignTextInEvent" for="Modul2"> Modul 2</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul 3" onclick="model.specialEvent.visibility.modul3 = this.checked">
        <label id="alignTextInEvent" for="Modul2"> Modul 3</label><br>

        <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT" onclick="model.specialEvent.visibility.startIT = this.checked">
        <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" onclick="model.specialEvent.visibility.privat = this.checked" checked>
        <label id="alignTextInEvent" for="Privat"> Privat</label><br>
        <br>

        <h3 id="alignTextInEvent">Spesiell hendelse</h3>

        <p id="alignTextInEvent">Fra</p>
        <input id="alignTextInEvent" type="date" oninput="model.specialEvent.startDateInput = this.value">
        <br>
        <p id="alignTextInEvent">Til</p>
        <input id="alignTextInEvent" type="date" oninput="model.specialEvent.endDateInput = this.value">

        <input type="submit" class="appointment__back-button" value="Tilbake" onclick="specialEventMenuView(false)"> 
        <input type="submit" class="appointment__add-button" value="Legg til i kalender" onclick="pushToSpecialEventsArray();specialEventMenuView(false)"> 
    </div>`
    return html;
}

function appointmentEditModeView() {

    

    let html = '';
    html +=` 
    
        <div id="changeBox" class="hendelser">
        <div class="gridContainer">
            <div class="gridItem" >
                <input type="color" id="circleColorChooser" value="#000000" onchange="model.specialEvent.colorInput = this.value">
            </div>
            <div class="gridItem" >
                <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
        </div>
        
        <h3 id="alignTextInEvent">Header</h3>
        <input id="headerText" placeholder="Enter text" type="text" oninput="model.specialEvent.headerInput = this.value"><br>

        <h3 id="alignTextInEvent">Paragraph</h3>
        <input id="paragraphText" placeholder="Enter text" type="text" oninput="model.specialEvent.contentInput = this.value">

        <br>
        <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
        <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul 1" onclick="model.specialEvent.visibility.modul1 = this.checked">
        <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul 2" onclick="model.specialEvent.visibility.modul2 = this.checked">
        <label id="alignTextInEvent" for="Modul2"> Modul 2</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul 3" onclick="model.specialEvent.visibility.modul3 = this.checked">
        <label id="alignTextInEvent" for="Modul2"> Modul 3</label><br>

        <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT" onclick="model.specialEvent.visibility.startIT = this.checked">
        <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" onclick="model.specialEvent.visibility.privat = this.checked" checked>
        <label id="alignTextInEvent" for="Privat"> Privat</label><br>
        <br>

        <h3 id="alignTextInEvent">Spesiell hendelse</h3>

        <p id="alignTextInEvent">Fra</p>
        <input id="alignTextInEvent" type="date" oninput="model.specialEvent.startDateInput = this.value">
        <br>
        <p id="alignTextInEvent">Til</p>
        <input id="alignTextInEvent" type="date" oninput="model.specialEvent.endDateInput = this.value">

        <input type="submit" class="appointment__back-button" value="Tilbake" onclick="specialEventMenuView(false)"> 
        <input type="submit" class="appointment__add-button" value="Lagre" onclick="pushToSpecialEventsArray();specialEventMenuView(false)"> 
    </div>`
    return html;
}

function specialEventEditModeView() {
    let html = '';
      
    for(let i = 0; i < model.specialEvent.events.length; i++) {
        let header = model.specialEvent.events[i].header
        let content = model.specialEvent.events[i].content
        let startDate = model.specialEvent.events[i].startDate
        let endDate = model.specialEvent.events[i].endDate
        let color = model.specialEvent.events[i].color

        for(let j = 0; j < model.specialEvent.events[i].calculatedDate.length; j++) {
            let date = model.specialEvent.events[i].calculatedDate[j]

            html +=`<div id="changeBox" class="hendelser">`
            
            html +=`<div class="gridContainer">
            <div class="gridItem" >
            <input type="color" id="circleColorChooser" value="${color}" onchange="model.specialEvent.colorInput = this.value">
            </div>
            <div class="gridItem" >
            <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
            </div>
            
            <h3 id="alignTextInEvent">Header</h3>
            <input id="headerText" placeholder="Enter text" type="text" value="${header}"oninput="model.specialEvent.headerInput = this.value"><br>

            <h3 id="alignTextInEvent">Paragraph</h3>
            <input id="paragraphText" placeholder="Enter text" type="text" oninput="model.specialEvent.contentInput = this.value">

            <br>
            <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
            <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul 1" onclick="model.specialEvent.visibility.modul1 = this.checked">
            <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul 2" onclick="model.specialEvent.visibility.modul2 = this.checked">
            <label id="alignTextInEvent" for="Modul2"> Modul 2</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul 3" onclick="model.specialEvent.visibility.modul3 = this.checked">
            <label id="alignTextInEvent" for="Modul2"> Modul 3</label><br>

            <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT" onclick="model.specialEvent.visibility.startIT = this.checked">
            <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" onclick="model.specialEvent.visibility.privat = this.checked" checked>
            <label id="alignTextInEvent" for="Privat"> Privat</label><br>
            <br>

            <h3 id="alignTextInEvent">Spesiell hendelse</h3>

            <p id="alignTextInEvent">Fra</p>
            <input id="alignTextInEvent" type="date" oninput="model.specialEvent.startDateInput = this.value">
            <br>
            <p id="alignTextInEvent">Til</p>
            <input id="alignTextInEvent" type="date" oninput="model.specialEvent.endDateInput = this.value">

            <input type="submit" class="appointment__back-button" value="Tilbake" onclick="specialEventMenuView(false)"> 
            <input type="submit" class="appointment__add-button" value="Lagre endringer" onclick="pushToSpecialEventsArray();specialEventMenuView(false)">`
            
            html += `</div>`
            return html;
        }
    }
}