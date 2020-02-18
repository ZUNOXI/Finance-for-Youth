import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import questionicon from "../images/questionicon.png";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import axios from "axios";
// import { withStyles } from "@material-ui/core/styles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`
  };
}

const CreateQuestion = ({ history, match }) => {
  // const words = ["stock", "estate", "fund", "coin", "other"];

  const [values, setValues] = useState({
    id: localStorage.getItem("uid"),
    title: "",
    content: "",
    ctg: 0,
    hit: 0,
    creation_date: 0
  });

  const [tabs, setTabs] = useState(0);
  // const [cateinfo, setCateinfo] = useState("stock");

  const handleChangetab = (event, newValue) => {
    // setCateinfo(words[newValue]);
    setTabs(newValue);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    // console.log(match.params.id);
    if (match.params.id !== "0") {
      axios
        .get(`http://15.165.18.192:8080/api/boarddetail/${match.params.id}`)
        .then(res => {
          console.log(res);
          setValues({
            ...values,
            id: res.data.resdata.uid,
            title: res.data.resdata.btitle,
            content: res.data.resdata.bcontent,
            ctg: res.data.resdata.bctg,
            hit: res.data.resdata.bhit,
            creation_date: res.data.resdata.bcreation_date
          });
          handleChangetab(res.data.resdata.bctg);
          // setCateinfo(words[res.data.resdata.bctg]);
          setTabs(res.data.resdata.bctg * 1);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      console.log(match.params.id);
    }
  }, []);

  const saveQuestion = e => {
    e.preventDefault();
    let url = "http://15.165.18.192:8080/api/boardreg";
    let datas = {
      uid: values.id,
      btitle: values.title,
      bcontent: values.content,
      bctg: tabs
    };
    console.log(match.params.id);
    if (match.params.id !== "0") {
      url = "http://15.165.18.192:8080/api/boardupdate";
      datas = {
        bnum: match.params.id,
        uid: values.id,
        btitle: values.title,
        bcontent: values.content,
        bctg: String(tabs),
        bhit: values.hit,
        bcreation_date: values.creation_date
      };
    }
    const headers = { headers: { token: localStorage.token } };
    axios
      .post(url, datas, { headers: headers })
      .then(res => {
        console.log(history);
        history.push("/question");
        console.log(res);
      })
      .catch(e => {
        console.log(e);
        alert(e);
      });
  };

  return (
    <form onSubmit={saveQuestion} method="post">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{ width: "100%", marginTop: "30px" }}
        >
          <img src={questionicon} alt="" style={{ height: "55px" }} />
          <h1>질문</h1>
          <TextField
            id="title"
            name="btitle"
            label="제목"
            value={values.title}
            variant="outlined"
            style={{ width: "80%" }}
            onChange={handleChange("title")}
          />
        </Grid>
        <Grid>
          <AppBar position="static">
            <Tabs value={tabs} onChange={handleChangetab} name="category">
              <Tab label="주식" {...a11yProps(0)} name="stock" />
              <Tab label="부동산" {...a11yProps(1)} name="estate" />
              <Tab label="펀드" {...a11yProps(2)} name="fund" />
              <Tab label="암호화폐" {...a11yProps(3)} name="coin" />
              <Tab label="기타" {...a11yProps(4)} name="other" />
            </Tabs>
          </AppBar>
        </Grid>
        <Grid style={{ width: "100%", marginTop: "10px" }}>
          <TextField
            id="content"
            name="bcontent"
            label="내용"
            variant="outlined"
            value={values.content}
            onChange={handleChange("content")}
            multiline
            rows="20"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid container justify="flex-end" style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" type="submit">
            제출
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateQuestion;
