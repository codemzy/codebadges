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
describe('apiData', function() {
    it('should exist', function() {
        chai.expect(codeBadges()._api._codecademyAPI).to.not.be.undefined;
        // var element = { className: '' };
        // addClass(element, 'test-class');
        // assert.equal(element.className, 'test-class');
    });
    
    
    it('codecademyAPI should return user data object', function(done) {
        codeBadges("codemzy").codeSchool().then(function(result) {
            chai.expect(result.codeschool).to.not.be.undefined;
            done();
        });
    });
});