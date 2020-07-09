// Project: Gulp Starter (Pug version)
// Project URI: https://github.com/GrafSoul/gulp-starter-pug.git
// Version: 1.0
// Tags: gulp, html, css, js, sass
// Description: Gulp Starter - Project builder for web
// Author: Dmitriy Zatulovskiy
// Author URI: https://github.com/GrafSoul , http://networkroom.ru

// =========================================================================
// Pug
// =========================================================================

module.exports = function (gulp, plugins, config, browserSync, errors) {
    return function pug(done) {
        gulp.src(config.input.pug)
            .pipe(plugins.plumber({ errorHandler: errors }))
            .pipe(plugins.pug({ pretty: true }))
            .pipe(plugins.htmlhint())
            .pipe(plugins.htmlhint.reporter())
            .pipe(plugins.plumber.stop())
            .pipe(gulp.dest(config.output.path))
            .pipe(plugins.filesize())
            .pipe(browserSync.stream());
        done();
    };
};
