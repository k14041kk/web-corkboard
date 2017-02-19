var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');

var tsProject = ts.createProject('tsconfig.json', { out: 'app.js',removeComments: true });

gulp.task('compile:ts', function() {
    var tsResult = tsProject.src()
    	.pipe(plumber({
    		errorHandler: function(err) {
    			console.log(err.messageFormatted);
    			this.emit('end');
    		}
    	}))
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('build/js'));

});