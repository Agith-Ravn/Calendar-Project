// Views
function view(){
    let html = ``;
    // Month Nav Bar
    html += 
    `<div class="navBar">
        <p class="loginButton" >Login</p>
        <p class="seHeleÅret">Se hele året</p>
        `
        for(var i in model.months) {
            html += ('<div class="mnd"><a> ' + model.months[i] + ' </a></div>');
        }
        
    `</div>`
    

    
    
    document.getElementById('app').innerHTML = html;
}
