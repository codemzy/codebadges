/* global jQuery */

/*!
 * codeBadges v1.0.4 (https://codemzy.github.io/codebadges)
 * Copyright 2018 codemzy
 * Licensed under MIT
 */

// require jQuery 
if (typeof jQuery === 'undefined') {
  throw new Error('codeBadges JavaScript requires jQuery. jQuery must be included before codeBadges JavaScript.');
}

// codeBadges
(function(global, $) {
    
    // codeBadges function will return a codeBadges.init object with some default values
    var codeBadges = function(name) {
        // add the loading to any badges
        $('.code-badge').html('<div class="outer"><div class="inner"><div class="loader"><div class="loading"></div><div class="loading-text">Loading...</div></div></div></div>');
        // return new codeBadges object with name property
        return new codeBadges.init(name);
    };
    
    // BADGES
    var badgeObj = {
        "codecademy": true,
        "codeschool": true,
        "codewars": true,
        "freecodecamp": true,
        "github": true,
        "treehouse": true
    };
    
    // HTML 
    // error html
    var errorHTML = '<div class="margin-top big">-</div><div class="small">-</div><div id="user">User</div><div class="small">Not Found</div>';
    // success html
    var createHTML = function(data, nameObj) {
        var nameClass = nameObj.small ? "smaller" : "";
        return '<div class="margin-top big">' + data.top + '</div><div class="small">' + data.top_type + '</div>' +
                '<div class="user ' + nameClass + '">' + nameObj.name + '</div><div class="small">' + data.user_type + '</div>' +
                '<div class="small margin-top">' + data.bottom_type + '</div><div><span>' + data.bottom + '</span></div>' +
                '<div class="small">since <span id="date">' + data.date + '</span></div>';
    };
    
    // CODEBADGES METHODS
    codeBadges.prototype = {
        
        // API GET REQUESTS
        _get: {
            _codecademyAPI: function(name, callback) {
                var url = 'https://www.codecademy.com/' + name; // no api so scraping
                $.get(url, function(response) {
                    var badges = response.match(/<p>Skills completed<\/p>[\s|\S]*?<h3>([\s|\S]*?)<\/h3>[\s|\S]*?<p>Badges<\/p>/m)[1];
                    var points = response.match(/<h3 class="padding-right--quarter">([\s|\S]*?)<\/h3>[\s|\S]*?<small>total points<\/small>/m)[1];
                    var date = response.match(/<small class="text--ellipsis">Joined([\s|\S]*?)<\/small>/m)[1].split(", ")[1];
                    callback(false, { top: parseInt(badges, 10), top_type: "badges", user_type: "Codecademy Student", bottom: points, bottom_type: "Points", date: date });
                }).fail(function() {
                    callback("error");
                });
            },
            _codeschoolAPI: function(name, callback) {
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
            },
            _codewarsAPI: function(name, callback) {
                var url = 'https://cors-anywhere.herokuapp.com/' + 'https://www.codewars.com/users/' + name; // scraping via cors.now.sh due to CORS
                $.get(url, function(data){
                    var points = data.match(/Honor:<\/b>(.+?)<\/div>/m)[1];
                    var kyu = data.match(/Rank:<\/b>(.+?)<\/div>/m)[1];
                    var date = data.match(/Member Since:<\/b>(.+?)<\/div>/m)[1].split(" ")[1];
                    callback(false, { top: points, top_type: "honor", user_type: "CodeWars Member", bottom: kyu, bottom_type: "Rank", date: date });
                }).fail(function() {
                    callback("error");
                });
            },
            _freecodecampAPI: function(name, callback) {
                var url = 'https://www.freecodecamp.org/' + name; // request user data from FCC (no api so scraping off user page)
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
                    callback(false, { top: parseInt(points, 10), top_type: "points", user_type: "FreeCodeCamp Student", bottom: challenges, bottom_type: "Completed", date: date });
                }).fail(function() {
                    callback("error");
                });
            },
            _githubAPI: function(name, callback) {
                var url = 'https://api.github.com/users/' + name;
                $.get(url, function(response) {
                    var followers = response.followers;
                    var repos = response.public_repos + " public repos";
                    var date = response.created_at.split("-")[0];
                    callback(false, { top: followers, top_type: "followers", user_type: "GitHub User", bottom: repos, bottom_type: "Created", date: date });
                }).fail(function() {
                    callback("error");
                });
            },
            _treehouseAPI: function(name, callback) {
                var url ='https://teamtreehouse.com/' + name + '.json';
                $.get(url, function(response) {
                    var points = response.points.total;
                    var badges = response.badges.length + " achievements";
                    var date = response.badges && response.badges.length > 0 ? response.badges[0].earned_date.split("-")[0] : "-";
                    callback(false, { top: points, top_type: "points", user_type: "Treehouse Student", bottom: badges, bottom_type: "Completed", date: date });
                }).fail(function() {
                    callback("error");
                });
            }
        },
        
        _html: {
            badgeDisplay: function(badge, data, name) {
                var nameObj = this.nameDisplay(name);
                var html = createHTML(data, nameObj);
                $('.code-badge.' + badge + ' .inner').html(html);
                return html;
            },
            badgeError: function(badge) {
                $('.code-badge.' + badge + ' .inner').html(errorHTML);
                return errorHTML;
            },
            nameDisplay: function(name) {
                if (name.length > 10) {
                    if (name.length > 16) {
                        var shortName = name.slice(0, 13); // truncate
                        return { name: shortName + "...", small: true };
                    } else {
                       return { name: name, small: true }; 
                    }
                } else {
                    return { name: name, small: false };
                }
            }
        },
        
        _validate: {
            checkName: function(name) {
                if (typeof name === 'string' || name instanceof String) {
                    if (name.length < 150) {
                        return name;
                    }
                }
                return false;
            },
            checkBadge: function(badgeName) {
                if (badgeObj[badgeName]) {
                    return badgeName;
                } else {
                    return false;
                }
            }
        },
        
        // BADGE METHODS
        // Any badge
        anyBadge: function(badgeName, newName) {
            // get and validate the name 
            var name = this._validate.checkName(newName) || this.name; // checks valid newName and defaults to original name
            this.lastName = name;
            var badge = this._validate.checkBadge(badgeName);
            this.lastBadge = badge;
            if (badge && name) { // check if badge and name given
                // call api function
                this._get["_" + badge + "API"](name, function(err, data) {
                    // update the inner html of badge with all the info
                    if (!err) {
                        this._html.badgeDisplay(badge, data, name);
                    } else if (err) {
                        this._html.badgeError(badge); // error from api
                    }
                }.bind(this));
            } else {
                this._html.badgeError(badge); // error failed name or badge
            }
            return this; // return this so can chain methods
        },
        
        // Codecademy badge
        codecademy: function(newName) {
            var badge = "codecademy";
            // get the badge
            return this.anyBadge(badge, newName);
        },
        // CodeSchool badge
        codeschool: function(newName) {
            var badge = "codeschool";
            // get the badge
            return this.anyBadge(badge, newName);
        },
        // CodeWars badge
        codewars: function(newName) {
            var badge = "codewars";
            // get the badge
            return this.anyBadge(badge, newName);
        },
        // FreeCodeCamp badge
        freecodecamp: function(newName) {
            var badge = "freecodecamp";
            // get the badge
            return this.anyBadge(badge, newName);
        },
        // GitHub badge
        github: function(newName) {
            var badge = "github";
            // get the badge
            return this.anyBadge(badge, newName);
        },
        // TreeHouse badge
        treehouse: function(newName) {
            var badge = "treehouse";
            // get the badge
            return this.anyBadge(badge, newName);
        }
        
    };
    
    // codeBadges.init function constructor
    codeBadges.init = function(name) {
        if (this._validate.checkName(name)) { // check if name given is a string and not too long
            this.name = name || 'codemzy';
        }
    };
    
    // codeBadges init prototype same as the codeBadges one (both point to the same prototype)
    codeBadges.init.prototype = codeBadges.prototype;
    
    // pass our codeBadges function to the global window object
    global.codeBadges = codeBadges;
    
})(window, jQuery);