"use strict";
var moment = window.moment;
var MomentCalendar = (function () {
    function MomentCalendar(element, initOptions) {
        this.clickedDays = [];
        this.createMainTemplate(element);
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
    MomentCalendar.prototype.createMainTemplate = function (element) {
        element.insertAdjacentHTML('afterbegin', "\n            <div class=\"calendar-body\"></div>\n            <div class=\"calendar-months\"></div>\n            <div class=\"calendar-years\"></div>\n        ");
    };
    MomentCalendar.prototype.init = function () {
        this.appendToMainContainer(this.createMonth(this.currentMonthModel));
        this.makeMonthsHtml();
        this.makeYearsHtml();
        this.bindEvents();
    };
    MomentCalendar.prototype.makeMonthsHtml = function () {
        var _this = this;
        MomentCalendar.defaultLocaleMonthsShort.forEach(function (month) {
            _this.monthsEl.insertAdjacentHTML('beforeend', "\n                <div class=\"calendar-months__month\">" + month + "</div>\n            ");
        });
    };
    MomentCalendar.prototype.makeYearsHtml = function () {
        var yearsBefore = 6, yearsAfter = 8, c = 0;
        while (yearsBefore--) {
            this.yearsEl.insertAdjacentHTML('beforeend', "\n                <div class=\"calendar-years__year\">" + (this.getCurrentYearNumber() - yearsBefore - 1) + "</div> \n           ");
        }
        this.yearsEl.insertAdjacentHTML('beforeend', "\n            <div class=\"calendar-years__year\">" + this.getCurrentYearNumber() + "</div> \n       ");
        while (++c < yearsAfter) {
            this.yearsEl.insertAdjacentHTML('beforeend', "\n                <div class=\"calendar-years__year\">" + (this.getCurrentYearNumber() + c) + "</div> \n           ");
        }
    };
    MomentCalendar.prototype.bindEvents = function () {
        var _this = this;
        if (this.options.clickableDays) {
            this.el.addEventListener('click', function (e) {
                if (e.target.classList.contains('calendar__day') && typeof _this.options.onDayClick === 'function') {
                    var day = e.target, date = day.getAttribute('data-date');
                    if (_this.options.clickableOnlyUpcomingDays && !_this.isUpcomingDate(date)) {
                        return;
                    }
                    if (day.classList.contains('_clicked')) {
                        day.classList.remove('_clicked');
                        _this.clickedDays.splice(_this.clickedDays.indexOf(date), 1);
                    }
                    else {
                        day.classList.add('_clicked');
                        _this.clickedDays.push(date);
                    }
                    _this.options.onDayClick(day);
                }
            });
        }
        this.el.addEventListener('click', function (e) {
            if (e.target.classList.contains("calendar__panel-prev")) {
                _this.appendToMainContainer(_this.createMonth(_this.createPrevMonthModel()));
            }
        });
        this.el.addEventListener('click', function (e) {
            if (e.target.classList.contains("calendar__panel-next")) {
                _this.appendToMainContainer(_this.createMonth(_this.createNextMonthModel()));
            }
        });
        this.el.querySelector('.calendar__panel-month').addEventListener('click', function (e) {
            _this.show(_this.monthsEl);
            _this.hide(_this.el);
        });
        this.el.querySelector('.calendar__panel-year').addEventListener('click', function (e) {
            _this.show(_this.yearsEl);
            _this.hide(_this.el);
        });
        this.yearsEl.addEventListener('click', function (e) {
            _this.hide(_this.yearsEl);
            _this.show(_this.monthsEl);
            _this.currentYearNumber = +e.target.textContent;
        });
        this.monthsEl.addEventListener('click', function (e) {
            _this.hide(_this.monthsEl);
            _this.show(_this.el);
        });
    };
    MomentCalendar.prototype.update = function () { };
    MomentCalendar.prototype.createCurrentMonthModel = function (newOptions) {
        if (newOptions === void 0) { newOptions = ''; }
        if (newOptions) {
            $.extend(this.options, newOptions);
        }
        var startOfMonth = moment().startOf('month'), endOfMonth = moment().endOf('month'), days = [], day = startOfMonth;
        this.currentMonthNumber = this.getInitMonthNumber();
        this.currentYearNumber = this.getInitYearNumber();
        while (day <= endOfMonth) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days;
    };
    MomentCalendar.prototype.createNextMonthModel = function () {
        ++this.currentMonthNumber;
        if (moment().month(this.currentMonthNumber).get('year') !== this.currentYearNumber) {
            this.currentYearNumber = moment().month(this.currentMonthNumber).get('year');
        }
        var startOfMonth = moment().month(this.currentMonthNumber).startOf('month'), endOfMonth = moment().month(this.currentMonthNumber).endOf('month'), days = [], day = startOfMonth;
        while (day <= endOfMonth) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days;
    };
    MomentCalendar.prototype.createPrevMonthModel = function () {
        --this.currentMonthNumber;
        if (moment().month(this.currentMonthNumber).get('year') !== this.currentYearNumber) {
            this.currentYearNumber = moment().month(this.currentMonthNumber).get('year');
        }
        var startOfMonth = moment().month(this.currentMonthNumber).startOf('month'), endOfMonth = moment().month(this.currentMonthNumber).endOf('month'), days = [], day = startOfMonth;
        while (day <= endOfMonth) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days;
    };
    MomentCalendar.prototype.createMonth = function (month) {
        var _this = this;
        var monthHtml = this.createMonthHtml(), weekHtml = this.createWeekHtml();
        if (this.options.daysNaming) {
            monthHtml.appendChild(this.createWeekWithDaysHtml());
        }
        month.forEach(function (day, index) {
            var numberOfDayOfWeek = moment(day).format("e"), numberOfDayOfMonth = moment(day).format("DD"), dataDate = {
                numberOfDayOfMonth: numberOfDayOfMonth,
                currentMonthNumber: _this.currentMonthNumber,
                currentYearNumber: _this.currentYearNumber
            }, modifier;
            if (!index && +numberOfDayOfWeek) {
                while (numberOfDayOfWeek--) {
                    weekHtml.appendChild(_this.createDayHtml());
                }
            }
            if (weekHtml.querySelectorAll('.calendar__day').length === 7) {
                if (weekHtml.innerHTML) {
                    monthHtml.appendChild(weekHtml);
                }
                weekHtml = _this.createWeekHtml();
            }
            if (+numberOfDayOfMonth === _this.initDayNumber &&
                _this.currentMonthNumber === _this.initMonthNumber &&
                _this.currentYearNumber === _this.initYearNumber) {
                modifier = '_current';
            }
            else if (_this.currentMonthNumber === _this.initMonthNumber &&
                +numberOfDayOfMonth < _this.initDayNumber) {
                modifier = '_passed';
            }
            else {
                modifier = null;
            }
            weekHtml.appendChild(_this.createDayHtml(numberOfDayOfMonth, modifier, dataDate));
        });
        monthHtml.appendChild(weekHtml);
        var daysInMonth = monthHtml.querySelectorAll('.calendar__day');
        if (this.options.setClassToDate) {
            this.setClassToDate(this.options.setClassToDate, daysInMonth);
        }
        if (this.clickedDays.length) {
            this.setClassToDate(this.convertArrToObj(this.clickedDays, '_clicked'), daysInMonth);
        }
        return monthHtml;
    };
    MomentCalendar.prototype.setClassToDate = function (classesObj, days) {
        var arrOfDates = Object.keys(classesObj), daysArr = [].slice.call(days);
        arrOfDates.forEach(function (dataDate) {
            daysArr.forEach(function (day) {
                if (day.getAttribute('data-date') === dataDate) {
                    day.classList.add(classesObj[dataDate]);
                }
            });
        });
    };
    MomentCalendar.prototype.createDayHtml = function (html, classModifier, dataDate) {
        if (html === void 0) { html = ''; }
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
        day.innerHTML = html ? +parseFloat(html) + '' : '';
        return day;
    };
    MomentCalendar.prototype.createWeekHtml = function () {
        var week = document.createElement('div');
        week.classList.add('calendar__week');
        return week;
    };
    MomentCalendar.prototype.createWeekWithDaysHtml = function () {
        var week = document.createElement('div');
        week.classList.add('calendar__week-header');
        MomentCalendar.defaultLocaleWeekdaysShort.forEach(function (dayName) {
            var block = document.createElement('div');
            block.innerHTML = dayName;
            block.classList.add('calendar__day-header');
            week.appendChild(block);
        });
        return week;
    };
    MomentCalendar.prototype.createMonthHtml = function () {
        var month = document.createElement('div');
        month.classList.add('calendar__month');
        return month;
    };
    MomentCalendar.prototype.createYearHtml = function () {
        var year = document.createElement('div');
        year.classList.add('calendar__year');
        return year;
    };
    MomentCalendar.prototype.createCalendarWrapperHtml = function (html) {
        var wrapper = document.createElement('div');
        wrapper.classList.add('calendar');
        wrapper.classList.add('jsMomentCalendar');
        if (this.options.controlsPanel) {
            wrapper.appendChild(this.createControlsPanelHtml());
        }
        if (html) {
            wrapper.appendChild(html);
        }
        return wrapper;
    };
    MomentCalendar.prototype.createControlsPanelHtml = function () {
        var panel = document.createElement('div');
        panel.classList.add('calendar__panel');
        panel.insertAdjacentHTML('beforeend', "\n                    <div class=\"calendar__panel-prev\"></div>\n                    <div class=\"calendar__panel-dates\">\n                        <div class=\"calendar__panel-month\">\n                            " + this.getCurrentMonthName() + "\n                        </div>\n                        <div class=\"calendar__panel-year\">\n                            " + this.getCurrentYearName() + "\n                        </div>\n                    </div>\n                    <div class=\"calendar__panel-next\"></div>\n                ");
        return panel;
    };
    MomentCalendar.prototype.appendToMainContainer = function (monthHtml) {
        this.el.innerHTML = '';
        this.el.appendChild(this.createCalendarWrapperHtml(monthHtml));
    };
    MomentCalendar.prototype.getInitDayNumber = function () {
        return moment().date();
    };
    MomentCalendar.prototype.getInitMonthNumber = function () {
        return moment().month();
    };
    MomentCalendar.prototype.getInitYearNumber = function () {
        return moment().year();
    };
    MomentCalendar.prototype.getCurrentDayNumber = function () {
        return moment().day();
    };
    MomentCalendar.prototype.getCurrentMonthNumber = function () {
        return this.currentMonthNumber;
    };
    MomentCalendar.prototype.getCurrentYearNumber = function () {
        return this.currentYearNumber;
    };
    MomentCalendar.prototype.getCurrentDayName = function () {
        return moment().day(this.getCurrentDayNumber()).format('dddd');
    };
    MomentCalendar.prototype.getCurrentMonthName = function () {
        return moment().month(this.currentMonthNumber).format('MMMM');
    };
    MomentCalendar.prototype.getCurrentYearName = function () {
        return this.currentYearNumber + '';
    };
    MomentCalendar.prototype.convertArrToObj = function (arr, val) {
        var obj = {};
        arr.forEach(function (item) {
            obj[item] = val;
        });
        return obj;
    };
    MomentCalendar.prototype.getClickedDays = function () {
        return this.clickedDays;
    };
    MomentCalendar.prototype.setClickedDays = function (arr) {
        this.clickedDays = arr;
    };
    MomentCalendar.prototype.setClassToDateOptions = function (newSetClassToDate) {
        this.options.setClassToDate = newSetClassToDate;
    };
    MomentCalendar.prototype.isUpcomingDate = function (date) {
        var dateArr = date.split('.');
        if (dateArr[2] < this.initYearNumber ||
            dateArr[1] < this.initMonthNumber ||
            dateArr[0] < this.initDayNumber) {
            return false;
        }
        return true;
    };
    MomentCalendar.prototype.setMonthAndYearInControlsPanel = function () { };
    MomentCalendar.prototype.appendNextMonth = function () {
        this.appendToMainContainer(this.createMonth(this.createNextMonthModel()));
    };
    MomentCalendar.prototype.appendPrevMonth = function () {
        this.appendToMainContainer(this.createMonth(this.createPrevMonthModel()));
    };
    MomentCalendar.prototype.refresh = function (newOptions) {
        this.appendToMainContainer(this.createMonth(this.createCurrentMonthModel(newOptions)));
    };
    MomentCalendar.prototype.show = function (el, displayType) {
        el.style.display = displayType || 'block';
    };
    MomentCalendar.prototype.hide = function (el) {
        el.style.display = 'none';
    };
    return MomentCalendar;
}());
MomentCalendar.defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
MomentCalendar.defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
MomentCalendar.defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
MomentCalendar.defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
document.addEventListener('DOMContentLoaded', function () {
    var calendarApi = new MomentCalendar(document.querySelector('#calendar'), {
        setClassToDate: {
            '14.02.2017': '_autopay',
            '23.02.2017': '_autopay-arrow',
            '26.02.2017': '_due-date',
        },
        daysNaming: true,
        clickableDays: true,
        clickableOnlyUpcomingDays: true,
        controlsPanel: true,
        onDayClick: function (el) {
            console.log(el);
        }
    });
    setMonthAndYear();
    document.querySelector('#buttonNext').addEventListener('click', function () {
        calendarApi.appendNextMonth();
        setMonthAndYear();
    });
    document.querySelector('#buttonPrev').addEventListener('click', function () {
        calendarApi.appendPrevMonth();
        setMonthAndYear();
    });
    document.querySelector('#buttonRefresh').addEventListener('click', function () {
        calendarApi.refresh({
            setClassToDate: {
                '16.02.2017': '_autopay',
                '25.02.2017': '_autopay-arrow',
                '28.02.2017': '_due-date'
            }
        });
        setMonthAndYear();
    });
    document.querySelector('#buttonGetCurrentInfo').addEventListener('click', function () {
        console.log(calendarApi.getCurrentDayNumber(), ' getCurrentDayNumber()');
        console.log(calendarApi.getCurrentDayName(), ' getCurrentDayName()');
        console.log(calendarApi.getCurrentMonthNumber(), ' getCurrentMonthNumber()');
        console.log(calendarApi.getCurrentMonthName(), ' getCurrentMonthName()');
        console.log(calendarApi.getCurrentYearNumber(), ' getCurrentYearNumber()');
        console.log(calendarApi.getCurrentYearName(), ' getCurrentYearName');
    });
    function setMonthAndYear() {
        console.log(calendarApi.getCurrentMonthName());
        console.log(calendarApi.getCurrentYearName());
    }
});
//# sourceMappingURL=js.js.map