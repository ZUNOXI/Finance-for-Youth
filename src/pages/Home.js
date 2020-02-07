import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Substock from "../components/Substock";
import Ctest from "../components/Ctest";
import CardPart from "../components/CardPart";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [newsdata, setNewsdata] = React.useState([]);

  useEffect(() => {
    const url = `http://localhost:9090/api/news`;
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

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      backgroundColor="black"
    >
      <Grid
        style={{
          backgroundColor: "white",
          width: "100%"
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
          backgroundColor: "  ",
          width: "100%"
        }}
      >
        {/* <Grid item xs={12}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className={classes.root}
          >
            <Link to="/home">
              <BottomNavigationAction label="News" icon={<RestoreIcon />} />
            </Link>
            <Link to="/home/substock">
              <BottomNavigationAction label="Stock" icon={<FavoriteIcon />} />
            </Link>
            <Link to="/home/subcoin">
              <BottomNavigationAction label="Coin" icon={<LocationOnIcon />} />
            </Link>
          </BottomNavigation>
        </Grid>
        <Grid item xs={12}>
          <Route path="/home/substock" component={Substock} />
        </Grid> */}
        <Grid
          style={{
            backgroundColor: "lightgray",
            height: "30rem",
            width: "100%"
          }}
        >
          ㅇㅇㅇㅇ
        </Grid>
        <Grid>
          <h1 style={{ marginBottom: "1px" }}>News</h1>
          <hr
            style={{
              marginBottom: "20px",
              border: "0",
              height: "3px",
              background: "blue"
            }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginBottom: "0px" }}
        >
          {newsdata.map(data => (
            <CardPart data={data} />
          ))}
        </Grid>
      </Grid>

      <Grid
        style={{ width: "100%", height: "10rem", backgroundColor: "#555555" }}
      >
        empty
      </Grid>
    </Grid>
  );
};

export default Home;
