import * as path from 'path';
import * as uglifyJsPlugin from 'uglifyjs-webpack-plugin';
const generateAssetWebpackPlugin = require('generate-asset-webpack-plugin'); //tslint:disable-line:no-require-imports no-var-requires

module.exports = {
  //mode: 'production',
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'source-map',

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

  module: {
    // configuration regarding modules
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$|\.tsx$/,
        exclude: ['node_modules'],
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new uglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          ecma: 6,
          pure_getters: true,
          passes: 3,
          sequences: false,
          dead_code: true
        },
        output: { comments: false, beautify: false }
      }
    }),
    new generateAssetWebpackPlugin({
      filename: 'main.js',
      fn: (_: any, cb: Function) => {
        cb(null, `module.exports = require('./index.bundle.js').Reporter; `);
      }
    })
  ]
};
