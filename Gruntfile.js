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
    wordpress_auto_versioning: {
      test_sass_file: {
        options: {},
        files: {
          'tmp/test_sass_file': 'test/fixtures/style.scss'
        }
      },
      test_plugin_file: {
        options: {},
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

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'wordpress_auto_versioning', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
