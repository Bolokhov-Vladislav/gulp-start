let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function(){
  del.sync('dist')
});

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('php', function(){
  return gulp.src('app/*.php')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "php.open"
  });

});

gulp.task('export_php', function(){
  return gulp.src('app/partials/**/*.php')
      .pipe(gulp.dest('dist/partials'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('export_js', function(){
  return gulp.src('app/js/**/*.js')
      .pipe(babel())
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('export_fonts', function(){
  return gulp.src('app/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('export_img', function(){
  return gulp.src('app/img/**/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.php', gulp.parallel('php'));
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'php', 'scss', 'export_php',  'export_js', 'export_fonts', 'export_img'));

gulp.task('run', gulp.parallel('css' ,'scss',  'browser-sync', 'watch'));
