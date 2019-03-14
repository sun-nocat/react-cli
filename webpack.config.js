const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//导入在内存中自动声场html的插件

//创建一个插件的实力对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件
    filename: 'index.html' //生成内存中首页的名称
})


//向外部暴露一个打包的配置对象  因为日webpack是基于NOde构建的，所以webpack支持所有node语法
//webpack 默认只能打包处理  .js后缀的文件 像.vue等午饭前主动处理，所以要配置第三方的loader
module.exports = {

    mode: 'development', //development   production  开发环境和生产环境的选项 不同与是否打包
    //在webpack4.x中 有一个很大的特性，就是  约定大于配置，约定的打包入口文件是src下的index.js
    plugins: [
        htmlPlugin
    ],

    module: { //所有第三方  模块的配置规则
        rules: [{ //第三方匹配规则
            test: /\.js|jsx$/,
            use: 'babel-loader',
            exclude: /node_modules/ //千万不要忘记加
        }]
    }

    // export default {}
    //这是ES6中 向外导出模块的API 与之对应的是 import*** from '标识符'
    //那些特性node支持？ 如果浏览器支持那些，则Node就支持那些
}