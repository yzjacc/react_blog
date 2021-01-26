export default {
  // proxy: {
  //   '/api': {
  //     'target': ' http://192.168.0.104/',
  //     'changeOrigin': true,
  //     'pathRewrite': { '^/api' : '' },
  //   },
  // },
  title: '于子俊的博客',
  chainWebpack: (config) => {
    // console.log('webpack Config', config.toConfig())
    // config.output.filename('[name].bundle.js');
    // config.optimization.splitChunks({
    //   //分包配置
    //   chunks: "all",
    //   // maxSize: 60000
    //   // automaticNameDelimiter: ".",
    //   // minChunks: 1,
    //   // minSize: 0
    //   cacheGroups: {
    //     styles: {
    //       minSize: 0,
    //       test: /\.css$/,
    //       minChunks: 2
    //     }
    //   }
    // });
    config.optimization.splitChunks({
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: true,
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 5,
      cacheGroups: {
        highlight: {
          name: 'highlight',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](highlight.js)[\\/]/,
          priority: -10,
        },
        moment: {
          name: 'moment',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](moment)[\\/]/,
          priority: -10,
        },
        // antdesigns: {
        //     name: 'antdesigns',
        //     chunks: 'all',
        //     test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
        //     priority: -11,
        // },
        // default: {
        //   minChunks: 1,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      }
    })

  }
}
