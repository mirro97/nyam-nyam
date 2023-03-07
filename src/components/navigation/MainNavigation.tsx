import { location } from "@/core/recoil/location";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const MainNavigation = () => {
  return (
    <NavSection>
      <span>현재 위치는?</span>
    </NavSection>
  );
};

export default MainNavigation;

const NavSection = styled.nav`
  width: 540px;
  height: 100%;
`;
