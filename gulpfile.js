/**
 * Created by Edward on 3/3/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

//build sass
gulp.task('build:sass', function () {
    gulp.src('./app/styles/sass/site.scss')
        .pipe(sass({'outputStyle':'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./app/dist/'));
});
//build scripts
gulp.task('build:scripts', function() {
    gulp.src('./app/scripts/**/*.js')
        .pipe(concat('app.js'))
        //.pipe(uglify())
        //.pipe(rename('app.min.js'))
        .pipe(gulp.dest('./app/dist'));
});
//clean files
gulp.task('clean', function (){
   return del('./app/dist/*.*')
});
gulp.task('watch', ['clean', 'watch:sass', 'watch:scripts']);
//watch sass
gulp.task('watch:sass', function () {
    gulp.watch('./app/styles/sass/**/*.scss', ['build:sass']);
});
//watch js
gulp.task('watch:scripts', function(){
   gulp.watch('./app/scripts/**/*.js', ['build:scripts']);
});

gulp.task('default', ['build:sass', 'build:scripts','watch']);