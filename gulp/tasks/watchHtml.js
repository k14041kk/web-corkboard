var gulp = require('gulp');

gulp.task('watch:html', function (callback) {
	
    gulp.watch("src/index.html", ['copy:html']);
    
	callback();
    //gulp.watch("src/*.css", ['browser:reload']);
});