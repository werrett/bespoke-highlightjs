var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  map = require('vinyl-map'),
  istanbul = require('istanbul'),
  karma = require('karma'),
  coveralls = require('gulp-coveralls'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  pkg = require('./package.json'),
  Browserify = require('browserify'),
  stringify = require('stringify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  path = require('path');

gulp.task('default', ['clean', 'lint', 'test', 'compile']);
gulp.task('dev', ['compile', 'lint', 'test', 'watch']);

gulp.task('watch', function() {
  gulp.watch('lib/**/*.js', ['test', 'lint', 'compile']);
  gulp.watch('test/spec/**/*.js', ['test']);
});

gulp.task('clean', function() {
  return gulp.src(['dist', 'lib-instrumented', 'test/coverage'], { read: false })
    .pipe(clean());
});

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', 'lib/**/*.js', 'specs/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// gulp.task('instrument', ['clean'], function() {
//   return gulp.src('lib/**/*.js')
//     .pipe(map(function(code, filename) {
//       var instrumenter = new istanbul.Instrumenter(),
//         relativePath = path.relative(__dirname, filename);
//       return instrumenter.instrumentSync(code.toString(), relativePath);
//     }))
//     .pipe(gulp.dest('lib-instrumented'));
// });

gulp.task('test', function (done) {
  new karma.Server({ configFile: __dirname + '/karma.conf.js', singleRun: true })
    // prevent karma from calling process.exit
    .on('run_complete', function() { done(); })
    .start();
});

gulp.task('coveralls', ['test'], function() {
  return gulp.src(['test/coverage/**/lcov.info'])
    .pipe(coveralls());
});

gulp.task('compile', ['clean'], function() {

  var b = new Browserify({ standalone: 'bespoke.plugins.highlightjs' });
  b.transform(stringify, {
    appliesTo: { includeExtensions: ['.css'] },
    global: true
  });
  b.add('./lib/bespoke-highlightjs.js');

  var longHeader = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' *',
    ' * Copyright <%= new Date().getFullYear() %>, <%= pkg.author.name %>',
    ' * This content is released under the <%= pkg. licenses[0].type %> license',
    ' * <%= pkg.licenses[0].url %>',
    ' */\n\n'
     ].join('\n');

  var shortHeader = [
    '/*! <%= pkg.name %> v<%= pkg.version %> ',
    '© <%= new Date().getFullYear() %> <%= pkg.author.name %>, ',
    '<%= pkg.licenses[0].type %> License */\n'
    ].join('');

  return b.bundle()
    .pipe(source('bespoke-highlightjs.js'))
    .pipe(buffer())
    .pipe(header(longHeader, { pkg : pkg }))
    .pipe(rename('bespoke-highlightjs.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('bespoke-highlightjs.min.js'))
    .pipe(uglify())
    .pipe(header(shortHeader, { pkg : pkg }))
    .pipe(gulp.dest('dist'));
});
