var gulp    	 = require('gulp');

gulp.task('copy:html',function(callback) {
	
	gulp.src( 'src/*.html'  )
	.pipe( gulp.dest( 'build'     ) );
	
	callback();
	
});