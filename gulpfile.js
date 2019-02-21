var gulp          	= require('gulp');
var sass 			= require('gulp-sass');
var browserSync 	= require('browser-sync');
var concat 			= require('gulp-concat');
var uglify 			= require('gulp-uglify');
var cleancss 		= require('gulp-clean-css');
var rename 			= require('gulp-rename');
var autoprefixer 	= require('gulp-autoprefixer');
var notify        	= require('gulp-notify');

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
		.pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('app/js'))
		.pipe(gulp.dest('docs/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('styles', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(gulp.dest('app/css'))
		.pipe(gulp.dest('docs/css'))
		.pipe(browserSync.stream())
});

gulp.task('code', function () {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('docs/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('scripts', 'browser-sync', 'watch'));
