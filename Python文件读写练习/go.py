#!/usr/bin/python
# coding: utf-8 || Python 3.7 || Python文件读写练习

f = open('./test.txt', 'r')  # 打开文件
result = list()
for line in f.readlines():  # 依次读取每行
    line = line.strip()  # 去掉每行头尾空白
    if not len(line) or line.startswith('#'):  # 判断是否是空行或注释行
        continue  # 是的话，跳过不处理
    result.append(line)  # 不是的话保存结果
result.sort()  # 排序
f.close()  # 关闭文件

with open('./test_out.txt', 'w', encoding='utf-8') as fw:  # with方式不需要再进行close
   fw.write('%s' % '\n'.join(result))  # 保存入结果文件
   fw.write('\n' + '换行输出结果')

print("输出文本到tes_out.txt成功")