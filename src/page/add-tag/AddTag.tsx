import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postAddTag } from "../../api/tag.repository";
import TagForm from "../../component/TagForm";
import { hexColorToNum } from "../../utils/Color";
import { useSetRecoilState } from "recoil";
import { tagListState } from "./../../recoil/tagAtom";
import BackButtonAppBar from "./../../component/appbar/BackButtonAppBar";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { defaultTagFormData } from "./../../component/TagForm/TagForm.type";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 0;
  @media (max-width: 700px) {
    min-width: 0px;
    margin: 0;
  }
`;

const Title = styled.h3`
  margin: 0px 24px;
`;

function AddTag() {
  const navigate = useNavigate();
  const [isIdleAddTag, setIsIdleAddTag] = useState<boolean>(true);
  const formRef = useRef(defaultTagFormData);
  const setTagList = useSetRecoilState(tagListState);

  const addTag = useCallback(async () => {
    const { name, color } = formRef.current;
    try {
      setIsIdleAddTag(false);
      const data = await postAddTag({
        name: name,
        color: hexColorToNum(color),
      });
      console.log(data);
      setTagList((prev) => [...prev, data]);
      navigate("/tag");
    } catch (error) {
      alert(error);
    } finally {
      setIsIdleAddTag(true);
    }
  }, [navigate, setTagList]);

  const submitOnClick = useCallback(() => {
    if (formRef.current.name.length === 0) {
      alert("태그명을 입력해주세요");
      return;
    }
    if (isIdleAddTag) {
      addTag();
    } else {
      alert("이미 요청중입니다");
    }
  }, [isIdleAddTag, addTag]);

  return (
    <Root>
      <BackButtonAppBar />
      <Container>
        <Title>태그 추가</Title>
        <TagForm formRef={formRef} />
        <Button
          variant="outlined"
          onClick={submitOnClick}
          sx={{ mx: 3, my: 1.5 }}
        >
          추가하기
        </Button>
      </Container>
    </Root>
  );
}

export default AddTag;
