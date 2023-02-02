import MapBase from "@/core/hooks/MapBase";
import styled from "styled-components";

const MapBoxView = () => {
  MapBase();
  return <MapBox id="map" />;
};

const MapBox = styled.div`
  width: 100%;
  height: 1000px;
`;
export default MapBoxView;
