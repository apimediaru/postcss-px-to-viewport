var syntax        = 'scss'; // Syntax: sass or scss;

var gulp        = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require('gulp-notify'),
	rsync         = require('gulp-rsync'),
	postcss 			= require('gulp-postcss'),
	pxtoviewport	= require('postcss-px-to-viewport');

gulp.task('browser-sync', function() {
	browserSync({
		proxy: "api.test",
		host: "192.168.0.136",
		notify: false,
		ghostMode: false
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// ghostMode: false //Disable clicks,scrolls & form inpust on any devices
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {

	var processors = [
		pxtoviewport({
			viewportWidth: 1500,
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			unitToConvert: 'px',
			replace: false,
			mediaQuery: true,
		})
	];
	var processors2 = [
		pxtoviewport({
			viewportWidth: 1500,
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			unitToConvert: 'rem',
			replace: false,
			mediaQuery: true,
			minPixelValue: 0.1,
			api_multiplier: 16,
		})
	];

	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(postcss(processors))
	.pipe(postcss(processors2))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		// Without JQuery dependensies
		'app/js/vendors/swiper.js',
		'app/libs/popper.js/dist/umd/popper.min.js',
		'app/js/vendors/lazyload.min.js',
		'app/libs/underscore/underscore-min.js',
		'app/js/vendors/umd.tooltip.min.js',
		// JQuery dependent
		//'app/libs/jquery/dist/jquery.min.js',
		'app/js/vendors/jquery-3.4.1.min.js',
		'app/js/vendors/util.js',
		'app/js/vendors/tab.js',
		'app/js/vendors/dropdown.js',
		'app/js/vendors/collapse.js',
		'app/js/vendors/jqeury.fancybox_edited.compressed.js',
		'app/js/vendors/jquery.form.js',
		'app/js/vendors/jquery.smartmenus.min.js',
		'app/js/vendors/masonry.pkgd.min.js',
		'app/js/vendors/imagesloaded.pkgd.min.js',
		'app/js/vendors/jquery.countdown.min.js',
		'app/js/vendors/api.tab.slider.js',
		'app/libs/Inputmask/dist/min/jquery.inputmask.bundle.min.js',
		'app/libs/bootstrap-select/dist/js/bootstrap-select.min.js',
		'app/js/common.js', // Always at the end
		'app/js/test.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	//.pipe(uglify()) // Mifify js (opt.)
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

//gulp.task('rsync', function() {
//	return gulp.src('app/**')
//	.pipe(rsync({
//		root: 'app/',
//		hostname: 'username@yousite.com',
//		destination: 'yousite/public_html/',
//		// include: ['*.htaccess'], // Includes files to deploy
//		exclude: ['*Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
//		recursive: true,
//		archive: true,
//		silent: false,
//		compress: true
//	}))
//});

gulp.task('watch', function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['app/libs/**/*.js', 'app/js/common.js', 'app/js/vendors/**/*.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'))
});
gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));