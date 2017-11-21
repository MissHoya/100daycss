const gulp = require('gulp')
const autoprefix = require('gulp-autoprefixer')
const sass = require('gulp-sass')

const extractParam = (argv) => {
  const obj = {}
  for (const i of argv) {
    const splitArr = i.split('=')
    const objKey = splitArr[0].substring(2)
    obj[objKey] = splitArr[1]
  }
  return obj
}

const params = extractParam(process.argv.slice(3))

gulp.task('challenge-sass', function() {
  var path = './challenge/' + params.folderName + '/*.scss'
  var outPath = './challenge/' + params.folderName
  return gulp.src(path)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(gulp.dest(outPath))
})

gulp.task('challenge-watch', function() {
  var path = './challenge/' + params.folderName + '/*.scss'
  gulp.watch(path, ['challenge-sass'])
})

gulp.task('other-sass', function() {
  return gulp.src('./other/*/*.scss')
    .pipe(sass({outputStyle: 'compressed', precision: 3}).on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(gulp.dest('./other'))
})
gulp.task('other-watch', function() {
  gulp.watch('./other/*/*.scss', ['other-sass'])
})

gulp.task('challenge', ['challenge-watch', 'challenge-sass'])
gulp.task('other', ['other-watch', 'other-sass'])
