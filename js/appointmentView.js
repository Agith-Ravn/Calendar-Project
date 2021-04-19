function addTheAppointmentView(){
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


        <h3 id="alignTextInEvent">Legg til ferie</h3>
        <p id="alignTextInEvent">Fra</p>
        <input id="alignTextInEvent" type="date" input="model.vacationStartDate = this.value">
        <br>
        <p id="alignTextInEvent">Til</p>
        <input id="alignTextInEvent" type="date" input="model.vacationStartEnd = this.value">

        <input type="submit" class="nyHendelse" value="Legg til i kalender" onclick="pushToAppointmentsArray();appointmentEditMode(false)"> 
        
    </div>`
    
    return html;
}