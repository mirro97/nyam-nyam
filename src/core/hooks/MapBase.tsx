import { useEffect, useRef, useState } from "react";

const MapBase = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<HTMLElement | null | any>(null);
  const locationList = [
    {
      latitude: 37.4778,
      longitude: 126.9608,
    },
    {
      latitude: 37.4798,
      longitude: 126.9621,
    },
    {
      latitude: 37.4779,
      longitude: 126.964,
    },
    {
      latitude: 37.4764,
      longitude: 126.9638,
    },
  ];
  const [curLocation, setCurLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    // 위치 엑세스 허용
    function success(position: any) {
      setCurLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    // 위치 엑세스 차단
    function error() {
      setCurLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    }
  }, []);

  // 지도 생성 로직
  useEffect(() => {
    if (typeof curLocation !== "string") {
      // 현재 위치 받기
      let currentPosition = [curLocation.latitude, curLocation.longitude];

      // Naver Map 생성
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: false,
      });
    }
  }, [mapRef, curLocation]);

  // 마커 찍는 로직
  useEffect(() => {
    if (typeof curLocation !== "string") {
      if (!locationList)
        markerRef.current = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            curLocation.latitude,
            curLocation.longitude
          ),
          map: mapRef.current,
          // icon:{
          //   content: [marker]
          // }
        });
      else
        locationList.map(
          (data) =>
            (markerRef.current = new naver.maps.Marker({
              position: new naver.maps.LatLng(data.latitude, data.longitude),
              map: mapRef.current,
              // icon:{
              //   content: [marker]
              // }
            }))
        );
    }
  }, [curLocation]);

  return {
    curLocation,
  };
};

export default MapBase;
