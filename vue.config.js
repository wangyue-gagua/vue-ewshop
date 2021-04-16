// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  devServer: {
    open: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        utils: '@/utils',
      },
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|js|ts)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
              })],
            }),
            compilerOptions: {
              module: 'es2015',
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-ewshop/'
    : '/',
};
