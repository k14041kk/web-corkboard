var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('browser:init', function(callback) {
	
	browserSync.init({
		port: 5000,
	    ui: {port: 5001},
		proxy: {
			target: 'localhost:6060'
		},
		browser: 'Google Chrome'
    });
	
	callback();

});

gulp.task('browser:reload', function () {
    browserSync.reload();
});