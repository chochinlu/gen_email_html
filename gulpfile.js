const { src, dest } = require("gulp");
const mustache = require("gulp-mustache");
const htmlmin = require("gulp-htmlmin");
const inlineCss = require("gulp-inline-css");

exports.default = function() {
  return src("./templates/*.mustache")
    .pipe(mustache({ user: "Park" }, { extension: ".html" }))
    .pipe(inlineCss({ removeHtmlSelectors: true }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
};
