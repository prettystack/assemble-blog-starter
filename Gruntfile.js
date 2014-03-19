
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
    config: grunt.file.readYAML('./config.yml'),

    assemble: {
      options: {
        flatten: true,
        data: 'config.yml',
        layoutdir: 'donquiblog/layouts',
        layout: 'default.hbs',
        partials: ['donquiblog/includes/*.hbs', 'donquiblog/pages/partials/*.hbs'],
        helpers: 'donquiblog/helpers/**/*.js',
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
          { '<%= config.site.build %>/': ['donquiblog/pages/*.hbs'] },
          { expand: true, cwd: 'donquiblog/', src: ['posts/*.md'], dest: '<%= config.site.build %>/'}
        ]
      }
    },

    clean: {
      dev: 'dist/',
      tmp: 'dist/tmp/'
    },

    watch: {
      site: {
        files: ['Gruntfile.js', 'donquiblog/**/*.hbs', 'donquiblogpages/**/*.hbs', 'donquiblog/**/*.js', 'donquiblogblog/*.md'],
        tasks: ['assemble']
      },

      assets: {
        files: ['donquiblog/assets/**/*.css', 'donquiblog/assets/**/*.js'],
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
          { flatten: false, expand: true, cwd: 'donquiblog/assets/css', src: '**/*', dest:'<%= config.site.build %>/css/' },
          { flatten: false, expand: true, cwd: 'donquiblog/assets/js', src: '*', dest:'<%= config.site.build %>/js/' },
          { flatten: false, expand: true, cwd: 'donquiblog/assets/images', src:'*', dest:'<%= config.site.build %>/images/' },
          { flatten: false, expand: true, cwd: 'donquiblog/assets/fonts', src:'*', dest:'<%= config.site.build %>/fonts/' }
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
