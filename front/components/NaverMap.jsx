import React, { useEffect } from "react";

const NaverMap = ({ industry, title }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=dri8g9rbla`;
    script.async = true;
    script.onload = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(35.84399311677954, 127.12738407982567),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL, // 컨트롤 스타일 설정
          position: naver.maps.Position.TOP_RIGHT, // 컨트롤 위치 설정
        },
      });

      // 마커 데이터 배열
      const markersData = [
        {
          position: new naver.maps.LatLng(
            35.84399311677954,
            127.12738407982567
          ),
          title: "마커1",
        },
        {
          position: new naver.maps.LatLng(37.3625704, 127.105399),
          title: "Marker 2",
        },
        {
          position: new naver.maps.LatLng(37.3655704, 127.105399),
          title: "Marker 3",
        },
      ];
      // const makersdata = data.map((data) => {
      //   industry: data.industry,
      //   title: data.title,
      //   location: data.location,
      //   recruitmentPeriod: data.recruitmentPeriod,
      //   numberOfPositions: data.numberOfPositions,
      //   workingHours: data.workingHours,
      //   salar: data.salar,
      //   contactPerson: data.contactPerson
      // });

      // 인포윈도우 생성
      const infoWindow = new naver.maps.InfoWindow({
        content: "", // 빈 내용으로 초기화
        maxWidth: 500,
        backgroundColor: "#fff",
        borderColor: "",
        borderWidth: 1,
        anchorSize: new naver.maps.Size(10, 10),
        anchorSkew: true,
        anchorColor: "#fff",
      });

      // 마커 배열 생성 및 클릭 이벤트 추가
      const markers = markersData.map((data) => {
        const marker = new naver.maps.Marker({
          position: data.position,
          map: map,
          title: data.title,
          location: data.location,
        });

        // 마커에 클릭 이벤트 추가
        naver.maps.Event.addListener(marker, "click", () => {
          const content = `<div class="w-44 h-44  text-black">${data.title}${data.location}</div>`;
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });

        return marker;
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return <div id="map" className="w-full h-[100vh]" />;
};

export default NaverMap;
