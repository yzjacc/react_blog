version 1.0.0



1.Client does not support authentication protocol requested by server; consider upgrading MySQL client

mysql命令行
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码';
FLUSH PRIVILEGES;
