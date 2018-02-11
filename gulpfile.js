const gulp = require('gulp');
const sass = require('gulp-sass');



gulp.task('styles', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['styles']);
});

// SASS Watcher
gulp.task('default', ['watch']);


