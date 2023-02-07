import { useNavigate } from "react-router-dom";
import TagDetailList from "./TagDetailList";
import BackButtonAppBar from "../../component/appbar/BackButtonAppBar";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

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

function TagManage() {
  const navigate = useNavigate();

  const addButtonOnClick = () => {
    navigate("/tag/add");
  };

  return (
    <Root>
      <BackButtonAppBar />
      <Container>
        <TagDetailList />
        <Button
          color="primary"
          size="large"
          variant="outlined"
          onClick={addButtonOnClick}
          sx={{ mx: 3 }}
        >
          태그 추가하기
        </Button>
      </Container>
    </Root>
  );
}

export default TagManage;
