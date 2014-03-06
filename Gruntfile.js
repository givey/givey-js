module.exports = function(grunt) {

  var files = [
    'vendor/jquery/dist/jquery.js',
    'vendor/rsvp/rsvp.js',
    'src/utils/*.js',
    'src/model.js',
    'src/models/*.js',
    'src/givey.js'
  ];

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: files,
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    watch: {
      files: files,
      tasks: ['build']
    },

    karma: {
      options: {
        frameworks: ['qunit'],
        files: files.concat([
          'node_modules/qunitjs/qunit/qunit.css',
          'test/karma_runner.js',
          'test/helper.js',
          'test/**/*.js'
        ])
      },
      firefox: {
        browsers: ['Firefox'],
        logLevel: 'info'
      },
      ci: {
        browsers: ['PhantomJS'],
        logLevel: 'info',
        singleRun: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('test', ['karma:ci:start']);
  grunt.registerTask('default', ['build']);

}
