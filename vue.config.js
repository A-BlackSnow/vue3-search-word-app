module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_PORXY_URL,
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/style/var.scss";',
      },
    },
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config
        .plugin('html')
        .tap((args) => {
          args[0].title = '浅笑安然';
          return args;
        });
  },
};
