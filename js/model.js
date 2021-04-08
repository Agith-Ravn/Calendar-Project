// Models
const model = {
//--------------------------- View ---------------------------
    currentPage: 'homePage',
    // currentPage: 'loginPage',
    // currentPage: 'yearPage',

    navbar: { //forandrer utseende på navbar
        homePageView: true,
    },


//--------------------------- Login content ---------------------------
    adminUser: {
        userName: 'admin',
        password: '1234',
    },

    loginInputUser: '',
    loginInputPassword: '',


//--------------------------- Calender ---------------------------
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
    
    weekdayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],

    currentDate: 0,
    selectedDate: 0,

    weeksInCurrentMonth: [], 
    weeksRowCount: 0,
    
    daysInMonth: 0,
    currentMonth: 0,
    changeMonth: 0,
    colorSelectedMonth: 'empty',

    currentYear: 0, //året nå
    changeYear: 0, //antall år frem og tilbake

    dateDisplacement: 0,

//--------------------------- Appointments ---------------------------
    //hendelser
    appointments: [//år , mnd (zero index) , dato
        { date: new Date(2021, 3, 08), header: 'Test1', content: 'Test-test-test1', privat: false},
        { date: new Date(2021, 3, 22), header: 'Test3', content: 'Test-test-test3', privat: true},
        { date: new Date(2021, 3, 25), header: 'Test4', content: 'Test-test-test4', privat: true},
        { date: new Date(2021, 3, 28), header: 'Test5', content: 'Test-test-test5', privat: true},
        { date: new Date(2021, 3, 30), header: 'Test2', content: 'Test-test-test2', privat: false},
    ],
    selectedDateAppointments: [],
    appointmentsDateInput:'',
    appointmentsHeaderInput:'',
    appointmentsContentInput:'',

    colors: {
        green:'#7CFC00',
        red:'#8B0000',
        blue:'#4169E1',
        yellow:'#FFFF00',
        indigo:'#4B0082',
        orange:'#FF7F50',
        //Legg til flere farger senere
    },
}
today = new Date();
fullYear = today.getFullYear();
monthsNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]


