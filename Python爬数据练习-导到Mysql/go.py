#!/usr/bin/python
# coding: utf-8 || Python 3.7 || Python爬JSON数据练习

import urllib.request
import json
import pymysql as mdb

# 连接数据库
config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'passwd': 'root',
    'db': 'test_py',
    'charset': 'utf8'
}
db = mdb.connect(**config)
cursor = db.cursor()

# JSON格式的接口
url = 'https://www.lihuyong.com/json/listSearch.php?page=1'
header = {
   'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
}
request = urllib.request.Request(url, headers=header)
reponse = urllib.request.urlopen(request).read()

# 输出JSON
data = json.loads(reponse)
items = data['list']

# 存入数据库
sql = "INSERT INTO web_data(title, abs, date) VALUES (%s, %s, %s)"  # SQL语句

try:
   for item in items:
      print("插入一条数据ID为" + item['id'])
      cursor.execute(sql, (item['title'], item['abs'], item['date'])) # 执行SQL语句
      db.commit()
   else:
      print("没有循环数据!")
   print("完成循环!")
except:
    db.rollback()

# 关闭数据库连接
db.close()