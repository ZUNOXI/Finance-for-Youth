# -*- coding:utf-8 -*-
import requests
from urllib.request import urlopen
import bs4
import pymysql
conn = pymysql.connect(host='localhost', port=3306, user='root', password='ssafy',
                       db='javer', charset='utf8')
curs = conn.cursor()
sqldel = "delete from news"
curs.execute(sqldel)
url_list = []
url_list.append("https://search.naver.com/search.naver?&where=news&query=%EC%B2%AD%EB%85%84%20%EA%B8%88%EC%9C%B5&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:dd,p:all,a:all&mynews=0&start=1&refresh_start=0")
url_list.append("https://search.naver.com/search.naver?&where=news&query=%EC%B2%AD%EB%85%84%20%EA%B8%88%EC%9C%B5&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:dd,p:all,a:all&mynews=0&start=1&refresh_start=1")
file_data = dict()
data = []
for url in url_list:
    html = urlopen(url)
    bs_obj = bs4.BeautifulSoup(html.read(), "html.parser")
    ul = bs_obj.find("ul", {"class": "type01"})
    lis = ul.findAll("li")
    for li in lis:
        txt = li.find("img")
        if(txt is None):
            continue
        title_item = li.find("dt").find("a")
        imgurl = txt["src"].strip()
        urltitle = title_item["href"].strip()
        title = title_item["title"].strip()
        print()
        sql = "insert into news(img,urltitle,title) values(%s,%s,%s)"
        curs.execute(sql, (imgurl, title, urltitle))
conn.commit()
conn.close()
