const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#007664',
              '@link-color': '#464D4B',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
