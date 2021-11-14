module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    proxy: {
      '^/api': {
        pathRewrite: {
          '^/api': '',
        },
        target: process.env.VUE_APP_PROXY_URL,
        secure: false,
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
