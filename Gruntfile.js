/*
 * grunt-wordpress-auto-versioning
 * https://github.com/kipraske/grunt-wordpress-auto-versioning
 *
 * Copyright (c) 2016 Kristofer Raske
 * Licensed under the GPLv3 license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    wordpress_git_hash_versioning: {
      test_sass_file: {
        options: {
					gitDirectory: 'tmp',
					shortHash: false,
				},
        files: {
          'tmp/test_sass_file': 'test/fixtures/style.scss'
        }
      },
      test_plugin_file: {
				options: {
					gitDirectory: 'tmp',
				},
        files: {
          'tmp/test_plugin_file': 'test/fixtures/plugin.php'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Yeah... this is not going to work for windows
	// TODO - make more robust if someone wants this for windows
	grunt.registerTask('setup_test_git_repo', 'Moves current repo into ./tmp so we can use its history for unit testing', function(){
		var shell = require('child_process');
		grunt.file.mkdir('tmp/.git');
		shell.execSync('cp -r .git/ tmp/.git/');
		shell.execSync('git checkout 008ecb4', {cwd: 'tmp'}); // checkout the initial commit
	});

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'setup_test_git_repo', 'wordpress_git_hash_versioning', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
