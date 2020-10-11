## 克隆代码库
```
git clone https://github.com/gmaso/blog.git

# 克隆子模块（主题）
git submodule init
git submodule update
```
提示：不安裝主题子模块，会导致提示 WARN  No layout: index.html

## 安装依赖
```
npm install
```

## 打开开发服务器
```
hexo server
```

## 修改完成后
```
hexo clean
hexo generate
```

## 部署到服务器
```
# 服务器上添加目录 /usr/share/nginx/html，并把所有者改为 ubuntu

# 把文件拷贝到服务器上
scp -i ~/.config/ssh/qcloud_36 -r public/* ubuntu@119.27.167.230:/usr/share/nginx/html
```

## 服务器 nginx 配置
