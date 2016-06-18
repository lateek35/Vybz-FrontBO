// generated on 2016-06-01 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');

gulp.task('sprite', function(cb) {
    var spriteData = gulp.src('app/images/sprites/**/*.png')
        .pipe(spritesmith({
            retinaSrcFilter: ['app/images/sprites/**/*@2x.png'],
            imgName: 'sprite.png',
            retinaImgName: 'sprite@2x.png',
            imgPath: '../images/sprite.png',
            retinaImgPath: '../images/sprite@2x.png',
            cssName: 'sprite.scss',
            padding: 5,
            cssVarMap: (sprite) => {
                sprite.name = 'sprite-' + sprite.name;
            }
        }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe($.imagemin())
        .pipe(gulp.dest('app/images/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('app/styles/components/'));

    return merge(imgStream, cssStream);
});


gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({stream:true}));

});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});


gulp.task('scripts', function() {
  // Single entry point to browserify 
  gulp.src('./app/scripts/main.js')
    .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe($.browserify({
      transform: ['hbsfy'],
      extensions: ['.hbs'],
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe($.plumber.stop())
    .pipe($.rename('main.js'))
    .pipe(gulp.dest('dist/scripts'));
});



gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('iconfont', () => {
  return gulp.src('app/images/svg/**/*')
  .pipe($.iconfontCss({
        fontName: 'icons', // nom de la fonte, doit être identique au nom du plugin iconfont
        targetPath: '../styles/fonts/icons.scss', // emplacement de la css finale
        fontPath: './../fonts/' // emplacement des fontes finales

      }))
      .pipe($.iconfont({
          fontName: 'icons',
          formats: ['svg', 'woff'],
          normalize: true
      }))
      .pipe(gulp.dest('app/fonts'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
  var files = [
          'app/**/*.html',
          'app/**/*.{png,jpg,gif}'
        ];
  browserSync.init(files, {
    // proxy: 'vibz.dev',
    server: {
      baseDir: "./dist"
    },
    // port: 8080,
    // Inject CSS changes
    injectChanges: true,
    ghost: false,
    open:false
  });
});


gulp.task('clean', del.bind(null, ['dist']));


gulp.task('default', ['iconfont', 'html', 'styles', 'scripts', 'images', 'fonts', 'extras','browser-sync'], () => {
  gulp.watch('app/images/**/*', ['images']); 
  gulp.watch('app/index.html', ['extras']); 
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*', ['scripts', browserSync.reload]);
 });

// gulp.task('build', ['lint', 'html', 'scripts', 'images', 'fonts', 'extras'], () => {
//   return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
// });
