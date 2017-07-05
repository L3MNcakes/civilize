var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer'),
    exec = require('child_process').exec,
    sass = require('gulp-sass');

gulp.task('default', ['scripts', 'html'], function() {
    // Default task
});

/**
 * Scripts task
 **/
gulp.task('scripts', function() {
    var bundler = browserify('./src/js/main.js', {debug: true}).transform(babelify, {
        presets: ['react', 'es2015'],
        plugins: ['transform-flow-strip-types', 'transform-class-properties']
    });

    return bundler.bundle()
        .on('error', handleScriptsError)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

var handleScriptsError = function(err) {
    gutil.log(gutil.colors.red(err));
}

/**
 * HTML task
 **/
gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('dist'));
});

/**
 * CSS task
gulp.task('css', function() {
    gulp.src('./src/scss/concise.css-3.4.0/src/concise.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dist/css'));
});
 **/

/**
 * Flow task
 **/
gulp.task('flow', function() {
    exec('npm run-script flow', function(err, stdout, stderr) {
        if(err) {
            gutil.log(gutil.colors.red(stderr));
        } else {
            gutil.log(stdout);
        }
    });
});
