var gulp = require('gulp'),
  concat = require('gulp-concat'),
  ngAnnotate = require('gulp-ng-annotate'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  moment = require('moment'),
  notify = require('gulp-notify'),
  sass = require('gulp-sass'),
  cleanCss = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  nodemon = require('gulp-nodemon'),
  useref = require('gulp-useref'),
  jshint = require('gulp-jshint'),
  gulpIf = require('gulp-if'),
  watch = require('gulp-watch'),
  sourcemaps = require('gulp-sourcemaps'),
  rimraf = require('rimraf'),
  babel = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps'),
  prettify = require('gulp-jsbeautifier'),
  port = 8080,
  runSequence = require('run-sequence');

require('events').EventEmitter.defaultMaxListeners = 0;

var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 8',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('css', function (cb) {
  return gulp.src('app/style/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('./app/css'))
    .pipe(notify({ message: 'Compiled file: <%= file.relative %>' }, cb));
});
gulp.task('babel', function() {
  return gulp.src("app/**/*.jsx")
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015', 'react']
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./app"));
})  

gulp.task('watch', function () {
  gulp.watch(['app/**/*.js', 'app/**/*.jsx', 'app/**/*.css'], ['babel', 'css'])
  nodemon({
    env: {
      PORT: port,
      ENVIRONMENT: 'dev'
    }
  })
})

gulp.task('copy-sample-data', function () {
  return gulp.src(['./app/sample-data-tesco.csv'])
  .pipe(gulp.dest('./dist'));
});


gulp.task('useref', function () {
  return gulp.src('./app/*.html')
    .pipe(useref({ searchPath: './app' }))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCss({compatibility: 'ie8'})))
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Compiled to \'./dist\'' }))
});

gulp.task('build', function (callback) {
  return runSequence(['babel', 'css'], 'useref', 'copy-sample-data', callback); 
});
