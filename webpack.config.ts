import * as path from 'path';
const TerserPlugin = require('terser-webpack-plugin'); //tslint:disable-line:no-require-imports no-var-requires
const generateAssetWebpackPlugin = require('generate-asset-webpack-plugin'); //tslint:disable-line:no-require-imports no-var-requires

module.exports = {
  mode: 'production',
  //mode: 'development',
  entry: './src/index.ts',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      })
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    library: 'Reporter',
    libraryTarget: 'commonjs'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  target: 'node',

  node: false,

  module: {
    // configuration regarding modules
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$|\.tsx$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new generateAssetWebpackPlugin({
      filename: 'main.js',
      fn: (_: any, cb: Function) => {
        cb(null, `module.exports = require('./index.bundle.js').Reporter; `);
      }
    })
  ]
};
