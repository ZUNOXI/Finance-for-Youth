import React, { useState } from "react";
import axios from "axios";

const News = () => {
  const URL = "http://127.0.0.1/user";
  const [datas, setDatas] = useState([]);
  axios
    .post(URL)
    .then(res => {
      console.log(res);
      setDatas(res.data.news);
    })
    .catch(e => {
      console.log(e);
    });
  return datas.map(data => (
    <div key={data}>
      <a href={data.urltitle}>
        <img src={data.imgurl} alt="" />
        <h4>{data.title}</h4>
      </a>
    </div>
  ));
};

export default News;
