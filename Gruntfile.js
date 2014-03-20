
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

      dev: {
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

    watch: {
      site: {
        files: ['Gruntfile.js', '<%= theme %>/**/*.hbs', 'pages/**/*.hbs', '<%= theme %>/**/*.js', '<%= theme %>/*.md'],
        tasks: ['assemble']
      },

      assets: {
        files: ['<%= theme %>/assets/**/*.css', '<%= theme %>/assets/**/*.js'],
        tasks: ['newer:copy']
      }
    },

    connect: {
      dev: {
        options: {
          port: 8000,
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
      }
    },

    concurrent: {
      dev: {
        tasks: ['connect:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('default', ['clean', 'newer:assemble:dev', 'newer:copy:assets', 'concurrent:dev']);
};
