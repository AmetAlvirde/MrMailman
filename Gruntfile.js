/*jslint node: true, indent: 2,nomen:true */
'use strict';
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg     : grunt.file.readJSON('package.json'),
    jslint  : {
      all     : {
        src : [ 'package.json', 'Gruntfile.js', 'lib/*.js'],
        directives : {
          indent : 2,
          node   : true,
          nomen  : true,
          regexp : true
        }
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
};
