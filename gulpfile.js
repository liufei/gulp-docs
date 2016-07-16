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
    get('link[href*=gitbook-plugin]', 'href'),
    get('script[src*=gitbook-plugin]', 'src')
  )

  const cssFilter = filter('**/*.css', { restore: true })

  const jsFilter = filter('**/*.js', { restore: true })

  return gulp.src(plugins, { base: '_book/gitbook' })
    .pipe(cssFilter)
      .pipe(concat('plugins.css'))
      .pipe(cleanCSS())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
      .pipe(concat('plugins.js'))
      .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest('dist/gitbook'))
})

gulp.task('optimize', ['copy', 'compress'], () => {
  const remove = selector => cheerio($ => $(selector).remove())

  const replace = (selector, attribute, pattern, target) => cheerio($ => {
    const ref = $(selector)
    const el = ref.clone()
    el.attr(attribute, ref.attr(attribute).replace(pattern, 'plugins'))
    el.insertAfter(ref)
  })

  return gulp.src(['_book/**/*.html', '!_book/google*.html'])
    .pipe(remove('link[href*=gitbook-plugin]'))
    .pipe(replace('link[href*=style]', 'href', 'style', 'head'))
    .pipe(remove('script[src*=gitbook-plugin]'))
    .pipe(replace('script[src*=theme]', 'src', 'theme', 'body'))
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest('dist'))
})

gulp.task('deploy', ['optimize'], () => {
  return gulp.src('./dist/**/*')
    .pipe(ghPages())
})

gulp.task('default', ['deploy'])
