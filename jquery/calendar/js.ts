"use strict";



interface options {
    setClassToDate: any
}

interface Window {
    define: any,
    moment: any
}



(function(factory) {
    let define = window.define;

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery)
    }
})(function($) {

    let moment = window.moment;

    $.fn.momentCalendar = function(initOptions:options) {

        let defaults:options = {} as any;

        return $.each($(this), (idx, el) => {

            let options = $.extend(defaults, initOptions);

            let $el = $(el),
                initDayNumber:number = getInitDayNumber(),
                initMonthNumber:number = getInitMonthNumber(),
                initYearNumber:number = getInitYearNumber(),
                currentMonthModel = createCurrentMonthModel(),
                currentMonthNumber:number,
                currentYearNumber:number,
                clickedDays = [],
                controlsPanelYear,
                controlsPanelMonth;

            let defaultLocaleWeekdays:string[] = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
                defaultLocaleWeekdaysShort:string[] = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                defaultLocaleMonths:string[] = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
                defaultLocaleMonthsShort:string[] = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");


            function init() {
                appendToMainContainer(createMonth(currentMonthModel));
                updateVars();
                bindEvents();
            }


            function updateVars() {
            }


            function bindEvents() {

                if (options.clickableDays) {
                    $el.on('click', '.calendar__day', (e) => {
                        if (typeof options.onDayClick === 'function') {
                            let day = e.currentTarget,
                                date = day.getAttribute('data-date');

                            if (options.clickableOnlyUpcomingDays &&
                                !isUpcomingDate(date)
                            ) {
                                return;
                            }

                            if (day.classList.contains('_clicked')) {
                                day.classList.remove('_clicked');
                                clickedDays.splice(clickedDays.indexOf(date), 1);
                            } else {
                                day.classList.add('_clicked');
                                clickedDays.push(date);
                            }

                            options.onDayClick(day);
                        }
                    });
                }

                $el.on('click', '.calendar__panel-prev', () => {
                    appendToMainContainer(createMonth(createPrevMonthModel()));
                });

                $el.on('click', '.calendar__panel-next', () => {
                    appendToMainContainer(createMonth(createNextMonthModel()));
                });

            }


            function update() {
            }



            /*Helpers*/
            function createCurrentMonthModel(newOptions='') {

                if (newOptions) {
                    $.extend(options, newOptions);
                }

                let startOfMonth = moment().startOf('month'),
                    endOfMonth = moment().endOf('month'),
                    days = [],
                    day = startOfMonth;

                currentMonthNumber = getInitMonthNumber();
                currentYearNumber = getInitYearNumber();

                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }

                return days;
            }

            function createNextMonthModel() {
                ++currentMonthNumber;

                if (moment().month(currentMonthNumber).get('year') !== currentYearNumber) {
                    currentYearNumber = moment().month(currentMonthNumber).get('year');
                }

                // console.log(currentMonthNumber, ' currentMonthNumber');
                // console.log(currentYearNumber, ' currentYearNumber');

                let startOfMonth = moment().month(currentMonthNumber).startOf('month'),
                    endOfMonth = moment().month(currentMonthNumber).endOf('month'),
                    days = [],
                    day = startOfMonth;

                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }

                //console.log(days, ' days in month');

                return days;
            }

            function createPrevMonthModel() {
                --currentMonthNumber;

                if (moment().month(currentMonthNumber).get('year') !== currentYearNumber) {
                    currentYearNumber = moment().month(currentMonthNumber).get('year');
                }

                // console.log(currentMonthNumber, ' currentMonthNumber');
                // console.log(currentYearNumber, ' currentYearNumber');

                let startOfMonth = moment().month(currentMonthNumber).startOf('month'),
                    endOfMonth = moment().month(currentMonthNumber).endOf('month'),
                    days = [],
                    day = startOfMonth;

                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }

                return days;
            }

            function createMonth(month):HTMLElement {
                let monthHtml = createMonthHtml(),
                    weekHtml = createWeekHtml();


                if (options.daysNaming) {
                    monthHtml.appendChild(createWeekWithDaysHtml());
                }


                month.forEach((day, index) => {
                    let numberOfDayOfWeek = moment(day).format("e"),
                        numberOfDayOfMonth = moment(day).format("DD"),
                        dataDate = {
                            numberOfDayOfMonth,
                            currentMonthNumber,
                            currentYearNumber
                        },
                        modifier;

                    //put empty cells in case of start week not in Sunday
                    if (!index && +numberOfDayOfWeek) {
                        while (numberOfDayOfWeek--) {
                            weekHtml.appendChild(createDayHtml())
                        }
                    }

                    if (weekHtml.querySelectorAll('.calendar__day').length === 7) { //if Sunday of new week

                        if (weekHtml.innerHTML) {
                            monthHtml.appendChild(weekHtml)
                        }

                        weekHtml = createWeekHtml();
                    }


                    if (+numberOfDayOfMonth === initDayNumber &&
                        currentMonthNumber === initMonthNumber &&
                        currentYearNumber === initYearNumber) {
                        modifier = '_current';
                    } else if (currentMonthNumber === initMonthNumber &&
                              +numberOfDayOfMonth < initDayNumber
                    ) {
                        modifier = '_passed';
                    } else {
                        modifier = null;
                    }

                    weekHtml.appendChild(createDayHtml(numberOfDayOfMonth, modifier, dataDate));

                });

                monthHtml.appendChild(weekHtml);

                let daysInMonth = monthHtml.querySelectorAll('.calendar__day');

                if (options.setClassToDate) {
                    setClassToDate(options.setClassToDate, daysInMonth);
                }

                if (clickedDays.length) {
                    setClassToDate(convertArrToObj(clickedDays, '_clicked'), daysInMonth);
                }

                return monthHtml;
            }

            function setClassToDate(classesObj, days:NodeList) {
                let arrOfDates:string[] = Object.keys(classesObj),
                    daysArr:HTMLElement[] = [].slice.call(days);

                arrOfDates.forEach((dataDate) => {
                    daysArr.forEach((day) => {
                        if (day.getAttribute('data-date') === dataDate) {
                            day.classList.add(classesObj[dataDate]);
                        }
                    });
                });
            }

            function createDayHtml(html='', classModifier:string='', dataDate=null):HTMLElement {
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

                day.innerHTML = html;

                return day;
            }

            function createWeekHtml():HTMLElement {
                let week = document.createElement('div');

                week.classList.add('calendar__week');

                return week;
            }

            function createWeekWithDaysHtml():HTMLElement {
                let week = document.createElement('div');

                week.classList.add('calendar__week-header');

                defaultLocaleWeekdaysShort.forEach((dayName) => {
                    let block = document.createElement('div');

                    block.innerHTML = dayName;

                    block.classList.add('calendar__day-header');

                    week.appendChild(block);
                });

                return week;
            }

            function createMonthHtml():HTMLElement {
                let month = document.createElement('div');

                month.classList.add('calendar__month');

                return month;
            }

            function createYearHtml():HTMLElement {
                let year = document.createElement('div');

                year.classList.add('calendar__year');

                return year;
            }

            function createCalendarWrapperHtml(html:HTMLElement):HTMLElement {
                let wrapper = document.createElement('div');

                wrapper.classList.add('calendar');
                wrapper.classList.add('jsMomentCalendar');

                if (options.controlsPanel) {
                    wrapper.appendChild(createControlsPanelHtml());
                }

                if (html) {
                    wrapper.appendChild(html);
                }

                return wrapper;
            }

            function createControlsPanelHtml() {
                let panel = document.createElement('div');

                panel.classList.add('calendar__panel');

                panel.insertAdjacentHTML('beforeend', `
                    <div class="calendar__panel-prev"></div>
                    <div class="calendar__panel-dates">
                        <div class="calendar__panel-month">
                            ${getCurrentMonthName()}
                        </div>
                        <div class="calendar__panel-year">
                            ${getCurrentYearName()}
                        </div>
                    </div>
                    <div class="calendar__panel-next"></div>
                `);

                return panel;
            }

            function appendToMainContainer(monthHtml):void {
                $el.html(createCalendarWrapperHtml(monthHtml));
            }

            function getInitDayNumber():number {
                return moment().date();
            }

            function getInitMonthNumber():number {
                return moment().month();
            }

            function getInitYearNumber():number {
                return moment().year();
            }

            function getCurrentDayNumber():number {
                return moment().day();
            }

            function getCurrentMonthNumber():number {
                return currentMonthNumber;
            }

            function getCurrentYearNumber():number {
                return currentYearNumber;
            }

            function getCurrentDayName():string {
                return moment().day(getCurrentDayNumber()).format('dddd');
            }

            function getCurrentMonthName():string {
                return moment().month(currentMonthNumber).format('MMMM');
            }

            function getCurrentYearName():string {
                return currentYearNumber + '';
            }

            function convertArrToObj(arr, val) {
                let obj = {};

                arr.forEach((item) => {
                    obj[item] = val;
                });

                return obj;
            }

            function getClickedDays() {
                return clickedDays;
            }

            function setClickedDays(arr) {
                clickedDays = arr;
            }


            function setClassToDateOptions(newSetClassToDate) {
                options.setClassToDate = newSetClassToDate;
            }

            function isUpcomingDate(date) {
                let dateArr = date.split('.');

                if (dateArr[2] < initYearNumber ||
                    dateArr[1] < initMonthNumber ||
                    dateArr[0] < initDayNumber
                    ) {return false}

                return true;
            }

            function setMonthAndYearInControlsPanel() {

            }

            init();



            /*Public Api*/
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
                getCurrentDayName,
                getCurrentMonthName,
                getCurrentYearName,
                getClickedDays,
                setClickedDays,
                setClassToDateOptions,
                isUpcomingDate
            })



        });
    };

});