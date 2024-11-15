const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync");

const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");

const htmlBeautify = require("gulp-html-beautify");
const flatten = require("gulp-flatten");

function compileSass(done) {
  return gulp
    .src("./src/assets/sass/style.scss")
    .pipe(sass().on("error", sass.logError)) // エラーハンドリングを追加
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssSorter()]))
    .pipe(mmq())
    .pipe(cleanCss())
    .pipe(gulp.dest("./public/assets/css/"))
    .on("end", done); // タスク完了を通知
}

function watch() {
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserReload));
  gulp.watch("./src/assets/js/**/*.js", gulp.series(minJS, browserReload));
  gulp.watch("./src/**/*.html", gulp.series(formatHTML, browserReload)); // HTMLファイルの変更を監視
}

function browserInit(done) {
  browserSync.init({
    server: {
      baseDir: "./public/",
    },
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function minJS() {
  return gulp.src("./src/assets/js/**/*.js").pipe(uglify()).pipe(gulp.dest("./public/assets/js/"));
}

function formatHTML() {
  return gulp
    .src("./src/**/*.html")
    .pipe(
      htmlBeautify({
        indent_size: 2,
        indent_with_tabs: true,
      })
    )
    .pipe(flatten()) // フォルダ構造を無視してファイルをフラットにする
    .pipe(gulp.dest("./public"));
}

function copyImage() {
  return (
    gulp
      .src("./src/assets/img/**/*")
      //
      .pipe(gulp.dest("./public/assets/img/"))
  );
}

exports.compileSass = compileSass;
exports.watch = watch;
exports.browserInit = browserInit;
exports.minJS = minJS;
exports.formatHTML = formatHTML;
exports.copyImage = copyImage;
exports.dev = gulp.parallel(browserInit, watch);
exports.build = gulp.parallel(formatHTML, minJS, compileSass, copyImage);
