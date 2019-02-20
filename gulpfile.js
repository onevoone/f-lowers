var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('browser-sync', function () {
	browserSync({
		server: true,
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('scripts', function () {
	return gulp.src([
		'libs/threejs/three.js',
		'libs/threejs/OBJLoader.js',
		'libs/threejs/AsciiEffect.js',
		'libs/threejs/TrackballControls.js',
		'js/common.js', // Always at the end
	])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function () {
	return gulp.src('/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
	gulp.watch(['libs/**/*.js', 'js/common.js'], gulp.parallel('scripts'));
	gulp.watch('index.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('scripts', 'browser-sync', 'watch'));
