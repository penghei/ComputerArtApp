# 基本使用

git clone 下载下来之后

```
安装依赖:
yarn

启动:
yarn dev
```

启动打开的是开发环境下的页面,不能直接进行部署.
yarn dev 启动后会在`localhost:3000`开启项目

# 请求配置

vite.config.ts 用于配置请求 url 前缀:

```js
 proxy: {
      "/api": {
        target:
          "http://127.0.0.1:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
```

target 就是 请求 url 的前面部分,其后的路径不用管,如果要更改的话从这里改就行
