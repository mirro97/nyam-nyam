import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  border-radius: 8px;
  padding: 16px 26px;
  background-color: #fff;

  &.shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  &.right-bottom-first {
    font-size: 12px;
    bottom: 90px;
    right: 30px;
  }

  &.right-bottom {
    font-size: 12px;
    bottom: 30px;
    right: 30px;
  }
`;
