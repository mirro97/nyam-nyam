import { locationCurrent } from "@/core/recoil/locationCurrent";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import FloatButton from "../button/floatButton";
import MapInnerTab from "../navigation/MapInnerTab";
import { MapSection } from "../section/Section";

const MapBoxView = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<HTMLElement | null | any>(null);
  const [curLocation, setCurLocation] = useRecoilState(locationCurrent);
  const [location, setLocation] = useState<
    { lat: number; lng: number } | string
  >("");
  const [state, setState] = useState(false);

  // 현재 위치 가져오기
  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: any) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    // 위치 엑세스 차단
    function error() {
      setLocation({ lat: 37.4862618, lng: 127.1222903 });
    }
  };

  // 화면 처음 진입시
  useEffect(() => {
    getCurrentPosition();
  }, []);

  // 지도 생성 로직
  useEffect(() => {
    if (typeof location !== "string") {
      // Naver Map 생성
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(location?.lat, location?.lng),
        zoomControl: false,
      });
    }
  }, [location]);

  // 마커 찍기
  useEffect(() => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(curLocation[0]?.lat, curLocation[0]?.lng),
      zoomControl: false,
    });

    const markers: naver.maps.Marker[] = [];
    const infowindows: naver.maps.InfoWindow[] = [];

    curLocation?.map((data) => {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(data.lat, data.lng),
        map: mapRef.current,
      });

      // 마커에 데이터 찍어주기
      const infowindow = new naver.maps.InfoWindow({
        content: "<div>이거임</div>",
        borderWidth: 1,
        anchorSize: new naver.maps.Size(10, 10),
        pixelOffset: new naver.maps.Point(10, -10),
      });

      markers.push(markerRef.current);
      infowindows.push(infowindow);
    });

    const getClickHandler = (seq: number) => {
      return () => {
        const marker = markers[seq];
        const infoWindow = infowindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(mapRef.current, marker);
        }
      };
    };

    for (let i = 0; i < markers.length; i += 1) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
    }
  }, [mapRef, curLocation]);

  // MapBase(location);
  return (
    <MapSection>
      <MapInnerTab />
      <FloatButton onClick={getCurrentPosition} text="등록하기" icon="" />
      <FloatButton onClick={getCurrentPosition} text="현재위치" icon="" />
      <MapBox id="map" />
    </MapSection>
  );
};

export default MapBoxView;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`;
