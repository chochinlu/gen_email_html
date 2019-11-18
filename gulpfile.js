const { src, dest, series, parallel } = require("gulp");
const mustache = require("gulp-mustache");
const htmlmin = require("gulp-htmlmin");
const inlineCss = require("gulp-inline-css");
const del = require("del");
const rename = require("gulp-rename");
const inject = require("gulp-inject-string");
const fs = require('fs')

// read command arguments to get paths
const issue = process.argv[4];
const sourceDir = `./src/${issue}`;
const sourceTemplate = `${sourceDir}/*.mustache`;
const target = `./dist/${issue}`;

// get config
const configPath = `${sourceDir}/config.json`
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const {frontString, endString} = config.inject

function hello(done) {
  console.log("hello issue: ", issue);
  console.log("source:　", sourceTemplate);
  console.log("target:　", target);
  done();
}

function clean() {
  return del(["./dist"]);
}

// minified html, and sql
function allLang(done) {
  const tasks = config.langs.map(lang => {
    return () => {
      return src(sourceTemplate)
        .pipe(mustache(`${sourceDir}/${lang}.json`, { extension: ".html" }))
        .pipe(inlineCss({ removeHtmlSelectors: true }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename(`${lang}.html`))
        .pipe(dest(target))
        .pipe(inject.wrap(frontString, endString))
        .pipe(rename(`${lang}.sql`))
        .pipe(dest(target));
    };
  });

  return parallel(...tasks, parallelDone => {
    parallelDone();
    done();
  })();
}

// only sql
function allLangSql(done) {
  const tasks = config.langs.map(lang => {
    return () => {
      return src(sourceTemplate)
        .pipe(mustache(`${sourceDir}/${lang}.json`, { extension: ".html" }))
        .pipe(inlineCss({ removeHtmlSelectors: true }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(inject.wrap(frontString, endString))
        .pipe(rename(`${lang}.sql`))
        .pipe(dest(target));
    };
  });

  return parallel(...tasks, parallelDone => {
    parallelDone();
    done();
  })();
}

const build = series(hello, clean, allLang);

exports.hello = hello;
exports.clean = clean;
exports.htmlcss = htmlcss;
exports.allLangSql = allLangSql;
exports.default = build;
