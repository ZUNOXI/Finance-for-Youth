import React from "react";
import { Route } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import Stock from "./pages/Stock";
import Home from "./pages/Home";
import Fund from "./pages/Fund";
import Coin from "./pages/Coin";
import Policy from "./pages/Policy";
import Estate from "./pages/Estate";
import Question from "./pages/Question";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Signup from "./pages/Signup";
import Write from "./pages/Write";
import DetailQuestion from "./pages/DetailQuestion";
import CreateQuestion from "./pages/CreateQuestion";
import javalogo from "./images/javalogo.png";
import springlogo from "./images/springlogo.png";
import reactlogo from "./images/reactlogo.png";
import dockerlogo from "./images/dockerlogo.png";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
import "./App.css";
import { userActions } from "./redux/actions/userActions";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: "flex",
    justifyContent: "center"
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const useModalStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const App = () => {
  const classes = useStyles();
  const modalclasses = useModalStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const [userid, setUserid] = React.useState("");
  const [userpw, setUserpw] = React.useState("");

  const onChangeId = e => {
    setUserid(e.target.value);
  };

  const onChangePw = e => {
    setUserpw(e.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const signupstyle = { fontSize: "7px" };

  const login = e => {
    console.log(userid, userpw);
    e.preventDefault();
    // const uid = jwt_decode(localStorage.getItem("jwtToken")).uid;
    if (localStorage.getItem("jwtToken")) {
      setJwtbool(true);
      setOpen(false);
      alert("이미 로그인 되어있습니다.");
    } else {
      setJwtbool(false);
      setOpen(false);
      userActions.login(userid, userpw);
    }
  };

  const logout = () => {
    if (localStorage.getItem("uid")) {
      localStorage.removeItem("uid");
    }
    if (localStorage.getItem("jwtToken")) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("uid");
      setJwtbool(false);
    } else {
      setJwtbool(false);
      alert("이미 로그아웃 되었습니다.");
    }
  };
  // 전역 로그인 검증 생각중
  // useEffect(() => {
  //   console.log(jwt_decode(localStorage.jwtToken).uid);
  //   const url = "";
  //   const datas = localStorage.jwtToken;
  //   axios
  //     .post(url, datas)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }, []);
  const [jwtbool, setJwtbool] = React.useState(
    localStorage.getItem("jwtToken")
  );

  return (
    <div style={{ height: "100%" }}>
      <AppBar
        position="static"
        color="default"
        style={{ backgroundColor: "rgba(255, 255, 255)", boxShadow: "none" }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Grid item sm={2}></Grid>
          <Grid item xs={8} sm={10}>
            <Button href="/home">
              <Typography
                variant="h4"
                className={"yo"}
                style={{ color: "blue" }}
              >
                JAVER
              </Typography>
            </Button>
            {/* </a> */}

            <Button
              color="inherit"
              href="/stock"
              style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
            >
              주식
            </Button>

            <Button
              color="inherit"
              href="/estate"
              style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
            >
              부동산
            </Button>

            <Button
              color="inherit"
              href="/fund"
              style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
            >
              펀드
            </Button>
            <Button
              color="inherit"
              href="/coin"
              style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
            >
              코인
            </Button>

            <Button
              color="inherit"
              href="/policy"
              style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
            >
              정책
            </Button>

            <Button
              color="inherit"
              href="/question"
              style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
            >
              Q&A
            </Button>
          </Grid>
          <Grid item xs={2}>
            {jwtbool ? (
              <div>
                <div style={{ fontFamily: "Nanum Gothic", display: "inline" }}>
                  {localStorage.getItem("uid")}
                </div>
                <Button
                  color="inherit"
                  onClick={logout}
                  variant="outlined"
                  style={{ marginLeft: "12px", fontFamily: "Nanum Gothic" }}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button
                color="inherit"
                onClick={handleOpen}
                variant="outlined"
                style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
              >
                로그인
              </Button>
            )}
          </Grid>
          <Grid item sm={1}></Grid>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div style={modalStyle} className={classes.paper}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <h1
                  id="simple-modal-title"
                  style={{ color: "blue", fontFamily: "bold" }}
                >
                  JAVER
                </h1>
                {/* <p id="simple-modal-description"> */}
                {/* 여기 form 태그 로그인 모달창 내부 */}
                <form
                  className={modalclasses.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={login}
                >
                  <div>
                    <TextField
                      id="id"
                      label="Id"
                      variant="outlined"
                      value={userid}
                      onChange={onChangeId}
                      style={{ marginBottom: "5%" }}
                    />
                    <TextField
                      value={userpw}
                      onChange={onChangePw}
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                    />
                  </div>
                  <Grid>
                    <Button style={signupstyle} href="/signup">
                      회원가입
                    </Button>
                    <Button style={signupstyle}>아이디찾기</Button>
                    <Button style={signupstyle}>비밀번호찾기</Button>
                  </Grid>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Login
                    </Button>
                  </div>
                </form>
                {/* </p> */}
              </Grid>
            </div>
          </Modal>
        </Toolbar>
      </AppBar>
      {/* <Route path="/" component={Home} exact={true} /> */}
      <Route path="/home" component={Home} />
      <div style={{ marginLeft: "15%", marginRight: "15%", height: "100%" }}>
        <Route path="/question" component={Question} exact={true} />
        <Route path="/question/:id" component={DetailQuestion} create={true} />
        <Route path="/createquestion/:id" component={CreateQuestion} />
      </div>
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <Route path="/stock" component={Stock} />
        <Route path="/estate" component={Estate} />
        <Route path="/fund" component={Fund} />
        <Route path="/coin" component={Coin} />
        <Route path="/policy" component={Policy} />
        <Route path="/signup" component={Signup} />
        <Route path="/wirte" component={Write} />

        {/* <Route path="/question/:id/:answerid" /> */}
      </div>
      <footer
        style={{
          backgroundColor: "#eceff1",
          color: "#757575",
          marginTop: "2%",
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "2%",
          paddingBottom: "2%"
        }}
      >
        <hr style={{ marginBottom: "2%" }} />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid>
            copyright® hoyeonGgi Ltd. All rights Reserved.
            <br />
            대표전화 : 010-3331-2103
            <br />
            광주광역시 하남산단6번로 133(2층, 221)
          </Grid>
          <Grid>
            <img src={javalogo} alt="javalogo" style={{ height: "50px" }} />
            <img src={springlogo} alt="springlogo" style={{ height: "50px" }} />
            <img src={reactlogo} alt="reactlogo" style={{ height: "50px" }} />
            <img src={dockerlogo} alt="dockerlogo" style={{ height: "50px" }} />
          </Grid>
        </Grid>
      </footer>
    </div>
  );
};

export default App;
