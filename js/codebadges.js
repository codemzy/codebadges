/* global jQuery */

(function(global, $) {
    
    // codeBadges function will return a codeBadges.init object with some default values
    var codeBadges = function(name) {
        // add the loading to any badges
        $('.code-badge').html('<div class="outer"><div class="inner"><div id="loader"><div class="loading"></div><div id="loading-text">Loading...</div></div></div></div>');
        // return new codeBadges object with name property
        return new codeBadges.init(name);
    };
    
    // API CALLS
    
    var codeSchoolAPI = function(name, callback) {
        var url = 'https://www.codeschool.com/users/' + name + '.json';
        $.ajax({
          type: "GET",
          dataType: 'jsonp',
          url: url
        }).done(function(response) {
            var badges = response.badges.length;
            var score = response.user.total_score;
            var date = response.user.member_since.split("-")[0];
            callback({ top: badges, bottom: score, date: date });
        });
    };
    
    
    
    // Methods that can be used
    codeBadges.prototype = {
        
        // CodeSchool badge
        codeSchool: function(newName) {
            // get the name 
            var name = newName || this.name;
            // call api function
            codeSchoolAPI(name, function(data) {
                // update the inner html of badge with all the info
                var html = '<div id="points">' + data.top + '</div><div class="small">badges</div>' +
                '<div id="user">' + name + '</div><div class="small">CodeSchool Student</div>' +
                '<div id="completed" class="small">Score</div><div><span id="challenges">' + data.bottom + '</span></div>' +
                '<div class="small">since <span id="date">' + data.date + '</span></div>';
                $('.code-badge.codeschool .inner').html(html);
            });
        },
        
        // FreeCodeCamp badge
        freeCodeCamp: function() {
            var name = this.name; // name already passed to init
            // request user data from FCC (no api so scraping off user page)
            var url = 'https://www.freecodecamp.com/' + name;
            $.get(url, function(response) {
                var score = $(response).find('.flat-top.text-primary').text().split(' ')[1];
                var points = parseInt(score, 10); // get the users points
                var challenges = $(response).find('tbody tr').length; // number of challenges completed
                // get the dates from the first item in each table
                var dateArr = $(response).find('tbody').find('tr:first td:eq(1)');
                var dates = []; // array to hold years
                for (var i = 0; i < 3; i++) {
                    // get the year
                    dates.push(parseInt($(dateArr[i]).text().split(",")[1], 10));
                }
                // sort lowest first
                dates.sort(function(a, b) {
                  return a - b;
                });
                var date = dates[0];
                // update the inner html of badge with all the info
                var html = '<div id="points">' + points + '</div><div class="small">points</div>' +
                '<div id="user">' + name + '</div><div class="small">FreeCodeCamp Student</div>' +
                '<div id="completed" class="small">Completed</div><div><span id="challenges">' + challenges + '</span> challenges</div>' +
                '<div class="small">since <span id="date">' + date + '</span></div>';
                $('.code-badge.fcc .inner').html(html);
            });
        },
        
        // GitHub badge
        gitHub: function() {
            var name = this.name; // name already passed to init
            // request user data from GitHub API
            var url = 'https://api.github.com/users/' + name;
            $.get(url, function(response) {
                var followers = response.followers;
                var repos = response.public_repos;
                var date = response.created_at.split("-")[0];
                // update the inner html of badge with all the info
                var html = '<div id="points">' + followers + '</div><div class="small">followers</div>' +
                '<div id="user">' + name + '</div><div class="small">GitHub User</div>' +
                '<div id="completed" class="small">Created</div><div><span id="challenges">' + repos + '</span> public repos</div>' +
                '<div class="small">since <span id="date">' + date + '</span></div>';
                $('.code-badge.gh .inner').html(html);
            });
        }
        
    };
    
    // codeBadges.init function constructor
    codeBadges.init = function(name) {
        var self = this;
        self.name = name || 'codemzy';
    };
    
    // codeBadges init prototype same as the codeBadges one (both point to the same prototype)
    codeBadges.init.prototype = codeBadges.prototype;
    
    // pass our codeBadges function to the global window object
    global.codeBadges = codeBadges;
    
})(window, jQuery);