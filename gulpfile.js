var gulp = require('gulp'),
	util = require('gulp-util'),
	kss = require('gulp-kss'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	newer = require('gulp-newer'),
	include = require('gulp-include'),
	prettify = require('gulp-prettify'),
  compass = require('gulp-compass'),
  cssmin = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  clean = require('gulp-clean');

var paths = {
  js: ['js/*.js', '!js/libs/*'],
  js_dest: 'js/min',
  images: 'images/site/*',
  image_dest: 'images/site-min',
  html: 'html/pages/*.html',
  html_dest: ['html/dev', 'html/prod'],
  sass: 'sass/master.scss',
  sass_dest: 'css'
};


gulp.task('css', function() {
    return gulp.src(paths.sass)
        .pipe(compass({
            config_file: './config.rb',
            sass: 'sass',
            css: paths.sass_dest
        }))
        .pipe(gulp.dest(paths.sass_dest))
        .pipe(cssmin())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(paths.sass_dest))
})

// Minify and copy all JavaScript (except vendor scripts)
gulp.task('scripts-min', ['clean'], function() {
	return gulp.src(paths.scripts)
        .pipe(newer(paths.js_dest))
    	.pipe(jshint())
        .pipe(uglify())
    	.pipe(rename(function (path) {
    		path.basename += ".min";
    	}))
    	.pipe(gulp.dest(paths.js_dest));
});

// Compress all site images (not icons)
gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(newer(paths.image_dest))
		.pipe(imagemin({
            progressive: true,
            optimizationLevel: 3,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(image_dest))
});

// Compile HTML from partials into dev/prod folders
gulp.task('html', function() {
	return gulp.src(paths.html)
		.pipe(include())
		.pipe(prettify({indentSize: 2}))
		.pipe(gulp.dest('html/dev'))
});

gulp.task('clean', function() {
  return gulp.src([paths.js_dest, paths.sass_dest], {read: false})
    .pipe(clean());
});


//Compile auto generated styleguides using node KSS
gulp.task('kss-css', function() {
	return gulp.src(['css/master.css'])             //get compiled CSS
		.pipe(rename('style.css'))                    //rename to KSS required nameing convention
		.pipe(gulp.dest('guides/complete/public'))   //move to KSS compile folder
});
 
gulp.task('kss-sprite', function() {
	return gulp.src(['images/sprite/*.png'])
		.pipe(gulp.dest('guides/complete/images/sprite'))  //get sprite and move to KSS compile folder
});
 
gulp.task('kss', ['kss-css', 'kss-sprite'], function(){
	return gulp.src(['sass/**/*.scss'])                 //glob all Sass files
		.pipe(kss({
			overview: __dirname + '/guides/styleguide.md'   //define markdown file
		}))
		.pipe(gulp.dest('guides/complete'))              //define compile folder
});



// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch('sass/**/*.scss', ['css']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(['html/partials/*', 'html/pages/*'], ['html']);
});