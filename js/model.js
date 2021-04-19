// Models
const model = {
//--------------------------- View ---------------------------
    currentPage: 'homePage',
    // currentPage: 'loginPage',
    // currentPage: 'yearPage',

    navbar: { //forandrer utseende på navbar
        homePageView: true,
    },

    appointmentEditMode: false,


//--------------------------- Login content ---------------------------
    adminUser: {
        userName: 'admin',
        password: '1234',
    },

    loginInputUser: '',
    loginInputPassword: '',


//--------------------------- Calender ---------------------------
    //time
    currentTime: 0,
    interval: false,

    //date/day
    currentDate: 0,
    selectedDate: 0,
    dateDisplacement: 0,
    dateDisplacementEntireYear: [],
    weekdayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
    
    //week
    weeksInCurrentMonth: [], 
    weeksRowCount: 0,
    
    //month
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
    daysInMonth: 0,
    currentMonth: 0,
    changeMonth: 0,
    colorSelectedMonth: 'empty',

    //year
    currentYear: 0, //året nå
    changeYear: 0, //antall år frem og tilbake
    selectedYearInEntireYear: 0,

    //holidays
    allHolidaysInCurrentYear: [],
    allHolidaysInCurrentMonth: [],
    sundaysInCurrentYear: [],
    sundaysInCurrentMonth: [],

//--------------------------- Appointments ---------------------------
    //hendelser
    appointments: [//år , mnd (zero index) , dato
        { date: new Date(2021, 3, 16), time: '09.00', header: 'Chorei',     content: '',                                                         privat: false, color: 'blue'},
        { date: new Date(2021, 3, 16), time: '09.45', header: 'OPT',        content: 'Vise fram hvor langt dere har kommet med gruppeoppgave',   privat: false, color: 'red'},
        { date: new Date(2021, 3, 22), time: '',      header: 'Test4',           content: 'Tgg sdfd dfs',                                             privat: true, color: 'green'},
        { date: new Date(2021, 3, 25), time: '', header: 'Test5',           content: 'Test-test-test5',                                          privat: true, color: 'orange'},
        { date: new Date(2021, 3, 28), time: '', header: 'Test6',           content: 'Test-test-test6',                                          privat: true, color: 'purple'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.1',         content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.2',         content: 'Test-test-test3',                                          privat: false, color: 'green'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.3',         content: 'Test-test-test3',                                          privat: false, color: 'yellow'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.4',         content: 'Test-test-test3',                                          privat: false, color: 'red'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.5',         content: 'Test-test-test3',                                          privat: false, color: 'black'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.6',         content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.7',         content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { date: new Date(2021, 3, 30), time: '', header: 'Test3.8',         content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { date: new Date(2021, 2, 9),  time: '', header: 'Test7',           content: 'smfdsfsd ',                                                privat: false, color: 'yellow'},
        { date: new Date(2021, 2, 11), time: '', header: 'Test8',           content: '233ssdfdsfsfd ',                                           privat: false, color: 'hotpink'},
    ],
    selectedDateAppointments: [],
    selectedMonthAppointments: [],
    
    appointmentsColorInput:'',
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
    addedNewEventParams: {  ///flytt hele obj og push til controller og push i events :D
        header: "",
        content: "",
        color: "",
        fromToDate: "",
        date: new Date(),
    },
    vacationStartDate: "",
    vacationEndDate: "",
}
today = new Date();
fullYear = today.getFullYear();
monthsNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
