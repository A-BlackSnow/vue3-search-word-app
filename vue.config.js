module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:8001',
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
          args[0].title = '每天进步一点点';
          return args;
        });
  },
};
