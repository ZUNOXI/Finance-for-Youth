import React from "react";

const it = require("./seoul.html");

class Seoul extends React.components {
  render() {
    return <iframe src={it}></iframe>;
  }
}

export default Seoul;
