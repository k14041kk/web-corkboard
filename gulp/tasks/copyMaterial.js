var gulp    	 = require('gulp');

gulp.task('copy:material',function(callback) {
	
	gulp.src( 'node_modules/material-design-lite/material.min.css'  )
	.pipe( gulp.dest( 'build/css'     ) );
    gulp.src( 'node_modules/material-design-lite/material.min.js'  )
    .pipe( gulp.dest( 'build/js' ) );
	
	callback();
	
});