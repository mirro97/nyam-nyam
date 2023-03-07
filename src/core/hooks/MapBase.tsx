import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { locationCurrent } from "../recoil/locationCurrent";

const MapBase = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<HTMLElement | null | any>(null);

  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");
  const [curLocation, setCurLocation] = useRecoilState(locationCurrent);

  // 화면 처음 진입시
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    // 위치 엑세스 허용
    function success(position: any) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    // 위치 엑세스 차단
    function error() {
      setLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    }
  }, []);

  // 지도 생성 로직
  useEffect(() => {
    if (typeof location !== "string") {
      // 현재 위치 받기
      setCurLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // Naver Map 생성
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(location.latitude, location.longitude),
        zoomControl: false,
      });
    }
  }, [mapRef, location]);

  // 마커 찍는 로직
  useEffect(() => {
    if (typeof location !== "string") {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.latitude, location.longitude),
        map: mapRef.current,
        // icon:{
        //   content: [marker]
        // }
      });
      // else
      //   locationList.map(
      //     (data) =>
      //       (markerRef.current = new naver.maps.Marker({
      //         position: new naver.maps.LatLng(data.latitude, data.longitude),
      //         map: mapRef.current,
      //         // icon:{
      //         //   content: [marker]
      //         // }
      //       }))
      //   );
    }
  }, [location]);

  return {
    location,
  };
};

export default MapBase;
