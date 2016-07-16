const fs = require('fs')
const exec = require('child_process').exec
const del = require('del')
const _cheerio = require('cheerio')
const gulp = require('gulp')
const cheerio = require('gulp-cheerio')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const filter = require('gulp-filter')
const ghPages = require('gulp-gh-pages')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')

gulp.task('build', cb => exec('gitbook build', cb))

gulp.task('clean', ['build'], () => del('dist'))

gulp.task('copy', ['clean'], () => {
  const files = [
    '_book/**/*.!(html)',
    '_book/CNAME',
    '_book/google*.html',
    '!_book/gitbook/gitbook-plugin-*{,/*}'
  ]

  return gulp.src(files)
    .pipe(gulp.dest('dist'))
})

gulp.task('compress', ['clean'], () => {
  const html = fs.readFileSync('_book/index.html')
  const $ = _cheerio.load(html)

  const get = (selector, attribute) => {
    return $(selector)
      .map((i, el) => $(el).attr(attribute))
      .get()
      .map(f => `_book/${f}`)
  }

  const plugins = [].concat(
    '_book/gitbook/style.css',
    get('link[href*=gitbook-plugin]', 'href'),
    '_book/gitbook/gitbook.js',
    '_book/gitbook/theme.js',
    get('script[src*=gitbook-plugin]', 'src')
  )

  const cssFilter = filter('**/*.css', { restore: true })

  const jsFilter = filter('**/*.js', { restore: true })

  return gulp.src(plugins, { base: '_book/gitbook' })
    .pipe(cssFilter)
      .pipe(concat('bundle.css'))
      .pipe(cleanCSS())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
      .pipe(concat('bundle.js'))
      .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest('dist/gitbook'))
})

gulp.task('optimize', ['copy', 'compress'], () => {
  const remove = selector => cheerio($ => $(selector).remove())

  const replace = (selector, attribute, pattern, replacement) => cheerio($ => {
    const el = $(selector)
    el.attr(attribute, el.attr(attribute).replace(pattern, replacement))
  })

  return gulp.src(['_book/**/*.html', '!_book/google*.html'])
    .pipe(remove('link[href*=gitbook-plugin]'))
    .pipe(replace('link[href*=style]', 'href', 'style.css', 'bundle.css'))
    .pipe(remove('script[src*=theme]'))
    .pipe(remove('script[src*=gitbook-plugin]'))
    .pipe(replace('script[src*=gitbook]', 'src', 'gitbook.js', 'bundle.js'))
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest('dist'))
})

gulp.task('deploy', ['optimize'], () => {
  return gulp.src('./dist/**/*')
    .pipe(ghPages())
})

gulp.task('default', ['deploy'])
