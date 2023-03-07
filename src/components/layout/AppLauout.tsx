import React from "react";
import styled from "styled-components";

const AppLayout = (props: { children: React.ReactNode }) => {
  return <Container>{props.children}</Container>;
};

export default AppLayout;

const Container = styled.div`
  display: flex;
  height: 100%;
`;
