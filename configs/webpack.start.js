/*
 *  本地开发环境使用的配置
 */
const paramConfig = require('./webpack.params')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
//loader
const config = merge.smart(baseConfig, {
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: '[name]_[hash:8].js',
    chunkFilename: '[name]_[chunkhash:8].js',
    publicPath: '/',
    jsonpFunction: 'leihuoJsonp'
  },

  module: {
    rules: [
      //构建 CSS
      {
        test: /\.css$/,
        // include: [
        //   path.resolve(__dirname, 'src'),
        // ],
        //本地开发过程中不用打包成一个独立的 css 文件，直接使用 style 标签即可。
        use: ['style-loader', 'css-loader']

      },

      //CSS 预处理器
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: [
          'style-loader', 'vue-style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: [
                    'last 2 versions',
                    '> 1%',
                    'iOS 7',
                    'last 3 iOS versions'
                  ],
                  remove: false
                })
              ]
            }
          },
          'sprites-loader?outputPath=temp_file',
          'less-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-include-loader',
            options: {
              host: paramConfig.include_host,
              encode: paramConfig.encode
            }
          }
        ]
      }
    ]
  },

  //设置本地开发环境
  devServer: {
    contentBase: path.join(__dirname, '../'),
    port: 9000, //设置端口
    host: '0.0.0.0',
    open: false,
    disableHostCheck: true, //如果是 false的话你只能使用指定的 host,而不能自己绑定 host。
    hot: true //是否开启热更，调试html时候关闭，调试css与js开启
  }
})

//plugins
config.plugins.push(
  //定义3个全局变量，__DEBUG __CDNPATH
  new webpack.DefinePlugin({
    __LOCAL: JSON.stringify(true),
    __DEBUG: JSON.stringify(true),
    __CDNPATH: JSON.stringify('http://127.0.0.1:9000/')
  }),
  //热更新的两个插件
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
)

module.exports = config
