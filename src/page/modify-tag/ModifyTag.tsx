import { useNavigate, useParams } from "react-router-dom";
import TagForm from "../../component/tag-form/TagForm";
import ConfirmModal from "./../../component/modal/confirm-modal/ConfirmModal";
import Button from "./../../component/button/Button";
import { useRef, useState } from "react";
import { TagFormData } from "./../../component/tag-form/TagForm";
import * as tagApi from "../../api/tag.repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getTagByIdToFormData, tagListState } from "../../recoil/tagAtom";
import { hexColorToNum } from "../../utils/Color";

const ModifyTag = () => {
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
    <div>
      <TagForm formRef={formRef} />
      <Button onClick={showDeleteModal}>삭제하기</Button>
      <Button onClick={updateOnClick}>수정완료</Button>
      <ConfirmModal
        isShow={isShowDeleteModal}
        title={"태그 삭제"}
        description={"모든 done에서 해당 태그가 삭제됩니다."}
        positiveOnClick={deleteOnClick}
        negativeOnClick={() => {
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
};

export default ModifyTag;
