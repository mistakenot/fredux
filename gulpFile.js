var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var typescript = require('gulp-tsc');

gulp.task("test", () => {
    return gulp.src(['spec/**/*.spec.ts'])
        .pipe(typescript())
        .pipe(jasmine());
});