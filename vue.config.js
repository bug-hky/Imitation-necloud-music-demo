module.exports = {
  configureWebpack: config => {
  },
  devServer: {
    proxy: 'http://localhost:3000'
  },
  pages: {
    index: {
      entry: 'src/index/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    login: {
      entry: 'src/login/main.ts',
      template: 'public/login.html',
      filename: 'login.html',
      title: 'Login Page',
      chunks: ['chunk-vendors', 'chunk-common', 'login']
    },
  }
}