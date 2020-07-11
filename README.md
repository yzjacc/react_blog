# version 1.0.0

## 时间: 
    2020.07.10
## 特点: 
    乞丐版 页面基础展示
## 页面：
## 缺点:
    页面不华丽 数据单一
## 目的:
    更新flutter有关内容

## 问题 : 
    1.Client does not support authentication protocol requested by server; consider upgrading MySQL client
    
    mysql命令行
    USE mysql;
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码';
    FLUSH PRIVILEGES;
    2.Git 指令
    git remote add origin {远程仓库地址} 添加远程仓库地址到本地仓库
    git fetch origin master 把远程库更新到本地
    git pull = git fetch + git merge两个过程，在实际使用过程中，git fetch更安全，因为在merge之前，我们可以查看更新情况，决定是否合并。
    
    git 回滚commit步骤
    git log查看提交历史及提交的commit_id
    回退命令：
    $ git reset --hard HEAD^         回退到上个版本
    $ git reset --hard HEAD~3        回退到前3次提交之前，以此类推，回退到n次提交之前
    $ git reset --hard commit_id     退到/进到 指定commit的sha码
    强推到远程：
    $ git push origin HEAD --force
    
    
    fatal: Out of memory, malloc failed (tried to allocate 18446744072227747840 bytes)
    修改git config配置 为git@ 地址
