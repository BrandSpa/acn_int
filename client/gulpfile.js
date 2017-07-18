const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("app", function() {
    gulp.src("sass/app.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
    .pipe(gulp.dest("./dist"))
});

gulp.task("fullpage", function() {
    gulp.src("sass/fullpage.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
    .pipe(gulp.dest("./dist"))
});

//Watch task
gulp.task("default",function() {
    gulp.watch("sass/**/*.scss",["app"]);
    gulp.watch("sass/**/*.scss",["fullpage"]);
});
