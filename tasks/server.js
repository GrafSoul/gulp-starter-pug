// Project: Gulp Starter (Pug version)
// Project URI: https://github.com/GrafSoul/gulp-starter-pug.git
// Version: 1.0
// Tags: gulp, html, css, js, sass
// Description: Gulp Starter - Project builder for web
// Author: Dmitriy Zatulovskiy
// Author URI: https://github.com/GrafSoul , http://networkroom.ru

// =========================================================================
// Server
// =========================================================================

module.exports = function (browserSync, config) {
    return function server(done) {
        browserSync.init({
            server: {
                baseDir: config.output.path,
            },
        });
        done();
    };
};
