const gulp = require('gulp');
const sass = require('gulp-sass'); //Подключаем Sass пакет
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

const distDirectory = 'dist';
const htmlBlob = 'src/*.html';
const jsBlob = 'src/*.js';
const imagesBlob = 'src/img/**';
const fontsBlob = 'src/fonts/**';
const stylesBlob = 'src/css/**';
const sassBlob = 'src/sass/**';
const normalizeBlob = 'src/css/**';



gulp.task('default', function () {
  return runSequence('build', 'serve');
});

gulp.task('build', function () {
  return runSequence(
    'cleanDist',
    ['processStyles', 'processHtml', 'processImages', 'processFonts', 'processNormalize', 'processJs']
  );
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: distDirectory
    }
  });

  gulp.watch(htmlBlob, function () {
    return runSequence('processHtml', 'reloadBrowser');
  });

  gulp.watch(jsBlob, function () {
    return runSequence('processJs', 'reloadBrowser');
  });

  gulp.watch(imagesBlob, function () {
    return runSequence('processImages', 'reloadBrowser');
  });

  gulp.watch(fontsBlob, function () {
    return runSequence('processFonts', 'reloadBrowser');
  });

  gulp.watch(stylesBlob, function () {
    return runSequence('processStyles', 'reloadBrowser');
  });
  
  gulp.watch(stylesBlob, function () {
    return runSequence('processNormalize', 'reloadBrowser');
  });

  gulp.watch(sassBlob, function () {
    return runSequence('sass', 'reloadBrowser');
  });

});

gulp.task('cleanDist', function () {
  return gulp.src(distDirectory, {read: false, allowEmpty: true}).pipe(clean());
});

gulp.task('processHtml', function () {
  return gulp.src(htmlBlob)
    .pipe(gulp.dest(distDirectory));
});

gulp.task('processJs', function () {
  return gulp.src(jsBlob)
    .pipe(gulp.dest(distDirectory));
});

gulp.task('processImages', function () {
  return gulp.src(imagesBlob)
    .pipe(gulp.dest(`${distDirectory}/img/`));
});

gulp.task('processFonts', function () {
  return gulp.src(fontsBlob)
    .pipe(gulp.dest(`${distDirectory}/fonts/`));
});

gulp.task('processNormalize', function () {
  return gulp.src(normalizeBlob)
    .pipe(gulp.dest(`${distDirectory}/css/`));
});

gulp.task('processSass', function () {
  return gulp.src(sassBlob)
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('processStyles', function () {
  return gulp.src(stylesBlob)
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(`${distDirectory}/css`));
});


gulp.task('sass', function() {
  return  gulp.src('src/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest(`${distDirectory}/css/`));
});

gulp.task('reloadBrowser', function (done) {
  browserSync.reload();
  done();
});
