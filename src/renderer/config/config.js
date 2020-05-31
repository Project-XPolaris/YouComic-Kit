export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'YouComic kit',
        dll: false,
        hardSource: false,
        routes: {
          exclude: [/components/],
        },
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes:[
        {
          path: '/',
          component: '../layouts/base/index',
          routes:[
            {
              path: '/home',
              component: './index',
            },
            {
              path: '/init',
              component: './init/index',
            },
            {
              path: '/',
              component: './start/index',
            },
          ]
        },

        // {
        //   path: '/',
        //   component: './index',
        // },
      ]
    },
  ],
};
