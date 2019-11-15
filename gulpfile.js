const { src, dest } = require("gulp");
const mustache = require("gulp-mustache");

exports.default = function() {
  return src("./templates/*.mustache")
    .pipe(mustache({ user: "Park" }, { extension: ".html" }))
    .pipe(dest("./dist"));
};
