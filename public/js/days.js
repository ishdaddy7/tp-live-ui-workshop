'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var daysModule = (function() {

    // application state

    var days = [],
        currentDay;

    // jQuery selections

    var $addButton, $removeButton;
    $(function() {
        $addButton = $('#day-add');
        $removeButton = $('#day-title > button.remove');
    });

    // method used both internally and externally

    function switchTo(newCurrentDay) {
        if (currentDay) currentDay.hide();
        currentDay = newCurrentDay;
        currentDay.show();
    }

    function load() {
        $.get('api/days', function(days) {
                days.forEach(function(day) {
                    dayModule.create({ number: day.value })
                    console.log(day);
                })
            })
            // $(addDay);
    }

    // jQuery event binding

    $(function() {
        $addButton.on('click', addDay);
        $removeButton.on('click', deleteCurrentDay);
    });

    function addDay() {
        if (this && this.blur) this.blur(); // removes focus box from buttons
        $.get('/api/days', function(result) {
            var dayValue = result.length + 1;
            $.post('/api/days', { value: dayValue }, function(result) {})
            var newDay = dayModule.create({ number: dayValue }); // dayModule
            //days.push(newDay);
            if (dayValue === 1) {
                currentDay = newDay;
                switchTo(currentDay);
            }
        });
        /*    var newDay = dayModule.create({ number: days.length + 1 }); // dayModule
            days.push(newDay);
            if (days.length === 1) {
              currentDay = newDay;
              switchTo(currentDay);
            }*/
    }

    function deleteCurrentDay() {
        // create days array
        var days;
        $.get('/api/days', function(result) {
            days = result;
            // prevent deleting last day
            if (days.length < 2 || !currentDay) return;
            /*     $.delete('api/days/'+currentDay.number, function(result) {
                   console.log('deleted:', result)
                 })*/
            $.ajax({
                url: '/api/days/' + currentDay.number,
                type: 'DELETE',
                success: function(result) {
                    console.log('deleted: ', result);
                    // load();
                }})
        })

        // remove from the collection

        var index = days.indexOf(currentDay),
            previousDay = days.splice(index, 1)[0],
            newCurrent = days[index] || days[index - 1];
        // fix the remaining day numbers
        days.forEach(function(day, i) {
            day.setNumber(i + 1);
        });
        switchTo(newCurrent);
        previousDay.hideButton();
    }

    // globally accessible module methods

    var methods = {

        load: load,

        switchTo: switchTo,

        addToCurrent: function(attraction) {
            currentDay.addAttraction(attraction);
        },

        removeFromCurrent: function(attraction) {
            currentDay.removeAttraction(attraction);
        }

    };

    return methods;

}());
