---
title: Linux 开发环境配置
date: 2020-05-16 10:45:18
tags:
---


## 安装系统（Ubuntu 或 Debian）
推荐 Ubuntu 18.04 或者 Ubuntu 20.04。

#### 更新系统 
```bash
sudo apt update && sudo apt dist-upgrade
```

## 配置环境变量和安装必备软件

<!-- more -->

#### 修改 hosts
1. 打开 https://raw.githubusercontent.com/googlehosts/hosts/master/hosts-files/hosts ，并将其中的内容复制到 /etc/hosts 中
2. 复制以下到 /etc/hosts 中：

```bash
192.30.253.112 github.com
192.30.253.118 gist.github.com
151.101.112.133 assets-cdn.github.com
151.101.184.133 raw.githubusercontent.com
151.101.112.133 gist.githubusercontent.com
151.101.184.133 cloud.githubusercontent.com
151.101.112.133 camo.githubusercontent.com
```

#### 安装 git

#### 安装 zsh 和 oh-my-zsh

```bash
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

##### 安装zsh相关插件
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
git clone https://github.com/lukechilds/zsh-nvm ~/.oh-my-zsh/custom/plugins/zsh-nvm
git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
# 修改 .zshrc 文件，主题修改为 ys，并添加插件
ZSH_THEME="ys"
plugins=(zsh-nvm zsh-autosuggestions zsh-syntax-highlighting git)
# 添加 zsh-nvm 插件后，如果还没有安装 nvm，会在 source .zshrc 后自动开始安装
```

#### 安装 nvm
```bash
// 如果 source 命令没有自动安装 nvm，则手动安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
nvm install 12
npm i -g @tarojs/cli webpack webpack-cli gulp
```

#### 配置 openjdk
1. 安装 openjdk
[JDK 8](http://openjdk.java.net/install/)
Debian, Ubuntu, etc.
On the command line, type:
```bash
sudo apt install openjdk-8-jdk
```
The openjdk-8-jre package contains just the Java Runtime Environment. If you want to develop Java programs then please install the openjdk-8-jdk package.

1. 配置java环境变量
```bash
sudo vi /etc/profile
# 在末尾添加：
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=.:$CLASSPATH:$JAVA_HOME/lib:$JRE_HOME/lib
export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

# 保存退出
source /etc/profile

# 查看版本信息
java -version

```

#### 安装 docker
```bash
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# 添加 docker 用户组，使用非 root 运行
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
docker run hello-world

# 开机启动
sudo systemctl enable docker

# 可设置源，加快镜像下载数据。设置后需要重启 docker 服务，以下源只适用于腾讯云
echo "OPTIONS='--registry-mirror=https://mirror.ccs.tencentyun.com'" >> /etc/sysconfig/docker
systemctl daemon-reload
service docker restart
```



#### 安装 docker-compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose

// 如果下载总是失败，可以直接用第三方下载工具从以下网址下载，完成后复制到 /usr/local/bin/ 中
https://github.com/docker/compose/releases/download/1.25.0/docker-compose-Linux-x64_64
sudo chmod +x /usr/local/bin/docker-compose
```

#### 安装 homebrew
安装可能耗时很久。
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
brew update
```

