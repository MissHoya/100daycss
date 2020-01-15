const gulp = require('gulp')
const autoprefix = require('gulp-autoprefixer')
const sass = require('gulp-sass')

const extractParam = (argv) => {
  console.log(argv)
  const obj = {}
  for (const i of argv) {
    const splitArr = i.split('=')
    const objKey = splitArr[0].substring(2)
    obj[objKey] = splitArr[1]
  }
  return obj
}
console.log(process.argv)
const params = extractParam(process.argv.slice(3))
console.log(params)

// gulp.task('challenge-sass', function() {
//   var path = './challenge/' + params.folderName + '/*.scss'
//   var outPath = './challenge/' + params.folderName
//   return gulp.src(path)
//     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//     .pipe(autoprefix('last 2 versions'))
//     .pipe(gulp.dest(outPath))
// })
//
// gulp.task('challenge-watch', function() {
//   var path = './challenge/' + params.folderName + '/*.scss'
//   gulp.watch(path, ['challenge-sass'])
// })

function otherWatch() {
  gulp.watch('./other/*/*.scss', otherSass)
}

function otherSass() {
  return gulp.src('./other/*/*.scss')
    .pipe(sass({outputStyle: 'compressed', precision: 3}).on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(gulp.dest('./other/'))
}

// gulp.task('challenge', ['challenge-watch', 'challenge-sass'])
gulp.task('other', gulp.series(otherWatch, otherSass))
