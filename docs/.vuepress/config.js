module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Gulp Documentation',
      description: 'Unofficial site for better reading experience.',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Gulp 中文文档',
      description: '为了更好的阅读体验而创建的Gulp中文文档。',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    [
      'script',
      {
        async: true,
        src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      },
    ],
    [
      'script',
      null,
      '(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-5083471427450334",enable_page_level_ads: true});',
    ],
  ],
  ga: 'UA-36637973-3',
  themeConfig: {
    repo: 'bipedd/gulp-docs',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'API', link: '/API' },
          { text: 'CLI', link: '/CLI' },
          { text: 'Recipes', link: '/recipes/' },
          { text: 'Writing a plugin', link: '/writing-a-plugin/' },
        ],
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          { text: '入门指南', link: '/zh/getting-started' },
          { text: 'API', link: '/zh/API' },
          { text: 'CLI', link: '/zh/CLI' },
          { text: '秘籍', link: '/zh/recipes/' },
          { text: '编写插件', link: '/zh/writing-a-plugin/' },
        ],
      },
    },
  },
}
