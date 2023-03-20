import { locationCurrent } from "@/core/recoil/locationCurrent";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import StoreCard from "../card/storeCard";

let tempData = {
  title: "",
  type: "",
  distance: "",
  authorized: false,
  like: false,
};

const MainNavigation = () => {
  const [cur, setCur] = useRecoilState(locationCurrent);
  const [search, setSearch] = useState("");
  const [searchh, setSearchh] = useState("");
  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      setCur(() => [
        { lat: 37.4783, lng: 126.9619, type: "타코야끼", title: "냠냠타코" },
        { lat: 37.4789, lng: 126.962, type: "붕어빵", title: "쩝쩝붕어" },
      ]);
    }
  };
  const onSubmitSearchh = (e) => {
    if (e.key === "Enter") {
      setCur(() => [
        { lat: 37.4772, lng: 126.9606, type: "호떡", title: "호호떡~" },
      ]);
    }
  };
  return (
    <NavSection>
      <NavTop>
        <span>현재 위치는?</span>
        <SearchInput
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onSubmitSearch}
          placeholder="장소, 버스, 지하철, 도로 검색"
        />

        <SearchInput
          type="text"
          onChange={(e) => setSearchh(e.target.value)}
          onKeyDown={onSubmitSearchh}
          placeholder="장소, 버스, 지하철, 도로 검색"
        />
      </NavTop>
      <NavBody>
        <StoreCard {...tempData} />
      </NavBody>
    </NavSection>
  );
};

export default MainNavigation;

const NavSection = styled.nav`
  min-width: 390px;
  height: 100%;
`;

const NavTop = styled.div`
  background-color: #fff;
  padding: 20px;
`;

const NavBody = styled.div`
  padding: 24px 12px;
`;

const SearchInput = styled.input`
  background-color: #f8f8f8;
  width: 100%;
  padding: 14px 14px 14px 54px;
  border-radius: 8px;
  margin-top: 10px;
`;
