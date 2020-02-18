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
import { Grid } from "@material-ui/core";
import Signup from "./pages/Signup";
import Write from "./pages/Write";
import DetailQuestion from "./pages/DetailQuestion";
import CreateQuestion from "./pages/CreateQuestion";
import javalogo from "./images/javalogo.png";
import springlogo from "./images/springlogo.png";
import reactlogo from "./images/reactlogo.png";
import dockerlogo from "./images/dockerlogo.png";
import Loginout from "./components/Loginout";
import javer from "./images/javer4.png";

import "./App.css";

const App = () => {
  const [jwtbool, setJwtbool] = React.useState(
    localStorage.getItem("jwtToken")
  );

  return (
    <div style={{ height: "100%" }}>
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <AppBar
          position="static"
          color="default"
          style={{ backgroundColor: "rgba(255, 255, 255)", boxShadow: "none" }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px"
            }}
          >
            <Grid item xs={8} sm={10}>
              <Button href="/">
                <img
                  src={javer}
                  alt="javer"
                  style={{ width: "100px", height: "auto" }}
                />
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
                암호화폐
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
            <Grid item xs={4}>
              <Loginout jwtbool={jwtbool} setJwtbool={setJwtbool} />
            </Grid>
          </Toolbar>
        </AppBar>
        <Route path="/" component={Home} exact={true} />
        <Route path="/question" component={Question} exact={true} />
        <Route path="/question/:id" component={DetailQuestion} create={true} />
        <Route path="/createquestion/:id" component={CreateQuestion} />
        <Route path="/stock" component={Stock} />
        <Route path="/estate" component={Estate} />
        <Route path="/fund" component={Fund} />
        <Route path="/coin" component={Coin} />
        <Route path="/policy" component={Policy} />
        <Route path="/signup" component={Signup} />
        <Route path="/wirte" component={Write} />
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
            copyright® HoyeonGgi Ltd. All rights Reserved.
            <br />
            대표 : 임기남
            <br />
            대표전화 : 010 - 3331 - 2103
            <br />
            광주광역시 전대 근처 어딘가 도경수네 집
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
