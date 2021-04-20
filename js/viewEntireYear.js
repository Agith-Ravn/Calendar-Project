function initiereYear(){
    var getMonthDays = days(0, fullYear); // adds a week to a date
    let html = ``;
    //Navbar
    html += navBarView();
    html += `<div id="entireYear">`
    html += yearUpdateView();
        html += `<div class="month-container">`
        for (let j = 1; j <= 12 ; j++) {
            var getMonthDays = days(j, model.currentYear)
            html += `<div class="grid-item-month"><div class="month-name">` + model.months[j - 1] + `</div>
                    <div class="daysInMonthBox">
                    <div class="grid-item-month-days">`
                    //displacement in entireYear view
                    for(let i = 0; i < model.dateDisplacementEntireYear.length; i++) {
                        if(model.dateDisplacementEntireYear[i].month == (j)) {
                            for(let o = 0; o < model.dateDisplacementEntireYear[i].dateDisplacement; o++) {
                                html += `<p> </p>`
                            }
                        }
                    }
                    //days in month
                    for (let i = 1; i <= getMonthDays ; i++) {
                        html += `<div class="grid-item-year-days`
                        holidaysInEntireYearView(i, j) == undefined ? html += '' : html += holidaysInEntireYearView(i, j);
                        sundaysInEntireYearView(i, j) == undefined ? html += '' : html += sundaysInEntireYearView(i, j);
                        html += `">${i}</div>`
                    }
            html += `</div>
                </div>
            </div>`
        }
    html += `</div> </div>`
    return html
}

function yearUpdateView() {
    let html = '';
    html += `<div id="years">
        <div> <button onclick="changeYear(-10)"> ‹ </button></div>`

    let currentYear = model.currentYear
    let lastNumber = currentYear.toString().slice(-1);
    let x = currentYear - lastNumber;
    let y = 9 - lastNumber;
    for(let i = x; i <= (model.currentYear + y); i++) {
        html += `<div class="entireYear__years" id="year${i}" onclick="selectYearInEntireYear(${i})">${i}</div>`   
    }

    html += `<div> <button onclick="changeYear(10)"> › </button> </div>
    </div>`
    return html;
}