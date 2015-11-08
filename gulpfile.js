var gulp = require('gulp');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');

var lazyWatch = function(glob, task) {
  return function() {
    var tick;
    gulp.watch(glob, function() {
      if(tick) return;
      tick = setTimeout(function() {
        runSequence(task);
        tick = void 0;
      });
    });
  };
};

gulp.task('lint', function() {
  return gulp
  .src([
    './app/**/*.js',
    './server/**/*.js',
    '!./server/node_modules/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watch', ['lint'], lazyWatch(['./app/**/*.js', './server/**/*.js', '!./server/node_modules/**/*.js'], 'lint'));

gulp.task('server', ['watch'], function() {
  nodemon({
    script: './server/app.js',
    ext: 'js'
  });
});

gulp.task('help', function() {
  setTimeout(function() {
    console.log('');
    console.log('=========== gulp 使用说明 ===========');
    console.log(' $ gulp watch   # watch检测js报错');
    console.log(' $ gulp server  # 启动server并watch');
    console.log(' $ gulp help    # 查看帮助');
    console.log('=====================================');
  });
});

gulp.task('default', ['help']);