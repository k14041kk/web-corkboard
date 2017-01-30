var gulp 	   = require('gulp');
var requireDir = require('require-dir');
var dir        = requireDir('./gulp/tasks', {recurse: true});

gulp.task('default', function(){ 
  console.log('Hello World'); 
}); 
