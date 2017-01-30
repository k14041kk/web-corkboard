var gulp = require('gulp');

gulp.task('watch:ts', function (callback) {
	
    gulp.watch("src/**/*.ts", ['compile:ts']);
    
	callback();
});