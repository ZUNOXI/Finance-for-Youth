import React from "react";
// import { Link } from 'react-router-dom';
// import { makeStyles } from "@material-ui/core/styles";
// import { Paper } from "@material-ui/core";
import { Card, Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import fundbanner from "../images/fundbanner.jpg";
import blackrock from "../static/media/blackrock.jpg";
import barings from "../static/media/barings.jpg";
import eastspring from "../static/media/eastspring.jpg";
import ibk from "../static/media/ibk.png";
import kb from "../static/media/kb.jpg";
import kiwoom from "../static/media/kiwoom.jpg";
import korea from "../static/media/korea.png";
import ktb from "../static/media/ktb.jpg";
import kyobo from "../static/media/kyobo.jpg";
import midas from "../static/media/midas.png";
import mirae from "../static/media/mirae.png";
import nh from "../static/media/nh.png";
import samsung from "../static/media/samsung.jpg";
import sansungactive from "../static/media/sansungactive.jpg";
import schroders from "../static/media/schroders.jpg";
import sh from "../static/media/sh.jpg";
import woori from "../static/media/woori.jpg";
import hana from "../static/media/hana.jpg";

const Fund = () => {
  const images = [
    { background: blackrock, url: "https://www.blackrock.com/kr" },
    { background: barings, url: "https://www.barings.com/kr/individual" },
    { background: eastspring, url: "https://www.eastspring.com/kr" },
    { background: ibk, url: "http://www.ibkasset.com/index.jsp" },
    { background: kb, url: "http://www.kbam.co.kr/" },
    { background: kiwoom, url: "http://www.kiwoomam.com/" },
    { background: korea, url: "http://www.kim.co.kr/" },
    { background: ktb, url: "http://i-ktb.com/static/pc/html/MA/MA1.html" },
    { background: kyobo, url: "http://www.kyoboitm.co.kr/" },
    { background: midas, url: "http://midasasset.com/" },
    { background: mirae, url: "https://investments.miraeasset.com/" },
    { background: nh, url: "https://www.nh-amundi.com/" },
    { background: samsung, url: "http://www.samsungfund.com/main.action" },
    {
      background: sansungactive,
      url: "http://www.samsungactive.co.kr/main.do"
    },
    {
      background: schroders,
      url: "https://www.schroders.com/ko/kr/asset-management/"
    },
    { background: sh, url: "http://www.shbnppam.com/" },
    { background: woori, url: "http://www.wooriglobalam.com/main/main.asp" },
    { background: hana, url: "http://www.ubs-hana.com/index.jsp" }
  ];

  return (
    <div>
      <header>
        <img
          src={fundbanner}
          alt="fundbanner"
          style={{ width: "100%", marginTop: "30px" }}
        />
      </header>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={0} md={2}></Grid>
        <Grid
          item
          xs={12}
          md={8}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {images.map(data => (
            <Grid item xs={6} sm={4}>
              <a href={data.url}>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "7vw",
                    margin: "5%"
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px"
                    }}
                  >
                    <img
                      src={data.background}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        objectFit: "contain"
                      }}
                      alt=""
                    />
                  </CardContent>
                </Card>
              </a>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={0} md={2}></Grid>
      </Grid>
    </div>
  );
};

export default Fund;
