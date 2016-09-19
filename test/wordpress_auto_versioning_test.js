'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.wordpress_auto_versioning = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test_sass_file: function(test) {
    test.expect(1);

		var actual = grunt.file.read('tmp/test_sass_file');
		var expected = grunt.file.read('text/expected/test_sass_file');
		test.equal(actual, expected, 'Should replace the version line in the top comments with appended content');

    test.done();
  },
  test_plugin_file: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_plugin_file');
    var expected = grunt.file.read('test/expected/test_plugin_file');
    test.equal(actual, expected, 'Should replace the version line in the top comments with appended content');

    test.done();
  },
};
