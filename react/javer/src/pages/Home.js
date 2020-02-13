import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Ctest from "../components/Ctest";
import CardPart from "../components/CardPart";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
  const [newsdata, setNewsdata] = React.useState([]);

  useEffect(() => {
    const url = `http://15.165.18.192:8080/api/news`;
    axios
      .get(url)
      .then(res => {
        console.log(res.data.resdata);
        setNewsdata(res.data.resdata);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const middledata = [
    {
      title: "주식투자",
      description: "가장 높은 가치를 찾으세요!",
      url: "/stock"
    },
    {
      title: "청년정책",
      description: "당신에게 맞는 정책을 찾아보세요!",
      url: "/policy"
    },
    {
      title: "부동산",
      description: "저렴하고 좋은 방을 찾아보세요!",
      url: "/estate"
    },
    {
      title: "코인투자",
      description: "새로운 투자처를 찾으시는 분들에게 추천합니다.",
      url: "/coin"
    }
  ];

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        style={{
          width: "85%"
          // marginLeft: "10%"
          // marginTop: "4rem"
        }}
      >
        <Ctest />
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{
          width: "100%"
        }}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          style={{
            backgroundColor: "#fafafa"
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              marginLeft: "170px",
              marginTop: "40px",
              fontFamily: "Nanum Gothic"
            }}
          >
            자산관리 지금 시작하세요!
          </p>
        </Grid>
        <Grid
          container
          direction="row"
          style={{
            backgroundColor: "#fafafa",
            width: "100%",
            paddingBottom: "50px"
          }}
        >
          <Grid
            inputMode
            container
            direction="row"
            justify="center"
            spacing={2}
            style={{
              width: "100%",
              height: "100%",
              marginLeft: "10%",
              marginRight: "10%"
            }}
          >
            {middledata.map(data => (
              <Grid item xs={3}>
                <Card data={data} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <Grid>
            <h1 style={{ marginBottom: "1px", fontFamily: "Noto Serif KR" }}>
              News
            </h1>
            <hr
              style={{
                marginBottom: "20px",
                border: "0",
                height: "3px",
                background: "blue"
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
          style={{
            marginBottom: "20px",
            backgroundColor: "white"
          }}
        >
          {newsdata.map(data => (
            <Grid item>
              <CardPart key={data.title} data={data} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* <Grid
        style={{ width: "100%", height: "10rem", backgroundColor: "#555555" }}
      ></Grid> */}
    </Grid>
  );
};

export default Home;
