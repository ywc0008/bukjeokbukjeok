import Head from "next/head";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KaKaoMap() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=185add19555f56555e052ad5baff2786&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, []);

  if (!isMapLoaded) return <div>지도를 불러오는 중...</div>;
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=185add19555f56555e052ad5baff2786&libraries=services,clusterer&autoload=false`}
        ></script>
      </Head>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
      </Map>
    </>
  );
}
