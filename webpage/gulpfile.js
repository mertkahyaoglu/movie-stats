var gulp = require('gulp'),
    connect = require('gulp-connect');

var paths = {
  js: ['./scripts/main.js'],
  css: ['./styles/main.css'],
  html: ['./index.html', './views/*.html']
}

gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src(paths.html)
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 3000,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['connect', 'watch']);
