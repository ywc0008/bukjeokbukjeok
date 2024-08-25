import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useJob } from "@/hook/useJob";
import { log } from "console";
import { link } from "fs";

export default function KaKaoMap() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { data, error, isLoading } = useJob();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, []);

  if (!isMapLoaded) return <div>지도를 불러오는 중...</div>;

  if (isLoading) return <div>데이터 Loading...</div>;
  console.log(data[0]);

  return (
    <>
      <Map
        // 전북대 구정문 위치
        center={{ lat: 35.844177762540475, lng: 127.12748953243687 }}
        style={{ width: "100%", height: "450px" }}
        level={5}
      >
        {data.map((job: any) => (
          <MapMarker
            key={job.id}
            position={{ lat: job.lat, lng: job.lng }}
          ></MapMarker>
        ))}
        <MapMarker
          position={{ lat: 35.844177762540475, lng: 127.12748953243687 }}
        ></MapMarker>
      </Map>
      <div>
        {/* <ul className="flex flex-col gap-5">
          {data.map((data: string) => (
            <li className="text-green-300 flex w-full h-5 p-5 bg-black items-center justify-center rounded-[50px]">
              {data.title}
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
}
