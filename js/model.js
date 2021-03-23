// Models
const model = {
    currentPage: 'homePage',
    //currentPage: 'loginPage',
    // currentPage: 'yearPage',
    adminUser: {
        userName: 'admin',
        password: '1234',
    },
    loginInputUser: '',
    loginInputPassword: '',
    months: [
        'Januar',
        'Februar',
        'Mars',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Desember',
    ],
    days: [],
    weeks: [], 
    years: [], 
    // holder hva som skjer på datoen. 
    contentForDate: [
        {
            header: '', 
            content: '', 
            privat: false
        },
    ],
    colors: {
        green:'#7CFC00',
        red:'#8B0000',
        blue:'#4169E1',
        yellow:'#FFFF00',
        indigo:'#4B0082',
        orange:'#FF7F50',
        //Legg til flere farger senere
    }
}
//console.log(model.adminUser);