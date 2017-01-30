var gulp    	 = require('gulp');

gulp.task('copy:css',function(callback) {
	
	gulp.src( 'src/*.css'  )
	.pipe( gulp.dest( 'build/css'     ) );
	
	callback();
	
});