var webpack = require('webpack')
var path = require('path')
var copy = require('copy-webpack-plugin')
var resolve = (dir) =>
{
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    modules: [resolve('src'), resolve('node_modules')],
    alias: {
      '~': resolve('node_modules'),
      src: resolve('src'),
      lib: resolve('src/lib'),
      config: resolve('src/config'),
      constants: resolve('src/constants'),
      mixins: resolve('src/mixins'),
      module: resolve('src/store/module'),
      resource: resolve('resource'),
      '@': resolve('src/components'),
      'pages': resolve('src/pages')
    }
  },
  plugins: [
    new copy([{from:'resource', to:'resource'}]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
      moment: 'moment',
      axios: 'axios'
    })
  ]
}
