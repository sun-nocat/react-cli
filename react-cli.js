

// 引入node自带的相关模块
const fs = require('fs')
const path = require('path')
const project_name = process.argv[2] || "project";

const dev_path = process.cwd() + '/' + project_name;

const dir_arr = [
    'dist/',
    'src/',
]
//文件配置
const file_arr = [
    '.babelrc',
    '.gitignre',
    'package.json',
    'README.md',
    'webpack.config.js',
    'dist/index.html',
    'src/index.js',
    'src/index.html'
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
        case 'dist/index.html':
            var write_text = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>index首页</title>
    <!-- <script src="../dist/main.js"></script> -->

</head>
<body>

    <div id="app"></div>

    
<script type="text/javascript" src="main.js"></script></body>
</html>
            
            `;

            return write_text;
            break;

        case 'src/index.js':
            var write_text = `
            //1/导入包名时。接受的成员名称必须这么写
 
import React from 'react' //创建组件，虚拟dom.生命周期
import ReactDom from 'react-dom' //把创建好的组件 和 虚拟dom 放到页面上


var mydiv = <div id="mydiv" title="divTitle">这是一个div</div>

ReactDom.render(mydiv,document.getElementById("app"));



            `;
            
            return write_text;
            break;


            case '.babelrc':
            var write_text = `
{
    "presets": [
        "env",
        "stage-0",
        "react"
    ],
    "plugins": [
        "transform-runtime"
    ]
}
            `;
            return write_text;
            break;

            case '.gitignre':
            var write_text = `
            /node_modules
            /dist/main.js
            `;
            return write_text;
            break;

            case 'package.json':

            var write_text = `
{
"name": "react-cli",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "dev": "webpack-dev-server --open --port 3000 --hot --progress --host 127.0.0.1"
},
"keywords": [],
"author": "sunmingming",
"license": "ISC",
"devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"
},
"dependencies": {
    "react": "^16.5.2",
    "react-dom": "^16.5.2"
}
}

            
            `;

            return write_text;
            break;

            case 'README.md':

            var write_text = `
            # 我是注释
            `;
            return write_text;
            break;

            case 'webpack.config.js':

            var write_text = `
            const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件
    filename: 'index.html' //生成内存中首页的名称
})



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


}
            `;
            return write_text;
            break;

            case 'src/index.html':
            var write_text = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>index首页</title>

</head>
<body>

    <div id="app"></div>

    
</body>
</html>
            `;

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