const fs = require('fs')
const exec = require('child_process').exec
const del = require('del')
const cheerio = require('cheerio')
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

gulp.task('build', cb => exec('gitbook build', cb))

gulp.task('clean', ['build'], () => del('dist'))

gulp.task('copy', ['clean'], () => {
  const files = [
    'CNAME',
    'robots.txt',
    '_book/**/*.!(html)',
    '!_book/gitbook/gitbook-plugin-*{,/*}'
  ]

  return gulp.src(files)
    .pipe(gulp.dest('dist'))
})

gulp.task('compress', ['clean'], () => {
  const html = fs.readFileSync('_book/index.html')
  const $ = cheerio.load(html)

  const get = (selector, attribute) => {
    return $(selector)
      .map((i, el) => $(el).attr(attribute))
      .get()
      .map(f => `_book/${f}`)
  }

  const files = [].concat(
    '_book/gitbook/style.css',
    get('link[href*=gitbook-plugin]', 'href'),
    '_book/gitbook/gitbook.js',
    '_book/gitbook/theme.js',
    get('script[src*=gitbook-plugin]', 'src')
  )

  const cssFilter = plugins.filter('**/*.css', { restore: true })

  const jsFilter = plugins.filter('**/*.js', { restore: true })

  return gulp.src(files, { base: '_book/gitbook' })
    .pipe(cssFilter)
      .pipe(plugins.concat('bundle.css'))
      .pipe(plugins.cleanCss())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
      .pipe(plugins.concat('bundle.js'))
      .pipe(plugins.uglify())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest('dist/gitbook'))
})

gulp.task('optimize', ['copy', 'compress'], () => {
  const remove = selector => plugins.cheerio($ => $(selector).remove())

  const replace = (
    selector, attribute, pattern, replacement
  ) => plugins.cheerio($ => {
    const el = $(selector)
    el.attr(attribute, el.attr(attribute).replace(pattern, replacement))
  })

  return gulp.src('_book/**/*.html')
    .pipe(remove('link[href*=gitbook-plugin]'))
    .pipe(replace('link[href*=style]', 'href', 'style.css', 'bundle.css'))
    .pipe(remove('script[src*=theme]'))
    .pipe(remove('script[src*=gitbook-plugin]'))
    .pipe(replace('script[src*=gitbook]', 'src', 'gitbook.js', 'bundle.js'))
    .pipe(plugins.htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest('dist'))
})

gulp.task('deploy', ['optimize'], () => {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages())
})

gulp.task('default', ['deploy'])
