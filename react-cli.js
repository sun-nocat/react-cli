

// 引入node自带的相关模块
const fs = require('fs')
const path = require('path')
const project_name = process.argv[2] || "project";

const dev_path = process.cwd() + '/' + project_name;

const dir_arr = [
    'config/',
    'src/',
]
//文件配置
const file_arr = [
    '.babelrc',
    '.gitignre',
    'index.html',
    'package.json',
    'README.md',
    'config/webpack.base.conf.js',
    'config/webpack.dev.conf.js',
    'config/webpack.prod.conf.js',
    'src/App.js',
    'src/main.js',

];

//递归清空目录
function delAll(path) {
    let files_list = [];
    files_list = fs.readdirSync(path);
    files_list.forEach(function (file, index) {
        let next = path + '/' + file;
        if (fs.statSync(next).isDirectory()) {
            delAll(next);
        } else {
            fs.unlinkSync(next);
        }
    })
    fs.rmdirSync(path);
}




//设置相关目录
function createDir() {

    //检查是否已创建
    let check_exis = fs.existsSync(dev_path);
    if (check_exis) {
        console.log('清空残留开发文档');
        delAll(dev_path);
    }
    //创建开发目录
    fs.mkdirSync(dev_path);
    for (let i = 0; i < dir_arr.length; i++) {
        fs.mkdirSync(dev_path + '/' + dir_arr[i]);
    }
    console.log('项目文件夹创建完毕');
}

//创建开发文件
function createFile() {
    for (let i = 0; i < file_arr.length; i++) {
        fs.openSync(dev_path + '/' + file_arr[i], 'w');
    }
    console.log('项目文件创建完毕');
}

function fillText(filled){
    switch(filled){
        case 'config/webpack.base.conf.js':
            var write_text = `
/*
* @Description: 公用的配置
* @Author: sunmingming
* @Email: sun_mingming@foxmail.com
* @Date: 2019-03-18 16:03:01
*/

'use strict'

const path  = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry:{
        app:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname, '../dist'),
        filename:"[name].js"
    },

    resolve:{
        extensions:['.ts','.tsx','.js','.json']
    },

    //loader
    module:{
        rules:[
            {
                test:/\.js|jsx$/,
                exclude:/(node_modules|bower_components)/,//屏蔽不需要处理的文件
                loader: 'babel-loader'
            }
        ]
    },

    //插件
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject:'body'
        })
    ]
}  
            `;

            return write_text;
            break;

        case 'config/webpack.dev.conf.js':
            var write_text = `
/*
* @Description: 开发环境配置
* @Author: sunmingming
* @Email: sun_mingming@foxmail.com
* @Date: 2019-03-18 16:04:00
*/


'use strict'

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OpenBrewserPlugin = require('open-browser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
    // 模式
    mode: "development",
    // 调试工具
    devtool: 'inline-source-map',
    // 开发服务器
    devServer: {
        contentBase: false, // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true, // 启用gzip压缩
        inline: true, // 设置为true，当源文件改变时会自动刷新页面
        hot: true, // 模块热更新，取决于HotModuleReplacementPlugin
        host: '127.0.0.1', // 设置默认监听域名，如果省略，默认为“localhost”
        port: 8080 // 设置默认监听端口，如果省略，默认为“8080”
    },
    // 插件
    plugins: [
        // 热更新相关
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrewserPlugin({
            url:'http://localhost:8080'
        })

    ],
    optimization: {
        nodeEnv: 'development',
    }
});
            `;
            
            return write_text;
            break;


            case 'config/webpack.prod.conf.js':
            var write_text = `
/*
* @Description: 生产环境配置
* @Author: sunmingming
* @Email: sun_mingming@foxmail.com
* @Date: 2019-03-18 16:04:14
*/
'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    // 模式
    mode: "production",
    // 调试工具
    devtool: '#source-map',
    // 输出
    output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "js/[name].[chunkhash].js",
    },
    // 插件
    plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
        root: path.resolve(__dirname, '../'),
    }),
    new webpack.HashedModuleIdsPlugin(),
    ],
    // 代码分离相关
    optimization: {
    nodeEnv: 'production',
    minimizer: [new UglifyJSPlugin()],
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
        vendor: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: 'vendor',
            chunks: 'initial',
        }
        }
    }
    }
});
            `;
            return write_text;
            break;

            case 'src/App.js':
            var write_text = `
/*
* @Description: React根组件
* @Author: sunmingming
* @Email: sun_mingming@foxmail.com
* @Date: 2019-03-18 17:46:14
*/
            `
            return write_text;
            break;

            case 'src/main.js':
            var write_text = `
/*
* @Description: 项目入口文件
* @Author: sunmingming
* @Email: sun_mingming@foxmail.com
* @Date: 2019-03-18 16:05:42
*/
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component{

    render() {
        return(
            <div style={{textAlign:'center',fontSize:'24px'}}><a href="https://github.com/sun-nocat/react-cli">如果觉得这个脚手还不错，感谢给我一个star</a></div>
        
        )
    }
}



ReactDOM.render(<App/>,document.getElementById('app'))
            `;
            return write_text;
            break;

            case '.babelrc':

            var write_text = `
{
    "presets": ["latest","react","stage-2"],
    "plugins": []
}     
            `;

            return write_text;
            break;

            case '.gitignre':

            var write_text = `

/node_modules
/dist          
            `;
            return write_text;
            break;

            case 'index.html':

            var write_text = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
            `;
            return write_text;
            break;

            case 'package.json':
            var write_text = `
{
    "name": "project",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "dependencies": {
        "@babel/core": "^7.3.4",
        "babel-core": "^6.26.3",
        "babel-loader": "^7.1.5",
        "babel-plugin-import": "^1.11.0",
        "babel-preset-latest": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",
        "clean-webpack-plugin": "^1.0.0",
        "css-loader": "^2.1.1",
        "file-loader": "^3.0.1",
        "html-webpack-plugin": "^3.2.0",
        "node-sass": "^4.11.0",
        "open-browser-webpack-plugin": "0.0.5",
        "react": "^16.8.4",
        "react-dom": "^16.8.4",
        "react-router-dom": "^4.4.0",
        "sass-loader": "^7.1.0",
        "style-loader": "^0.23.1",
        "uglifyjs-webpack-plugin": "^2.1.2",
        "url-loader": "^1.1.2",
        "webpack": "^4.29.6",
        "webpack-cli": "^3.3.0",
        "webpack-dev-server": "^3.2.1",
        "webpack-merge": "^4.2.1"
    },
    "devDependencies": {},
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "dev": "webpack-dev-server --hot --inline --grogress --colors --config config/webpack.dev.conf.js",
        "start": "npm run dev",
        "build": "webpack --progress --colors --config config/webpack.prod.conf.js"
    },
    "author": "sunmingming",
    "license": "ISC"
    }
    
            `;

            return write_text;
            break;

            case 'README.md':
            var write_text = `
## 使用方法 
安装依赖 npm install
启动开发环境 npm start
线上打包 npm run build
            `
            return write_text;
            break;

        default:
        //异常

        try{
            throw "配置文件出错：" + filled
        }
        catch (err){
            console.log(err)
        }            

    }
}


//填充开发文件
function fillFile() {
    //填充package.json
    for (let i = 0; i < file_arr.length; i++) {
        fs.writeFileSync(dev_path + '/' + file_arr[i], fillText(file_arr[i]));
    }
    console.log('项目文件配置完毕');
}

 

(function() {
    console.log('初始化脚本');
    createDir();
    createFile();
    fillFile();
    console.log('搭建完毕，enjoy it！');
})()