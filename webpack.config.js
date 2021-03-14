const path = require("path")

const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

//webpack打包配置
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    //指定打包的出口
    output: {
        //出口的目录
        path: path.resolve(__dirname, "dist"),
        //打包后的文件名
        filename: "bundle.js",
        //打包后的js不使用箭头函数调用
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    //指定打包的模块
    module: {
        rules: [
            {
                //指定规则生效的文件
                test: /\.ts$/,
                //使用的加载器
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    //指定配置信息
                                    {
                                        targets: {
                                            "chrome": "88", //兼容版本
                                            "ie": "11"
                                        },
                                        //指定corejs版本
                                        "corejs": "3",
                                        //使用corejs的方式
                                        "useBuiltIns": "usage", //usage 表示按需加载corejs

                                    }
                                ]
                            ]
                        }
                    }, //使用babel将js兼容低版本浏览器
                    "ts-loader", //最后面的先执行，ts-loader放最后，先把ts转换为js
                ],
                //排除的文件
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    //通过插件自动生成html并引入打包后的js
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],

    //指定哪些文件可以作为模块使用
    resolve: {
        extensions: [".ts", ".js"]
    }
}