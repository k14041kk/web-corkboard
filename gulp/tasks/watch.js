var gulp = require('gulp');
var runSequence = require('run-sequence');

var watchTask = ['watch:html','watch:css','watch:ts'];

gulp.task('watch', function (callback) {
	return runSequence(
			'start:server',
			watchTask,
			'watch:bulid',
		    callback
		  );
});


gulp.task('watch:bulid', ['browser:init'], function () {
	console.log("watch start : build/")
    gulp.watch("build/**/*.*", ['browser:reload']);
    
    //gulp.watch("src/*.css", ['browser:reload']);
});