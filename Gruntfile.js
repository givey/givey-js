module.exports = function(grunt) {

  var files = [
    'vendor/jquery/dist/jquery.js',
    'vendor/rsvp/rsvp.js',
    'src/utils/*.js',
    'src/givey.js',
    'src/model.js',
    'src/models/*.js'
  ];
  var backboneFiles = [
    'src/adapters/backbone/adapter.js',
    'src/adapters/backbone/models/*.js'
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
      },
      backbone: {
        src: backboneFiles,
        dest: 'dist/<%= pkg.name %>-backbone.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
          'dist/<%= pkg.name %>-backbone.min.js': ['<%= concat.backbone.dest %>']
        }
      }
    },

    watch: {
      files: files + backboneFiles,
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
