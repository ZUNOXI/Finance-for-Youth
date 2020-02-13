import React from "react";

const datas = [
  {
    id: 1,
    title: "코스피",
    content: "10000"
  },
  {
    id: 2,
    title: "코스닥",
    content: "734592"
  }
];

const Substock = () => {
  return datas.map(data => (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  ));
};

export default Substock;
