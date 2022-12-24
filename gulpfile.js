import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-clean-css";

const { src, dest, watch, series } = gulp;

//compile scss
const compilescss = () => {
  return src("./src/**/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed",
        sourceMap: true,
      })
    )
    .on("error", console.error.bind(console))
    .pipe(autoprefixer("last 2 version"))
    .pipe(minify())
    .pipe(dest("./src/dest"));
};

//compilecss
const compilecss = () => {
  return src("./src/index.css")
    .pipe(autoprefixer("last 2 version"))
    .pipe(minify())
    .pipe(dest("./src/dest"));
};

//watch for changes
const watchtask = () => {
  watch("/src/**/*.scss", compilescss);
  watch("/src/index.css", compilecss);
};

export default series(compilescss, compilecss, watchtask);
