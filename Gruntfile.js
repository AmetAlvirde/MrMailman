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
          'demo/hola.md'
        ],
        src: [
          'package.json',
          'Gruntfile.js',
          'demo/*',
          'src/*.js'
        ]
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

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', [
    'jslint',
    'uglify'
  ]);

  grunt.registerTask('lint', [
    'jslint'
  ]);




};
