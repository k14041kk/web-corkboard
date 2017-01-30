var gulp = require('gulp');
var spawn = require('child_process').spawn;
var colors = require('colors');
var server;

gulp.task('start:server', function(callback) {

	if (server) {
		// サーバーを終了
		server.kill('SIGKILL');
	}
	// サーバーを起動
	server = spawn('npm', [ 'start' ]);
	
	var call = false;

	server.stdout.on('data', function(data) {
		if(!call){
			call= true
			callback();
		}
		console.log('[Server]'.blue+'stdout: ' + data);
	});

	server.stderr.on('data', function(data) {
		console.log('[Server]'.blue+'stderr: ' + data);
	});

	server.on('exit', function(code) {
		if(!call){
			call= true
			callback();
		}
		console.log('[Server]'.blue+'child process exited with code ' + code);
	});

	//callback();

});