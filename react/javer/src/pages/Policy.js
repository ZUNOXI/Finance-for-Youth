import React from "react";
import { policyInfo } from "../components/PolicyInfo";
import PolicyCard from "../components/PolicyCard";
import { Grid, Paper, Tab, Tabs } from "@material-ui/core";
import youngpolicy from "../images/youngpolicy.jpg";
import Grow from "@material-ui/core/Grow";

const Policy = () => {
  const [tabvalue, setTabvalue] = React.useState(0);
  const [datavalue, setDatavalue] = React.useState(policyInfo);
  const words = ["전체", "창업", "취업지원", "생활&복지", "금융", "주거"];
  const tabChange = (event, newvalue) => {
    setTabvalue(newvalue);
    if (newvalue === 0) {
      setDatavalue(policyInfo);
    } else {
      setDatavalue(
        policyInfo.filter(data => data.category === words[newvalue])
      );
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <img
        src={youngpolicy}
        alt=""
        style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
      />
      <Paper
        style={{
          backgroundColor: "black",
          color: "white",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Tabs value={tabvalue} onChange={tabChange}>
          <Tab label="전체" style={{ fontFamily: "Nanum Gothic" }} />
          <Tab label="창업" style={{ fontFamily: "Nanum Gothic" }} />
          <Tab label="취업지원" style={{ fontFamily: "Nanum Gothic" }} />
          <Tab label="생활&복지" style={{ fontFamily: "Nanum Gothic" }} />
          <Tab label="금융" style={{ fontFamily: "Nanum Gothic" }} />
          <Tab label="주거" style={{ fontFamily: "Nanum Gothic" }} />
        </Tabs>
      </Paper>
      <Grid container direction="row" spacing={3}>
        {datavalue.map((data, idx) => (
          <Grow in={true}>
            <Grid item xs={3}>
              <PolicyCard data={data} key={idx} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </div>
  );
};

export default Policy;
