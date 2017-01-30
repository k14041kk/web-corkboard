var gulp = require('gulp');

gulp.task('watch:css', function (callback) {
	
    gulp.watch("src/**/*.css", ['copy:css']);
    
	callback();
    //gulp.watch("src/*.css", ['browser:reload']);
});