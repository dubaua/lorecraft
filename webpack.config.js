/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const loaderUtils = require('loader-utils');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json',
        },
      },
      // now css modules named as *.module.css
      // and loaded as modules
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                // implementation get from official code
                // https://github.com/webpack-contrib/css-loader/blob/5e702e7d2e081b7f6d372f0c967fdfca6a40a584/src/utils.js#L37
                // and replaced unwanted module
                getLocalIdent(loaderContext, localIdentName, localName, options) {
                  if (!options.context) {
                    options.context = loaderContext.rootContext;
                  }
                  const request = path.relative(options.context, loaderContext.resourcePath).replace(/\\/g, '/');
                  options.content = `${options.hashPrefix + request}+${localName}`;
                  localIdentName = localIdentName.replace(/\[local\]/gi, localName);
                  const hash = loaderUtils.interpolateName(loaderContext, localIdentName, options);
                  return hash
                    .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
                    .replace(/^((-?[0-9])|--)/, '_$1')
                    .replace('-module', '');
                },
              },
            },
          },
        ],
      },
      // regular css is loaded as regular css
      // basically we need it for css variables for shadow DOM root
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              import: true,
            },
          },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.svg$/,
        include: /.*sprite\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@guards': path.resolve(__dirname, 'src/guards'),
      '@icons': path.resolve(__dirname, 'src/icons'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};
