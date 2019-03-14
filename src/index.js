//1/导入包名时。接受的成员名称必须这么写
 
import React from 'react' //创建组件，虚拟dom.生命周期
import ReactDom from 'react-dom' //把创建好的组件 和 虚拟dom 放到页面上


//2 创建虚拟dom元素
//参数1 创建的元素的类型 字符串  表示元素的名称
//参数2 是一个对象或 null 表示 当前这个dom元素的属性
//参数3 子节点 包括 其他 虚拟dom 获取 文本子节点
//参数n 其他节点

// const myh1 =  React.createElement('h1',{id:'myh1',title:"miao"},'文本子节点')

//3 使用ReactDOM 把虚拟DOM渲染到页面上
//参数1 要渲染的页面的节点
//参数2 指定要渲染的页面

//4 这种在js中写html的语法就是jsx语法
//jsx在运行的时候，是被转换成React.creactElement()进行运行的
var mydiv = <div id="mydiv" title="divTitle">这是一个div</div>

ReactDom.render(mydiv,document.getElementById("app"));


