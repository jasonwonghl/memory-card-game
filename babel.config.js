module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin', [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          view: './src/view',
          styles: './src/styles'
        },
      },
    ],]
  };
};
