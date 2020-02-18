import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Ctest from "../components/Ctest";
import CardPart from "../components/CardPart";
import axios from "axios";
import Card from "../components/Card";
import Slide from "@material-ui/core/Slide";

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
      description: "주변의 부동산 중개소를 알아보세요!",
      url: "/estate"
    },
    {
      title: "암호화폐",
      description: "금융의 미래가치를 확인하세요!",
      url: "/coin"
    }
  ];

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ marginTop: "30px" }}
    >
      <Grid
        style={{
          width: "100%"
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
              marginLeft: "8%",
              marginTop: "40px",
              fontFamily: "Nanum Gothic"
            }}
          >
            Young People - Invest in the future!
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
              marginLeft: "5%",
              marginRight: "5%"
            }}
          >
            {middledata.map((data, idx) => (
              <Slide direction="left" in={true}>
                <Grid item xs={3} key={idx}>
                  <Card data={data} />
                </Grid>
              </Slide>
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
        <Grid container direction="column">
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
            {newsdata.slice(0, 4).map((data, idx) => (
              <Grid item xs={3} key={idx}>
                <CardPart data={data} />
              </Grid>
            ))}
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
            {newsdata.slice(4, 8).map((data, idx) => (
              <Grid item xs={3}>
                <CardPart key={idx} data={data} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
        style={{ width: "100%", height: "10rem", backgroundColor: "#555555" }}
      ></Grid> */}
    </Grid>
  );
};

export default Home;
