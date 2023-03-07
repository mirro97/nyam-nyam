import { locationCurrent } from "@/core/recoil/locationCurrent";
import { locationList } from "@/core/recoil/locationList";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import StoreCard from "../card/storeCard";

const MainNavigation = () => {
  const [list, setList] = useRecoilState(locationList);
  const [cur, setCur] = useRecoilState(locationCurrent);
  const [search, setSearch] = useState("");
  return (
    <NavSection>
      <NavTop>
        <span>현재 위치는?</span>
        <SearchInput
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="장소, 버스, 지하철, 도로 검색"
        />
      </NavTop>
      <NavBody>
        <StoreCard />
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
