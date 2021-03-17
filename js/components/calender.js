var daysOfWeek = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];

daysOfWeek.push("Lørdag")
daysOfWeek.unshift("Søndag")


var table = "<table border=1><tr>";
for(var i = 0; i < daysOfWeek.length; i++){
    table += "<th>"+daysOfWeek[i]+"</th>";
}
table += "</tr>";

var days = 30;
var appendEmptyDays = 7 - (days+7) % 7;

table += "<tr>";

//Days and Weeks
for(var i=1; i<=days; i++){
    table += "<td>"+ i +"</td>";
    if(i%7===0) table += "</tr><tr>";
}

for(var i=0; i<appendEmptyDays; i++){
    table += "<td></td>";
}

table += "</tr></table>"

document.body.innerHTML = table;