const { series, parallel, watch, src, dest } = require("gulp");
const plumber = require("gulp-plumber");
const del = require("del");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");

function html() {
  return src("./src/*.html").pipe(dest("./dist"));
}

function css() {
  return src("./src/css/style.scss")
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/css"));
}

function js() {
  return src("./src/js/*.js")
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["@babel/env"],
        plugins: ["@babel/transform-runtime"],
      })
    )
    .pipe(concat("main.js"))
    .pipe(dest("./dist/js"));
}

function clean() {
  return del(["./dist"]);
}

function watchFor() {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  });

  // first rerun the function that distributed the css files, then reload the browser
  watch("./src/css/**/*.scss").on("change", css);
  watch("./dist/css/*.css").on("change", browserSync.reload);

  // first rerun the function that distributed the javascript files, then reload the browser
  watch("./src/js/*.js").on("change", js);
  watch("./dist/js/*.js").on("change", browserSync.reload);

  // first rerun the function that writes to the dist folder, then reload the browser
  watch("./src/*.html").on("change", html);
  watch("./dist/*.html").on("change", browserSync.reload);
}

exports.clean = clean;
exports.css = css;
exports.js = js;
exports.html = html;
exports.watch = watch;
exports.default = series(clean, parallel(html, js, css), watchFor);
