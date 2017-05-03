"use strict";

interface options {
    [key: string]: { prop: boolean };
}

interface Window {
    define: any,
    exports: any,
    moment: any
}

let moment = window.moment;

class MomentCalendar {
    calendarClickBinded: any;
    monthsEl: any;
    currentMonthModel: any[];
    clickedDays: any[] = [];
    currentMonthNumber: number;
    currentYearNumber: number;
    initYearNumber: any;
    initMonthNumber: number;
    initDayNumber: number;
    options: any;
    el: any;
    defaults: any;
    initOptions: any;
    private yearsEl: any;
    private calendarEl: any;

    constructor(element, initOptions: any) {
        this.createMainTemplate(element);

        this.calendarEl = element;
        this.el = element.querySelector('.calendar-body');
        this.monthsEl = element.querySelector('.calendar-months');
        this.yearsEl = element.querySelector('.calendar-years');
        this.initOptions = initOptions;
        this.defaults = {};
        this.options = Object.assign(this.defaults, this.initOptions);

        this.initDayNumber = this.getInitDayNumber();
        this.initMonthNumber = this.getInitMonthNumber();
        this.initYearNumber = this.getInitYearNumber();
        this.currentMonthModel = this.createCurrentMonthModel();

        this.init();
    }

    createMainTemplate(element) {
        element.insertAdjacentHTML('afterbegin', `
            <div class="calendar-body"></div>
            <div class="calendar-months"></div>
            <div class="calendar-years"></div>
        `);
    }

    private static defaultLocaleWeekdays: string[] = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    private static defaultLocaleWeekdaysShort: string[] = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
    private static defaultLocaleMonths: string[] = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    private static defaultLocaleMonthsShort: string[] = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");


    init() {
        this.appendToMainContainer(this.createMonth(this.currentMonthModel));
        this.makeMonthsHtml();
        this.makeYearsHtml();
        this.bindEvents();
    }

    makeMonthsHtml() {
        let i = 0;
        MomentCalendar.defaultLocaleMonthsShort.forEach((month) => {
            this.monthsEl.insertAdjacentHTML('beforeend', `
                <div class="calendar-months__month" data-month="${i++}">${month}</div>
            `);
        });
    }

    makeYearsHtml() {
        let yearsBefore = 6,
            yearsAfter = 8,
            c = 0;

        while (yearsBefore--) {
            this.yearsEl.insertAdjacentHTML('beforeend', `
                <div class="calendar-years__year" data-year="${this.getCurrentYearNumber() - yearsBefore - 1}"
                >${this.getCurrentYearNumber() - yearsBefore - 1}</div> 
           `);
        }

        this.yearsEl.insertAdjacentHTML('beforeend', `
            <div class="calendar-years__year" data-year="${this.getCurrentYearNumber()}">${this.getCurrentYearNumber()}</div> 
       `);

        while (++c < yearsAfter) {
            this.yearsEl.insertAdjacentHTML('beforeend', `
                <div class="calendar-years__year" data-year="${this.getCurrentYearNumber() + c}">${this.getCurrentYearNumber() + c}</div> 
           `);
        }

    }

    bindEvents() {
        this.calendarClickBinded = this.calendarClick.bind(this);
        this.calendarEl.addEventListener('click', this.calendarClickBinded);
    }

    calendarClick(e) {
        let target = e.target,
            targetClassList = target.classList;

        if (targetClassList.contains('calendar__day') && typeof this.options.onDayClick === 'function') {
            let day = e.target,
                date = day.getAttribute('data-date');

            if (this.options.clickableOnlyUpcomingDays && !this.isUpcomingDate(date)) {
                return;
            }

            if (day.classList.contains('_clicked')) {
                day.classList.remove('_clicked');
                this.clickedDays.splice(this.clickedDays.indexOf(date), 1);
            } else {
                day.classList.add('_clicked');
                this.clickedDays.push(date);
            }

            this.options.onDayClick(day);
        }


        if (targetClassList.contains("calendar__panel-prev")) {
            this.appendToMainContainer(this.createMonth(this.createPrevMonthModel()));
        }

        if (targetClassList.contains("calendar__panel-next")) {
            this.appendToMainContainer(this.createMonth(this.createNextMonthModel()));
        }

        if (targetClassList.contains("calendar__panel-month")) {
            this.show(this.monthsEl);
            this.hide(this.el);
        }

        if (targetClassList.contains("calendar__panel-year")) {
            this.show(this.yearsEl);
            this.hide(this.el);
        }

        if (targetClassList.contains("calendar-years__year")) {
            this.hide(this.yearsEl);
            this.show(this.monthsEl);
            this.currentYearNumber = +target.getAttribute('data-year');
        }

        if (targetClassList.contains("calendar-months__month")) {
            this.hide(this.monthsEl);
            this.show(this.el);
            this.currentMonthNumber = +target.getAttribute('data-month');
            this.appendToMainContainer(this.createMonth(this.createMonthModel()));
        }
    }

    update() {
    }

    destroy() {
        this.calendarEl.removeEventListener('click', this.calendarClickBinded);
        this.calendarEl.innerHTML = '';
    }

    createCurrentMonthModel(newOptions = '') {
        if (newOptions) {
            $.extend(this.options, newOptions);
        }

        this.currentMonthNumber = this.getInitMonthNumber();
        this.currentYearNumber = this.getInitYearNumber();

        return this.createMonthModel();
    }

    createNextMonthModel() {
        ++this.currentMonthNumber;

        if (moment().month(this.currentMonthNumber).get('year') !== this.currentYearNumber) {
            this.currentYearNumber = moment().month(this.currentMonthNumber).get('year');
        }

        return this.createMonthModel();
    }

    createPrevMonthModel() {
        --this.currentMonthNumber;

        if (moment().month(this.currentMonthNumber).get('year') !== this.currentYearNumber) {
            this.currentYearNumber = moment().month(this.currentMonthNumber).get('year');
        }

        return this.createMonthModel();
    }

    createMonthModel() {
        let startOfMonth = moment().year(this.currentYearNumber).month(this.currentMonthNumber).startOf('month'),
            endOfMonth = moment().year(this.currentYearNumber).month(this.currentMonthNumber).endOf('month'),
            days = [],
            day = startOfMonth;

        while (day <= endOfMonth) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        return days;
    }

    createMonth(month): HTMLElement {
        let monthHtml = this.createMonthHtml(),
            weekHtml = this.createWeekHtml();


        if (this.options.daysNaming) {
            monthHtml.appendChild(this.createWeekWithDaysHtml());
        }


        month.forEach((day, index) => {
            let numberOfDayOfWeek = moment(day).format("e"),
                numberOfDayOfMonth = moment(day).format("DD"),
                dataDate = {
                    numberOfDayOfMonth,
                    currentMonthNumber: this.currentMonthNumber,
                    currentYearNumber: this.currentYearNumber
                },
                modifier;

            //put empty cells in case of start week not in Sunday
            if (!index && +numberOfDayOfWeek) {
                while (numberOfDayOfWeek--) {
                    weekHtml.appendChild(this.createDayHtml())
                }
            }

            if (weekHtml.querySelectorAll('.calendar__day').length === 7) { //if Sunday of new week

                if (weekHtml.innerHTML) {
                    monthHtml.appendChild(weekHtml)
                }

                weekHtml = this.createWeekHtml();
            }


            if (+numberOfDayOfMonth === this.initDayNumber &&
                this.currentMonthNumber === this.initMonthNumber &&
                this.currentYearNumber === this.initYearNumber) {
                modifier = '_current';
            } else if (this.currentMonthNumber === this.initMonthNumber &&
                +numberOfDayOfMonth < this.initDayNumber
            ) {
                modifier = '_passed';
            } else {
                modifier = null;
            }

            weekHtml.appendChild(this.createDayHtml(numberOfDayOfMonth, modifier, dataDate));

        });

        monthHtml.appendChild(weekHtml);

        let daysInMonth = monthHtml.querySelectorAll('.calendar__day');

        if (this.options.setClassToDate) {
            this.setClassToDate(this.options.setClassToDate, daysInMonth);
        }

        if (this.clickedDays.length) {
            this.setClassToDate(this.convertArrToObj(this.clickedDays, '_clicked'), daysInMonth);
        }

        return monthHtml;
    }

    setClassToDate(classesObj, days: NodeList) {
        let arrOfDates: string[] = Object.keys(classesObj),
            daysArr: HTMLElement[] = [].slice.call(days);

        arrOfDates.forEach((dataDate) => {
            daysArr.forEach((day) => {
                if (day.getAttribute('data-date') === dataDate) {
                    day.classList.add(classesObj[dataDate]);
                }
            });
        });
    }

    createDayHtml(html = '', classModifier: string = '', dataDate = null): HTMLElement {
        let day = document.createElement('div');

        day.classList.add('calendar__day');

        if (classModifier) {
            day.classList.add(classModifier);
        }

        if (dataDate) {
            day
                .setAttribute('data-date',
                    `${dataDate['numberOfDayOfMonth']}.${moment().month(dataDate['currentMonthNumber']).format('MM')}.${dataDate['currentYearNumber']}`)
        }

        day.innerHTML = html ? +parseFloat(html) + '' : '';

        return day;
    }

    createWeekHtml(): HTMLElement {
        let week = document.createElement('div');

        week.classList.add('calendar__week');

        return week;
    }

    createWeekWithDaysHtml(): HTMLElement {
        let week = document.createElement('div');

        week.classList.add('calendar__week-header');

        MomentCalendar.defaultLocaleWeekdaysShort.forEach((dayName) => {
            let block = document.createElement('div');

            block.innerHTML = dayName;

            block.classList.add('calendar__day-header');

            week.appendChild(block);
        });

        return week;
    }

    createMonthHtml(): HTMLElement {
        let month = document.createElement('div');

        month.classList.add('calendar__month');

        return month;
    }

    createYearHtml(): HTMLElement {
        let year = document.createElement('div');

        year.classList.add('calendar__year');

        return year;
    }

    createCalendarWrapperHtml(html: HTMLElement): HTMLElement {
        let wrapper = document.createElement('div');

        wrapper.classList.add('calendar');
        wrapper.classList.add('jsMomentCalendar');

        if (this.options.controlsPanel) {
            wrapper.appendChild(this.createControlsPanelHtml());
        }

        if (html) {
            wrapper.appendChild(html);
        }

        return wrapper;
    }

    createControlsPanelHtml() {
        let panel = document.createElement('div');

        panel.classList.add('calendar__panel');

        panel.insertAdjacentHTML('beforeend', `
                    <div class="calendar__panel-prev"></div>
                    <div class="calendar__panel-dates">
                        <div class="calendar__panel-month">
                            ${this.getCurrentMonthName()}
                        </div>
                        <div class="calendar__panel-year">
                            ${this.getCurrentYearNumber()}
                        </div>
                    </div>
                    <div class="calendar__panel-next"></div>
                `);

        return panel;
    }

    appendToMainContainer(monthHtml): void {
        this.el.innerHTML = '';
        this.el.appendChild(this.createCalendarWrapperHtml(monthHtml));
    }

    getInitDayNumber(): number {
        return moment().date();
    }

    getInitMonthNumber(): number {
        return moment().month();
    }

    getInitYearNumber(): number {
        return moment().year();
    }

    getCurrentMonthNumber(): number {
        return this.currentMonthNumber;
    }

    getCurrentYearNumber(): number {
        return this.currentYearNumber;
    }

    getInitDayName(): string {
        return moment().day(this.getInitDayNumber()).format('dddd');
    }

    getCurrentMonthName(): string {
        return moment().month(this.currentMonthNumber).format('MMMM');
    }

    convertArrToObj(arr, val) {
        let obj = {};

        arr.forEach((item) => {
            obj[item] = val;
        });

        return obj;
    }

    getClickedDays() {
        return this.clickedDays;
    }

    setClickedDays(arr) {
        this.clickedDays = arr;
    }

    setClassToDateOptions(newSetClassToDate) {
        this.options.setClassToDate = newSetClassToDate;
    }

    isUpcomingDate(date) {
        if (!date) return;

        let dateArr = date.split('.');

        if (dateArr[2] < this.initYearNumber ||
            dateArr[1] < this.initMonthNumber ||
            dateArr[0] < this.initDayNumber
        ) {
            return false
        }

        return true;
    }

    setMonthAndYearInControlsPanel() {
    }

    appendNextMonth() {
        this.appendToMainContainer(this.createMonth(this.createNextMonthModel()));
    }

    appendPrevMonth() {
        this.appendToMainContainer(this.createMonth(this.createPrevMonthModel()));
    }

    refresh(newOptions) {
        this.appendToMainContainer(this.createMonth(this.createCurrentMonthModel(newOptions)));
    }

    show(el: any, displayType?: string) {
        el.style.display = displayType || 'block';
    }

    hide(el: any) {
        el.style.display = 'none';
    }
}


/*Public Api*/
/*
$el.data('momentCalendar', {
    'appendNextMonth'() {
        appendToMainContainer(createMonth(createNextMonthModel()));
    },
    'appendPrevMonth'() {
        appendToMainContainer(createMonth(createPrevMonthModel()));
    },
    'refresh'(newOptions) {
        appendToMainContainer(createMonth(createCurrentMonthModel(newOptions)));
    },
    getInitDayNumber,
    getInitMonthNumber,
    getInitYearNumber,
    getCurrentDayNumber,
    getCurrentMonthNumber,
    getCurrentYearNumber,
    getInitDayName,
    getCurrentMonthName,
    getClickedDays,
    setClickedDays,
    setClassToDateOptions,
    isUpcomingDate
})*/


document.addEventListener('DOMContentLoaded', () => {
    let calendarApi = new MomentCalendar(document.querySelector('#calendar'), {
            setClassToDate: {
                '14.02.2017': '_autopay',
                '23.02.2017': '_autopay-arrow',
                '26.02.2017': '_due-date',
            },
            daysNaming: true,
            clickableDays: true,
            clickableOnlyUpcomingDays: true,
            controlsPanel: true,
            onDayClick: function(el) {
                console.log(el);
            }
        });

    setMonthAndYear();

    document.querySelector('#buttonNext').addEventListener('click', () => {
        calendarApi.appendNextMonth();
        setMonthAndYear();
    });

    document.querySelector('#buttonPrev').addEventListener('click', () => {
        calendarApi.appendPrevMonth();
        setMonthAndYear();
    });

    document.querySelector('#buttonRefresh').addEventListener('click', () => {
        calendarApi.refresh({
            setClassToDate: {
                '16.02.2017': '_autopay',
                '25.02.2017': '_autopay-arrow',
                '28.02.2017': '_due-date'
            }
        });
        setMonthAndYear();
    });

    document.querySelector('#buttonGetCurrentInfo').addEventListener('click', () => {
        console.log(calendarApi.getInitDayNumber(), ' getInitDayNumber()');
        console.log(calendarApi.getInitDayName(), ' getInitDayName()');
        console.log(calendarApi.getCurrentMonthNumber(), ' getCurrentMonthNumber()');
        console.log(calendarApi.getCurrentMonthName(), ' getCurrentMonthName()');
        console.log(calendarApi.getCurrentYearNumber(), ' getCurrentYearNumber()');
        console.log(calendarApi.getCurrentYearNumber(), ' getCurrentYearNumber');
    });



    /*Helpers*/
    function setMonthAndYear() {
        console.log(calendarApi.getCurrentMonthName());
        console.log(calendarApi.getCurrentYearNumber());
    }
});