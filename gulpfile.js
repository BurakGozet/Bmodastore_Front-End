var gulp = require('gulp'),
concat = require('gulp-concat'),
less = require('gulp-less'),
notify = require('gulp-notify'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
autoprefixer = require('gulp-autoprefixer'),
rename = require("gulp-rename"),
minifycss = require('gulp-minify-css'),
concatcss = require('gulp-concat-css'),
colors = require('colors'),
browserSync = require('browser-sync').create();

var paths = {
  styles: {
    src: ['assets/css/libs/**/*.*','assets/css/less/base.less'],
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
  .pipe(concat(paths.styles.destname))
  .pipe(less())
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(browserSync.stream())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest(paths.styles.dest))
  .on('error', handleError);
  console.log(date().inverse.green + ' Styles task run!'.inverse.yellow);
});

gulp.task('scripts', function() {

});

gulp.task('watch',function () {
  gulp.watch([paths.styles.watch+'**/*.*','!'+paths.styles.watch+paths.styles.destname, '!'+paths.styles.watch+'main.min.css'], ['styles'],browserSync.reload).on('error', handleError);
  gulp.watch(paths.scripts.watch, ['scripts'],browserSync.reload).on('error', handleError);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch','styles','browser-sync']);
