#!/usr/bin/python
# coding: utf-8 || Python 3.7 || Python爬JSON数据练习

import urllib.request
import json

# JSON格式的接口
url = 'https://www.lihuyong.com/json/listSearch.php?page=1'
header = {
   'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
}

request = urllib.request.Request(url, headers=header)
reponse = urllib.request.urlopen(request).read()


# 输出out.txt文件
print("将结果输出到out.txt上 ==========")
data = str(json.loads(reponse))
fhandle = open("./out.txt", "w")
fhandle.write(data)
fhandle.close()