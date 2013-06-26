module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      all: {
        files: {
          'build/index.html': ['index.jade']
        }
      }
    },
    stylus: {
      all: {
        files: {
          'build/style.css': ['style.styl']
        }
      }
    },
    watch: {
      app: {
        files: 'script.js',
        tasks: ['jshint:app','uglify:app']
      }
    },
    uglify: {
      app: {
        files: {
          'build/script.min.js': ['script.js']
        }
      },
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    },
    jshint: {
      all: ['**.js'], //lint all js files in the project
      app: 'script.js',
      options: {
        //ENVIRONMENT GLOBALS
        browser: true,
        jquery: true,
        devel: true,
        worker: true, //web Workers

        //OTHER OPTIONS
        curly: true,  //always put curly braces, even around single line if's
        indent:2,     //2 space per tab default
        undef: true,  //catch accidental typos (undefined global vars)
        unused:true,  //catch unused vars
        strict: true  //use strict mode
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('compile', ['jade:all','stylus:all']);
  grunt.registerTask('default', ['compile','jshint:app','uglify:app']);
};