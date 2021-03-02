const path = require('path');

module.exports = {
  entry: './assets/js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'src', 'assets', 'js'),
  },
  mode: 'development'
};
