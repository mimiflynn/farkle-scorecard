import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin  from 'copy-webpack-plugin';

const app = path.resolve(__dirname, 'client');
const nodeModules = path.resolve(__dirname, 'node_modules');

const BUILD = process.env.npm_lifecycle_event === 'build';
const DEV = process.env.npm_lifecycle_event === 'dev';

// Node-managed vendors for concatenating into the vendors.js file.
const vendors = [
  'classnames',
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux-thunk'
];

// Webpack Plugins
const plugins = [
  // Reference: http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
  // Seperate out vendor libraries into a separate file.
  new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

  // Reference: https://www.npmjs.com/package/copy-webpack-plugin
  // move thumbnail to dist
  new CopyWebpackPlugin([
    { context: path.join(__dirname, 'assets/data'), from: '**/*', to: 'data'},
    { context: path.join(__dirname, 'assets/css'), from: '**/*', to: 'css'},
    { context: path.join(__dirname, 'assets/fonts'), from: '**/*', to: 'fonts'},
    { context: path.join(__dirname, 'assets/images'), from: '**/*', to: 'images'},
    { from: 'index.html' }
  ]),

];

// Build-only Webpack Plugins
if (BUILD) {
  plugins.push(
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin()
  );
}

// Primary configuration.
const config = {
  resolve: {
    root: app,
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },
  entry: {
    app: path.resolve(app, 'index.js'),
    vendors,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: BUILD ? './' : 'http://localhost:8080/',
  },
  module: {
    preLoaders: [
      { test: /\.js?/, exclude: __dirname + '/node_modules', loaders: ['eslint'] }
    ],
    loaders: [
      {
        test: /\.(js||jsx)$/,
        loaders: ['babel-loader'],
        exclude: nodeModules,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(woff2?|svg|jpe?g|png|gif|ico)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file'
      },
    ],
  },
  plugins,
};

// Additional dev server configuration.
if (DEV) {
  config.devServer = {
  host: '0.0.0.0',
    contentBase: './dist',
    stats: {
      modules: false,
      cached: false,
    },
  };
  config.devtool = 'source-map';
}

module.exports = config;
