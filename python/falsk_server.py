<<<<<<< HEAD
z#-*- coding:utf-8 -*-
import requests
from urllib.request import urlopen
import bs4
import pymysql
conn = pymysql.connect(host='localhost',port=3306,user='ssafy', password='ssafy',
                       db='javer', charset='utf8')
curs = conn.cursor()
sqldel = "delete from news"
curs.execute(sqldel)
url_list=[]
url_list.append("https://search.naver.com/search.naver?&where=news&query=%EC%B2%AD%EB%85%84%20%EA%B8%88%EC%9C%B5&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:dd,p:all,a:all&mynews=0&start=1&refresh_start=0")
file_data=dict()
data=[]
for url in url_list:
    html = urlopen(url)
    bs_obj = bs4.BeautifulSoup(html.read(),"html.parser")
    ul= bs_obj.find("ul",{"class":"type01"})
    lis = ul.findAll("li")
    for li in lis:
        txt = li.find("img")
        if(txt is None):
                continue
        title_item=li.find("dt").find("a")
        imgurl=txt["src"].strip()
        urltitle = title_item["href"].strip()
        title = title_item["title"].strip()
        print(title)
        sql = "insert into news(img,urltitle,title) values(%s,%s,%s)"
        curs.execute(sql,(imgurl,title,imgurl))
conn.commit()
conn.close()
=======
# -*- coding:utf-8 -*-
from flask import Flask, json, Response
from flask_restful import Resource, Api
from flask_restful import reqparse
import requests
from urllib.request import urlopen
import bs4
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api = CORS(app)
api = Api(app)


class CreateUser(Resource):
    def post(self):
        try:
            url_list = []
            url_list.append("https://search.naver.com/search.naver?&where=news&query=%EC%B2%AD%EB%85%84%20%EA%B8%88%EC%9C%B5&sm=tab_pge&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:dd,p:all,a:all&mynews=0&start=1&refresh_start=0")
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

                    article = {"imgurl": imgurl,
                               "urltitle": urltitle, "title": title}
                    data.append(article)
            file_data["news"] = data
            json_string = json.dumps(file_data, ensure_ascii=False)
            response = Response(
                json_string, content_type="application/json; charset=utf-8")
            return response
        except Exception as e:
            return {'error': str(e)}


api.add_resource(CreateUser, '/user')

if __name__ == '__main__':
    app.run(port=80, debug=True)
>>>>>>> 79782ad6338e8b96154ae1b71b6db8258bc2c27e
