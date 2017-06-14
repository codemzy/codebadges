/* global chai, codeBadges */

// use assert
var assert = chai.assert;

// MAIN
describe('codeBadges', function() {
    it('should return an object with the name passed as an argument', function() {
      var result = codeBadges("codemzy");
      assert.equal(result.name, 'codemzy', 'Returned name should match');
    });
    it('should only accept strings as names', function() {
      var resultOne = codeBadges(123);
      var resultTwo = codeBadges({ an: 'object' });
      assert.equal(resultOne.name, undefined, 'Returned name should be undefined');
      assert.equal(resultTwo.name, undefined, 'Returned name should be undefined');
    });
    describe('anyBadge', function() {
        it('should exist', function() {
          assert.exists(codeBadges().anyBadge, 'anyBadge should exist');
        });
        it('should change a valid name', function() {
            var resultOne = codeBadges("codemzy").anyBadge(false, "aNewName");
            var resultTwo = codeBadges("codemzy").anyBadge(false, { an: 'object' });
            assert.equal(resultOne.lastName, "aNewName", 'Returned name should match');
            assert.equal(resultTwo.lastName, "codemzy", 'Returned name should be default as newName invalid');
        });
    });
});

// HTML
describe('_html', function() {
    describe('badgeDisplay', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._html.badgeDisplay, 'badgeDisplay should exist');
        });
        it('should return a html string', function() {
            var data = { top: 123, top_type: "points", user_type: "Test Student", bottom: "123", bottom_type: "Completed", date: "2015" };
            var expected = '<div class="margin-top big">' + 123 + '</div><div class="small">' + "points" + '</div>' +
                    '<div id="user" class="' + "" + '">' + "codemzy" + '</div><div class="small">' + "Test Student" + '</div>' +
                    '<div class="small margin-top">' + "Completed" + '</div><div><span>' + "123" + '</span></div>' +
                    '<div class="small">since <span id="date">' + "2015" + '</span></div>';
            assert.equal(codeBadges()._html.badgeDisplay("none", data, "codemzy"), expected, 'Returned html string should match');
        });
    });
    describe('badgeError', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._html.badgeError, 'badgeError function should exist');
        });
        it('should return an error html string', function() {
            var expected = '<div class="margin-top big">-</div><div class="small">-</div><div id="user">User</div><div class="small">Not Found</div>';
            assert.equal(codeBadges()._html.badgeError(), expected, 'Returned error html string should match');
        });
    });
    describe('nameDisplay', function() {
        it('should not change length or class if length 10 or less', function() {
            assert.deepEqual(codeBadges()._html.nameDisplay("codemzy"), { name: "codemzy", small: false }, 'First returned obj should equal expected');
            assert.deepEqual(codeBadges()._html.nameDisplay("thisisaTen"), { name: "thisisaTen", small: false }, 'Second returned obj should equal expected');
        });
        it('should add small class if between 10 and 16', function() {
            assert.deepEqual(codeBadges()._html.nameDisplay("thisisLonger"), { name: "thisisLonger", small: true }, 'First returned obj should equal expected');
            assert.deepEqual(codeBadges()._html.nameDisplay("thisisLongester"), { name: "thisisLongester", small: true }, 'Second returned obj should equal expected');
        });
        it('should truncate name if over 16', function() {
            assert.deepEqual(codeBadges()._html.nameDisplay("thisisTooooooLong"), { name: "thisisToooooo...", small: true }, 'First returned obj should equal expected');
            assert.deepEqual(codeBadges()._html.nameDisplay("thisisSooooooooooooooLong"), { name: "thisisSoooooo...", small: true }, 'Second returned should not equal expected');
        });
    });
});

// VALIDATE
describe('_validate', function() {
    describe('checkName', function() {
        it('should return name if below 150', function() {
            assert.isNotFalse(codeBadges()._validate.checkName("codemzy"), 'Should not return false');
            assert.equal(codeBadges()._validate.checkName("codemzy"), 'codemzy', 'Should return name');
            assert.isNotFalse(codeBadges()._validate.checkName("averyveryveryveryveryveryveryveryveryveryverylongname"), 'Should not return false');
        });
        it('should be false if name over 150', function() {
            var name = "averyveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylongnametoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooolong";
            assert.isFalse(codeBadges()._validate.checkName(name), 'Name too long should be false');
        });
        it('should be false not a string', function() {
            assert.isFalse(codeBadges()._validate.checkName({ name: "notright" }), 'An object not a string should be false');
            assert.isFalse(codeBadges()._validate.checkName(1234), 'A number not a string should be false');
        });
    });
});


// API CALLS
describe('_get', function() {
    this.timeout(5000); // allow all get requests 5 seconds to fetch data (increased from standard 2 secs)
    // codecademy
    describe('_codecademyAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._codecademyAPI, 'codecademy api should exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._codecademyAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned should be an object');
                    assert.typeOf(data.top, 'number', 'data.top should be a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom should be a string');
                    done(); // finished
                });
            });
        });
    });
    // codeschool
    describe('_codeschoolAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._codeschoolAPI, 'codeschool api should exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._codeschoolAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned should be an object');
                    assert.typeOf(data.top, 'number', 'data.top should be a number');
                    assert.typeOf(data.bottom, 'number', 'data.bottom should be a number');
                    done(); // finished
                });
            });
        });
    });
    // codewars
    describe('_codewarsAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._codewarsAPI, 'codewars api should exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._codewarsAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned should be an object');
                    assert.typeOf(data.top, 'number', 'data.top should be a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom should be a string');
                    done(); // finished
                });
            });
        });
    });
    // freecodecamp
    describe('_freecodecampAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._freecodecampAPI, 'freecodecamp api should exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._freecodecampAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned should be an object');
                    assert.typeOf(data.top, 'number', 'data.top should be a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom should be a string');
                    done(); // finished
                });
            });
        });
    });
    // github
    describe('_githubAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._githubAPI, 'github api should exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._githubAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned should be an object');
                    assert.typeOf(data.top, 'number', 'data.top should be a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom should be a string');
                    done(); // finished
                });
            });
        });
    });
    // treehouse
    describe('_treehouseAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._treehouseAPI, 'treehouse api should exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._treehouseAPI("ryancarson", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned should be an object');
                    assert.typeOf(data.top, 'number', 'data.top should be a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom should be a string');
                    done(); // finished
                });
            });
        });
    }); 
    
});