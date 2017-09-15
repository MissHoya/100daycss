var gulp = require('gulp')
var autoprefix = require('gulp-autoprefixer')
var sass = require('gulp-sass')

gulp.task('sass', function() {
  return gulp.src('./challenge/*/*.scss')
    .pipe(autoprefix('last 2 versions'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./challenge'))
})

gulp.task('watch', function() {
  gulp.watch('./challenge/*/*.scss', ['sass'])
})

gulp.task('other-sass', function() {
  return gulp.src('./other/*/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(gulp.dest('./other'))
})
gulp.task('other-watch', function() {
  gulp.watch('./other/*/*.scss', ['scss'])
})

gulp.task('default', ['watch', 'sass'])
gulp.task('other', ['other-', 'other-sass'])
