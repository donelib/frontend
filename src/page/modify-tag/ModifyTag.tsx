import { useNavigate, useParams } from "react-router-dom";
import TagForm from "../../component/tag-form/TagForm";
import ConfirmModal from "./../../component/modal/confirm-modal/ConfirmModal";
import Button from "./../../component/button/Button";
import BackButtonToolBar from "../../component/appbar/toolbar/BackButtonToolBar";
import AppBar from "../../component/appbar/AppBar";
import { useRef, useState } from "react";
import { TagFormData } from "./../../component/tag-form/TagForm";
import * as tagApi from "../../api/tag.repository";
import {useRecoilValue} from "recoil";
import { getTagByIdToFormData } from "../../recoil/tagAtom";
import { hexColorToNum } from "../../utils/Color";

const ModifyTag = () => {
  const navigate = useNavigate();  
  const [isShowDeleteModal, setShowDeleteModal] = useState(false)
  const { tagId } = useParams();
  const defualtTagFormData = useRecoilValue(getTagByIdToFormData(Number(tagId)));
  const formRef = useRef<TagFormData>(defualtTagFormData);

  const navigateToTagManage = () => {
    navigate("/tag-manage");
  }

  const showDeleteModal = () => {
    setShowDeleteModal(true);
  }

  const deleteOnClick = async () => {
    await deleteTag();
    navigateToTagManage();
  }

  const updateOnClick = () => {
    const func =  async() => {
      const body = {
        name: formRef.current.name,
        color: hexColorToNum(formRef.current.color)
      };
      if (body.name.length === 0) {
        alert("태그명을 입력해주세요");
        return;
      }
      await tagApi.putTagById(Number(tagId), body);
      navigateToTagManage();
    };
    func();
  }

  const deleteTag = async () => {
    await tagApi.deleteTag(Number(tagId));
  }

  return (
    <div>
      <AppBar>
        <BackButtonToolBar/>
      </AppBar>
      <TagForm formRef={formRef} />
      <Button onClick={showDeleteModal}>
        삭제하기
      </Button>
      <Button onClick={updateOnClick}>
        수정완료
      </Button>
      <ConfirmModal isShow={isShowDeleteModal} 
                    title={"태그 삭제"} 
                    description={"모든 done에서 해당 태그가 삭제됩니다."}
                    positiveOnClick={deleteOnClick}
                    negativeOnClick={() => {setShowDeleteModal(false)}} />
    </div>
  );
};

export default ModifyTag;