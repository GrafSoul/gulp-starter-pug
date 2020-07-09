'use strict';

// Project: Gulp Starter (Pug version)
// Project URI: https://github.com/GrafSoul/gulp-starter-pug.git
// Version: 1.0
// Tags: gulp, html, css, js, sass
// Description: Gulp Starter - Project builder for web
// Author: Dmitriy Zatulovskiy
// Author URI: https://github.com/GrafSoul , http://networkroom.ru

// =========================================================================
// Config
// =========================================================================
const config = {
    develop: true,
    zipname: 'project-dist.zip',
    input: {
        js: './source/js/**/*.js',
        sass: './source/sass/main.scss',
        sassfiles: './source/sass/**/*.scss',
        pug: './source/pug/index.pug',
        pugfiles: './source/pug/**/*.pug',
        fonts: './source/fonts/**/*.*',
        video: './source/video/**/*.*',
        images: './source/images/**/*.*',
        pngSprite: './source/images/for_png_sprite/*.*',
        svgSprite: './source/images/for_svg_sprite/',
        sassPngSprite: './source/sass/base',
    },
    output: {
        path: './public',
    },
};

// =========================================================================
// Add Gulp and Gulp plugins
// =========================================================================
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

// =========================================================================
// Errors
// =========================================================================
const errors = (err) => {
    console.log(err);
    this.emit('end');
};

// =========================================================================
// Tasks
// =========================================================================

// Pug
// =========================================================================
const pug = require('./tasks/pug')(gulp, plugins, config, browserSync, errors);

// Fonts
// =========================================================================
const fonts = require('./tasks/fonts')(
    gulp,
    plugins,
    config,
    browserSync,
    errors,
);

// JS
// =========================================================================
const js = require('./tasks/js')(gulp, plugins, config, browserSync, errors);

// SASS
// =========================================================================
const sass = require('./tasks/sass')(
    gulp,
    plugins,
    config,
    browserSync,
    errors,
);

// Images - Minimizing
// =========================================================================
const imageMin = require('./tasks/imagemin')(
    gulp,
    plugins,
    config,
    browserSync,
    errors,
);

// Images - PNG Sprite
// =========================================================================
const pngSprite = require('./tasks/pngsprite')(gulp, plugins, config);

// Images - SVG Sprite
// =========================================================================
const svgSprite = require('./tasks/svgsprite')(gulp, plugins, config);

// Video
// =========================================================================
const video = require('./tasks/video')(
    gulp,
    plugins,
    config,
    browserSync,
    errors,
);

// Zip public
// =========================================================================
const zip = require('./tasks/zip')(gulp, plugins, config, errors);

// Server
// =========================================================================
const server = require('./tasks/server')(browserSync, config);

// Watch
// =========================================================================
function watch_files() {
    gulp.watch(config.input.sassfiles, gulp.series(sass));
    gulp.watch(config.input.pugfiles, gulp.series(pug));
    gulp.watch(config.input.js, gulp.series(js));
    gulp.watch(config.input.fonts, gulp.series(fonts));
    gulp.watch(config.input.images, gulp.series(imageMin));
    gulp.watch(config.input.pngSprite, gulp.series(pngSprite));
    gulp.watch(config.input.svgSprite + '*.*', gulp.series(svgSprite));
    gulp.watch(config.input.video, gulp.series(video));
}

// Watch default
// =========================================================================
gulp.task(
    'default',
    gulp.parallel(
        pug,
        fonts,
        imageMin,
        pngSprite,
        svgSprite,
        video,
        sass,
        js,
        server,
        watch_files,
    ),
);
