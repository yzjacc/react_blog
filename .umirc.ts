export default {
    proxy: {
      '/api': {
        'target': 'http://yzjweb.xyz/',
        'changeOrigin': true,
        'pathRewrite': { '^/api' : '' },
      },
    },
  }