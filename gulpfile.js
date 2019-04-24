var gulp         = require('gulp'),
    less         = require('gulp-less'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    minify       = require('gulp-csso'),
    gulpIf       = require('gulp-if'), 
    rename       = require('gulp-rename'),
    svgSprite    = require('gulp-svg-sprite');

gulp.task('less', function () {
   return gulp.src('app/less/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
    .pipe(gulp.dest('app/css'))
    .pipe(minify())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

    gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
        baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

    gulp.task('svgSprite', function () {
    return gulp.src('app/img/svg/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('app/img'));
});

    gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

    // для автоматической компиляции
gulp.task('watch', function () {
	gulp.watch('app/less/**/*.less', gulp.parallel('less'));
	gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    // gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});
// специальная задача, которая позволяет определить порядок обновления в браузере и автокомпилятор(watch)
gulp.task('default', gulp.parallel('less','browser-sync','watch'));