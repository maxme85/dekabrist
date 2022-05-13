'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const merge = require('merge-stream');
const del = require("del");
const cwebp = require('gulp-cwebp');
const replace = require('gulp-replace');

let uglify = require('gulp-uglify-es').default;

const browserSync = require('browser-sync');

let path = {
  src_sass: './app/sass/*.scss',
  src_js: './app/js/common.js',
  src_app: './app/',
  src_libs: './app/libs/',
  src_dist: './dist/'
}

let sassLibs = ([
  path.src_libs + 'dummy.css',
 // path.src_libs + 'AOS/aos.css',
  path.src_libs + 'fancybox/fancybox.css',
  path.src_libs + 'tinyslider/tiny-slider.css',
  // path.src_libs + 'swiper/swiper-bundle.min.css',
])

let jsLibs = ([
  path.src_libs + 'dummy.js',
  path.src_libs + 'fancybox/fancybox.umd.js',
 // path.src_libs + 'relaxjs/rellax.min.js',
 path.src_libs + 'tinyslider/tiny-slider.js',
//  path.src_libs + 'swiper/swiper-bundle.min.js',
  path.src_libs + 'vue/vue.js',
  //path.src_libs + 'AOS/aos.js',
 // path.src_libs + 'imask/imask.js',
  // path.src_libs + 'waypoints/lib/noframework.waypoints.min.js',
])










gulp.task("sassTask", function () {
  return gulp
    .src(path.src_sass)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(gulp.dest('./app/css/'))
    .pipe(browserSync.stream());
})


gulp.task("sassBuild", function () {
  return gulp
    .src(path.src_sass)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(gulp.dest(path.src_dist + '/css/'))
})



gulp.task("cssLibs", function () {
  var scssStream = gulp.src([
      'app/libs/dummy.scss',
    ])
    .pipe(sass())
    .pipe(concat("scss-files.scss"));

  var cssStream = gulp.src(sassLibs)
    .pipe(concat('css-files.css'));

  var mergedStream = merge(scssStream, cssStream)
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest('app/css'));

  return mergedStream;
})



gulp.task("cssLibsBuild", function () {
  var scssStream = gulp.src([
      'app/libs/dummy.scss',
    ])
    .pipe(sass())
    .pipe(concat("scss-files.scss"));

  var cssStream = gulp.src(sassLibs)
    .pipe(concat('css-files.css'));

  var mergedStream = merge(scssStream, cssStream)
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest('dist/css'));

  return mergedStream;
})




gulp.task("jsLibs", function () {
  return gulp.src(jsLibs)
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
})

gulp.task("jsLibsBuild", function () {
  return gulp.src(jsLibs)
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})

// JS task: uglifies JS files to main.js
gulp.task('jsTask', function () {
  return gulp
    .src(path.src_js)
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    //.pipe(sourcemaps.write()) // Inline source maps.
    .pipe(gulp.dest('./app/js/'))
    .pipe(browserSync.stream());
});

gulp.task('jsTaskBuild', function () {
  return gulp
    .src(path.src_js)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write()) // Inline source maps.
    .pipe(gulp.dest('./dist/js/'));
});



//webP images magic
gulp.task('cwebp', function () {
  return gulp.src('./app/img/*').pipe(cwebp()).pipe(gulp.dest('./dist/img/')),
  gulp.src('./app/img/*/*.*').pipe(cwebp()).pipe(gulp.dest('./dist/img/'));
});

//replace jpg and png to webP
gulp.task('replace-images-names-png', function () {
  return gulp.src('./dist/index.html').pipe(replace('.png', '.webp')).pipe(gulp.dest('./dist/')),
  gulp.src('./dist/css/style.css').pipe(replace('.png', '.webp')).pipe(gulp.dest('./dist/css/'))
});

gulp.task('replace-images-names-jpg', function () {
  return gulp.src('./dist/index.html').pipe(replace('.jpg', '.webp')).pipe(gulp.dest('./dist/')),
  gulp.src('./dist/css/style.css').pipe(replace('.jpg', '.webp')).pipe(gulp.dest('./dist/css/'))
});

gulp.task('delete-images', function(){
  return del(['./dist/img/*.jpg']),
  del(['./dist/img/*.png']),
  del(['./dist/img/*/*.png']),
  del(['./dist/img/*/*.jpg']);
})



gulp.task('copy-files', function () {
  return merge([
    gulp.src('./app/img/*/*.*').pipe(gulp.dest('./dist/img')),
    gulp.src('./app/img/*.*').pipe(gulp.dest('./dist/img')),
    gulp.src('./app/js/*.*').pipe(gulp.dest('./dist/js')),
    gulp.src('./app/fonts/*.*').pipe(gulp.dest('./dist/fonts')),
    gulp.src('./app/*.*').pipe(gulp.dest('./dist/'))
  ]);
});



// Static Server & watching scss/js/html files
gulp.task('serve', gulp.series('sassTask', function () {
  browserSync.init({
    server: "./app/"
  });
  gulp.watch(path.src_sass, gulp.series('sassTask'));
  gulp.watch(path.src_js, gulp.series("jsTask"));
  gulp.watch("app/*.html").on('change', browserSync.reload);

}));

gulp.task('clean', function(){
  return del(['dist/*']);
})

gulp.task('default',
  gulp.series('jsLibs', 'cssLibs', 'sassTask', "jsTask", 'serve'));


gulp.task('build',
  gulp.series('clean','jsLibsBuild', 'jsTaskBuild', 'sassBuild', 'cssLibsBuild', 'copy-files', 'cwebp', 'replace-images-names-png', 'replace-images-names-jpg','delete-images')
);
