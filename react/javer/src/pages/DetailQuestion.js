import React, { useState, useEffect } from "react";
import { Grid, Button, Icon } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import MessageIcon from "@material-ui/icons/Message";
import styled from "styled-components";
import CreateAnswer from "../components/CreateAnswer";
import Answer from "../components/Answer";
import axios from "axios";
import BoardComment from "../components/BoardComment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const DetailQuestion = ({ match, history }) => {
  // eslint-disable-next-line no-unused-expressions
  const [qbool, setQbool] = useState(false);
  const [abool, setAbool] = useState(false);

  const [datas, setDatas] = useState([]); //글
  const [answerdata, setAnswerdata] = useState([]); // 답변

  const calldata = () => {
    axios
      .get(`http://15.165.18.192:8080/api/boarddetail/${match.params.id}`)
      .then(res => {
        console.log(res);
        let tempres = res.data.resdata;
        if (tempres.clist) {
          tempres.clist.reverse();
          tempres.clist.map(one => {
            if (one.rlist) {
              one.rlist.reverse();
            }
            return null;
          });
        }
        if (tempres.rblist) {
          tempres.rblist.reverse();
        }

        console.log(tempres, "tempres");
        setDatas(tempres);
        if (tempres.clist) {
          setAnswerdata(tempres.clist);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    calldata();
  }, []);

  const qcomment = () => {
    if (qbool) {
      setQbool(false);
    } else {
      setQbool(true);
      setAbool(false);
    }
  };

  const showanswer = () => {
    if (abool) {
      setAbool(false);
    } else {
      if (localStorage.getItem("uid")) {
        setAbool(true);
        setQbool(false);
      } else {
        return alert("로그인이 필요합니다.");
      }
    }
  };

  const deletequestion = e => {
    e.preventDefault();
    const url = "http://15.165.18.192:8080/api/boarddelete";
    const datas = {
      bnum: match.params.id
    };
    axios
      .post(url, datas)
      .then(res => {
        history.push("/question");
        console.log(res);
      })
      .catch(e => console.log(e));
  };

  const revisequestion = e => {
    e.preventDefault();
    history.push(`/createquestion/${datas.bnum}`);
  };

  const Icons = () => {
    if (localStorage.getItem("uid") === datas.uid) {
      return (
        <div>
          <StyledIcon component={EditIcon} onClick={revisequestion} />
          <StyledIcon component={DeleteIcon} onClick={deletequestion} />
        </div>
      );
    } else {
      return (
        <Button variant="contained" color="primary" onClick={showanswer}>
          답변하기
        </Button>
      );
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{ marginTop: "10px", height: "100%" }}
    >
      <Grid>
        <a href="./" style={{ textDecoration: "none", color: "black" }}>
          <h1>JAVER Q&A</h1>
        </a>
      </Grid>
      <Grid
        style={{
          border: "1px solid #c8d0d0",
          borderRadius: "5px",
          width: "100%",
          height: "100%"
        }}
      >
        <div style={{ marginLeft: "10%", marginRight: "5%", height: "100%" }}>
          {datas !== {} ? <h1>{datas.btitle}</h1> : <h1>Not connected</h1>}
          <hr style={{ border: "0.5px solid #c8d0d0" }} />
          <br />
          {datas !== {} ? <p>{datas.bcontent}</p> : <p>Empty</p>}
          <br />
          <hr style={{ border: "0.5px solid #c8d0d0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              marginTop: "2%",
              marginBottom: "2%"
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                component={ErrorIcon}
                style={{ height: "15px", marginTop: "10px" }}
              />
              <p style={{ fontSize: "10px" }}>여러분의 지식을 나눠주세요!</p>
            </div>
            <div
              style={{
                display: "flex",
                textAlgin: "center",
                alignItems: "center"
              }}
            >
              <StyledIcon onClick={qcomment} component={MessageIcon} />

              <div>{Icons()}</div>
            </div>
          </div>
          <Collapse in={qbool}>
            <BoardComment
              data={datas.rblist}
              bnum={datas.bnum}
              calldata={calldata}
            />
          </Collapse>
          <Collapse in={abool}>
            <CreateAnswer
              calldata={calldata}
              showanswer={showanswer}
              qcomment={qcomment}
            />
          </Collapse>
        </div>
      </Grid>
      <Grid container justify="flex-end" style={{ marginTop: "2%" }}>
        <Button variant="contained" href="./" style={{ marginRight: "2%" }}>
          목록
        </Button>
      </Grid>
      <p style={{ fontSize: "12px", marginTop: "0px" }}>
        답변 총 {answerdata.length}개
      </p>
      <Grid style={{ width: "100%" }}>
        {answerdata ? (
          answerdata.map(data => (
            <Answer key={data.cnum} data={data} calldata={calldata} />
          ))
        ) : (
          <div></div>
        )}
      </Grid>
    </Grid>
  );
};

export default DetailQuestion;
