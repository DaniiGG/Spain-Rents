const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const sassdoc = require('sassdoc');

function compilar() {
    return gulp.src("scss/styles.scss")
        .pipe(sass())
        .pipe(gulp.dest("up/css/"));
}

function minify_nano(){
    return gulp.src("scss/styles.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix:".nano", extname:".css"}))
    .pipe(gulp.dest("up/css/"));
}

function todo(){
    return gulp.src("scss/styles.scss")
    .pipe(sass())
    .pipe(minify_nano())
    .pipe(rename({
        suffix:".min",
        extname:".css"
    }))
    .pipe(gulp.dest("subir/assets/css/"));
}

function generar_docs() {
    return gulp.src("scss/styles.scss")
        .pipe(sassdoc());
}

function html(){
    return gulp.src(".html")
    .pipe(processhtml())
    .pipe(gulp.dest("app"));
}

exports.compilar = compilar;
exports.generar_docs = generar_docs;
exports.todo = todo;
exports.html = html;
exports.default = gulp.series(compilar, generar_docs, todo, html);
