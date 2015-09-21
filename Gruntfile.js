/*jslint node: true, indent: 2,nomen:true */
'use strict';
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jslint: {
      all: {
        directives: {
          indent: 2,
          node:   true,
          nomen:  true,
          regexp: true
        },
        exclude: [
          'demo/hola.html'
        ],
        src: [
          'demo/*',
          'Gruntfile.js',
          'package.json',
          'src/*.js',
          'tests/*.js'
        ]
      }
    },
    mochaTest: {
      test: {
        options: {
          captureFile: 'reports/mr-mailman-report.txt',
          quiet:       false,
          reporter:    'spec'
        },
        src: (function () {
          var specificTest = grunt.option('specific-test');

          if (specificTest) {
            return ['test/' + specificTest + '.test.js'];
          }

          return ['tests/*.tests.js'];
        }())
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/mr-mailman.min.js': ['src/mr-mailman.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task(s).
  grunt.registerTask('default', [
    'jslint',
    'mochaTest',
    'uglify'
  ]);

  grunt.registerTask('lint', [
    'jslint'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);



};
