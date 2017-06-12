/* global chai, codeBadges */

// example test
var assert = chai.assert;

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0, 'Array length was not 0');
  });
});

// main codeBadges function
describe('codeBadges', function() {
  it('should return an object with the name passed as an argument', function() {
      var result = codeBadges("codemzy");
      assert.equal(result.name, 'codemzy', 'Returned name did not match');
  });
  it('should not add a class which already exists');
});