const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {

    configureWebpack: {

        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    // 添加云函数文件夹
                    {
                        from: path.join(__dirname, 'src/cloudfunc'),
                        to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'cloudfunc')
                    },
                    // 添加云开发项目配置
                    {
                        from: path.join(__dirname, 'project.config.json'),
                        to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'project.config.json'),
                    }
                ]
            })
        ],
        resolve: {
            alias: {
                // eslint-disable-next-line no-undef
                '@': resolve('src'),
                'src': resolve('src'),
            },
        },
    },
    transpileDependencies: ['uview-ui']
}
