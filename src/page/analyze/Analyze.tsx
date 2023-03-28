import styled from "styled-components";
import { useState } from "react";
import Box from "@mui/material/Box";
import DefaultAppBar from "../../component/appbar/DefaultAppBar";
import DoneBarGraph from "./../../component/Analyze/DoneBarGraph/DoneBarGraph";
import DoneCalendarGraph from "../../component/Analyze/DoneCalendarGraph/DoneCalendarGraph";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  margin: 0 auto;
  padding: 0px 24px;
  @media (max-width: 700px) {
    min-width: 0px;
    margin: 0;
  }
`;

const Title = styled.h2``;
const SubTitle = styled.h3`
  margin: 18px 0 12px 0;
`;

const Analyze = () => {
  const [date] = useState(Date.now());

  return (
    <Root>
      <DefaultAppBar />
      <Container>
        <Title>Analyze</Title>
        <SubTitle>태그별 done 개수</SubTitle>
        <div>2023-03</div>
        <DoneBarGraph date={new Date(date)} />
        <SubTitle>날짜별 done 개수</SubTitle>
        <div>2023년</div>
        <DoneCalendarGraph date={new Date(date)} />
      </Container>
    </Root>
  );
};

export default Analyze;
