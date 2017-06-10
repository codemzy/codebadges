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
    
    var codecademyAPI = function(name, callback) {
        var url = 'https://www.codecademy.com/' + name; // no api so scraping
        $.get(url, function(response) {
            var badges = response.match(/<p>Skills completed<\/p>[\s|\S]*?<h3>([\s|\S]*?)<\/h3>[\s|\S]*?<p>Badges<\/p>/m)[1];
            var points = response.match(/<h3 class="padding-right--quarter">([\s|\S]*?)<\/h3>[\s|\S]*?<small>total points<\/small>/m)[1];
            var date = response.match(/<small class="text--ellipsis">Joined([\s|\S]*?)<\/small>/m)[1].split(", ")[1];
            callback(false, { top: badges, top_type: "badges", user_type: "Codecademy Student", bottom: points, bottom_type: "Points", date: date });
        }).fail(function() {
            callback("error");
        });
    };
    
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
            callback(false, { top: badges, top_type: "badges", user_type: "CodeSchool Student", bottom: score, bottom_type: "Score", date: date });
        }).fail(function() {
            callback("error");
        });
    };
    
    var codeWarsAPI = function(name, callback) {
        var url = 'https://allorigins.us/get?url=' + encodeURIComponent('https://www.codewars.com/users/') + name + '&callback=?'; // scraping via allorigins due to CORS
        $.get(url, function(data){
            var kyu = data.contents.match(/Rank:<\/b>(.+?)<\/div>/m)[1];
            var points = data.contents.match(/Honor:<\/b>(.+?)<\/div>/m)[1];
            var date = data.contents.match(/Member Since:<\/b>(.+?)<\/div>/m)[1].split(" ")[1];
            callback(false, { top: points, top_type: "honor", user_type: "CodeWars Member", bottom: kyu, bottom_type: "Rank", date: date });
        }).fail(function() {
            callback("error");
        });
    };
    
    var freeCodeCampAPI = function(name, callback) {
        var url = 'https://www.freecodecamp.com/' + name; // request user data from FCC (no api so scraping off user page)
        $.get(url, function(response) {
            var points = response.match(/<h1 class="flat-top text-primary">\[ ([\s|\S]*?) \]<\/h1>/)[1];
            var challenges = response.replace(/<thead>[\s|\S]*?<\/thead>/g).match(/<tr>/g).length + " challenges";
            // get the dates from the first item in the first table
            var challengeTables = response.match(/<table[\s|\S]*?<\/table>/g).join(" ");
            var dateArr = $(challengeTables).find('tbody').find('tr:first td:eq(1)');
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
            callback(false, { top: points, top_type: "points", user_type: "FreeCodeCamp Student", bottom: challenges, bottom_type: "Completed", date: date });
        }).fail(function() {
            callback("error");
        });
    };
    
    var gitHubAPI = function(name, callback) {
        var url = 'https://api.github.com/users/' + name;
        $.get(url, function(response) {
            var followers = response.followers;
            var repos = response.public_repos + " public repos";
            var date = response.created_at.split("-")[0];
            callback(false, { top: followers, top_type: "followers", user_type: "GitHub User", bottom: repos, bottom_type: "Created", date: date });
        }).fail(function() {
            callback("error");
        });
    };
    
    var treeHouseAPI = function(name, callback) {
        var url ='https://teamtreehouse.com/' + name + '.json';
        $.get(url, function(response) {
            var points = response.points.total;
            var badges = response.badges.length + " achievements";
            var date = response.badges && response.badges.length > 0 ? response.badges[0].earned_date.split("-")[0] : "-";
            callback(false, { top: points, top_type: "points", user_type: "Treehouse Student", bottom: badges, bottom_type: "Completed", date: date });
        }).fail(function() {
            callback("error");
        });
    };
    
    // HTML 
    // check name length
    var nameLength = function(name) {
        if (name.length > 10) {
            if (name.length > 16) {
                var shortName = name.split(0, 15); // truncate
                return { name: shortName, small: true };
            } else {
               return { name: name, small: true }; 
            }
        } else {
            return { name: name, small: false };
        }
    };
    // return html
    var errorHTML = '<div class="margin-top big">-</div><div class="small">-</div><div id="user">User</div><div class="small">Not Found</div>';
    var createHTML = function(data, name) {
        var nameObj = nameLength(name);
        var nameClass = nameObj.small ? "smaller" : "";
        return '<div class="margin-top big">' + data.top + '</div><div class="small">' + data.top_type + '</div>' +
                '<div id="user" class="' + nameClass + '>' + nameObj.name + '</div><div class="small">' + data.user_type + '</div>' +
                '<div class="small margin-top">' + data.bottom_type + '</div><div><span>' + data.bottom + '</span></div>' +
                '<div class="small">since <span id="date">' + data.date + '</span></div>';
    };
    
    // CODEBADGES METHODS
    codeBadges.prototype = {
        
        // Codecademy badge
        codecademy: function(newName) {
            // get the name 
            var name = newName || this.name; // defaults to name passed to init
            // call api function
            codecademyAPI(name, function(err, data) {
                // update the inner html of badge with all the info
                var html = err ? errorHTML : createHTML(data, name);
                $('.code-badge.codecademy .inner').html(html);
            });
            return this; // return this so can chain methods
        },
        
        // CodeSchool badge
        codeSchool: function(newName) {
            // get the name 
            var name = newName || this.name; // defaults to name passed to init
            // call api function
            codeSchoolAPI(name, function(err, data) {
                // update the inner html of badge with all the info
                var html = err ? errorHTML : createHTML(data, name);
                $('.code-badge.codeschool .inner').html(html);
            });
            return this; // return this so can chain methods
        },
        
        codeWars: function(newName) {
            // get the name 
            var name = newName || this.name; // defaults to name passed to init
            // call api function
            codeWarsAPI(name, function(err, data) {
                // update the inner html of badge with all the info
                var html = err ? errorHTML : createHTML(data, name);
                $('.code-badge.codewars .inner').html(html);
            });
            return this; // return this so can chain methods
        },
        
        // FreeCodeCamp badge
        freeCodeCamp: function(newName) {
            // get the name 
            var name = newName || this.name; // defaults to name passed to init
            // call api function
            freeCodeCampAPI(name, function(err, data) {
                // update the inner html of badge with all the info
                var html = err ? errorHTML : createHTML(data, name);
                $('.code-badge.fcc .inner').html(html);
            });
            return this; // return this so can chain methods
        },
        
        // GitHub badge
        gitHub: function(newName) {
            // get the name 
            var name = newName || this.name; // defaults to name passed to init
            // call api function
            gitHubAPI(name, function(err, data) {
                // update the inner html of badge with all the info
                var html = err ? errorHTML : createHTML(data, name);
                $('.code-badge.gh .inner').html(html);
            });
            return this; // return this so can chain methods
        },
        
        // TreeHouse badge
        treeHouse: function(newName) {
            // get the name 
            var name = newName || this.name; // defaults to name passed to init
            // call api function
            treeHouseAPI(name, function(err, data) {
                // update the inner html of badge with all the info
                var html = err ? errorHTML : createHTML(data, name);
                $('.code-badge.treehouse .inner').html(html);
            });
            return this; // return this so can chain methods
        }
        
    };
    
    // codeBadges.init function constructor
    codeBadges.init = function(name) {
        this.name = name || 'codemzy';
    };
    
    // codeBadges init prototype same as the codeBadges one (both point to the same prototype)
    codeBadges.init.prototype = codeBadges.prototype;
    
    // pass our codeBadges function to the global window object
    global.codeBadges = codeBadges;
    
})(window, jQuery);