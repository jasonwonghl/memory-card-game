module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [[
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          view: './src/view',
          styles: './src/styles',
          helpers: './src/helpers'
        },
      },
    ],
    'react-native-reanimated/plugin'
  ]
  };
};
