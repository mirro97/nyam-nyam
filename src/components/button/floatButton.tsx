import React from "react";
import { Button } from "./commonButton";

interface props {
  icon: string | null;
  text: string | null;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const position = {
  현재위치: "right-bottom",
  등록하기: "right-bottom-first",
};

const FloatButton = ({ icon, text, onClick }: props) => {
  return (
    <Button className={`fixed shadow ${position[text]}`} onClick={onClick}>
      {icon ? <img src={icon} alt="text" /> : ""}
      {text}
    </Button>
  );
};

export default FloatButton;
