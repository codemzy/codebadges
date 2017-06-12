/* global chai, codeBadges */

// example test
var assert = chai.assert;

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0, 'Array length was not 0');
  });
});

// MAIN
describe('codeBadges', function() {
  it('should return an object with the name passed as an argument', function() {
      var result = codeBadges("codemzy");
      assert.equal(result.name, 'codemzy', 'Returned name did not match');
  });
  it('test changing names');
});

// API CALLS
describe('_get', function() {
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
                    done(); // call "done()" the parameter
                });
            });
        });
    });
    // codecademy
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
                    assert.typeOf(data.bottom, 'number', 'data.bottom is not a string');
                    done(); // call "done()" the parameter
                });
            });
        });
    });
    
});