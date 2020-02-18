import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import estate_carousel from "../images/estate_carousel.png";
// import youngmoney from "../images/youngfindjobmoney.jpg";
import crypcoin from "../images/cryptocoin.png";
import mainstock from "../images/mainstock.jpg";
// import img_submain from "../images/img_submain.png";
// import untitile from "../images/Untitled.jpg";
import mainzuno from "../images/mainzuno.png";
import mainjob from "../images/mainjob.png";
import {
  //   FormLabel,
  //   FormControlLabel,
  //   Checkbox,
  //   Radio,
  //   RadioGroup,
  Paper,
  // Button,
  Grid
} from "@material-ui/core";

import "../style/SecondExample.scss";

function Project(props) {
  return (
    <a href={props.item.url} style={{ textDecoration: "none" }}>
      <Paper
        className="Project"
        style={{
          // backgroundColor: props.item.color,
          backgroundImage: props.item.background,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "400px",
          padding: "0px"
        }}
        elevation={10}
      >
        <div
          style={{
            background: "black",
            WebkitMaskImage:
              "-webkit-linear-gradient(left, rgba(255, 255, 255, 0.8) 10%, transparent 50% )",
            padding: "30px",
            width: "100%",
            height: "100%"
          }}
        >
          <h2 style={{ fontFamily: "Nanum Gothic" }}>{props.item.name}</h2>
          <p style={{ fontFamily: "Noto Serif KR" }}>
            {props.item.description}
          </p>
          {/* <Button className="CheckButton">Check!</Button> */}
        </div>
      </Paper>
    </a>
  );
}

const items = [
  // {
  //   name: "ZunoBlog",
  //   description: "",
  //   color: "#C9A27E",
  //   background: `url(${untitile})`,
  //   url: "https://zunoxi.github.io/Portfolio/"
  // },
  {
    name: "Cryptocurrency",
    description: "블록체인 기술을 기반으로 만들어진 온라인 암호화폐",
    color: "#64ACC8",
    background: `url(${crypcoin})`,
    url: ""
  },
  {
    name: "Stock investment",
    description: "한눈에 보는 주요 KOSDAQ 정보",
    color: "#7D85B1",
    background: `url(${mainstock})`,
    url: ""
  },
  {
    name: "청년전세임대주택",
    description: "놓치지 마세요 미래를 준비하세요",
    color: "#CE7E78",
    background: `url(${estate_carousel})`,
    url: "https://apply.lh.or.kr/LH/index.html#MN::CLCC_MN_0010:"
  },
  {
    name: "청년구직활동지원금",
    description: "당신의 꿈을 응원합니다.",
    color: "#C9A27E",
    background: `url(${mainzuno})`,
    url: "https://youthcenter.go.kr/main.do"
  },
  {
    name: "ZunoBlog",
    description: "Zuno를 공유합니다.",
    color: "#C9A27E",
    background: `url(${mainjob})`,
    url: "https://zunoxi.tistory.com"
  }
];

export default class MyProjectsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 10,
      animation: "fade",
      indicators: false
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value
    });
  }

  render() {
    return (
      <Grid container justify="center">
        <Carousel
          className="SecondExample"
          autoPlay={this.state.autoPlay}
          timer={this.state.timer}
          animation={this.state.animation}
          indicators={this.state.indicators}
        >
          {items.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
        </Carousel>
      </Grid>
    );
  }
}
