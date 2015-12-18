var gulp = require('gulp'),
less = require('gulp-less'),
notify = require('gulp-notify'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

var paths = {
  styles: {
    src: ['assets/css/less/base.less'],
    watch: 'assets/css/',
    dest:'assets/css/',
    destname:'main.css'
  },
  scripts:{
    src: 'assets/js/*.*',
    watch: 'assets/js/**/*.*',
    dest: 'assets/js/',
    destname: 'scripts.js'
  }
};

var handleError = function() {
 var args = Array.prototype.slice.call(arguments);
 notify.onError({
  title: "Compile Error",
  message: "<%= error.message %>"
}).apply(this, args);
 this.emit('end');
};

function date(){
  return '['+new Date().toISOString().
  replace(/T/, ' ').
  replace(/\..+/, '')+'] ';
}

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      proxy: "localhost:80"
    },
    ui: {
      port: 80
    }
  });
});

gulp.task('styles', function() {
  gulp.src(paths.styles.src)
  .pipe(less().on('error', handleError))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(browserSync.stream())
  .on('error', handleError);
  console.log(date() + ' Styles task run!');
});

gulp.task('scripts', function() {

});

gulp.task('watch',function () {
  gulp.watch([paths.styles.watch+'**/*.*','!'+paths.styles.watch+paths.styles.destname], ['styles'],browserSync.reload).on('error', handleError);
  gulp.watch(paths.scripts.watch, ['scripts'],browserSync.reload).on('error', handleError);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch','styles','browser-sync']);
