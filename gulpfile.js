/**
 * Created by Edward on 3/3/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('build:sass', function () {
    gulp.src('./app/styles/sass/*.*')
        .pipe(sass({OutputStyle: 'compressed'}).on('error', sass.logError()))
        .pipe(gulp.dest('./app/styles/'));
});

gulp.task('default', function () {

});