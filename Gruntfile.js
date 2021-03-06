
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
    config: grunt.file.readYAML('./config.yml'),
    theme: 'themes/<%= config.theme %>',

    assemble: {
      options: {
        flatten: true,
        data: 'config.yml',
        layoutdir: '<%= theme %>/layouts',
        layout: 'default.hbs',
        partials: ['<%= theme %>/includes/*.hbs'],
        helpers: 'helpers/**/*.js',
        plugins: ['assemble-contrib-sitemap'],

        sitemap: {
          homepage: '<%= config.site.url %>',
          relativedest: '<%= config.site.build %>',
          changefreq: 'daily'
        },

        collections: [
          {
            name: 'post',
            sortby: 'posted',
            sortorder: 'descending'
          }
        ],
      },

      blogstarter: {
        files: [
          { '<%= config.site.build %>/': ['pages/*.hbs'] },
          { expand: true, src: ['posts/*.md'], dest: '<%= config.site.build %>/'}
        ]
      }
    },

    clean: {
      dev: 'dist/',
      tmp: 'dist/tmp/'
    },

    jshint: {
      all: ['helpers/*.js'],
      options: {
        jshintrc: ".jshintrc",
      }
    },

    watch: {
      site: {
        files: ['config.yml', 'Gruntfile.js', '<%= theme %>/**/*.hbs', 'pages/**/*.hbs', 'posts/**/*.md', '<%= theme %>/**/*.js', '<%= theme %>/*.md'],
        tasks: ['newer:assemble']
      },

      assets: {
        files: ['<%= theme %>/assets/**/*.css', '<%= theme %>/assets/**/*.js'],
        tasks: ['newer:copy']
      },

      js: {
        files: ['helpers/*.js'],
        tasks: ['newer:jshint']
      }
    },

    connect: {
      dev: {
        options: {
          port: 8000,
          base: '<%= config.site.build %>',
          keepalive: true
        }
      },

      prod: {
        options: {
          port: 8001,
          base: '<%= config.site.build %>',
          keepalive: true
        }
      }
    },

    copy: {
      assets: {
        files: [
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/css', src: '**/*', dest:'<%= config.site.build %>/css/' },
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/js', src: '*', dest:'<%= config.site.build %>/js/' },
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/images', src:'*', dest:'<%= config.site.build %>/images/' },
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/fonts', src:'*', dest:'<%= config.site.build %>/fonts/' }
        ]
      },

      prod: {
        files: [
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/css', src: '**/*', dest:'<%= config.site.build %>/tmp/css/' },
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/js', src: '*', dest:'<%= config.site.build %>/tmp/js/' },
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/images', src:'*', dest:'<%= config.site.build %>/images/' },
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/css', src: '**/*.png', dest:'<%= config.site.build %>/css/' },
          { flatten: false, expand: true, cwd: '<%= theme %>/assets/fonts', src:'*', dest:'<%= config.site.build %>/fonts/' }
        ]
      }
    },

    concurrent: {
      dev: {
        tasks: ['connect:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.site.build %>/',
          src: '{,*/}*.html',
          dest: '<%= config.site.build %>/'
        }]
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= config.site.build %>',
        root: '<%= config.site.build %>/tmp'
      },
      html: '<%= config.site.build %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= config.site.build %>'],
      },
      html: ['<%= config.site.build %>/{,*/}*.html'],
      css: ['<%= config.site.build %>/{,*/}*.css']
    },

    imagemin: {
      dist: {
        files: [
        {
          expand: true,
          cwd: '<%= config.site.build %>/',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.site.build %>/'
        }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.site.build %>/',
          src: '{,*/}*.svg',
          dest: '<%= config.site.build %>/'
        }]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= config.site.build %>/{,*/}*.js',
            '<%= config.site.build %>/{,*/}*.css',
            '<%= config.site.build %>/fonts/*',
            '<%= config.site.build %>/images/{,*/}*.{png,jpg,jpeg,svg}',
          '<%= config.site.build %>/css/images/{,*/}*.{png,jpg,jpeg,svg}'
          ]
        }
      }
    }

  });

  grunt.registerTask('default', ['clean', 'newer:assemble', 'newer:copy:assets', 'concurrent:dev']);

  grunt.registerTask('prod', ['clean', 'assemble', 'copy:prod', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'imagemin', 'svgmin', 'rev', 'usemin', 'htmlmin', 'clean:tmp', 'connect:prod']);
};
