import { useNavigate, useParams } from "react-router-dom";
import TagForm from "../../component/TagForm/TagForm";
import { useRef, useState } from "react";
import * as tagApi from "../../api/tag.repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getTagByIdToFormData, tagListState } from "../../recoil/tagAtom";
import { hexColorToNum } from "../../utils/Color";
import BackButtonAppBar from "../../component/appbar/BackButtonAppBar";
import { TagFormData } from "../../component/TagForm/TagForm.type";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ConfirmDialog from "./../../component/Dialog/ConfirmDialog/ConfirmDialog";

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

function ModifyTag() {
  const navigate = useNavigate();
  const setTagList = useSetRecoilState(tagListState);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const { tagId } = useParams();
  const defualtTagFormData = useRecoilValue(
    getTagByIdToFormData(Number(tagId))
  );
  const formRef = useRef<TagFormData>(defualtTagFormData);

  const navigateToTagManage = () => {
    navigate("/tag");
  };

  const showDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const deleteOnClick = async () => {
    await deleteTag();
    navigateToTagManage();
  };

  const updateOnClick = () => {
    const func = async () => {
      const body = {
        name: formRef.current.name,
        color: hexColorToNum(formRef.current.color),
      };
      if (body.name.length === 0) {
        alert("태그명을 입력해주세요");
        return;
      }
      const updatedTag = await tagApi.putTagById(Number(tagId), body);
      setTagList((prev) =>
        prev.map((tag) => {
          if (tag.id === Number(tagId)) return updatedTag;
          else return tag;
        })
      );
      navigateToTagManage();
    };
    func();
  };

  const deleteTag = async () => {
    await tagApi.deleteTag(Number(tagId));
    setTagList((prev) => prev.filter((tag) => tag.id !== Number(tagId)));
  };

  return (
    <Root>
      <BackButtonAppBar />
      <Container>
        <Title>태그 수정</Title>
        <TagForm formRef={formRef} />
        <Button variant="outlined" sx={{ mx: 3 }} onClick={showDeleteModal}>
          삭제하기
        </Button>
        <Button
          variant="outlined"
          sx={{ mx: 3, my: 1.5 }}
          onClick={updateOnClick}
        >
          수정완료
        </Button>
        <ConfirmDialog
          isShow={isShowDeleteModal}
          title={"태그 삭제"}
          description={"모든 done에서 해당 태그가 삭제됩니다."}
          positiveOnClick={deleteOnClick}
          negativeOnClick={() => {
            setShowDeleteModal(false);
          }}
        />
      </Container>
    </Root>
  );
}

export default ModifyTag;
