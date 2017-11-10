const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const zip = require('gulp-zip');

fs.unlinkSync(path.join('./', 'lambda.zip'));

gulp.task('default', ['pack']);

gulp.task('pack', function() {
  return gulp.src(path.join('./', '/**/*'))
    .pipe(zip('lambda.zip'))
    .pipe(gulp.dest('./'));
});