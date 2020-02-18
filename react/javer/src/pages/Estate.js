import React, { useState } from "react";
import stock from "../images/estate_header2.png";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import TableFooter from "@material-ui/core/TableFooter";
// import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

const StockHeader = () => (
  <header
    style={{
      borderRadius: "5px",
      marginTop: "30px"
      // background: "white"
    }}
  >
    <img
      src={stock}
      alt=""
      style={{
        height: "auto",
        width: "100%",
        opacity: "1",
        // filter: "blur(1px)",
        borderRadius: "5px",
        marginBottom: "2rem"
      }}
    />
  </header>
);

const Estate = () => {
  const daum = window.daum;
  const kakao = window.kakao;
  const [map, setMap] = useState();
  const [bcode, setBcode] = useState();
  const [estate_data, setData] = useState([]);
  var ps = new kakao.maps.services.Places();
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  window.onload = function() {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(35.205595, 126.897714),
      level: 3
    };
    // map = new kakao.maps.Map(container, options);
    setMap(new kakao.maps.Map(container, options));
  };
  //다음api이용 주소 입력 및 법정동 코드 설정
  function change1() {
    new daum.Postcode({
      oncomplete: function(data) {
        document.getElementById("addr_keyword").value = data.address;
        setBcode(data.bcode);
        change2();
      }
    }).open();
  }
  //공공데이터api에서 값 읽어오기... 및 해당 주소로 맵 옮기기
  function change2() {
    const url =
      "http://apis.data.go.kr/1611000/nsdi/ReferLandPriceService/attr/getReferLandPriceAttr";
    const apikey =
      "o6uRceUbUhCUY%2B2E%2BHFF%2FijQVbjxuVBBG1FWgPaU88%2FgNSfM9PMpYSSzLC0Ut1Xg7ZMz2c7VA7ITUZLTZPDGXQ%3D%3D";
    const apiurl = url + "?serviceKey=" + apikey + "&ldCode=" + bcode;

    axios
      .get(apiurl)
      .then(Response => {
        console.log(Response.data);
      })
      .catch(e => console.log(e));

    ps.keywordSearch(
      document.getElementById("addr_keyword").value + " 부동산",
      placesSearchCB
    );
  }

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        console.log(data[i]);
      }
      setData(data);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  }

  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
    });
  }

  const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  }));
  const classes = useStyles1();

  return (
    <div>
      <StockHeader />
      <div
        class="section-headline text-center"
        style={{
          textAlign: "center"
        }}
      ></div>
      <Grid
        container
        direction="row"
        style={{
          backgroundColor: "white",
          width: "20rem",
          position: "absolute",
          zIndex: "2",
          marginBottom: "2rem",
          marginLeft: "1rem",
          marginTop: "1rem",
          border: "1px solid black",
          padding: "10px"
        }}
      >
        <Grid item xs={9}>
          <TextField
            size="small"
            variant="outlined"
            id="addr_keyword"
            type="text"
            class="input_text"
            placeholder="주소를 입력하세요"
            style={{ width: "100%", backgroundColor: "white" }}
          />
          <TextField
            size="small"
            variant="outlined"
            id="bcode"
            type="text"
            class="input_text"
            value={bcode}
            placeholder="법정명코드를 입력하세요"
            style={{ width: "100%", backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={2} style={{ marginLeft: "9px" }}>
          <Button
            variant="outlined"
            onClick={change2}
            style={{
              marginRight: "1rem",
              backgroundColor: "rgba(100, 181, 246, 0.8)",
              borderRadius: "100px",
              color: "white",
              marginBottom: "5px"
            }}
          >
            검색
          </Button>
          <Button
            variant="outlined"
            onClick={change1}
            style={{
              backgroundColor: "rgba(100, 181, 246, 0.8)",
              borderRadius: "100px",
              color: "white"
            }}
          >
            주소
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={8} style={{ border: "1px solid black" }}>
          <div
            id="map"
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "50rem"
            }}
          ></div>
        </Grid>
        <Grid item xs={4} style={{ backgroundColor: "white" }}>
          <TableContainer
            component={Paper}
            style={{ border: "1px solid black" }}
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right" style={{ paddingRight: "0px" }}>
                    순위
                  </TableCell>
                  <TableCell align="center">이름</TableCell>
                  <TableCell align="center">전화번호</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estate_data.map((estate_dataset, idx) => (
                  <TableRow key={estate_dataset.name}>
                    <TableCell align="center" component="th" scope="data">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left">
                      {estate_dataset.place_name}
                    </TableCell>
                    <TableCell align="left">{estate_dataset.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Estate;
