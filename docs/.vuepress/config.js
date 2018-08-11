module.exports = {
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  ga: 'UA-36637973-3',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Gulp Documentation',
      description: 'Unofficial site for better reading experience.',
    },
    '/zh/': {
      lang: 'zh-Hans',
      title: 'Gulp 中文文档',
      description: '为了更好的阅读体验而创建的Gulp中文文档。',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        nav: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'API', link: '/API' },
          { text: 'Recipes', link: '/recipes/' },
          { text: 'Writing a plugin', link: '/writing-a-plugin/' },
        ],
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          { text: '入门指南', link: '/zh/getting-started' },
          { text: 'API', link: '/zh/API' },
          { text: '秘籍', link: '/zh/recipes/' },
          { text: '编写插件', link: '/zh/writing-a-plugin/' },
        ],
      },
    },
    repo: 'bipedd/gulp-docs',
  },
}
