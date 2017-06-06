/* global $ */

$(document).ready(function() {
    
    // // add the loading to any badges
    // $('.code-badge').html('<div class="outer"><div class="inner"><div id="loader"><div class="loading"></div><div id="loading-text">Loading...</div></div></div></div>');
    
    
    // var name = "codemzy";
    // // get name from url parameter
    
    // // request user data from FCC (no api so scraping off user page)
    // var url = 'https://www.freecodecamp.com/' + name;
    // $.get(url, function(response) {
    //     var score = $(response).find('.flat-top.text-primary').text().split(' ')[1];
    //     var points = parseInt(score, 10); // get the users points
    //     var challenges = $(response).find('tbody tr').length; // number of challenges completed
    //     // get the dates from the first item in each table
    //     var dateArr = $(response).find('tbody').find('tr:first td:eq(1)');
    //     var dates = []; // array to hold years
    //     for (var i = 0; i < 3; i++) {
    //         // get the year
    //         dates.push(parseInt($(dateArr[i]).text().split(",")[1], 10));
    //     }
    //     // sort lowest first
    //     dates.sort(function(a, b) {
    //       return a - b;
    //     });
    //     var date = dates[0];
    //     // update the inner html of badge with all the info
    //     var html = '<div id="points">' + points + '</div><div class="small">points</div>' +
    //     '<div id="user">' + name + '</div><div class="small">FreeCodeCamp Student</div>' +
    //     '<div id="completed" class="small">Completed</div><div><span id="challenges">' + challenges + '</span> challenges</div>' +
    //     '<div class="small">since <span id="date">' + date + '</span></div>';
    //     $('.code-badge.fcc .inner').html(html);
    // });
    
    codeBadges("codemzy").freeCodeCamp().codeSchool("bijanbwb").gitHub();
    
});