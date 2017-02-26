var gulp = require('gulp');

gulp.task('copy:dexie',function(callback) {
    
    gulp.src( 'node_modules/dexie/dist/dexie.js'  )
    .pipe( gulp.dest( 'build/js' ) );
    
    callback();
    
});