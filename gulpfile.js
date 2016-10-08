'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var typings = require('gulp-typings');
var tslint = require('gulp-tslint');
var server = require('gulp-develop-server');
var del = require('del');

var config = {
    srcFiles: './src/**/*.ts',
    distDir: './dist',
    typings: './typings/index.d.ts'
};

gulp.task('default', ['ts']);

gulp.task('ts', ['clean', 'typings', 'tslint'], function() {
    var tsProject = ts.createProject('tsconfig.json');
    return gulp.src([config.typings, config.srcFiles])
        .pipe(ts(tsProject))
        .pipe(gulp.dest(config.distDir));
});

gulp.task('typings', function(){
    return gulp.src('./typings.json').pipe(typings());
});

gulp.task('tslint', function() {
    return gulp.src(config.srcFiles)
        .pipe(tslint({formatter: 'verbose'}))
        .pipe(tslint.report())
});

gulp.task('clean', function(callback) {
    return del([
        './dist/**',
        './typings/**',
        '!./node_modules/**',
        '!./gulpfile.js',
        '!./bin/**'
    ], callback);
});

gulp.task('server:start', ['default'], function() {
    server.listen({path: './bin/www'}, function(error) {
        if (error) {
            console.log(error);
        }
    });
});

// TODO simplify this task
gulp.task('server:restart', function() {
    var tsProject = ts.createProject('tsconfig.json');
    gulp.src([config.typings, config.srcFiles])
        .pipe(tslint({formatter: 'verbose'}))
        .pipe(tslint.report())
        .pipe(ts(tsProject))
        .pipe(gulp.dest(config.distDir))
        .pipe(server())
});

gulp.task('develop', ['server:start'], function() {
    gulp.watch(config.srcFiles, ['server:restart']);
});
