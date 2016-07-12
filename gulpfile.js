/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),    
    uglify = require("gulp-uglify");

gulp.task("minify:js", function(){
	return gulp.src('./src/knockout-extensions.js')
				.pipe(uglify())
				.pipe(gulp.dest('./dist'));
});

gulp.task("default", ["minify:js"]);
