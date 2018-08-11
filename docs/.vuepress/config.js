module.exports = {
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  ga: 'UA-36637973-3',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Gulp Documentation',
      description: 'Unofficial site for better reading experience.'
    },
    '/zh/': {
      lang: 'zh-Hans',
      title: 'Gulp Documentation',
      description: 'Unofficial site for better reading experience.'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        nav: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'API', link: '/API' },
          { text: 'CLI', link: '/CLI' },
          { text: 'Writing a plugin', link: '/writing-a-plugin/' },
          { text: 'FAQ', link: '/FAQ' },
          { text: 'Recipes', link: '/recipes/' }
        ]
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'API', link: '/API' },
          { text: 'CLI', link: '/CLI' },
          { text: 'Writing a plugin', link: '/writing-a-plugin/' },
          { text: 'FAQ', link: '/FAQ' },
          { text: 'Recipes', link: '/recipes/' }
        ]
      }
    },
    repo: 'bipedd/gulp-docs'
  }
}
