function appointmentsView() {

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
                            <div class="appointment__holiday" style="color:red"> ${holidayName} </div>
                        </div>`
            }
        }

        //Shows Speical event
        for(let i = 0; i < model.specialEvent.events.length; i++) {
            let id = model.specialEvent.events[i].id;
            // console.log(id)
            let header = model.specialEvent.events[i].header
            let content = model.specialEvent.events[i].content
            let startDate = model.specialEvent.events[i].startDate
            let endDate = model.specialEvent.events[i].endDate
            let color = model.specialEvent.events[i].color

            for(let j = 0; j < model.specialEvent.events[i].calculatedDate.length; j++) {
                let date = model.specialEvent.events[i].calculatedDate[j]
                if (date == model.selectedFullDate) {
                    html += `<div class="hendelse">
                    <div class="appointment__header-container">
                        <div class="appointment__color" style="background:${color};"> </div>
                        <div class="header"> ${header} </div> 
                        <div class="appointment__edit-button" onclick="model.specialEventEditModeId = '${id}';specialEventEditMode(true);"> Edit </div>
                    </div>
                    <p> ${content} </p>
                    </div>`
                }
            }
        }

        //Shows appointment from model
        for(let i = 0; i < model.selectedDateAppointments.length; i++) {
            let id = model.selectedDateAppointments[i].id;
            // console.log(model.selectedDateAppointments[i].id)
            html += `<div class="hendelse">
                    <div class="appointment__header-container">
                        <div class="appointment__color" style="background:${model.selectedDateAppointments[i].color};"> <!-- color --> </div>
                        <h2 class="header"> ${model.selectedDateAppointments[i].time} <span style="font-weight:100"> | </span> ${model.selectedDateAppointments[i].header} </h2>
                        <div class="appointment__edit-button" onclick="model.selectedIdEvent = '${id}';appointmentEditMode(true);"> Edit </div>
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

        <input type="submit" class="appointment__back-button" value="Tilbake" onclick="appointmentEditMode(false)"> 
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
        <input type="submit" class="appointment__add-button" value="Legg til i kalender" onclick="pushToSpecialEventsArray();specialEventMenuView(false)"> 
        </div>`
    return html;
}

function appointmentEditModeView() {
    
    // console.log(model.selectedIdEvent)
    // console.log(model.selectedDateAppointments)
    // selectedDateAppointments .replace(' ','')
    let html = '';
    for(let i = 0; i < model.selectedDateAppointments.length; i++) {
        let id = model.selectedDateAppointments[i].id
        let id2 = model.selectedIdEvent.replace(' ','')
        let header = model.selectedDateAppointments[i].header
        let content = model.selectedDateAppointments[i].content
        let time = model.selectedDateAppointments[i].time
        let color = model.selectedDateAppointments[i].color

        // let modul1 = model.specialEvent.events[i].visibility.modul1 == true ? 'checked="checked"' : '';
        // let modul2 = model.specialEvent.events[i].visibility.modul2 == true ? 'checked="checked"' : '';
        // let modul3 = model.specialEvent.events[i].visibility.modul3 == true ? 'checked="checked"' : '';
        // let startIT = model.specialEvent.events[i].visibility.startIT == true ? 'checked="checked"' : '';
        // let privat = model.specialEvent.events[i].visibility.privat == true ? 'checked="checked"' : ''; 
        //console.log(model.selectedDateAppointments)
    
        if(id == id2) {
            html +=`
            <div id="changeBox" class="hendelser">
            <div class="gridContainer">
                <div class="gridItem" >
                    <input type="color" id="circleColorChooser" value="${color}" onchange="model.appointmentsColorInput = this.value">
                </div>
                <div class="gridItem" >
                    <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
                </div>
            </div>
            
            <h3 id="alignTextInEvent">Header</h3>
            <input id="headerText" placeholder="Enter text" type="text" value="${header}" onchange="model.appointmentsHeaderInput = this.value"><br>

            <h3 id="alignTextInEvent">Paragraph</h3>
            <input id="paragraphText" placeholder="Enter text" type="text" value="${content}" onchange="model.appointmentsContentInput = this.value">

            <h3 id="alignTextInEvent">Tid</h3>
            <input id="timeWhenStart" type="time" value="${time == undefined ? '' : time}" onchange="model.appointmentTimeInput = this.value">

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

            <button id="alignTextInEvent" class="appointment__delete-button" onclick="deleteEvent('${id}');appointmentEditMode(false)"> Delete </button>
            
            <input type="submit" class="appointment__back-button" value="Tilbake" onclick="appointmentEditMode(false)"> 
            <input type="submit" class="appointment__add-button" value="Lagre" onclick="saveEditEvent('${id}','${i}');appointmentEditMode(false)"> 
            </div>`
            return html;
        }
    }
}

function specialEventEditModeView() {
    let html = '';
      
    for(let i = 0; i < model.specialEvent.events.length; i++) {
        let id = model.specialEvent.events[i].id
        let id2 = model.specialEventEditModeId.replace(' ','')
        let header = model.specialEvent.events[i].header
        let content = model.specialEvent.events[i].content
        let startDate = model.specialEvent.events[i].startDate
        let endDate = model.specialEvent.events[i].endDate
        let color = model.specialEvent.events[i].color

        let modul1 = model.specialEvent.events[i].visibility.modul1 == true ? 'checked="checked"' : '';
        let modul2 = model.specialEvent.events[i].visibility.modul2 == true ? 'checked="checked"' : '';
        let modul3 = model.specialEvent.events[i].visibility.modul3 == true ? 'checked="checked"' : '';
        let startIT = model.specialEvent.events[i].visibility.startIT == true ? 'checked="checked"' : '';
        let privat = model.specialEvent.events[i].visibility.privat == true ? 'checked="checked"' : ''; 
    
        if(id == id2) {
            html +=`<div id="changeBox" class="hendelser">
            <div class="gridContainer">
            <div class="gridItem">
            <input type="color" id="circleColorChooser" value="${color}" onchange="model.specialEvent.colorInput = this.value">
            </div>
            <div class="gridItem" >
            <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
            </div>
            
            <h3 id="alignTextInEvent">Header</h3>
            <input id="headerText" placeholder="Enter text" type="text" value="${header}" onchange="model.specialEvent.headerInput = this.value"><br>

            <h3 id="alignTextInEvent">Paragraph</h3>
            <input id="paragraphText" placeholder="Enter text" type="text" value="${content}" onchange="model.specialEvent.contentInput = this.value">

            <br>
            <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
            <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul 1" onchange="model.specialEvent.visibility.modul1 = this.checked" ${modul1}>
            <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul 2" onchange="model.specialEvent.visibility.modul2 = this.checked" ${modul2}>
            <label id="alignTextInEvent" for="Modul2"> Modul 2</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul 3" onchange="model.specialEvent.visibility.modul3 = this.checked" ${modul3}>
            <label id="alignTextInEvent" for="Modul2"> Modul 3</label><br>

            <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT" onchange="model.specialEvent.visibility.startIT = this.checked" ${startIT}>
            <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" onchange="model.specialEvent.visibility.privat = this.checked" ${privat}>
            <label id="alignTextInEvent" for="Privat"> Privat</label><br>
            <br>

            <h3 id="alignTextInEvent">Spesiell hendelse</h3>

            <p id="alignTextInEvent">Fra</p>
            <input id="alignTextInEvent" type="date" value="${startDate}" onchange="model.specialEvent.startDateInput = this.value">
            <br>
            <br>
            <p id="alignTextInEvent">Til</p>
            <input id="alignTextInEvent" type="date" value="${endDate}" onchange="model.specialEvent.endDateInput = this.value">

            <button id="alignTextInEvent" class="appointment__delete-button" onclick="deleteSpecialEvent('${id}','${i}');specialEventEditMode(false)"> Delete </button>

            <input type="submit" class="appointment__back-button" value="Tilbake" onclick="specialEventEditMode(false)"> 
            <input type="submit" class="appointment__add-button" value="Lagre endringer" onclick="saveSpecialEvent('${id}','${i}');specialEventEditMode(false)">
            </div>`
            return html;
        }
    }
}