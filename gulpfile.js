const { src, dest, series } = require("gulp");
const mustache = require("gulp-mustache");
const htmlmin = require("gulp-htmlmin");
const inlineCss = require("gulp-inline-css");
const del = require("del");

function clean() {
  return del(["./dist"]);
}

function htmlcss() {
  return src("./templates/*.mustache")
    .pipe(mustache({ user: "Park" }, { extension: ".html" }))
    .pipe(inlineCss({ removeHtmlSelectors: true }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
}

const build = series(clean, htmlcss);

exports.clean = clean;
exports.htmlcss = htmlcss;
exports.default = build;
