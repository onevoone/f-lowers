var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "app/"
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('scripts', function () {
	return gulp.src([
		'app/libs/threejs/three.js',
		'app/libs/threejs/OBJLoader.js',
		'app/libs/threejs/AsciiEffect.js',
		'app/libs/threejs/TrackballControls.js',
		'app/js/common.js', // Always at the end
	])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function () {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('scripts', 'browser-sync', 'watch'));
