import React, { useState, useEffect } from "react";
import stock from "../images/estate_header.png";
import axios from "axios";
import { TextField } from "@material-ui/core";

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
        borderRadius: "5px"
      }}
    />
  </header>
);

const Estate = () => {
  const daum = window.daum;
  const kakao = window.kakao;
  const [map, setMap] = useState();
  var ps = new kakao.maps.services.Places();
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const [searchword, setSearchword] = useState();
  //법정명코드
  //

  const handleChange = e => {
    const targetvalue = e.target.value;
    setSearchword(targetvalue);
  };

  window.onload = function() {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(35.205595, 126.897714),
      level: 3
    };
    // map = new kakao.maps.Map(container, options);
    setMap(new kakao.maps.Map(container, options));
  };

  function change1() {
    new daum.Postcode({
      oncomplete: function(data) {
        document.getElementById("addr_keyword").value = data.address;
        console.log(data.bcode);
      }
    }).open();
    console.log(searchword);
  }

  function change2() {
    console.log(document.getElementById("addr_keyword").value);
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
      }
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

  return (
    <div>
      <h1>Real Estate</h1>
      <StockHeader />
      <div
        class="section-headline text-center"
        style={{
          textAlign: "center"
        }}
      ></div>
      <div>
        <span class="green_window">
          <TextField id="addr_keyword" type="text" class="input_text" />
        </span>
        <br />
        <button type="submit" class="sch_smit" onClick={change1}>
          주소
        </button>
        <button type="submit" class="sch_smit" onClick={change2}>
          검색
        </button>
      </div>

      <div
        id="map"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "50rem"
        }}
      ></div>
    </div>
  );
};

export default Estate;
