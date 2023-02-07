import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postAddDone } from "../../api/done.repository";
import DoneForm from "../../component/DoneForm";
import BackButtonAppBar from "../../component/appbar/BackButtonAppBar";
import styled from "styled-components";
import { Box, Button } from "@mui/material";
import { defaultDoneFormData } from "../../component/DoneForm/DoneForm.type";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  margin: 0 auto;
  padding: 24px 0;
  @media (max-width: 700px) {
    min-width: 0px;
    margin: 0;
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0px 24px;
`;

function AddDone() {
  const formRef = useRef(defaultDoneFormData);
  const [isIdleAddDone, setIsIdleAddDone] = useState<boolean>(true);
  const navigate = useNavigate();

  const addDone = async () => {
    try {
      setIsIdleAddDone(false);
      const data = await postAddDone(
        formRef.current.name,
        new Date(),
        formRef.current.tags
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setIsIdleAddDone(true);
    }
  };

  const submitOnClick = () => {
    if (formRef.current.name.length === 0) {
      alert("내용이 필요합니다.");
      return;
    }
    if (isIdleAddDone) {
      addDone();
    } else {
      alert("이미 요청중입니다");
    }
  };

  return (
    <Root>
      <BackButtonAppBar />
      <Container>
        <Title>Done 추가하기</Title>
        <DoneForm formRef={formRef} />
        <Button variant="outlined" sx={{ mx: 3 }} onClick={submitOnClick}>
          추가하기
        </Button>
      </Container>
    </Root>
  );
}

export default AddDone;
