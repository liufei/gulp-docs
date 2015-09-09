var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  var files = [
    './_book/**/*',
    'CNAME',
    'googleffad3fb589caded8.html'
  ];

  return gulp.src(files)
    .pipe(ghPages());
});

gulp.task('default', ['deploy']);
