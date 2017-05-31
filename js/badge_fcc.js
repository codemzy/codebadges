/* global $ */

$(document).ready(function() {
    
    var name = "codemzy";
    // get name from url parameter
    
    // request user data from FCC (no api so scraping off user page)
    var url = 'https://www.freecodecamp.com/' + name;
    $.get(url, function(response) {
        var score = $(response).find('.flat-top.text-primary').text().split(' ')[1];
        $('#points').text(parseInt(score, 10));
        var challenges = $(response).find('tbody tr').length;
        $('#challenges').text(challenges);
        // get the dates from the first item in each table
        var date = $(response).find('tbody').find('tr:first td:eq(1)');
        var dates = []; // array to hold years
        for (var i = 0; i < 3; i++) {
            // get the year
            dates.push(parseInt($(date[i]).text().split(",")[1], 10));
        }
        // sort lowest first
        dates.sort(function(a, b) {
          return a - b;
        });
        // update the date with the lowest date
        $('#date').text(dates[0]);
    });

});