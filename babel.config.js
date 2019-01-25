// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  retainLines: true,
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src', './lib'],
        cwd: 'babelrc'
      }
    ]
  ]
};
