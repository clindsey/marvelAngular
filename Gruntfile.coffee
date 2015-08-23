module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

  grunt.initConfig
    tusk_coffee:
      vendor:
        options:
          wrap: null
          runtime: false
        files:
          'public/javascripts/vendor.js': [
            'vendor/javascripts/common.js'
            'vendor/javascripts/underscore.js'
            'vendor/javascripts/jquery.js'
            'vendor/javascripts/angular.js'
            'vendor/javascripts/angular-animate.js'
            'vendor/javascripts/angular-resource.js'
            'vendor/javascripts/angular-route.js'
            'vendor/javascripts/ui-bootstrap-tpls.js'
          ]
      app:
        options:
          wrap: 'CommonJS'
          modulesRoot: 'app'
          runtime: false
        files:
          'public/javascripts/app.js': ['app/**/*.coffee']

    less:
      dist:
        options:
          paths: ['stylesheets']
          #strictMath: true
        files:
          'public/stylesheets/app.css': ['app/stylesheets/base.less']
      minify:
        options:
          cleancss: true
          report: 'min'
        files:
          'public/stylesheets/app.min.css': 'public/stylesheets/app.css'

    cssmin:
      combine:
        files:
          'public/stylesheets/vendor.css': ['vendor/stylesheets/*.css']

    html2js:
      options:
        base: 'app'
      main:
        src: ['app/templates/**/*.html']
        dest: 'public/raw-javascripts/templates.js'

    coffee:
      app:
        options:
          bare: true
        expand: true
        flatten: false
        cwd: 'app/'
        src: ['**/*.coffee']
        dest: 'public/raw-javascripts/'
        ext: '.js'

    commonjs:
      modules:
        cwd: 'public/raw-javascripts/'
        src: ['**/*.js']
        dest: 'public/javascripts/'

    clean:
      build: [
        'public'
      ]

    copy:
      main:
        files: [
          {expand: true, cwd: 'app/assets/', src: ['**'], dest: 'public'}
          {expand: true, cwd: 'vendor/fonts', src: ['**'], dest: 'public/fonts'}
          {expand: true, cwd: 'vendor/images', src: ['**'], dest: 'public/images'}
        ]

    concat:
      javascripts:
        src: [
          'public/javascripts/vendor.js'
          'public/javascripts/app.js'
          'public/javascripts/templates.js'
        ]
        dest: 'public/javascripts/index.js'
      stylesheets:
        src: [
          'public/stylesheets/vendor.css'
          'public/stylesheets/app.min.css'
        ]
        dest: 'public/stylesheets/index.min.css'

    uglify:
      main:
        files:
          'public/javascripts/index.js': ['public/javascripts/index.js']

    watch:
      options:
        nospawn: true
      livereload:
        files: [
          'app/**/*.hbs'
          'app/**/*.html'
          'app/**/*.coffee'
          'app/**/*.less'
        ]
        tasks: ['build']

  grunt.registerTask 'live', ['build', 'watch']
  grunt.registerTask 'deploy', ['build', 'uglify']
  grunt.registerTask 'build', [
    'clean:build'
    'coffee'
    'html2js'
    'commonjs'
    'tusk_coffee'
    'less:dist'
    'less:minify'
    'cssmin'
    'copy:main'
    'concat'
  ]
