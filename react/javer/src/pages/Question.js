import React, { useEffect } from "react";
import Board from "../components/Board";
import { Grid, Button } from "@material-ui/core";
import qa from "../images/Q&A2.png";
import axios from "axios";
import zunoblog from "../images/zunoblog.png";

const Question = ({ history }) => {
  const [datas, setDatas] = React.useState([]);

  useEffect(() => {
    const url = "http://15.165.18.192:8080/api/board";
    axios
      .get(url)
      .then(res => {
        console.log(res);
        console.log(res.data.resdata);
        setDatas(res.data.resdata.reverse());
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const doquestion = () => {
    if (localStorage.getItem("uid")) {
      history.push("/createquestion/0");
    } else {
      return alert("로그인이 필요합니다.");
    }
  };

  return (
    <Grid container style={{ marginTop: "10px" }}>
      <h1 style={{ fontFamily: "Nanum Gothic" }}>묻고 답하기</h1>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{
          border: "1px solid #c8d0d0",
          borderRadius: "5px",
          marginTop: "5px",
          height: "7rem"
        }}
      >
        <Grid item xs={7} container direction="row" alignItems="center">
          <img src={qa} alt="" height="70px" />
          <h2 style={{ fontFamily: "Nanum Gothic" }}>
            궁금한 것을 질문해 보세요!
          </h2>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={doquestion}>
            질문하기
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "10px", marginBottom: "5px" }}>
        <hr />
      </Grid>
      <Grid item xs={9}>
        {datas.map(data => (
          <Board key={data.bnum} one={data} />
        ))}
      </Grid>
      {/* // style={{ backgroundImage: `url(${zunoblog})`, width: "100%" }} */}
      <Grid item xs={3}>
        <a href="https://zunoxi.tistory.com/">
          <img
            src={zunoblog}
            alt=""
            style={{ width: "90%", marginLeft: "10%" }}
          />
        </a>
      </Grid>
    </Grid>
  );
};

export default Question;
