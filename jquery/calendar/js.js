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
    $.fn.momentCalendar = function (options) {
        var defaults = {
            h: 16
        };
        options = $.extend(defaults, options);
        return $.each($(this), function (idx, el) {
            var $el = $(el), currentMonth = createCurrentMonthModel(), currentDayNumber = moment().day(), currentMonthNumber = moment().get('month');
            function init() {
                appendMonthToMainContainer(createMonth(currentMonth));
                updateVars();
                bindEvents();
            }
            function updateVars() {
            }
            function bindEvents() {
            }
            function update() {
            }
            function createCurrentMonthModel() {
                var startOfMonth = moment().startOf('month'), endOfMonth = moment().endOf('month'), days = [], day = startOfMonth;
                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }
                return days;
            }
            function createNextMonthModel(monthNumber) {
                var startOfMonth = moment().month(monthNumber + 1).startOf('month'), endOfMonth = moment().month(monthNumber + 1).endOf('month'), days = [], day = startOfMonth;
                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }
                return days;
            }
            function createPrevMonthModel(monthNumber) {
                var startOfMonth = moment().month(monthNumber - 1).startOf('month'), endOfMonth = moment().month(monthNumber - 1).endOf('month'), days = [], day = startOfMonth;
                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }
                return days;
            }
            function createMonth(month) {
                var monthHtml = createMonthHtml(), weekHtml = createWeekHtml();
                monthHtml.appendChild(createWeekWithDaysHtml());
                currentMonth.forEach(function (day, index) {
                    var numberOfDayOfWeek = moment(day).format("e"), numberOfDayOfMonth = moment(day).format("D");
                    if (!+numberOfDayOfWeek) {
                        if (weekHtml.innerHTML) {
                            monthHtml.appendChild(weekHtml);
                        }
                        weekHtml = createWeekHtml();
                    }
                    weekHtml.appendChild(createDayHtml(numberOfDayOfMonth));
                });
                monthHtml.appendChild(weekHtml);
                return monthHtml;
            }
            function createDayHtml(html) {
                var day = document.createElement('div');
                day.classList.add('calendar__day');
                day.innerHTML = html;
                return day;
            }
            function createWeekHtml() {
                var week = document.createElement('div');
                week.classList.add('calendar__week');
                return week;
            }
            function createWeekWithDaysHtml() {
                var week = document.createElement('div'), days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                week.classList.add('calendar__week-header');
                days.forEach(function (dayName) {
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
            function appendMonthToMainContainer(monthHtml) {
                $el.html(monthHtml);
            }
            init();
        });
    };
});
//# sourceMappingURL=js.js.map