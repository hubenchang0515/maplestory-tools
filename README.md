# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 配置子模块
```bash
# 创建一个分支作为 submodule
git checkout --orphan gh-pages                           # --orphan 使新分支没有提交历史，即为空分支
git init                                                 # 初始化新的分支
ls | grep -v build | grep -v node_modules | xargs rm -rf # 删除除了 build 和 node_modules 之外的所有文件
cp -rf ./build/* .                                       # 把 build 里的文件复制到仓库根目录
git add * 
git commit -m "build"
git push origin gh-pages  

# 使用 gh-pages 分支作为 submodule，路径为 ./build
git checkout main
git submodule add -b gh-pages https://github.com/hubenchang0515/maplestory-tools ./build
```

> 配置后 build 目录的更新将会推送到 gh-pages 分支里

## 一个暂未解决的问题
由于 semantic-ui 的构建依赖问题，需要将 nodejs 的版本为 v11 且 gulp 的版本为 3.9

```
$ sudo n v11
$ npm install --save-dev gulp@3.9.1
$ npm install semantic-ui --save
```

暂未找到使用新版 nodejs 和 gulp 的方法。

后续安装步骤请查看 [Install semantic-ui](https://semantic-ui.com/introduction/getting-started.html#install-semantic-ui)