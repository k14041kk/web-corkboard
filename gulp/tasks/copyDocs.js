var gulp    	 = require('gulp');

gulp.task('copy:docs',function(callback) {
	
	gulp.src( 'build/**'  )
	.pipe( gulp.dest( 'docs'     ) );
	
	callback();
	
});