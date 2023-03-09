import styled from "styled-components";

const MapInnerTab = () => {
  return (
    <TabWrap>
      <TabItem>붕어빵</TabItem>
      <TabItem>군고구마</TabItem>
      <TabItem>타코야끼</TabItem>
      <TabItem>군밤</TabItem>
      <TabItem>호떡</TabItem>
      <TabItem>계란빵</TabItem>
      <TabItem>떡볶이</TabItem>
      <TabItem>어묵</TabItem>
    </TabWrap>
  );
};

export default MapInnerTab;

const TabWrap = styled.ul`
  position: fixed;
  z-index: 9;
  display: flex;
  background-color: #fff;
  top: 16px;
  left: 406px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const TabItem = styled.li`
  padding: 16px 26px;
  white-space: nowrap;
  font-size: 12px;
`;
