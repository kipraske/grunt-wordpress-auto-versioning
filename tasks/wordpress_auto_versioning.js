/*
 * grunt-wordpress-auto-versioning
 * https://github.com/kipraske/grunt-wordpress-auto-versioning
 *
 * Copyright (c) 2016 Kristofer Raske
 * Licensed under the GPLv3 license.
 */

'use strict';

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('wordpress_auto_versioning', 'Adds the current commit number to the version of a wordpress theme. Useful for development keeping track of which version is on which environment while we are in alpha.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
			gitDirectory: null,
			shortHash: true,
    });

		var revParseExecOptions = {};

		if ( options.gitDirectory ){
			revParseExecOptions.cwd = options.gitDirectory;
		}

		var shortFlag = '';
		if ( options.shortHash ){
			shortFlag = '--short';
		}

		// Get the most recent git commit using the shell
		var currentGitCommit = require('child_process').execSync('git rev-parse ' + shortFlag + ' HEAD', revParseExecOptions).toString().trim();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

			// Let's keep this simple by assuming only one source and one destination
			if ( f.src.length > 1 ) {
				grunt.log.warn('Multiple files detected for this destination. Please use one file for one destination');
				return false;
			}

			var filepath = f.src[0];

			// Warn on and remove invalid source files (if nonull was set).
			if (!grunt.file.exists(filepath)) {
				grunt.log.warn('Source file "' + filepath + '" not found.');
				return false;
			}

			var fileContents = grunt.file.read(filepath);

			// We need to get the first "Version" that is likely in a comment in the file
			// There probably is a "*" at the start of the version line block but not necessarily.
			// Also assuming our version starts with one or more numbers. This helps avoid false positives.
			var wordpressVersionRegex = /^\s*\*?\s*Version:\s*\d+.*$/im;

			// Sanity Check
			var matches = wordpressVersionRegex.exec(fileContents);
			if ( ! matches ) {
				grunt.log.warn( 'Version declaration line not found in ' + filepath );
				return false;
			}

			// TODO - get the actual next git version instead. Use node-git
			//var currentGitCommit = "TEST";
			var currentVersionLine = matches[0];
			var newVersionLine = currentVersionLine + '-' + currentGitCommit;
			var newFileContents = fileContents.replace( wordpressVersionRegex, newVersionLine );

      // Write the destination file.
      grunt.file.write(f.dest, newFileContents);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" written using commit: ' + currentGitCommit);
    });
  });

};
