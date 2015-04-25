var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  js:['www/js/*.js'],
  css:['www/css/*.css', 'www/css/*.scss', '!www/css/style.css']
};


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('css',function(){
  gulp.src(paths.css)
    .pipe(sass({errLogToConsole: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('www/css/'))

  })

gulp.task('js', function(done){
  gulp.src('www/js/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./www/js/dist/'))
  .on('end', done);
})

gulp.task('default', function(){
  gulp.start('js');
  gulp.start('css');
  //gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js,['js']);
  gulp.watch(paths.css,['css']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
