const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

function html() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
}

function css() {
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
}

function js() {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
}

function clean() {
  return del(['./dist'])
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })

  // first rerun the function that distributed the css files, then reload the browser
  gulp.watch('./src/css/*.scss').on('change', css)
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload)

  // first rerun the function that distributed the javascript files, then reload the browser
  gulp.watch('./src/js/*.js').on('change', js)
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload)
  // first rerun the function that writes to the dist folder, then reload the browser
  gulp.watch('./src/*.html').on('change', html)
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
}

exports.clean = clean
exports.css = css
exports.js = js
exports.html = html
exports.watch = watch
exports.default = gulp.series(clean, html, js, css, watch)
