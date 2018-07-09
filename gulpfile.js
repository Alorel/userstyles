process.chdir(__dirname);
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rmrf = require('rimraf');

const src = './src/**/*.scss';

gulp.task('clean', cb => {
  rmrf('./dist', cb);
});

gulp.task('build', ['clean'], () => {
  return gulp.src(src)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 1000 versions']
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['build'], () => gulp.watch(src, ['build']));

