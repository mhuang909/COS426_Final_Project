const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './build/';

module.exports = {
  entry: ['./src/app.ts'],
  output: {
    path: path.join(__dirname, buildPath),
    filename: '[name].[hash].js',
    publicPath: `/${pkg.repository}/`,
  },
  target: 'web',
  devtool: 'source-map',
  stats: {
    warnings: false
  },
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/,
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        exclude: path.resolve(__dirname, './node_modules/'),
      },
      {
        test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
        use: 'file-loader',
        exclude: path.resolve(__dirname, './node_modules/'),
      },
      {
        test: /\.(vert|frag|glsl|shader|txt)$/i,
        use: 'raw-loader',
        exclude: path.resolve(__dirname, './node_modules/'),
      },
      {
        type: 'javascript/auto',
        test: /\.(json)/,
        exclude: path.resolve(__dirname, './node_modules/'),
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      lights$: path.resolve(__dirname, 'src/components/lights'),
      objects$: path.resolve(__dirname, 'src/components/objects'),
      scenes$: path.resolve(__dirname, 'src/components/scenes'),
      node_modules$: path.resolve(__dirname, 'node_modules/')
    },
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: pkg.title, favicon: 'src/favicon.ico' }),
  ]
};
