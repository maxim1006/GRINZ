"use strict";
(function (factory) {
    var define = window.define;
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else {
        factory(jQuery);
    }
})(function ($) {
    var moment = window.moment;
    $.fn.momentCalendar = function (initOptions) {
        var defaults = {};
        return $.each($(this), function (idx, el) {
            var options = $.extend(defaults, initOptions);
            var $el = $(el), initDayNumber = getInitDayNumber(), initMonthNumber = getInitMonthNumber(), initYearNumber = getInitYearNumber(), currentMonthModel = createCurrentMonthModel(), currentMonthNumber, currentYearNumber, clickedDays = [];
            var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
            function init() {
                appendToMainContainer(createMonth(currentMonthModel));
                updateVars();
                bindEvents();
            }
            function updateVars() {
            }
            function bindEvents() {
                $el.on('click', '.calendar__day', function (e) {
                    if (typeof options.onDayClick === 'function') {
                        var day = e.currentTarget, date = day.getAttribute('data-date');
                        options.onDayClick(day);
                        if (day.classList.contains('_clicked')) {
                            day.classList.remove('_clicked');
                            clickedDays.splice(clickedDays.indexOf(date), 1);
                        }
                        else {
                            day.classList.add('_clicked');
                            clickedDays.push(date);
                        }
                    }
                });
            }
            function update() {
            }
            function createCurrentMonthModel() {
                var startOfMonth = moment().startOf('month'), endOfMonth = moment().endOf('month'), days = [], day = startOfMonth;
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
                console.log(currentMonthNumber, ' currentMonthNumber');
                console.log(currentYearNumber, ' currentYearNumber');
                var startOfMonth = moment().month(currentMonthNumber).startOf('month'), endOfMonth = moment().month(currentMonthNumber).endOf('month'), days = [], day = startOfMonth;
                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }
                return days;
            }
            function createPrevMonthModel() {
                --currentMonthNumber;
                if (moment().month(currentMonthNumber).get('year') !== currentYearNumber) {
                    currentYearNumber = moment().month(currentMonthNumber).get('year');
                }
                console.log(currentMonthNumber, ' currentMonthNumber');
                console.log(currentYearNumber, ' currentYearNumber');
                var startOfMonth = moment().month(currentMonthNumber).startOf('month'), endOfMonth = moment().month(currentMonthNumber).endOf('month'), days = [], day = startOfMonth;
                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }
                return days;
            }
            function createMonth(month) {
                var monthHtml = createMonthHtml(), weekHtml = createWeekHtml();
                if (options.daysNaming) {
                    monthHtml.appendChild(createWeekWithDaysHtml());
                }
                month.forEach(function (day, index) {
                    var numberOfDayOfWeek = moment(day).format("e"), numberOfDayOfMonth = moment(day).format("D"), dataDate = {
                        numberOfDayOfMonth: numberOfDayOfMonth,
                        currentMonthNumber: currentMonthNumber,
                        currentYearNumber: currentYearNumber
                    }, modifier;
                    if (weekHtml.querySelectorAll('.calendar__day').length === 7) {
                        if (weekHtml.innerHTML) {
                            monthHtml.appendChild(weekHtml);
                        }
                        weekHtml = createWeekHtml();
                    }
                    if (+numberOfDayOfMonth === initDayNumber &&
                        currentMonthNumber === initMonthNumber &&
                        currentYearNumber === initYearNumber) {
                        modifier = '_current';
                    }
                    else if (currentMonthNumber === initMonthNumber &&
                        +numberOfDayOfMonth < initDayNumber) {
                        modifier = '_passed';
                    }
                    else {
                        modifier = null;
                    }
                    weekHtml.appendChild(createDayHtml(numberOfDayOfMonth, modifier, dataDate));
                });
                monthHtml.appendChild(weekHtml);
                var daysInMonth = monthHtml.querySelectorAll('.calendar__day');
                if (options.setClassToDate) {
                    setClassToDate(options.setClassToDate, daysInMonth);
                }
                if (clickedDays.length) {
                    setClassToDate(convertArrToObj(clickedDays, '_clicked'), daysInMonth);
                }
                return monthHtml;
            }
            function setClassToDate(classesObj, days) {
                var arrOfDates = Object.keys(classesObj), daysArr = [].slice.call(days);
                arrOfDates.forEach(function (dataDate) {
                    daysArr.forEach(function (day) {
                        if (day.getAttribute('data-date') === dataDate) {
                            day.classList.add(classesObj[dataDate]);
                        }
                    });
                });
            }
            function createDayHtml(html, classModifier, dataDate) {
                if (classModifier === void 0) { classModifier = ''; }
                if (dataDate === void 0) { dataDate = null; }
                var day = document.createElement('div');
                day.classList.add('calendar__day');
                if (classModifier) {
                    day.classList.add(classModifier);
                }
                if (dataDate) {
                    day
                        .setAttribute('data-date', dataDate['numberOfDayOfMonth'] + "." + moment().month(dataDate['currentMonthNumber']).format('MM') + "." + dataDate['currentYearNumber']);
                }
                day.innerHTML = html;
                return day;
            }
            function createWeekHtml() {
                var week = document.createElement('div');
                week.classList.add('calendar__week');
                return week;
            }
            function createWeekWithDaysHtml() {
                var week = document.createElement('div');
                week.classList.add('calendar__week-header');
                defaultLocaleWeekdaysShort.forEach(function (dayName) {
                    var block = document.createElement('div');
                    block.innerHTML = dayName;
                    block.classList.add('calendar__day-header');
                    week.appendChild(block);
                });
                return week;
            }
            function createMonthHtml() {
                var month = document.createElement('div');
                month.classList.add('calendar__month');
                return month;
            }
            function createYearHtml() {
                var year = document.createElement('div');
                year.classList.add('calendar__year');
                return year;
            }
            function createCalendarWrapperHtml(html) {
                var wrapper = document.createElement('div');
                wrapper.classList.add('calendar');
                wrapper.classList.add('jsMomentCalendar');
                if (html) {
                    wrapper.appendChild(html);
                }
                return wrapper;
            }
            function appendToMainContainer(monthHtml) {
                $el.html(createCalendarWrapperHtml(monthHtml));
            }
            function getInitDayNumber() {
                return moment().date();
            }
            function getInitMonthNumber() {
                return moment().month();
            }
            function getInitYearNumber() {
                return moment().year();
            }
            function getCurrentDayNumber() {
                return moment().day();
            }
            function getCurrentMonthNumber() {
                return currentMonthNumber;
            }
            function getCurrentYearNumber() {
                return currentYearNumber;
            }
            function getCurrentDayName() {
                return defaultLocaleWeekdays[getCurrentDayNumber() - 1];
            }
            function getCurrentMonthName() {
                return moment().month(currentMonthNumber).format('MMMM');
            }
            function getCurrentYearName() {
                return currentYearNumber + '';
            }
            function changeOptions(newOptions) {
                options = $.extend(options, newOptions);
            }
            function convertArrToObj(arr, val) {
                var obj = {};
                arr.forEach(function (item) {
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
            init();
            $el.data('momentCalendar', {
                'appendNextMonth': function () {
                    appendToMainContainer(createMonth(createNextMonthModel()));
                },
                'appendPrevMonth': function () {
                    appendToMainContainer(createMonth(createPrevMonthModel()));
                },
                'refresh': function () {
                    appendToMainContainer(createMonth(createCurrentMonthModel()));
                },
                getInitDayNumber: getInitDayNumber,
                getInitMonthNumber: getInitMonthNumber,
                getInitYearNumber: getInitYearNumber,
                getCurrentDayNumber: getCurrentDayNumber,
                getCurrentMonthNumber: getCurrentMonthNumber,
                getCurrentYearNumber: getCurrentYearNumber,
                getCurrentDayName: getCurrentDayName,
                getCurrentMonthName: getCurrentMonthName,
                getCurrentYearName: getCurrentYearName,
                changeOptions: changeOptions,
                getClickedDays: getClickedDays,
                setClickedDays: setClickedDays
            });
        });
    };
});
//# sourceMappingURL=js.js.map