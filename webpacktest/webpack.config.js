const webpack = require('webpack');
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin=require('clean-webpack-plugin');

module.exports = {
    mode:'production',
    entry: './entry.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle-[hash:10].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /.(jpg|png|gif|svg)$/i,
                loaders: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",// [name]为图片名称，[ext]为图片后缀名
                            outputPath: "assets"// 图片放置的路径名称
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({ // html插件：生成相应的index.html，并自动在index.html引入相应的js文档
            title: "test-webpack", // 生成的index.html的title
            filename: "index.html", // 生成的html名称
            template: "index.html",  // 以index.html为模板
            inject: "body" // 引用js的script标签放在body体
        }),
        new CleanWebpackPlugin('dist/*.*', { // 清除打包之前的文件
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
};