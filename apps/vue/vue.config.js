module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  publicPath: '/apps/vue'
}
