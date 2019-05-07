#!/usr/bin/python
# coding: utf-8 || Python 3.7

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

sql = "SELECT * FROM user" # SQL 查询语句
try:
    # 执行SQL语句
    cursor.execute(sql)

    # 获取所有记录列表
    results = cursor.fetchall()
    for row in results:
        id = row[0]
        name = row[1]
        age = row[2]
        address = row[3]
        job = row[4]

        # 打印结果
        print ("ID-%d, 名字-%s, 年龄-%d, 地址-%s, 工作-%s" %(id, name, age, address, job))
except:
    print ("获取数据失败！")

# 关闭数据库连接
db.close()