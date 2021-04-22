// Models
const model = {
//--------------------------- View ---------------------------
    currentPage: 'homePage',
    // currentPage: 'loginPage',
    // currentPage: 'yearPage',
    navbar: { //forandrer utseende på navbar
        homePageView: true,
    },
    appointmentMenuView: false,
    specialEventMenuView: false,
    appointmentEditMode: false,
    specialEventEditMode: false,
    specialEventEditModeId: null,

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
    selectedFullDate: 0,
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
        { id: '2021-04-16-1', date: new Date(2021, 3, 16), time: '09.00',  header: 'Chorei',     content: '',                                                         privat: false, color: 'blue'},
        { id: '2021-04-16-2', date: new Date(2021, 3, 16), time: '09.45',  header: 'OPT',        content: 'Vise fram hvor langt dere har kommet med gruppeoppgave',   privat: false, color: 'red'},
        { id: '2021-04-22-1', date: new Date(2021, 3, 22), time: '',       header: 'Test4',      content: 'Tgg sdfd dfs',                                             privat: true, color: 'green'},
        { id: '2021-04-25-1', date: new Date(2021, 3, 25), time: '',       header: 'Test5',      content: 'Test-test-test5',                                          privat: true, color: 'orange'},
        { id: '2021-04-28-1', date: new Date(2021, 3, 28), time: '',       header: 'Test6',      content: 'Test-test-test6',                                          privat: true, color: 'purple'},
        { id: '2021-04-30-1', date: new Date(2021, 3, 30), time: '',       header: 'Test3.1',    content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { id: '2021-04-30-2', date: new Date(2021, 3, 30), time: '',       header: 'Test3.2',    content: 'Test-test-test3',                                          privat: false, color: 'green'},
        { id: '2021-04-30-3', date: new Date(2021, 3, 30), time: '',       header: 'Test3.3',    content: 'Test-test-test3',                                          privat: false, color: 'yellow'},
        { id: '2021-04-30-4', date: new Date(2021, 3, 30), time: '',       header: 'Test3.4',    content: 'Test-test-test3',                                          privat: false, color: 'red'},
        { id: '2021-04-30-5', date: new Date(2021, 3, 30), time: '',      header: 'Test3.5',    content: 'Test-test-test3',                                          privat: false, color: 'black'},
        { id: '2021-04-30-6', date: new Date(2021, 3, 30), time: '',      header: 'Test3.6',    content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { id: '2021-04-30-7', date: new Date(2021, 3, 30), time: '',      header: 'Test3.7',    content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { id: '2021-04-30-8', date: new Date(2021, 3, 30), time: '',      header: 'Test3.8',    content: 'Test-test-test3',                                          privat: false, color: 'blue'},
        { id: '2021-03-09-1', date: new Date(2021, 2, 9),  time: '',      header: 'Test7',      content: 'smfdsfsd ',                                                privat: false, color: 'yellow'},
        { id: '2021-03-11-1', date: new Date(2021, 2, 11), time: '',      header: 'Test8',      content: '233ssdfdsfsfd ',                                           privat: false, color: 'hotpink'},
    ],
    selectedDateAppointments: [],
    selectedMonthAppointments: [],
    
    appointmentsColorInput:'',
    appointmentsHeaderInput:'',
    appointmentsContentInput:'',
    appointmentTimeInput: '',
    appointmentPrivatOrNot: '', 

    

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

    specialEvent: {
        events: [
            {   
                id: '2021-04-01-1',
                startDate: '2021-04-01', 
                endDate: '2021-04-05', 
                header: 'Ferie', 
                content: 'Påskeferie',
                visibility: {
                    modul1: true,
                    modul2: true,
                    modul3: true,
                    startIT: true,
                    privat: true,
                },
                color: '#000000',
                calculatedDate: ["2021-04-01", "2021-04-02", "2021-04-03", "2021-04-04", "2021-04-05"]
            },
            {
                id: '2021-04-01-2',
                startDate: '2021-04-01', 
                endDate: '2021-04-03', 
                header: 'Ferie2', 
                content: 'Påskeferie2',
                visibility: {
                    modul1: false,
                    modul2: true,
                    modul3: false,
                    startIT: true,
                    privat: false,
                },
                color: '#FF0000',
                calculatedDate: ["2021-04-01", "2021-04-02", "2021-04-03"]
            },
            {
                id: '2021-04-01-4',
                startDate: '2021-04-01', 
                endDate: '2021-04-03', 
                header: 'Ferie2', 
                content: 'Påskeferie2',
                visibility: {
                    modul1: true,
                    modul2: false,
                    modul3: true,
                    startIT: false,
                    privat: true,
                },
                color: '#37ff00',
                calculatedDate: ["2021-04-01", "2021-04-02", "2021-04-03"]
            },
        ],

        startDateInput: '',
        endDateInput: '',
        colorInput: null,
        headerInput:'',
        contentInput:'',
        visibility: {
            modul1: false,
            modul2: false,
            modul3: false,
            startIT: false,
            privat: true,
        }, 
    }
    
}
today = new Date();
fullYear = today.getFullYear();
monthsNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
