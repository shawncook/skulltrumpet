module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: 'public',
          keepalive: false,
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          'public/style.css': 'assets/style.scss'
        }
      }
    },
    uglify: {
      public: { files: {
        'public/script.min.js': 'assets/script.js',
      } }
    },
    watch: {
      css: {
        files: ['assets/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['assets/*.js'],
        tasks: ['uglify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
};