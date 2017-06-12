/* global chai, codeBadges */

// use assert
var assert = chai.assert;

// MAIN
describe('codeBadges', function() {
  it('should return an object with the name passed as an argument', function() {
      var result = codeBadges("codemzy");
      assert.equal(result.name, 'codemzy', 'Returned name did not match');
  });
  it('test changing names');
});

// VALIDATE
describe('_validate', function() {
    describe('nameLength', function() {
        it('should not change length or class if length 10 or less', function() {
          assert.deepEqual(codeBadges()._validate.nameLength("codemzy"), { name: "codemzy", small: false }, 'Returned obj did not equal expected');
          assert.deepEqual(codeBadges()._validate.nameLength("thisisaTen"), { name: "thisisaTen", small: false }, 'Returned obj did not equal expected');
        });
        it('should add small class if between 10 and 16', function() {
          assert.deepEqual(codeBadges()._validate.nameLength("thisisLonger"), { name: "thisisLonger", small: true }, 'Returned obj did not equal expected');
          assert.deepEqual(codeBadges()._validate.nameLength("thisisLongester"), { name: "thisisLongester", small: true }, 'Returned obj did not equal expected');
        });
    });
});


// API CALLS
describe('_get', function() {
    this.timeout(5000); // allow all get requests 5 seconds to fetch data (increased from standard 2 secs)
    // codecademy
    describe('_codecademyAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._codecademyAPI, 'codecademy api does not exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._codecademyAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned is not an object');
                    assert.typeOf(data.top, 'number', 'data.top is not a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom is not a string');
                    done(); // finished
                });
            });
        });
    });
    // codeschool
    describe('_codeschoolAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._codeschoolAPI, 'codeschool api does not exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._codeschoolAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned is not an object');
                    assert.typeOf(data.top, 'number', 'data.top is not a number');
                    assert.typeOf(data.bottom, 'number', 'data.bottom is not a number');
                    done(); // finished
                });
            });
        });
    });
    // codewars
    describe('_codewarsAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._codewarsAPI, 'codewars api does not exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._codewarsAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned is not an object');
                    assert.typeOf(data.top, 'number', 'data.top is not a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom is not a string');
                    done(); // finished
                });
            });
        });
    });
    // freecodecamp
    describe('_freecodecampAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._freecodecampAPI, 'freecodecamp api does not exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._freecodecampAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned is not an object');
                    assert.typeOf(data.top, 'number', 'data.top is not a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom is not a string');
                    done(); // finished
                });
            });
        });
    });
    // github
    describe('_githubAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._githubAPI, 'github api does not exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._githubAPI("codemzy", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned is not an object');
                    assert.typeOf(data.top, 'number', 'data.top is not a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom is not a string');
                    done(); // finished
                });
            });
        });
    });
    // treehouse
    describe('_treehouseAPI', function() {
        it('should exist', function() {
            assert.exists(codeBadges()._get._treehouseAPI, 'treehouse api does not exist');
        });
        it('should return user data object', function(done) { // added "done" as parameter
            assert.doesNotThrow(function() {
                codeBadges()._get._treehouseAPI("ryancarson", function(err, data) { // pass callback 
                    if (err) return done(err); // handle error
                    assert.isObject(data, 'data returned is not an object');
                    assert.typeOf(data.top, 'number', 'data.top is not a number');
                    assert.typeOf(data.bottom, 'string', 'data.bottom is not a string');
                    done(); // finished
                });
            });
        });
    }); 
    
});