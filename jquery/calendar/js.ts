"use strict";



interface options {

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

    $.fn.momentCalendar = function(options:options) {

        let defaults:options = {
            h: 16
        };

        options = $.extend(defaults, options);

        return $.each($(this), function(idx, el) {

            let $el = $(el),
                currentMonth = createCurrentMonthModel(),
                currentDayNumber = moment().day(),
                currentMonthNumber:number = moment().get('month');






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



            /*Helpers*/
            function createCurrentMonthModel() {
                let startOfMonth = moment().startOf('month'),
                    endOfMonth = moment().endOf('month'),
                    days = [],
                    day = startOfMonth;

                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }

                return days;
            }

            function createNextMonthModel(monthNumber) {
                let startOfMonth = moment().month(monthNumber+1).startOf('month'),
                    endOfMonth = moment().month(monthNumber+1).endOf('month'),
                    days = [],
                    day = startOfMonth;

                while (day <= endOfMonth) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }

                return days;
            }

            function createPrevMonthModel(monthNumber) {
                let startOfMonth = moment().month(monthNumber-1).startOf('month'),
                    endOfMonth = moment().month(monthNumber-1).endOf('month'),
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

                monthHtml.appendChild(createWeekWithDaysHtml());

                currentMonth.forEach((day, index) => {
                    let numberOfDayOfWeek = moment(day).format("e"),
                        numberOfDayOfMonth = moment(day).format("D");

                    if (!+numberOfDayOfWeek) { //if Sunday of new week

                        if (weekHtml.innerHTML) {
                            monthHtml.appendChild(weekHtml)
                        }

                        weekHtml = createWeekHtml();
                    }

                    weekHtml.appendChild(createDayHtml(numberOfDayOfMonth));
                });

                monthHtml.appendChild(weekHtml);

                return monthHtml;
            }

            function createDayHtml(html):HTMLElement {
                let day = document.createElement('div');

                day.classList.add('calendar__day');

                day.innerHTML = html;

                return day;
            }

            function createWeekHtml():HTMLElement {
                let week = document.createElement('div');

                week.classList.add('calendar__week');

                return week;
            }

            function createWeekWithDaysHtml():HTMLElement {
                let week = document.createElement('div'),
                    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

                week.classList.add('calendar__week-header');

                days.forEach((dayName) => {
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

            function appendMonthToMainContainer(monthHtml):void {
                $el.html(monthHtml);
            }



            init();



            /*Public Api*/

        });
    };

});