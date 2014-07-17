var gulp = require('gulp'),
	util = require('gulp-util'),
	kss = require('gulp-kss');



gulp.task('kss-css', function() {
	return gulp.src(['css/master.css'])             //get compiled CSS
		.pipe(rename('style.css'))                    //rename to KSS required nameing convention
		.pipe(gulp.dest('guides/complete/public'));   //move to KSS compile folder
});
 
gulp.task('kss-sprite', function() {
	return gulp.src(['images/sprite/*.png'])
		.pipe(gulp.dest('guides/complete/images/sprite'));  //get sprite and move to KSS compile folder
});
 
gulp.task('kss', ['kss-css', 'kss-sprite'], function(){
	return gulp.src(['sass/**/*.scss'])                 //glob all Sass files
		.pipe(kss({
			overview: __dirname + '/guides/styleguide.md'   //define markdown file
		}))
		.pipe(gulp.dest('guides/complete'));              //define compile folder
});