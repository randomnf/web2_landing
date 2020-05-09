"use strict";

const gulp = require("gulp");
const fileinclude = require('gulp-file-include');
const sass = require("gulp-sass");
const imgResizer = require("gulp-image-resize");
const bs = require("browser-sync").create();

const { src, dest, watch, series, parallel } = gulp;

module.exports.default = series(html, css, js, imgmin, parallel(watchFiles, browserSync));

const SRC_GLOBS = {
    htmlIndex: "./src/html/index.html",
    html: "./src/html/**/*.html",
    scss: "./src/scss/styles.scss",
    js: "./src/js/*.js",
    img: "./src/img/*.{jpg,png}",
};
const DEST_GLOBS = {
    html: "./build/",
    css: "./build/css/",
    js: "./build/js/",
    img: "./build/images/",
};

function html() {
    return src(SRC_GLOBS.htmlIndex)
        .pipe( fileinclude() )
        .pipe( dest(DEST_GLOBS.html) );
}

function htmlMin() {
    return html()
        .pipe();
}

function css() {
    return src(SRC_GLOBS.scss)
        .pipe( sass({
            outputStyle: "expanded",
        }) )
        .pipe( dest(DEST_GLOBS.css) );
}

function js() {
    return src(SRC_GLOBS.js)
        .pipe( dest(DEST_GLOBS.js) );
}

function imgmin() {
    return src(SRC_GLOBS.img)
        .pipe( imgResizer() )
        .pipe( dest(DEST_GLOBS.img) );
}

function watchFiles() {
    watch(SRC_GLOBS.html, html);
    watch(SRC_GLOBS.scss, css);
    watch(SRC_GLOBS.js, js);
    watch(SRC_GLOBS.img, imgmin);
}

function browserSync() {
    bs.init({
        watch: true,
        server: {
            baseDir: "build",
            index: "index.html"
        },
        notify: false,
        ui: false,
    });
}