"use strict";
var moment = window.moment;
var MomentCalendar = (function () {
    function MomentCalendar(element, initOptions) {
        this.clickedDays = [];
        this.createMainTemplate(element);
        this.calendarEl = element;
        this.el = element.querySelector('.calendar-body');
        this.monthsElWrapper = element.querySelector('.calendar-months-wrapper');
        this.monthsEl = element.querySelector('.calendar-months');
        this.yearsElWrapper = element.querySelector('.calendar-years-wrapper');
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
        element.insertAdjacentHTML('afterbegin', "\n            <div class=\"calendar-body\"></div>\n            <div class=\"calendar-months-wrapper\">\n                <div class=\"calendar-months\"></div>\n            </div>\n            <div class=\"calendar-years-wrapper\">\n                <div class=\"calendar-years\"></div>\n            </div>\n        ");
    };
    MomentCalendar.prototype.init = function () {
        this.appendToMainContainer(this.createMonth(this.currentMonthModel));
        this.makeMonthsHtml();
        this.makeYearsHtml();
        this.bindEvents();
    };
    MomentCalendar.prototype.makeMonthsHtml = function () {
        var _this = this;
        var i = 0;
        MomentCalendar.defaultLocaleMonthsShort.forEach(function (month) {
            _this.monthsEl.insertAdjacentHTML('beforeend', "\n                <div class=\"calendar-months__month\" data-month=\"" + i++ + "\">" + month + "</div>\n            ");
        });
    };
    MomentCalendar.prototype.setCurrentYearClass = function () {
        var _this = this;
        var years = this.yearsEl.querySelectorAll('.calendar-years__year');
        Array.prototype.forEach.call(years, function (year) {
            var dataYear = +year.getAttribute('data-year');
            if (dataYear === _this.currentYearNumber) {
                year.classList.add('_current');
            }
            else {
                year.classList.remove('_current');
            }
        });
    };
    MomentCalendar.prototype.setCurrentMonthClass = function () {
        var _this = this;
        var months = this.monthsEl.querySelectorAll('.calendar-months__month');
        Array.prototype.forEach.call(months, function (month) {
            var dataMonth = +month.getAttribute('data-month');
            if (dataMonth === _this.currentMonthNumber) {
                month.classList.add('_current');
            }
            else {
                month.classList.remove('_current');
            }
        });
    };
    MomentCalendar.prototype.clearCurrentMonthClass = function () {
        var months = this.monthsEl.querySelectorAll('.calendar-months__month');
        Array.prototype.forEach.call(months, function (month) {
            month.classList.remove('_current');
        });
    };
    MomentCalendar.prototype.makeYearsHtml = function () {
        var yearsBefore = 6, yearsAfter = 8, c = 0, k = 0;
        this.yearsEl.insertAdjacentHTML('beforeend', "\n            <div class=\"calendar-years__year\" data-year=\"" + this.getCurrentYearNumber() + "\">" + this.getCurrentYearNumber() + "</div> \n       ");
        while (k++ < yearsBefore) {
            this.yearsEl.insertAdjacentHTML('beforeend', "\n                <div class=\"calendar-years__year\" data-year=\"" + (this.getCurrentYearNumber() - k) + "\"\n                >" + (this.getCurrentYearNumber() - k) + "</div> \n           ");
        }
        while (c++ < yearsAfter) {
            this.yearsEl.insertAdjacentHTML('afterbegin', "\n                <div class=\"calendar-years__year\" data-year=\"" + (this.getCurrentYearNumber() + c) + "\">" + (this.getCurrentYearNumber() + c) + "</div> \n           ");
        }
    };
    MomentCalendar.prototype.bindEvents = function () {
        this.calendarClickBinded = this.calendarClick.bind(this);
        this.calendarEl.addEventListener('click', this.calendarClickBinded);
    };
    MomentCalendar.prototype.calendarClick = function (e) {
        var target = e.target, targetClassList = target.classList;
        if (targetClassList.contains('calendar__day') && typeof this.options.onDayClick === 'function') {
            var day = e.target, date = day.getAttribute('data-date');
            if (this.options.clickableOnlyUpcomingDays && !this.isUpcomingDate(date)) {
                return;
            }
            if (day.classList.contains('_clicked')) {
                day.classList.remove('_clicked');
                this.clickedDays.splice(this.clickedDays.indexOf(date), 1);
            }
            else {
                day.classList.add('_clicked');
                this.clickedDays.push(date);
            }
            this.options.onDayClick(day);
        }
        if (targetClassList.contains("calendar__panel-prev")) {
            this.appendToMainContainer(this.createMonth(this.createPrevMonthModel()));
            if (typeof this.options.onPrevButtonClick === 'function') {
                this.options.onPrevButtonClick(this.calendarEl);
            }
        }
        if (targetClassList.contains("calendar__panel-next")) {
            this.appendToMainContainer(this.createMonth(this.createNextMonthModel()));
            if (typeof this.options.onNextButtonClick === 'function') {
                this.options.onNextButtonClick(this.calendarEl);
            }
        }
        if (targetClassList.contains("calendar__panel-month")) {
            this.show(this.monthsElWrapper);
            this.hide(this.el);
            this.setCurrentMonthClass();
        }
        if (targetClassList.contains("calendar__panel-year")) {
            this.show(this.yearsElWrapper);
            this.hide(this.el);
            this.setCurrentYearClass();
            this.clearCurrentMonthClass();
        }
        if (targetClassList.contains("calendar-years__year")) {
            this.hide(this.yearsElWrapper);
            this.show(this.monthsElWrapper);
            this.currentYearNumber = +target.getAttribute('data-year');
        }
        if (targetClassList.contains("calendar-months__month")) {
            this.hide(this.monthsElWrapper);
            this.show(this.el);
            this.currentMonthNumber = +target.getAttribute('data-month');
            this.appendToMainContainer(this.createMonth(this.createMonthModel()));
        }
    };
    MomentCalendar.prototype.update = function () {
    };
    MomentCalendar.prototype.destroy = function () {
        this.calendarEl.removeEventListener('click', this.calendarClickBinded);
        this.calendarEl.innerHTML = '';
    };
    MomentCalendar.prototype.createCurrentMonthModel = function (newOptions) {
        if (newOptions === void 0) { newOptions = ''; }
        if (newOptions) {
            $.extend(this.options, newOptions);
        }
        this.currentMonthNumber = this.getInitMonthNumber();
        this.currentYearNumber = this.getInitYearNumber();
        return this.createMonthModel();
    };
    MomentCalendar.prototype.createNextMonthModel = function () {
        ++this.currentMonthNumber;
        if (moment().year(this.currentYearNumber).month(this.currentMonthNumber).get('year') !== this.currentYearNumber) {
            ++this.currentYearNumber;
        }
        return this.createMonthModel();
    };
    MomentCalendar.prototype.createPrevMonthModel = function () {
        --this.currentMonthNumber;
        if (moment().year(this.currentYearNumber).month(this.currentMonthNumber).get('year') !== this.currentYearNumber) {
            --this.currentYearNumber;
        }
        return this.createMonthModel();
    };
    MomentCalendar.prototype.createMonthModel = function () {
        var startOfMonth = moment().year(this.currentYearNumber).month(this.currentMonthNumber).startOf('month'), endOfMonth = moment().year(this.currentYearNumber).month(this.currentMonthNumber).endOf('month'), days = [], day = startOfMonth;
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
            else if (_this.currentYearNumber < _this.initYearNumber ||
                _this.currentMonthNumber < _this.initMonthNumber ||
                (_this.currentMonthNumber === _this.initMonthNumber &&
                    +numberOfDayOfMonth < _this.initDayNumber)) {
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
        panel.insertAdjacentHTML('beforeend', "\n                    <div class=\"calendar__panel-prev\"></div>\n                    <div class=\"calendar__panel-dates\">\n                        <div class=\"calendar__panel-month\">\n                            " + this.getCurrentMonthName() + "\n                        </div>\n                        <div class=\"calendar__panel-year\">\n                            " + this.getCurrentYearNumber() + "\n                        </div>\n                    </div>\n                    <div class=\"calendar__panel-next\"></div>\n                ");
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
    MomentCalendar.prototype.getCurrentMonthNumber = function () {
        return this.currentMonthNumber;
    };
    MomentCalendar.prototype.getCurrentYearNumber = function () {
        return this.currentYearNumber;
    };
    MomentCalendar.prototype.getInitDayName = function () {
        return moment().day(this.getInitDayNumber()).format('dddd');
    };
    MomentCalendar.prototype.getCurrentMonthName = function () {
        return moment().month(this.currentMonthNumber).format('MMMM');
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
        if (!date)
            return;
        var dateArr = date.split('.');
        if (dateArr[2] > this.initYearNumber) {
            return true;
        }
        else if (dateArr[2] == this.initYearNumber) {
            if (dateArr[1] > this.initMonthNumber) {
                return true;
            }
            else if (dateArr[1] == this.initMonthNumber) {
                if (dateArr[0] > this.initDayNumber || dateArr[1] == this.initMonthNumber) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    MomentCalendar.prototype.setMonthAndYearInControlsPanel = function () {
    };
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
        },
        onNextButtonClick: function (el) {
            console.log(el);
        },
        onPrevButtonClick: function (el) {
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
        console.log(calendarApi.getInitDayNumber(), ' getInitDayNumber()');
        console.log(calendarApi.getInitDayName(), ' getInitDayName()');
        console.log(calendarApi.getCurrentMonthNumber(), ' getCurrentMonthNumber()');
        console.log(calendarApi.getCurrentMonthName(), ' getCurrentMonthName()');
        console.log(calendarApi.getCurrentYearNumber(), ' getCurrentYearNumber()');
        console.log(calendarApi.getCurrentYearNumber(), ' getCurrentYearNumber');
    });
    function setMonthAndYear() {
        console.log(calendarApi.getCurrentMonthName());
        console.log(calendarApi.getCurrentYearNumber());
    }
});
//# sourceMappingURL=js.js.map