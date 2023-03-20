import { locationCurrent } from "@/core/recoil/locationCurrent";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import FloatButton from "../button/floatButton";
import { makeMarker } from "../button/marker";
import MapInnerTab from "../navigation/MapInnerTab";
import { MapSection } from "../section/Section";

const MapBoxView = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<HTMLElement | null | any>(null);
  const selectedMarker = useRef<HTMLElement | null | any>(null);
  const [curLocation, setCurLocation] = useRecoilState(locationCurrent);
  const [location, setLocation] = useState<
    { lat: number; lng: number } | string
  >("");

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

  // 마커 클릭 이벤트
  const markerClickEvent = (marker: any, item) => {
    naver.maps.Event.addListener(marker, "click", (e: any) => {
      if (
        !selectedMarker.current ||
        (selectedMarker.current !== marker && item.title !== undefined)
      ) {
        // 클릭한 마커가 null 이 아니면 기본 상태
        if (!!selectedMarker.current) {
          selectedMarker.current.setIcon({
            content: [makeMarker(item)].join(""),
            size: new naver.maps.Size(13, 13), // 이미지 크기
            anchor: new naver.maps.Point(13, 36), // 지도상 위치에서 이미지 위치의 offset값
            scaledSize: new naver.maps.Size(395, 79),
          });
        }
      }
    });
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
    // var contentString = [
    //   '<div class="iw_inner">',
    //   "   <h3>서울특별시청</h3>",
    //   "   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br>",
    //   '       <img src="./img/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br>',
    //   "       02-120 | 공공,사회기관 > 특별,광역시청<br>",
    //   '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
    //   "   </p>",
    //   "</div>",
    // ].join("");
    curLocation?.map((data) => {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(data?.lat, data?.lng),
        map: mapRef.current,
        icon: {
          content: [makeMarker(data)].join(""),
          size: new naver.maps.Size(13, 13), // 이미지 크기
          anchor: new naver.maps.Point(13, 36), // 지도상 위치에서 이미지 위치의 offset값
        },
      });

      markerClickEvent(markerRef.current, data);

      // 마커에 데이터 찍어주기 -> 마커 커스텀으로 대체
      // const infowindow = new naver.maps.InfoWindow({
      //   content: contentString,
      //   maxWidth: 140,
      //   backgroundColor: "#eee",
      //   borderColor: "#2db400",
      //   borderWidth: 5,
      //   anchorSize: new naver.maps.Size(8, 8),
      //   anchorSkew: true,
      //   anchorColor: "#eee",

      //   pixelOffset: new naver.maps.Point(8, -8),
      // });

      markers.push(markerRef.current);
      // infowindows.push(infowindow);
    });

    const getClickHandler = (seq: number) => {
      return () => {
        const marker = markers[seq];
        const infoWindow = infowindows[seq];

        // if (infoWindow.getMap()) {
        //   infoWindow.close();
        // } else {
        //   infoWindow.open(mapRef.current, marker);
        // }
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
