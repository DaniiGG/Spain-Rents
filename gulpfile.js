const sass = require("gulp-sass");
const sassdoc = require("sassdoc");
const { src, dest, series } = require("gulp");
const cssnano = require("cssnano");
const rename = require("gulp-rename");

function compilar() {
    return src("scss/styles.scss")
        .pipe(sass())
        .pipe(dest("up/css/"));
}

function minify_nano(){
    return src("scss/styles.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix:".nano", extname:".css"}))
    .pipe(dest("up/css/css"));
}

function todo(){
    return src("scss/styles.scss")
    .pipe(sass())
    .pipe(minify_nano())
    .pipe(rename({
        suffix:".min",
        extname:".css"
    }))
    .pipe(dest("subir/assets/css/"));
}

function generar_docs() {
    return src("scss/styles.scss")
        .pipe(sassdoc());
}

function html(){
    return src(".html")
    .pipe(processhtml())
    .pipe("app")
}

exports.compilar = compilar;
exports.generar_docs = generar_docs;
exports.todo = todo;
exports.html = html;
exports.default = series(compilar, generar_docs, todo, html);
