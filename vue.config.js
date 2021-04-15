module.exports = {
    devServer: {
        open: true,
    },
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'utils': '@/utils'
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-ewshop/'
    : '/'
}