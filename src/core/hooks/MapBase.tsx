import { Component, useEffect, useRef, useState } from "react";

const MapBase = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [curLocation, setCurLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("현재 위치 파악이 어려워요 😢 \n 기본 위치로 지정하겠습니다!");
      setCurLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    }
  }, []);

  useEffect(() => {
    if (typeof curLocation !== "string") {
      // 현재 위치 받기
      let currentPosition = [curLocation.latitude, curLocation.longitude];

      // Naver Map 생성
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
      });
    }
  }, [curLocation]);

  return {
    curLocation,
  };
};

export default MapBase;
