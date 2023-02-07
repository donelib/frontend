import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { modifyDoneState } from "./../../recoil/doneAtom";
import DoneForm from "../../component/DoneForm/DoneForm";
import { useEffect, useRef, useState } from "react";
import { DoneInfo } from "./../../api/data/DoneInfo";
import * as doneApi from "../../api/done.repository";
import { DoneFormData } from "../../component/DoneForm/DoneForm.type";
import BackButtonAppBar from "../../component/appbar/BackButtonAppBar";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ConfirmDialog from "../../component/Dialog/ConfirmDialog";

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

const Title = styled.h3`
  margin: 0px 24px;
`;

const doneToDoneFormData = (done: DoneInfo) => {
  return {
    name: done.name,
    tags: done.tags.map((tag) => tag.id),
    doneAt: done.doneAt,
  };
};

function ModifyDone() {
  const navigate = useNavigate();
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const defaultDone = useRecoilValue(modifyDoneState);
  const formRef = useRef<DoneFormData>(doneToDoneFormData(defaultDone));
  const { doneId } = useParams();

  useEffect(() => {
    if (defaultDone.id === -1) navigate("/");
  }, [defaultDone, navigate]);

  const navigateToMain = () => {
    navigate("/");
  };

  const showDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const deleteOnClick = async () => {
    await deleteTag();
    navigateToMain();
  };

  const updateOnClick = () => {
    const func = async () => {
      console.log(formRef.current);
      const body = {
        name: formRef.current.name,
        tagList: formRef.current.tags,
        doneAt: formRef.current.doneAt,
      };
      if (body.name.length === 0) {
        alert("내용을 입력해주세요");
        return;
      }
      await doneApi.putDone(Number(doneId), body);
      navigateToMain();
    };
    func();
  };

  const deleteTag = async () => {
    await doneApi.deleteDone(Number(doneId));
  };

  return (
    <Root>
      <BackButtonAppBar />
      <Container>
        <Title>Done 수정하기</Title>
        <DoneForm formRef={formRef} />
        <Button
          variant="outlined"
          sx={{ mx: 3, mb: 1.5 }}
          onClick={showDeleteModal}
        >
          삭제하기
        </Button>
        <Button variant="outlined" sx={{ mx: 3 }} onClick={updateOnClick}>
          수정완료
        </Button>
        <ConfirmDialog
          isShow={isShowDeleteModal}
          title={"Done 삭제"}
          description={"정말 삭제하시겠습니까?"}
          positiveOnClick={deleteOnClick}
          negativeOnClick={() => {
            setShowDeleteModal(false);
          }}
        />
      </Container>
    </Root>
  );
}

export default ModifyDone;
