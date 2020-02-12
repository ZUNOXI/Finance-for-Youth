import React, {useState} from "react";
import stock from "../images/estate_header.png";


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

//http://apis.data.go.kr/1611000/nsdi/ReferLandPriceService/attr/getReferLandPriceAttr

const Estate = () => {
  const kakao = window.kakao;
  const [map, setMap] = useState();
  var ps = new kakao.maps.services.Places();
  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  
  const [searchword, setSearchword] = useState("이태원");
  
  const handleChange = (e) => {
    const targetvalue = e.target.value
    setSearchword(targetvalue);
  }

  window.onload=function(){
    var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(35.205595, 126.897714),
			level: 3
		};

    // map = new kakao.maps.Map(container, options);
    setMap(new kakao.maps.Map(container, options));
  }

  function change(){
    ps.keywordSearch(searchword+" 부동산", placesSearchCB);
  }

  function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        console.log(map)
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
  kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
  });
} 

  return (
    <div>
      <h1>Real Estate</h1>
      <StockHeader />
      <div class="section-headline text-center"
      style={{
        textAlign:"center"
      }}>
      </div>
        <div>
          <span class='green_window'>
	        <input type='text' class='input_text' value={searchword} onChange={handleChange}/>
          </span>
          <button type='submit' class='sch_smit' onClick={change}>검색</button>
        </div>

        <div id="map" style={{
          backgroundColor: "white",
          width: "100%",
          height: "50rem"
        }}></div>
      </div>
  );
};

export default Estate;
