import { use, useEffect, useRef, useState } from "react";
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
      setCurLocation([
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      ]);

      // Naver Map 생성
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(location.latitude, location.longitude),
        zoomControl: false,
      });
    }
  }, [mapRef, location]);

  // 마커 찍는 로직
  useEffect(() => {
    let markers: naver.maps.Marker[] = [];
    if (curLocation.length > 0) {
      for (let i = 0; i < curLocation.length; i++) {
        const otherMarkers = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            curLocation[i].latitude,
            curLocation[i].longitude
          ),
          map: mapRef.current,
        });
        markers.push(otherMarkers);
      }
      if (!!mapRef.current) {
        updateMarkers(mapRef.current, markers);

        let position = new naver.maps.LatLng(
          curLocation[0].latitude,
          curLocation[0].longitude
        );

        let marker = new naver.maps.Marker({
          position: position,
          map: mapRef.current,
        });

        naver.maps.Event.addListener(mapRef.current, "click", (e) => {
          console.log("??");
          marker.setPosition(e.coord);
        });
      }

      // if (!!mapRef.current) updateMarkers(mapRef.current, markers);
    }
  }, [curLocation]);

  function updateMarkers(isMap: naver.maps.Map, isMarker: naver.maps.Marker[]) {
    // console.log("??", isMap, isMarker);
    const mapBounds: any = isMap.getBounds(); // 화면상 출력되는 영역 얻기
    let marker;
    let position;

    for (let i = 0; i < isMarker.length; i++) {
      marker = isMarker[i];
      position = marker.getPosition();

      console.log("!!!", marker, position, mapBounds.hasLatLng(position));
      if (mapBounds.hasLatLng(position)) {
        showMarker(isMap, marker);
      } else {
        hideMarker(isMap, marker);
      }
    }
  }
  function showMarker(map, marker) {
    if (marker.getMap()) return;
    marker.setMap(map);
  }

  function hideMarker(map, marker) {
    if (!marker.getMap()) return;
    marker.setMap(null);
  }

  return {
    location,
  };
};

export default MapBase;
