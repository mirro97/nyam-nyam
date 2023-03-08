import styled from "styled-components";
import { TextBlack16, TextGray16, Title } from "../common/Text";

interface Props {
  title: string;
  type: string;
  distance: number;
  authorized: boolean;
  like: boolean;
}

const StoreCard = ({ title, type, distance, authorized, like }) => {
  return (
    <Card>
      <ContentLeft>
        <img src="/image/store/Rectangle 10.png" alt="가게 이미지" />
      </ContentLeft>
      <ContentRight>
        <HeaderTextArea>
          <Title>{title ? title : "선릉역 타코야끼 가게"}</Title>
          <TextGray16>{type ? type : "타코야끼"}</TextGray16>
          <LikeIcon />
        </HeaderTextArea>
        <TextBlack16>{distance ? distance : 160} m</TextBlack16>
        <AuthButton>
          {authorized ? "방문 인증완료" : "방문 인증하기"}
        </AuthButton>
      </ContentRight>
    </Card>
  );
};

export default StoreCard;

const Card = styled.div`
  padding: 18px 20px;
  background-color: #fff;
  display: flex;
  border-radius: 16px;
`;

const ContentLeft = styled.div`
  width: 130px;
  height: 130px;
`;

const ContentRight = styled.div``;

const HeaderTextArea = styled.div`
  display: flex;
`;

const LikeIcon = styled.div`
  background-color: pink;
  width: 18px;
  height: 18px;
  border-radius: 50%;
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 16px;
`;
