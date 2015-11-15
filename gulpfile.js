var gulp = require('gulp');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var watchArr = [
  'app.js',
  './public/**/*.js',
  './server/**/*.js',
  'gulpfile.js',
  'webpack.config.js'
];

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

gulp.task('lint', ['webpack'], function() {
  return gulp
  .src(watchArr)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watch', ['lint'], lazyWatch(watchArr, 'lint'));

gulp.task('server', ['watch'], function() {
  nodemon({
    script: './app.js',
    ext: 'js'
  });
});

gulp.task('webpack', function(callback) {
  var myConfig = Object.create(webpackConfig);
  // run webpack
  webpack(
    // configuration
    myConfig
  , function(err, stats) {
    // if(err) throw new gutil.PluginError("webpack", err);
    // gutil.log("[webpack]", stats.toString({
    //   // output options
    // }));
    callback();
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
