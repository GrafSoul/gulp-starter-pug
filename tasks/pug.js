// Project: Project Builder
// Project URI: https://bitbucket.org/Xgraf/project-builder
// Version: 1.0
// Tags: gulp, html, php, css, js, pug, less, sass, stylus, postcss, sftp, ftp
// Description: Multi-purpose and configurable projects builder
// Author: Dmitriy Zatulovskiy
// Author URI: https://github.com/Xgraf , http://networkroom.ru

// =========================================================================
// Pug
// =========================================================================

module.exports = function (gulp, plugins, config, browserSync, errors) {
	return function () {
		gulp.src(config.input.pug)
			.pipe(plugins.plumber({errorHandler: errors}))
			.pipe(plugins.pug({pretty: true}))
			.pipe(plugins.htmlhint())
			.pipe(plugins.htmlhint.reporter())
			.pipe(plugins.plumber.stop())
			.pipe(gulp.dest(config.output.path))
			.pipe(plugins.filesize())
			.pipe(browserSync.stream());
	};
};
