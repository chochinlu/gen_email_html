const { src, dest, series } = require("gulp");
const mustache = require("gulp-mustache");
const htmlmin = require("gulp-htmlmin");
const inlineCss = require("gulp-inline-css");
const del = require("del");

const issue = process.argv[4];
const sourceDir = `./src/${issue}`;
const sourceTemplate = `${sourceDir}/*.mustache`;
const jsonEn = `${sourceDir}/en.json`;
const target = `./dist/${issue}`;

function hello(done) {
  console.log("hello issue: ", issue);
  console.log("source:　", sourceTemplate);
  console.log('en json: ', jsonEn)
  console.log("target:　", target);
  done();
}

function clean() {
  return del(["./dist"]);
}

function htmlcss() {
  return src(sourceTemplate)
    .pipe(mustache(jsonEn, { extension: ".html" }))
    .pipe(inlineCss({ removeHtmlSelectors: true }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(target));
}

const build = series(hello, clean, htmlcss);

exports.hello = hello;
exports.clean = clean;
exports.htmlcss = htmlcss;
exports.default = build;
