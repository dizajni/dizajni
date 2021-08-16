const gulp = require('gulp');
const sass = require('gulp-sass');
const watchSass = require("gulp-watch-sass");
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
var local = require('./gulpfile_local');

//compile scss into css
function style() {
  return gulp.src('./scss/dizajni.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      noCache: true,
      outputStyle: "expanded",
      lineNumbers: false,
      loadPath: './css/*',
      sourceMap: true
    }))
    .on('error', sass.logError)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream())
}

//watch task
function watch() {
  browserSync.init({
    proxy: local.hostname,
    hostname: local.hostname,
    port: 3000, //even if apache is running on 80 or something else
  });
  gulp.watch(['scss/**/*.scss'], style);
  gulp.watch('./*.html').on('change',browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

//export funtions
exports.style = style;
exports.watch = watch;
