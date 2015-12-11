var gulp        = require('gulp'),
concat          = require('gulp-concat'),
less            = require('gulp-less'),
notify          = require('gulp-notify'),
jshint          = require('gulp-jshint'),
uglify          = require('gulp-uglify'),
autoprefixer    = require('gulp-autoprefixer'),
livereload      = require('gulp-livereload'),
rename          = require("gulp-rename");

var paths = {
  less:{
    src:'assets/css/less/base.less',
    watch:'assets/css/less/**/*.*',
    dest:'assets/css/',
    destname:'main.css'
  },
  scripts:{
    src:'assets/js/*.*',
    watch:'assets/js/**/*.*',
    dest:'assets/js/',
    destname:'scripts.js'
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

gulp.task('less', function() {
  gulp.src(paths.less.src)
  .pipe(less())
  .pipe(rename(paths.less.destname))
  .pipe(gulp.dest(paths.less.dest))
  .pipe(livereload())
  .on('error', handleError);
});

gulp.task('scripts', function() {

});

gulp.task('watch',function () {
  livereload.listen({ basePath: '../', port:'3000', start:true});
  gulp.watch(paths.less.watch, ['less']).on('error', handleError);
  gulp.watch(paths.scripts.watch, ['scripts']).on('error', handleError);
});

gulp.task('default', ['watch']);
